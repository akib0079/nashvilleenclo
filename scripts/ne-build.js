/*
 * Nashville Enclosures — page builders.
 * Every section is cloned from an existing, already-styled prototype element
 * (so typography, colours, radii and animations stay identical to the design)
 * and then filled with the client copy + new photography.
 * Requires ne-lib.js (NE.*) and prototype docs loaded via NE.loadProtos().
 */
(function () {
  const NE = window.NE;
  const B = (NE.B = {});

  /* ---------- prototype docs ---------- */
  const H = 5476, LR = 5513, W = 5523, AB = 5511;
  NE.loadProtos = async () => { for (const id of [H, LR, W, AB]) await NE.load(id); return 'ok'; };
  const P = (doc, id) => { const e = NE.byId(NE.docs[doc].elements, id); if (!e) throw new Error('proto ' + doc + '#' + id); return e; };
  const CL = (doc, id) => NE.clone(P(doc, id));
  const kid = (el, i) => el.elements[i];
  const S = (el, s) => (Object.assign(el.settings, s), el);

  /* ---------- constants ---------- */
  const PHONE = '(630) 303-1666', TEL = 'tel:+16303031666';
  B.URL = {
    home: '/', about: '/about/', process: '/about/our-process/', products: '/products/', projects: '/projects/',
    videos: '/videos-resources/', warranty: '/warranty-service/', contact: '/contact-us/', blog: '/blog/',
    louvered: '/products/louvered-roofs/', screens: '/products/retractable-screens/', cantilever: '/products/cantilever-roof-systems/',
    seasons: '/products/3-4-season-rooms/', glass: '/products/glass-enclosures/', heating: '/products/infrared-heating/',
    screenrooms: '/products/screen-rooms/', metal: '/products/architectural-metal/', commercial: '/products/commercial-outdoor-spaces/',
  };
  const U = B.URL;

  /* ---------- media helpers ---------- */
  const M = (k) => NE.M(k);
  const imgVal = (k, size = 'url') => { const m = M(k); return { id: m.id, url: m[size] || m.url, alt: m.alt, source: 'library', size: '' }; };
  const bgVal = (k, size = 'url') => { const m = M(k); return { id: m.id, url: m[size] || m.url, source: 'library' }; };
  B.range = (cat, n, skip = []) => Array.from({ length: n }, (_, i) => cat + '-' + String(i + 1).padStart(2, '0')).filter((k) => !skip.includes(k) && NE.media[k]);

  /* ---------- widgets ---------- */
  B.sub = (text, o = {}) => { const e = CL(H, '858fcfd'); S(e, { sub: text }); if (o.center) S(e, { text_align: 'center' }); if (o.light) S(e, { stitle_color: '#E0E0E0' }); return e; };
  B.h2 = (html, o = {}) => {
    const e = CL(H, '364169d'); S(e, { title: html, header_size: o.tag || 'h2' });
    delete e.settings.text_shadow_text_shadow;
    if (o.center) S(e, { align: 'center' });
    if (o.size) S(e, { typography_font_size: { unit: 'px', size: o.size }, typography_line_height: { unit: 'em', size: 1.3 } });
    return e;
  };
  B.text = (html, o = {}) => {
    const e = CL(LR, '45f7636'); S(e, { editor: html, _element_width: '', _element_custom_width: { unit: 'px', size: '' } });
    if (o.center) S(e, { align: 'center' });
    if (o.color) S(e, { text_color: o.color });
    if (o.cls) S(e, { _css_classes: o.cls });
    return e;
  };
  B.btn = (text, url) => S(CL(H, '6457823'), { text, link: { url, is_external: '', nofollow: '' }, btn_width: { unit: '%', size: '' } });
  B.callBtn = () => S(CL(LR, '9bfd753'), { text: 'Call: ' + PHONE, link: { url: TEL } });
  // primary CTA + call link on one row
  B.ctaRow = (text, url, withCall = true) => {
    const row = CL(LR, 'c0e69c8');
    const [b, c] = row.elements;
    S(b, { text, link: { url }, btn_width: { unit: '%', size: '' } });
    row.elements = withCall ? [b, S(c, { text: 'Call: ' + PHONE, link: { url: TEL } })] : [b];
    S(row, { flex_wrap: 'wrap', flex_gap: { unit: 'px', size: 20, column: '20', row: '12', isLinked: false } });
    return row;
  };
  B.image = (k, o = {}) => {
    const e = CL(H, '5c09e8b');
    S(e, { image: imgVal(k), image_size: o.size || 'large', _element_custom_width: { unit: '%', size: o.width || 100 }, height: { unit: 'px', size: o.height || 480 }, height_mobile: { unit: 'px', size: o.hm || 260 }, _element_custom_width_mobile: { unit: '%', size: 100 } });
    if (o.link) S(e, { link_to: 'file', open_lightbox: 'yes' });
    return e;
  };
  B.html = (html) => ({ id: NE.uid(), elType: 'widget', widgetType: 'html', settings: { html }, elements: [] });
  B.list = (items, cls = 'ne-check') => `<ul class="${cls}">` + items.map((t) => `<li>${t}</li>`).join('') + '</ul>';
  B.ps = (...p) => p.map((t) => `<p>${t}</p>`).join('');
  B.container = (settings, elements, inner = true) => ({ id: NE.uid(), elType: 'container', isInner: inner, settings: Object.assign({ content_width: 'full', flex_gap: { unit: 'px', size: 0, column: '0', row: '0' }, padding: { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: true } }, settings), elements });
  B.grid = (cols, items, o = {}) => {
    const n = items.length, gap = String(o.gap ?? 20);
    return B.container({
      container_type: 'grid',
      grid_columns_grid: { unit: 'fr', size: cols }, grid_columns_grid_tablet: { unit: 'fr', size: o.tablet || Math.min(2, cols) }, grid_columns_grid_mobile: { unit: 'fr', size: 1 },
      grid_rows_grid: { unit: 'fr', size: Math.ceil(n / cols) }, grid_rows_grid_tablet: { unit: 'fr', size: Math.ceil(n / (o.tablet || Math.min(2, cols))) }, grid_rows_grid_mobile: { unit: 'fr', size: n },
      grid_gaps: { unit: 'px', size: +gap, column: gap, row: gap, isLinked: true },
      grid_auto_flow: 'row', _title: o.title || 'grid', css_classes: o.cls || '',
    }, items);
  };

  /* ---------- sections ---------- */

  // Inner-page / product hero (cloned from the product banner)
  B.hero = ({ pill, kicker, title, text, bg, buttons = [], h = 62, pos = 'center center' }) => {
    const s = CL(LR, '3e3b505');
    S(s, { background_image: bgVal(bg), background_position: pos, min_height: { unit: 'vh', size: h }, background_slideshow_gallery: [] });
    const inner = kid(s, 0), heads = kid(inner, 0), lower = kid(inner, 1);
    const [p, k, t] = heads.elements;
    S(p, { title: pill, header_size: 'div' });
    if (kicker) S(k, { title: kicker, header_size: 'p' }); else heads.elements = [p, t];
    S(t, { title, header_size: 'h1' });
    const col = kid(lower, 0), [tx, row] = col.elements;
    S(tx, { editor: `<p>${text}</p>` });
    S(row, { hide_tablet: '', hide_mobile: '', flex_wrap: 'wrap', flex_gap: { unit: 'px', size: 12, column: '12', row: '12', isLinked: true } });
    const proto = row.elements[0];
    row.elements = buttons.map((b, i) => {
      if (i === 0) return S(NE.clone(proto), { text: b.text, link: { url: b.url } });
      return S(CL(H, '2dd64e4'), { text: b.text, link: { url: b.url } });
    });
    if (!buttons.length) col.elements = [tx];
    return s;
  };

  // Home hero (cloned from home banner)
  B.homeHero = ({ pill, line1, line2, text, bg, buttons }) => {
    const s = CL(H, 'f5c2610');
    S(s, { background_image: bgVal(bg) });
    const heads = kid(kid(s, 0), 0), lower = kid(kid(s, 0), 1);
    const [p, l1, l2] = heads.elements;
    S(p, { title: pill, header_size: 'div' });
    S(l1, { title: line1, header_size: 'h1' });
    S(l2, { title: line2, header_size: 'div' });
    const col = kid(lower, 0), [tx, row] = col.elements;
    S(tx, { editor: `<p>${text}</p>` });
    const [b1, b2] = row.elements;
    S(b1, { text: buttons[0].text, link: { url: buttons[0].url } });
    S(b2, { text: buttons[1].text, link: { url: buttons[1].url } });
    return s;
  };

  // Text + photo(s) split section (cloned from the home "about" block)
  B.split = ({ sub, title, html, after = [], images = [], reverse = false, cta, bg, features, id }) => {
    const s = CL(H, '86db9aa');
    if (bg) S(s, { background_color: bg });
    if (id) S(s, { _element_id: id });
    S(s, { padding: { unit: 'px', top: '100', right: '20', bottom: '100', left: '20', isLinked: false }, padding_mobile: { unit: 'px', top: '60', right: '15', bottom: '60', left: '15', isLinked: false } });
    const [imgCol, txtCol] = s.elements;
    const [big, small] = imgCol.elements;
    S(big, { image: imgVal(images[0]), image_size: 'large' });
    if (images[1]) { S(small, { image: imgVal(images[1]), image_size: 'large' }); }
    else { imgCol.elements = [S(big, { _element_custom_width: { unit: '%', size: 100 }, height: { unit: 'px', size: 520 }, height_mobile: { unit: 'px', size: 280 } })]; S(imgCol, { flex_justify_content: 'center' }); }
    const [ih, hd, tx, dv, feat, bt] = txtCol.elements;
    S(ih, { sub }); S(hd, { title, header_size: 'h2' }); delete hd.settings.text_shadow_text_shadow;
    S(tx, { editor: html, _element_width: '', _element_custom_width: { unit: 'px', size: '' } });
    const kids = [ih, hd, tx, ...after];
    if (features) {
      // two icon+label features (reuse the existing feature row)
      const f = NE.clone(feat);
      const pairs = [kid(kid(f, 0), 0), kid(kid(f, 0), 1)];
      features.forEach((ft, i) => { const grp = pairs[i]; const txts = kid(grp, 1).elements; S(txts[0], { title: ft[0] }); S(txts[1], { title: ft[1] }); });
      kids.push(dv, f);
    }
    if (cta) kids.push(Array.isArray(cta) ? B.ctaRow(cta[0], cta[1], cta[2] !== false) : S(bt, { text: cta.text, link: { url: cta.url } }));
    txtCol.elements = kids;
    S(txtCol, { flex_gap: { unit: 'px', size: 18, column: '18', row: '18', isLinked: true } });
    if (reverse) s.elements = [txtCol, imgCol];
    return s;
  };

  // Centered intro block (title + copy, optional extra widgets)
  B.intro = ({ sub, title, html, after = [], bg = '#FFFFFF', id, narrow = 860 }) => {
    const col = B.container({ boxed_width: { unit: 'px', size: narrow }, content_width: 'boxed', flex_direction: 'column', flex_align_items: 'center', flex_gap: { unit: 'px', size: 18, column: '18', row: '18', isLinked: true } },
      [B.sub(sub, { center: true }), B.h2(title, { center: true }), B.text(html, { center: true }), ...after]);
    return B.container({ content_width: 'boxed', boxed_width: { unit: 'px', size: 1200 }, flex_direction: 'column', flex_align_items: 'center', background_background: 'classic', background_color: bg, padding: { unit: 'px', top: '100', right: '20', bottom: '90', left: '20', isLinked: false }, padding_mobile: { unit: 'px', top: '60', right: '15', bottom: '50', left: '15', isLinked: false }, _element_id: id || '' }, [col], false);
  };

  // Dark rounded band with icon cards (cloned from home "benefits")
  B.dark = ({ pill, title, html, cards, cols = 4, id, footer, texture }) => {
    const s = CL(H, '94d8e6c');
    if (id) S(s, { _element_id: id });
    const box = kid(s, 0), inner = kid(box, 0);
    S(box, { background_overlay_image: bgVal(texture || 'louvered-roofs-16'), background_overlay_opacity: { unit: 'px', size: 0.07 } });
    const [pl, tt, tx, row] = inner.elements;
    S(pl, { title: pill, header_size: 'div' }); S(tt, { title, header_size: 'h2' });
    S(tx, { editor: html || '', _element_custom_width: { unit: 'px', size: 760 } });
    const cardProto = kid(row, 0);
    const items = cards.map((c) => {
      const wrap = NE.clone(cardProto);
      const ib = CL(W, '26ffe74');
      S(ib, { title_text: c.title, description_text: c.text, selected_icon: { value: c.icon || 'fas fa-check', library: 'fa-solid' }, title_size: 'h3' });
      if (c.url) S(ib, { link: { url: c.url } });
      wrap.elements = [ib];
      return wrap;
    });
    const grid = B.grid(cols, items, { gap: 20, tablet: 2, title: 'cards' });
    inner.elements = [pl, tt, ...(html ? [tx] : []), grid, ...(footer || [])];
    return s;
  };

  // Photo cards grid with optional header row (cloned from home "products")
  B.card = ({ label, title, text, url, img, minH = 320 }) => {
    const c = CL(H, 'a7d8c32');
    S(c, { link: { url }, background_image: bgVal(img, 'large'), min_height: { unit: 'px', size: minH }, min_height_mobile: { unit: 'px', size: 260 }, width: { unit: '%', size: 100 }, css_classes: 'featured-zoom-section ne-card' });
    const wrapRow = kid(c, 0), txt = kid(wrapRow, 0);
    const [pill, ttl] = txt.elements;
    S(pill, { title: label, header_size: 'div' }); S(ttl, { title, header_size: 'h3' });
    if (text) {
      const d = CL(H, '9399458');
      S(d, { editor: `<p>${text}</p>` });
      txt.elements.push(d);
    }
    return c;
  };
  B.cards = ({ sub, title, button, items, cols = 3, minH, bg, id, intro }) => {
    const s = CL(H, 'aa4f9cc');
    if (bg) S(s, { background_color: bg });
    if (id) S(s, { _element_id: id });
    const head = kid(s, 0);
    const [left, right] = head.elements;
    const [ih, hd] = left.elements;
    S(ih, { sub }); S(hd, { title, header_size: 'h2' });
    if (intro) left.elements.push(B.text(intro));
    if (button) S(kid(right, 0), { text: button.text, link: { url: button.url } }); else head.elements = [left];
    if (!button) S(left, { width: { unit: '%', size: 100 } });
    s.elements = [head, B.grid(cols, items.map((it) => B.card({ ...it, minH: minH || it.minH })), { gap: 16, tablet: 2, title: 'cards' })];
    return s;
  };

  // Gallery block (cloned from home "Explore Projects")
  B.gallery = ({ sub, title, button, images, cols = 3, bg, id }) => {
    const s = CL(H, '1aebfab');
    if (bg) S(s, { background_color: bg });
    if (id) S(s, { _element_id: id });
    const head = kid(s, 0), gal = kid(s, 1);
    const [left, right] = head.elements;
    S(left.elements[0], { sub }); S(left.elements[1], { title, header_size: 'h2' });
    if (button) S(kid(right, 0), { text: button.text, link: { url: button.url } }); else head.elements = [left];
    S(gal, { image_gallery: images.map((k) => ({ id: M(k).id, url: M(k).url })), gallery_columns: String(cols), gallery_columns_tablet: '2', gallery_columns_mobile: '1', thumbnail_size: 'medium_large' });
    return s;
  };

  // Filterable gallery (Elementor Pro gallery widget, multiple galleries)
  B.filterGallery = (groups) => ({
    id: NE.uid(), elType: 'widget', widgetType: 'gallery',
    settings: {
      gallery_type: 'multiple',
      galleries: groups.map((g) => ({ _id: NE.uid(), gallery_title: g.title, multiple_gallery: g.images.map((k) => ({ id: M(k).id, url: M(k).url })) })),
      show_all_galleries: 'yes', show_all_galleries_label: 'All Projects',
      gallery_layout: 'justified', ideal_row_height: { unit: 'px', size: 230 }, ideal_row_height_tablet: { unit: 'px', size: 170 }, ideal_row_height_mobile: { unit: 'px', size: 120 },
      gap: { unit: 'px', size: 10 }, gap_mobile: { unit: 'px', size: 6 },
      thumbnail_image_size: 'medium_large', link_to: 'file', open_lightbox: 'yes', lazyload: 'yes',
      overlay_background: 'yes', overlay_title: 'caption', image_hover_animation: 'grow',
      image_border_radius: { unit: 'px', top: '10', right: '10', bottom: '10', left: '10', isLinked: true },
      background_overlay_color: 'rgba(26,26,26,0.45)',
      galleries_titles_space_between: { unit: 'px', size: 8 }, galleries_titles_gap: { unit: 'px', size: 32 },
      galleries_title_color_normal: '#3D3D3D', galleries_title_color_hover: '#CAA566', galleries_title_color_active: '#CAA566',
      galleries_titles_typography_typography: 'custom', galleries_titles_typography_font_family: 'Poppins', galleries_titles_typography_font_size: { unit: 'px', size: 14 }, galleries_titles_typography_font_weight: '500', galleries_titles_typography_text_transform: 'uppercase',
      _css_classes: 'ne-filter-gallery',
    },
    elements: [],
  });

  // Big dark CTA card with photo background (cloned from home video-library band)
  B.cta = ({ sub, title, html, bg, buttons = [], id, href }) => {
    const s = CL(H, '974690f');
    if (id) S(s, { _element_id: id });
    const card = kid(s, 0);
    // same technique as the original design: black card + photo as a low-opacity overlay layer
    // a card with buttons must not itself be a link (nested <a> tags break the DOM)
    if (buttons.length) href = '';
    S(card, { html_tag: href ? 'a' : 'div', link: { url: href || '' }, background_background: 'classic', background_color: '#000000', background_image: { url: '', id: '' },
      background_overlay_background: 'classic', background_overlay_image: bg ? bgVal(bg) : { url: '', id: '' }, background_overlay_color: '#FFFFFF00',
      background_overlay_position: 'center center', background_overlay_size: 'cover', background_overlay_repeat: 'no-repeat', background_overlay_opacity: { unit: 'px', size: 0.42 } });
    const col = kid(kid(card, 0), 0);
    const [ic, ih, hd, tx] = col.elements;
    S(ih, { sub, text_align: 'center' }); S(hd, { title, header_size: 'h2', align: 'center' }); S(tx, { editor: html || '' });
    const els = [ih, hd];
    if (html) els.push(tx);
    if (buttons.length) {
      const row = B.container({ flex_direction: 'row', flex_justify_content: 'center', flex_wrap: 'wrap', flex_gap: { unit: 'px', size: 12, column: '12', row: '12', isLinked: true }, margin: { unit: 'px', top: '14', right: '0', bottom: '0', left: '0', isLinked: false } },
        buttons.map((b, i) => (i === 0 ? B.btn(b.text, b.url) : S(CL(H, '2dd64e4'), { text: b.text, link: { url: b.url } }))));
      els.push(row);
    }
    col.elements = els;
    return s;
  };

  // Accordion (theme widget) for FAQs
  B.faq = ({ sub, title, items, image, id }) => {
    const s = CL(LR, 'a49abb3');
    if (id) S(s, { _element_id: id });
    const [imgSide, txtSide] = s.elements;
    S(kid(kid(imgSide, 0), 0), { image: imgVal(image), image_size: 'large' });
    const [ih, hd, acc] = txtSide.elements;
    S(ih, { sub }); S(hd, { title, header_size: 'h2' });
    S(acc, { ot_accs: items.map((it, i) => ({ _id: NE.uid(), acc_title: `<div class="hello"><span>${String(i + 1).padStart(2, '0')}. </span>${it[0]}</div>`, acc_content: `<p>${it[1]}</p>` })) });
    return s;
  };

  // Shared helper-CSS widget that every page carries (dark-card + highlight styles)
  B.effect = () => CL(H, 'd32d0eb');

  B.processCards = (dark = true) => [
    { title: '01. Consult', text: 'We listen before we design — understanding how you want to use the space before recommending a product.', icon: 'fas fa-comments', url: U.process },
    { title: '02. Design', text: 'See the space before we build it, with layouts, models and realistic renderings for appropriate projects.', icon: 'fas fa-drafting-compass', url: U.process },
    { title: '03. Build', text: 'Professional construction and efficient installation, with attention to the details that determine performance.', icon: 'fas fa-hard-hat', url: U.process },
    { title: '04. Enjoy', text: 'A full walkthrough, product education and ongoing support. If you need us later, we’re still here.', icon: 'fas fa-couch', url: U.process },
  ];
})();
