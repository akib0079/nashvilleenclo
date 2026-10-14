/*
 * Nashville Enclosures — global templates (header, mobile header, footer) + navigation menus.
 * Needs NE.PAGES ids resolved (run after the new pages exist).
 */
(function () {
  const NE = window.NE, B = NE.B, U = B.URL;
  const TEL = B.TEL, MAIL = B.MAILTO;
  const copyDoc = async (id) => JSON.parse(JSON.stringify((await NE.load(id, true)).elements));
  const set = (els, id, s) => { const e = NE.byId(els, id); if (!e) throw new Error('missing ' + id); Object.assign(e.settings, s); return e; };

  NE.STICKY_HTML = null; // filled from sticky-header.html via the loader

  /* ---------- desktop header ---------- */
  NE.fixHeader = async () => {
    const els = await copyDoc(3971);
    if (!NE.STICKY_HTML) throw new Error('sticky html not loaded');
    set(els, 'cb8d2f7', { html: NE.STICKY_HTML });
    set(els, 'e92c188', B.social());
    const il = NE.byId(els, 'c09be38');
    il.settings.icon_list = il.settings.icon_list.map((it, i) => (i === 0 ? { ...it, text: 'Call: ' + B.PHONE, link: { url: TEL } } : { ...it, text: B.EMAIL, link: { url: MAIL } }));
    set(els, 'd9f347a', { text: 'Request Quote', link: { url: U.contact } });
    await NE.save(3971, els);
    return 'header ok';
  };

  /* ---------- mobile / tablet header: make sticky on tablet too ---------- */
  NE.fixMobileHeader = async () => {
    const els = await copyDoc(2888);
    set(els, '04a6a8c', { sticky: 'top', sticky_on: ['tablet', 'mobile'], sticky_offset: 0, sticky_effects_offset: 0,
      padding_tablet: { unit: 'px', top: '0', right: '10', bottom: '0', left: '20', isLinked: false } });
    await NE.save(2888, els);
    return 'mobile header ok';
  };

  /* ---------- footer ---------- */
  NE.fixFooter = async () => {
    const els = await copyDoc(1334);
    const about = '<p>Nashville Enclosures designs and builds premium outdoor structures and enclosure systems for residential and commercial properties throughout Tennessee — serving Davidson, Williamson, Maury, Hickman, Dickson, Cheatham, Montgomery, Robertson, Sumner, Macon, Trousdale, Smith, Wilson, Rutherford, Bedford and Marshall counties.</p>';
    set(els, 'ec0cbb0', { editor: about });
    set(els, '7594f36', { editor: about });
    set(els, '0b7f025', { editor: '<p>Copyright © [oceanthemes_date time_custom="Y"] Nashville Enclosures. All Rights Reserved.</p>' });
    set(els, '66580c5', B.social()); // desktop: centre column (hidden on tablet/phone)
    const contacts = NE.byId(els, 'eed8c7e');
    const [loc, mail, tel] = contacts.settings.icon_list;
    contacts.settings.icon_list = [
      { ...loc, text: 'Serving Nashville &amp; Middle Tennessee', link: { url: U.contact } },
      { ...mail, text: B.EMAIL, link: { url: MAIL } },
      { ...tel, text: B.PHONE, link: { url: TEL } },
    ];
    set(els, '3b3c5e7', { title: 'Our Systems' });
    const prods = NE.byId(els, '1b8925c');
    const proto = prods.settings.icon_list[0];
    prods.settings.icon_list = [
      ['Louvered Roofs', U.louvered], ['Solid Roof Systems', U.solid], ['Retractable Screens', U.screens], ['Cantilever Roof Systems', U.cantilever],
      ['3 &amp; 4 Season Rooms', U.seasons], ['Glass Enclosures', U.glass], ['Infrared Heating', U.heating],
      ['Screen Rooms', U.screenrooms], ['Architectural Metal', U.metal], ['Commercial Projects', U.commercial],
    ].map(([text, url]) => ({ ...proto, _id: NE.uid(), text, link: { url } }));
    // tablet: use the phone layout on top (logo + text) and Contacts | Systems side by side
    set(els, '171877e', { hide_tablet: '' });
    set(els, '9a73e59', { _inline_size_tablet: 100 });
    set(els, '272d1eb', { hide_tablet: 'hidden-tablet' });
    set(els, '41040ae', { hide_tablet: 'hidden-tablet' });
    set(els, '9dded2f', { hide_tablet: 'hidden-tablet' });
    set(els, '9d51a93', { _inline_size_tablet: 50 });
    set(els, '152061b', { _inline_size_tablet: 50 });
    // tablet/phone layout (171877e) had no social icons: copy the desktop ones under the about text
    const SOC_M = 'ne50c0m';
    const top = NE.byId(els, '9a73e59');
    top.elements = top.elements.filter((e) => e.id !== SOC_M);
    const socM = JSON.parse(JSON.stringify(NE.byId(els, '66580c5')));
    socM.id = SOC_M;
    Object.assign(socM.settings, { align: 'center', align_tablet: 'center', hide_desktop: 'hidden-desktop' });
    top.elements.push(socM);
    const logoLink = NE.byId(els, '3ebc271');
    if (logoLink) logoLink.settings.link = { url: '/' };
    await NE.save(1334, els);
    return 'footer ok';
  };

  /* ---------- side panel (off-canvas): swap demo gallery for project photos ---------- */
  NE.fixSidePanel = async () => {
    const els = await copyDoc(2831);
    const g = NE.byId(els, '8701e24');
    g.settings.wp_gallery = ['louvered-roofs-04', 'glide-glass-01', 'season-rooms-01', 'retractable-screens-05', 'architectural-metal-01', 'commercial-02'].map((k) => NE.M(NE.B.SWAP[k] && NE.media[NE.B.SWAP[k]] ? NE.B.SWAP[k] : k)).map((m) => ({ id: m.id, url: m.url }));
    NE.byId(els, 'bf2c7be').settings.social_icon_list = B.socialList();
    await NE.save(2831, els);
    return 'side panel ok';
  };

  /* ---------- logos: "Nashville Enclosures" wordmark (capital E, no period) ---------- */
  // Replaces every image setting that points at an old logo file, in all global templates.
  NE.OLD_LOGOS = /\/(logos\.png|Title-170-x-100-px-2[^/]*\.png|logo-footer\.svg|logo\.svg|logo-dark\.svg)$/;
  NE.fixLogos = async (light, dark, ids = [3971, 2888, 1334, 2831]) => {
    const log = [];
    for (const id of ids) {
      const els = await copyDoc(id);
      let n = 0;
      const fix = (o) => {
        if (!o || typeof o !== 'object') return;
        if (typeof o.url === 'string' && NE.OLD_LOGOS.test(o.url.split('?')[0])) {
          const white = /Title-170|logo-footer/.test(o.url);
          Object.assign(o, { url: (white ? dark : light).url, id: (white ? dark : light).id }); n++; return;
        }
        Object.values(o).forEach(fix);
      };
      NE.walk(els, (e) => fix(e.settings));
      if (n) await NE.save(id, els);
      log.push(id + ':' + n);
    }
    return log;
  };

  /* ---------- menus ---------- */
  NE.fixMenus = async () => {
    const P = NE.PAGES, log = [];
    const upd = async (id, body) => { await NE.rest('/wp/v2/menu-items/' + id, { method: 'POST', body: JSON.stringify(body) }); log.push('upd ' + id); };
    const add = async (menu, body) => {
      const ex = await NE.rest('/wp/v2/menu-items?per_page=100&menus=' + menu);
      const hit = ex.find((i) => i.object_id === body.object_id && i.type === (body.type || 'post_type'));
      if (hit) { await upd(hit.id, body); return hit.id; }
      const r = await NE.rest('/wp/v2/menu-items', { method: 'POST', body: JSON.stringify({ status: 'publish', type: 'post_type', object: 'page', menus: menu, ...body }) });
      log.push('add ' + r.id); return r.id;
    };
    const pid = (k) => P[k].id;

    /* Main Menu Website (52) */
    await upd(5539, { menu_order: 1, parent: 0, title: 'Home' });
    await upd(5538, { menu_order: 2, parent: 0, title: 'About' });
    await add(52, { title: 'Our Process', object_id: pid('process'), parent: 5538, menu_order: 3 });
    await upd(5535, { menu_order: 4, parent: 5538, title: 'Warranty &amp; Service' });
    await upd(5525, { menu_order: 5, parent: 0, title: 'Products' });
    const prodOrder = [[5533, 'Louvered Roofs', 'louvered'], [null, 'Solid Roof Systems', 'solid'], [5532, 'Retractable Screens', 'screens'], [5527, 'Cantilever Roof Systems', 'cantilever'], [5531, '3 &amp; 4 Season Rooms', 'seasons'], [5529, 'Sliding &amp; Motorized Glass', 'glass'], [5528, 'Infrared Heating', 'heating'], [5530, 'Screen Rooms', 'screenrooms'], [5526, 'Architectural Metal', 'metal']];
    let o = 6;
    for (const [id, title, key] of prodOrder) {
      const body = { title, parent: 5525, menu_order: o++, object_id: pid(key), object: 'page', type: 'post_type' };
      if (id) await upd(id, body); else await add(52, body);
    }
    // Commercial is its own top-level page now (the existing menu item is matched by page id and moved up)
    await add(52, { title: 'Commercial', object_id: pid('commercial'), parent: 0, menu_order: o++ });
    await upd(5537, { menu_order: o++, parent: 0, title: 'Projects' });
    // short label: with Commercial added, the full name no longer fits the desktop bar (page title stays "Videos & Resources")
    await upd(5536, { menu_order: o++, parent: 0, title: 'Resources' });
    await upd(5541, { menu_order: o++, parent: 5536, title: 'Blog' });
    await upd(5534, { menu_order: o++, parent: 0, title: 'Contact Us' });

    /* Mobile Menu (58) */
    await upd(5694, { menu_order: 1, parent: 0, title: 'Home' });
    await upd(5695, { menu_order: 2, parent: 0, title: 'About' });
    await add(58, { title: 'Our Process', object_id: pid('process'), parent: 5695, menu_order: 3 });
    await upd(5710, { menu_order: 4, parent: 5695, title: 'Warranty &amp; Service' });
    await upd(5699, { menu_order: 5, parent: 0, title: 'Products' });
    const mob = [[5704, 'louvered'], [null, 'solid'], [5707, 'screens'], [5701, 'cantilever'], [5700, 'seasons'], [5705, 'glass'], [5703, 'heating'], [5706, 'screenrooms'], [5702, 'metal']];
    o = 6;
    for (const [id, key] of mob) {
      const title = prodOrder.find((x) => x[2] === key)[1];
      const body = { title, parent: 5699, menu_order: o++, object_id: pid(key), object: 'page', type: 'post_type' };
      if (id) await upd(id, body); else await add(58, body);
    }
    await add(58, { title: 'Commercial', object_id: pid('commercial'), parent: 0, menu_order: o++ });
    await upd(5708, { menu_order: o++, parent: 0, title: 'Projects' });
    await upd(5709, { menu_order: o++, parent: 0, title: 'Videos &amp; Resources' });
    await upd(5696, { menu_order: o++, parent: 5709, title: 'Blog', object_id: 136 });
    await upd(5697, { menu_order: o++, parent: 0, title: 'Contact Us' });
    await upd(5711, { menu_order: o++, parent: 0, title: 'Call: ' + B.PHONE, url: TEL });
    await upd(5712, { menu_order: o++, parent: 0, title: B.EMAIL, url: MAIL });
    return log;
  };
})();
