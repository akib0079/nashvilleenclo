/*
 * Nashville Enclosures — runner: create/rename pages and publish Elementor data.
 *   await NE.loadProtos();            // once per tab
 *   await NE.publishPage('louvered');  // build + save one page
 */
(function () {
  const NE = window.NE;

  NE.ensurePage = async (key) => {
    const p = NE.PAGES[key];
    if (p.id) return p.id;
    const parent = p.parent || 0;
    const existing = await NE.rest('/wp/v2/pages?status=publish,draft&per_page=50&slug=' + p.slug + '&_fields=id,parent');
    let id = (existing.find((e) => e.parent === parent) || {}).id;
    if (!id) {
      const r = await NE.rest('/wp/v2/pages', { method: 'POST', body: JSON.stringify({ title: p.title, slug: p.slug, parent, status: 'publish' }) });
      id = r.id;
    }
    // opening the editor once flags the post as "built with Elementor"
    await fetch('/wp-admin/post.php?post=' + id + '&action=elementor', { credentials: 'same-origin' });
    p.id = id;
    return id;
  };

  // Boxed sections from the original design have 0 side padding, so between 1025–1239px their
  // content touches the window edges. Guarantee a 20px minimum (no visible change on wide screens).
  NE.minSidePadding = (els) => {
    for (const el of els) {
      if (el.elType !== 'container') continue;
      const p = el.settings.padding || {};
      const l = +(p.left || 0), r = +(p.right || 0);
      if (l >= 20 && r >= 20) continue;
      el.settings.padding = { unit: p.unit || 'px', top: p.top === undefined ? '' : String(p.top), right: String(Math.max(r, 20)), bottom: p.bottom === undefined ? '' : String(p.bottom), left: String(Math.max(l, 20)), isLinked: false };
    }
    return els;
  };

  NE.publishPage = async (key, opts = {}) => {
    const p = NE.PAGES[key];
    const els = NE.minSidePadding(p.build());
    if (opts.dry) return { key, sections: els.length, bytes: JSON.stringify(els).length };
    const id = await NE.ensurePage(key);
    const body = { title: p.title };
    if (p.slug) body.slug = p.slug;
    if (p.parent !== undefined) body.parent = p.parent;
    await NE.rest('/wp/v2/pages/' + id, { method: 'POST', body: JSON.stringify(body) });
    await NE.save(id, els);
    return { key, id, sections: els.length };
  };

  NE.publishAll = async (keys, log = []) => {
    for (const k of keys) {
      try { log.push(JSON.stringify(await NE.publishPage(k))); }
      catch (e) { log.push(k + ' ERROR ' + String(e).slice(0, 300)); }
    }
    return log;
  };
})();
