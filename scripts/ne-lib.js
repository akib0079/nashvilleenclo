/*
 * Nashville Enclosures — Elementor build toolkit.
 * Runs inside a logged-in wp-admin / front-end tab on the site origin.
 * Reads and saves Elementor documents through Elementor's own admin-ajax
 * endpoint and uploads media through the WP REST API (cookie + nonce auth).
 */
(function () {
  const NE = (window.NE = window.NE || {});
  NE.docs = NE.docs || {};

  /* ---------- auth ---------- */
  NE.nonce = async () => {
    if (NE._nonce) return NE._nonce;
    if (window.elementorCommon?.config?.ajax?.nonce) return (NE._nonce = elementorCommon.config.ajax.nonce);
    const html = await (await fetch('/wp-admin/post.php?post=5476&action=elementor', { credentials: 'same-origin' })).text();
    const m = html.match(/"ajax":\{"url":"[^"]+","nonce":"([a-z0-9]+)"/);
    if (!m) throw new Error('elementor nonce not found');
    return (NE._nonce = m[1]);
  };
  NE.restNonce = async () =>
    NE._rn || (NE._rn = (await (await fetch('/wp-admin/admin-ajax.php?action=rest-nonce', { credentials: 'same-origin' })).text()).trim());

  /* ---------- elementor ajax ---------- */
  NE.ajax = async (action, data, postId) => {
    const fd = new FormData();
    fd.append('action', 'elementor_ajax');
    fd.append('_nonce', await NE.nonce());
    fd.append('editor_post_id', postId);
    fd.append('initial_document_id', postId);
    fd.append('actions', JSON.stringify({ [action]: { action, data } }));
    const r = await fetch('/wp-admin/admin-ajax.php', { method: 'POST', body: fd, credentials: 'same-origin' });
    const j = await r.json();
    if (!j.success) throw new Error(action + ' failed: ' + JSON.stringify(j).slice(0, 400));
    const resp = j.data.responses[action];
    if (!resp.success) throw new Error(action + ' error: ' + JSON.stringify(resp).slice(0, 400));
    return resp.data;
  };
  NE.getDoc = (id) => NE.ajax('get_document_config', { id }, id);
  NE.load = async (id, fresh) => (!fresh && NE.docs[id]) || (NE.docs[id] = await NE.getDoc(id));
  // Saves elements; `settings` (optional) replaces page settings, so merge with existing first.
  NE.save = (id, elements, settings, status = 'publish') => {
    const data = { status, elements };
    if (settings) data.settings = settings;
    return NE.ajax('save_builder', data, id);
  };

  /* ---------- REST ---------- */
  NE.rest = async (path, opts = {}) => {
    const r = await fetch('/wp-json' + path, {
      credentials: 'same-origin',
      ...opts,
      headers: { 'X-WP-Nonce': await NE.restNonce(), ...(opts.body && !(opts.body instanceof Blob) ? { 'Content-Type': 'application/json' } : {}), ...(opts.headers || {}) },
    });
    const t = await r.text();
    let j; try { j = JSON.parse(t); } catch (e) { j = t; }
    if (!r.ok) throw new Error(path + ' ' + r.status + ' ' + t.slice(0, 300));
    return j;
  };
  NE.upload = async (file, meta = {}) => {
    const m = await NE.rest('/wp/v2/media', {
      method: 'POST',
      headers: { 'Content-Disposition': `attachment; filename="${file.name}"`, 'Content-Type': file.type || 'image/jpeg' },
      body: file,
    });
    if (meta.alt || meta.title || meta.caption) {
      await NE.rest('/wp/v2/media/' + m.id, { method: 'POST', body: JSON.stringify({ alt_text: meta.alt || '', title: meta.title || '', caption: meta.caption || '' }) });
    }
    return { id: m.id, url: m.source_url, sizes: m.media_details?.sizes };
  };

  /* ---------- media map (persisted per-browser so re-runs never duplicate uploads) ---------- */
  NE.media = (() => { try { return JSON.parse(localStorage.getItem('NE_MEDIA') || '{}'); } catch (e) { return {}; } })();
  NE.saveMedia = () => localStorage.setItem('NE_MEDIA', JSON.stringify(NE.media));
  NE.M = (key) => { const m = NE.media[key]; if (!m) throw new Error('missing media ' + key); return m; };
  // Rebuild the map from docs/media-map.json (key -> {attachment_id, file, width, height, alt, title}).
  // Elementor resolves the served file from id + size, so `url` only needs to be the original.
  NE.loadMediaMap = (map) => {
    const base = location.origin + '/wp-content/uploads/2026/10/';
    for (const [k, v] of Object.entries(map)) {
      NE.media[k] = { id: v.attachment_id, url: base + v.file, large: base + v.file, alt: v.alt, caption: v.title, w: v.width, h: v.height };
    }
    NE.saveMedia();
    return Object.keys(NE.media).length;
  };
  // Upload every image in `files` whose key isn't in the map yet; meta = {filename: {key, alt, caption}}.
  NE.uploadBatch = async (files, meta, log = []) => {
    for (const f of files) {
      const info = meta[f.name];
      if (!info) continue;
      if (NE.media[info.key]) { log.push(info.key + ' skip'); continue; }
      const existing = await NE.rest('/wp/v2/media?search=' + encodeURIComponent(f.name.replace(/\.jpg$/, '')) + '&_fields=id,source_url,media_details,alt_text');
      let m;
      if (existing.length) {
        const e = existing[0];
        m = { id: e.id, url: e.source_url, sizes: e.media_details?.sizes };
      } else {
        m = await NE.upload(f, { alt: info.alt, title: info.caption, caption: '' });
      }
      const sz = m.sizes || {};
      NE.media[info.key] = {
        id: m.id, url: m.url, alt: info.alt, caption: info.caption,
        large: (sz.large || sz.full || {}).source_url || m.url,
        medium: (sz.medium_large || sz.large || {}).source_url || m.url,
        w: (sz.full || {}).width, h: (sz.full || {}).height,
      };
      NE.saveMedia();
      log.push(info.key + ' ' + m.id);
    }
    return log;
  };

  /* ---------- tree helpers ---------- */
  NE.uid = () => Math.random().toString(16).slice(2, 9).padEnd(7, '0');
  NE.walk = (els, fn, parent = null) => { for (const e of els || []) { fn(e, parent); NE.walk(e.elements, fn, e); } };
  NE.find = (els, pred) => { let f = null; NE.walk(els, (e) => { if (!f && pred(e)) f = e; }); return f; };
  NE.byId = (els, id) => NE.find(els, (e) => e.id === id);
  NE.clone = (el) => { const c = JSON.parse(JSON.stringify(el)); NE.walk([c], (e) => (e.id = NE.uid())); return c; };
  NE.strip = (o) => JSON.parse(JSON.stringify(o, (k, v) => (v === '' || (Array.isArray(v) && !v.length) ? undefined : v)));
  NE.lines = (els, d = 0, out = []) => {
    for (const e of els) {
      const s = e.settings || {};
      const txt = Object.keys(s)
        .filter((k) => /^(title|text|editor|title_text|description_text|stitle|html|link|image|vlink|_title)$/.test(k))
        .map((k) => { const v = s[k]; if (v && typeof v === 'object') return v.url ? k + '=' + v.url.split('/').pop().slice(0, 30) : ''; return v ? k + '=' + String(v).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60) : ''; })
        .filter(Boolean).join(' | ');
      out.push('  '.repeat(d) + (e.widgetType || e.elType) + '#' + e.id + (s._css_classes ? '.' + s._css_classes : '') + (s.background_image?.url ? ' BG' : '') + (txt ? ' :: ' + txt : ''));
      if (e.elements?.length) NE.lines(e.elements, d + 1, out);
    }
    return out;
  };

  /* ---------- builders ---------- */
  NE.img = (m) => (m ? { id: m.id, url: m.url, size: '', alt: m.alt || '', source: 'library' } : { id: '', url: '' });
  NE.esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  NE.p = (...paras) => paras.map((t) => `<p>${t}</p>`).join('\n');
  NE.ul = (items) => '<ul class="ne-list">' + items.map((t) => `<li>${t}</li>`).join('') + '</ul>';
})();
