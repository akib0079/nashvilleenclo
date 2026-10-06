/*
 * Nashville Enclosures — content clean-up outside the Elementor pages (blog, media, page-header meta).
 */
(function () {
  const NE = window.NE;

  /* Post 99: keep the client's article, drop the theme demo filler appended after it
     (demo gallery, "You Will Never Fake the Feeling…", David Oswald quote, Flos/Caule text)
     and the AI-tool markup (data-path-to-node, citation spans, empty chip divs). */
  NE.cleanPost99 = async () => {
    const p = await NE.rest('/wp/v2/posts/99?context=edit');
    const raw = p.content.raw;
    const cut = raw.indexOf('[gallery');
    if (cut < 0) return 'already clean';
    const doc = new DOMParser().parseFromString('<div id="x">' + raw.slice(0, cut) + '</div>', 'text/html');
    const root = doc.getElementById('x');
    root.querySelectorAll('div').forEach((d) => { if (!d.textContent.trim()) d.remove(); });
    const out = [];
    root.querySelectorAll('p').forEach((para) => {
      const lead = para.querySelector('b, strong');
      const text = para.textContent.replace(/\s+/g, ' ').trim();
      if (!text) return;
      if (para.querySelector('i, em') && /Request a quote/i.test(text)) {
        out.push('<p><em>Don’t let winter trap you indoors. <a href="/contact-us/">Request a quote</a> for a custom polycarbonate patio cover today.</em></p>');
      } else if (lead && text.startsWith(lead.textContent.trim())) {
        const h = lead.textContent.trim();
        out.push('<h3>' + h + '</h3>');
        out.push('<p>' + text.slice(h.length).trim() + '</p>');
      } else {
        out.push('<p>' + text + '</p>');
      }
    });
    const content = out.join('\n\n');
    await NE.rest('/wp/v2/posts/99', { method: 'POST', body: JSON.stringify({ content }) });
    return content.length + ' chars, ' + out.length + ' blocks';
  };

  /* Custom-field update through WordPress's own "Custom Fields" ajax (needs the edit screen's nonce). */
  NE.setMeta = async (id, key, value) => {
    const html = await (await fetch('/wp-admin/post.php?post=' + id + '&action=edit', { credentials: 'same-origin' })).text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const nonce = doc.querySelector('[name="_ajax_nonce-add-meta"]')?.value;
    let mid = null;
    doc.querySelectorAll('input[name^="meta["][name$="[key]"]').forEach((k) => { if (k.value === key) mid = k.name.match(/meta\[(\d+)\]/)[1]; });
    const fd = new FormData();
    fd.append('action', 'add-meta'); fd.append('post_id', id); fd.append('_ajax_nonce-add-meta', nonce);
    if (mid) { fd.append(`meta[${mid}][key]`, key); fd.append(`meta[${mid}][value]`, value); }
    else { fd.append('metakeyinput', key); fd.append('metavalue', value); }
    const r = await fetch('/wp-admin/admin-ajax.php', { method: 'POST', body: fd, credentials: 'same-origin' });
    return id + ' ' + key + '=' + value + ' (' + (mid ? 'upd' : 'add') + ' ' + r.status + ')';
  };

  NE.renameDemoCategory = async () => {
    const cats = await NE.rest('/wp/v2/categories?per_page=100&_fields=id,name,slug,count');
    const c = cats.find((x) => /how it works/i.test(x.name));
    if (!c) return 'no demo category';
    await NE.rest('/wp/v2/categories/' + c.id, { method: 'POST', body: JSON.stringify({ name: 'Outdoor Living Tips', slug: 'outdoor-living-tips' }) });
    return 'category ' + c.id + ' renamed';
  };

  /* Alt text for the pre-existing images still in use (footer logo, feature icons, header logos). */
  NE.fixLegacyAlts = async () => {
    const want = [
      ['Title-170-x-100-px-2', 'Nashville Enclosures logo'],
      ['95769a60-4b8a-4f60-994c-a08f7b9c845e', 'Residential and commercial icon'],
      ['6ffb5a01-5c89-4619-848a-33936a43659f', 'Design-build icon'],
      ['logos', 'Nashville Enclosures logo'],
    ];
    const log = [];
    for (const [q, alt] of want) {
      const hits = await NE.rest('/wp/v2/media?search=' + encodeURIComponent(q) + '&per_page=10&_fields=id,source_url,alt_text');
      for (const h of hits.filter((x) => x.source_url.includes(q))) {
        if (!h.alt_text) { await NE.rest('/wp/v2/media/' + h.id, { method: 'POST', body: JSON.stringify({ alt_text: alt }) }); log.push(h.id + ' ' + alt); }
        else log.push(h.id + ' already: ' + h.alt_text);
      }
    }
    return log;
  };
})();
