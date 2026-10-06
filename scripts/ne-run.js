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

  // Brand accent (client, 2026-10-06): every gold used by the original design → #957E56.
  // The design prototypes still hold the old golds, so builds and live documents both go through this.
  NE.ACCENT = '#957E56';
  NE.ACCENT_LIGHT = '#E1D5C1'; // replaces the pale gold (#FCE2B4) used for hero text on dark photos
  const OLD_GOLD = /#(?:CEA45D|CDA45E|CAA566|C5A059|EEB75D|998560|998158|FDB843)([0-9a-f]{2})?\b/gi; // optional alpha
  const OLD_GOLD_RGB = /rgba?\(\s*(?:197\s*,\s*160\s*,\s*89|206\s*,\s*164\s*,\s*93|205\s*,\s*164\s*,\s*94|202\s*,\s*165\s*,\s*102)\s*(,\s*[\d.]+\s*)?\)/gi;
  NE.recolorText = (t) => t.replace(OLD_GOLD, (m, a) => NE.ACCENT + (a || '')).replace(/#FCE2B4\b/gi, NE.ACCENT_LIGHT)
    .replace(OLD_GOLD_RGB, (m, a) => (a ? 'rgba(149, 126, 86' + a.replace(/\s+/g, ' ') + ')' : 'rgb(149, 126, 86)'));
  NE.recolor = (els) => JSON.parse(NE.recolorText(JSON.stringify(els)));

  NE.publishPage = async (key, opts = {}) => {
    const p = NE.PAGES[key];
    const els = NE.recolor(NE.minSidePadding(p.build()));
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
