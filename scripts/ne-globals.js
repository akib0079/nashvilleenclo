/*
 * Nashville Enclosures — global templates (header, mobile header, footer) + navigation menus.
 * Needs NE.PAGES ids resolved (run after the new pages exist).
 */
(function () {
  const NE = window.NE, B = NE.B, U = B.URL;
  const TEL = 'tel:+16303031666', MAIL = 'mailto:brian@nashvilleenclosures.com';
  const HIDE = { hide_desktop: 'hidden-desktop', hide_tablet: 'hidden-tablet', hide_mobile: 'hidden-mobile' };
  const copyDoc = async (id) => JSON.parse(JSON.stringify((await NE.load(id, true)).elements));
  const set = (els, id, s) => { const e = NE.byId(els, id); if (!e) throw new Error('missing ' + id); Object.assign(e.settings, s); return e; };

  NE.STICKY_HTML = null; // filled from sticky-header.html via the loader

  /* ---------- desktop header ---------- */
  NE.fixHeader = async () => {
    const els = await copyDoc(3971);
    if (!NE.STICKY_HTML) throw new Error('sticky html not loaded');
    set(els, 'cb8d2f7', { html: NE.STICKY_HTML });
    set(els, 'e92c188', HIDE); // social icons have no profile URLs yet
    const il = NE.byId(els, 'c09be38');
    il.settings.icon_list = il.settings.icon_list.map((it, i) => (i === 0 ? { ...it, text: 'Call: (630) 303-1666', link: { url: TEL } } : { ...it, link: { url: MAIL } }));
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
    set(els, '66580c5', HIDE);
    const contacts = NE.byId(els, 'eed8c7e');
    const [loc, mail, tel] = contacts.settings.icon_list;
    contacts.settings.icon_list = [
      { ...loc, text: 'Serving Nashville &amp; Middle Tennessee', link: { url: U.contact } },
      { ...mail, text: 'brian@nashvilleenclosures.com', link: { url: MAIL } },
      { ...tel, text: '(630) 303-1666', link: { url: TEL } },
    ];
    set(els, '3b3c5e7', { title: 'Our Systems' });
    const prods = NE.byId(els, '1b8925c');
    const proto = prods.settings.icon_list[0];
    prods.settings.icon_list = [
      ['Louvered Roofs', U.louvered], ['Retractable Screens', U.screens], ['Cantilever Roof Systems', U.cantilever],
      ['3 &amp; 4 Season Rooms', U.seasons], ['Glass Enclosures', U.glass], ['Infrared Heating', U.heating],
      ['Screen Rooms', U.screenrooms], ['Architectural Metal', U.metal], ['Commercial Outdoor Spaces', U.commercial],
    ].map(([text, url]) => ({ ...proto, _id: NE.uid(), text, link: { url } }));
    // tablet: use the phone layout on top (logo + text) and Contacts | Systems side by side
    set(els, '171877e', { hide_tablet: '' });
    set(els, '9a73e59', { _inline_size_tablet: 100 });
    set(els, '272d1eb', { hide_tablet: 'hidden-tablet' });
    set(els, '41040ae', { hide_tablet: 'hidden-tablet' });
    set(els, '9dded2f', { hide_tablet: 'hidden-tablet' });
    set(els, '9d51a93', { _inline_size_tablet: 50 });
    set(els, '152061b', { _inline_size_tablet: 50 });
    const logoLink = NE.byId(els, '3ebc271');
    if (logoLink) logoLink.settings.link = { url: '/' };
    await NE.save(1334, els);
    return 'footer ok';
  };

  /* ---------- side panel (off-canvas): swap demo gallery for project photos ---------- */
  NE.fixSidePanel = async () => {
    const els = await copyDoc(2831);
    const g = NE.byId(els, '8701e24');
    g.settings.wp_gallery = ['louvered-roofs-04', 'glide-glass-01', 'season-rooms-01', 'retractable-screens-05', 'architectural-metal-01', 'commercial-02'].map((k) => ({ id: NE.M(k).id, url: NE.M(k).url }));
    await NE.save(2831, els);
    return 'side panel ok';
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
    const prodOrder = [[5533, 'Louvered Roofs', 'louvered'], [5532, 'Retractable Screens', 'screens'], [5527, 'Cantilever Roof Systems', 'cantilever'], [5531, '3 &amp; 4 Season Rooms', 'seasons'], [5529, 'Sliding &amp; Motorized Glass', 'glass'], [5528, 'Infrared Heating', 'heating'], [5530, 'Screen Rooms', 'screenrooms'], [5526, 'Architectural Metal', 'metal'], [null, 'Commercial Outdoor Spaces', 'commercial']];
    let o = 6;
    for (const [id, title, key] of prodOrder) {
      const body = { title, parent: 5525, menu_order: o++, object_id: pid(key), object: 'page', type: 'post_type' };
      if (id) await upd(id, body); else await add(52, body);
    }
    await upd(5537, { menu_order: o++, parent: 0, title: 'Projects' });
    await upd(5536, { menu_order: o++, parent: 0, title: 'Videos &amp; Resources' });
    await upd(5541, { menu_order: o++, parent: 5536, title: 'Blog' });
    await upd(5534, { menu_order: o++, parent: 0, title: 'Contact Us' });

    /* Mobile Menu (58) */
    await upd(5694, { menu_order: 1, parent: 0, title: 'Home' });
    await upd(5695, { menu_order: 2, parent: 0, title: 'About' });
    await add(58, { title: 'Our Process', object_id: pid('process'), parent: 5695, menu_order: 3 });
    await upd(5710, { menu_order: 4, parent: 5695, title: 'Warranty &amp; Service' });
    await upd(5699, { menu_order: 5, parent: 0, title: 'Products' });
    const mob = [[5704, 'louvered'], [5707, 'screens'], [5701, 'cantilever'], [5700, 'seasons'], [5705, 'glass'], [5703, 'heating'], [5706, 'screenrooms'], [5702, 'metal'], [null, 'commercial']];
    o = 6;
    for (const [id, key] of mob) {
      const title = prodOrder.find((x) => x[2] === key)[1];
      const body = { title, parent: 5699, menu_order: o++, object_id: pid(key), object: 'page', type: 'post_type' };
      if (id) await upd(id, body); else await add(58, body);
    }
    await upd(5708, { menu_order: o++, parent: 0, title: 'Projects' });
    await upd(5709, { menu_order: o++, parent: 0, title: 'Videos &amp; Resources' });
    await upd(5696, { menu_order: o++, parent: 5709, title: 'Blog', object_id: 136 });
    await upd(5697, { menu_order: o++, parent: 0, title: 'Contact Us' });
    await upd(5711, { menu_order: o++, parent: 0, title: 'Call: (630) 303-1666', url: TEL });
    await upd(5712, { menu_order: o++, parent: 0, title: 'brian@nashvilleenclosures.com', url: MAIL });
    return log;
  };
})();
