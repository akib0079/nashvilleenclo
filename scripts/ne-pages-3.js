/*
 * Nashville Enclosures — Warranty & Service and Contact pages.
 * These keep their existing Elementor Pro forms (same widget, same email routing)
 * and only replace copy, field options and surrounding sections.
 */
(function () {
  const NE = window.NE, B = NE.B, U = B.URL;
  const ps = B.ps;
  const hl = (t) => `<span class="highlight">${t}</span>`;
  const TEL = 'tel:+16303031666';
  const HIDE = { hide_desktop: 'hidden-desktop', hide_tablet: 'hidden-tablet', hide_mobile: 'hidden-mobile' };
  const PRODUCT_OPTIONS = ['Motorized Louvered Roof', 'Retractable Screens', 'Cantilever Roof System', '3 & 4 Season Room', 'Sliding / Motorized Glass Enclosure', 'Infrared Heating', 'Screen Room', 'Architectural Metal', 'Commercial Outdoor Space', 'Multiple Systems / Not Sure Yet'];
  // deep copy keeping original ids so we can address prototype children, re-id at the end
  const copy = (doc, id) => JSON.parse(JSON.stringify(NE.byId(NE.docs[doc].elements, id)));
  const reid = (el) => (NE.walk([el], (e) => (e.id = NE.uid())), el);
  const set = (root, id, s) => Object.assign(NE.byId([root], id).settings, s);

  Object.assign(NE.PAGES, {
    /* =========================== WARRANTY & SERVICE =========================== */
    warranty: {
      id: 5523, title: 'Warranty & Service', slug: 'warranty-service',
      build: () => {
        const svc = copy(5523, '2aedb0c');
        const inner = NE.byId([svc], '56dbda4');
        const formBox = NE.byId([svc], '1f1ac9d');
        inner.elements = [formBox];
        set(svc, '2aedb0c', { _element_id: 'service-request', padding: { unit: 'px', top: '90', right: '20', bottom: '90', left: '20', isLinked: false }, background_color: '#F9F9F9' });
        set(svc, 'b7354eb', { sub: 'Need Service?' });
        set(svc, '35d8452', { title: 'Submit a Service Request', header_size: 'h2' });
        set(svc, 'bf5365c', { editor: ps('Submit a service request with your contact information, project address, product type, description of the issue and photographs when applicable.', 'Our team will review the information and determine the appropriate next step.') });
        const form = NE.byId([svc], '47b3f27');
        form.settings.form_fields = form.settings.form_fields.map((f) => {
          if (f.custom_id === 'field_e9d8fad') return { ...f, field_label: 'Product Type', field_options: ['Select product type|', ...PRODUCT_OPTIONS.slice(0, 9), 'Other'].join('\n'), required: 'true' };
          if (f.custom_id === 'message') return { ...f, field_label: 'Description of the Issue', required: 'true' };
          if (f.custom_id === 'address') return { ...f, field_label: 'Project Address' };
          if (f.custom_id === 'image') return { ...f, field_label: 'Photos (optional)', required: '', field_options: '', allow_multiple_upload: 'yes', file_types: 'jpg,jpeg,png,heic,webp,pdf' };
          return f;
        });
        Object.assign(form.settings, { form_name: 'Service Request', email_subject: 'New Service Request — Nashville Enclosures website', success_message: 'Thank you — your service request has been received. Our team will review it and contact you about the next step.', button_text: 'Submit Service Request' });
        reid(svc);
        return [
          B.hero({ pill: 'Warranty &amp; Service', kicker: 'We Stand Behind Our Word and Our Work.', title: 'We Stand Behind What We Build', text: 'Warranty support, product education and ongoing service for the outdoor structures and enclosure systems we install.', bg: 'retractable-screens-14', buttons: [{ text: 'Submit a Service Request', url: '#service-request' }, { text: 'Call (630) 303-1666', url: TEL }], h: 58 }),
          B.split({
            sub: 'Warranty &amp; Service', title: `Quality Construction Should Be ${hl('Supported After Installation')}`,
            html: ps('Quality construction should be supported after installation.',
              'Nashville Enclosures provides warranty and service support for the outdoor structures and enclosure systems we install.',
              'Individual manufacturer warranties vary by product and component, and applicable warranty information is provided as part of the project closeout process.',
              '<strong>More importantly, we want our clients to know who to call.</strong>',
              'If you have a question about your system, need an adjustment, require service or simply need help understanding how something operates, Nashville Enclosures remains your point of contact.'),
            images: ['glide-glass-15', 'louvered-roofs-17'],
            cta: ['Submit a Service Request', '#service-request'],
          }),
          B.dark({
            pill: 'Long-Term Support', title: 'Your Outdoor Living Contractor for the Long Term',
            html: ps('Our goal is to be your outdoor living contractor for the long term — not simply for the duration of construction. As long as you own your home, we want you to feel comfortable contacting us about the systems we’ve installed.',
              'That does not mean every future repair or service is covered indefinitely under warranty. It means we intend to remain available as a resource to help maintain, service and support your outdoor space for years to come.'),
            cols: 3,
            cards: [
              { title: 'Manufacturer Warranties', text: 'Warranties vary by product and component. Applicable warranty information is provided as part of your project closeout.', icon: 'fas fa-file-signature' },
              { title: 'Project Closeout &amp; Education', text: 'We walk through the finished space and explain how to operate and care for every system we installed.', icon: 'fas fa-chalkboard-teacher' },
              { title: 'Service &amp; Adjustments', text: 'Questions, adjustments or service needs — Nashville Enclosures remains your point of contact.', icon: 'fas fa-tools' },
            ],
          }),
          svc,
          B.effect(),
        ];
      },
    },

    /* =========================== CONTACT =========================== */
    contact: {
      id: 5524, title: 'Contact Us', slug: 'contact-us',
      build: () => {
        const main = copy(5524, 'b3cfc95');
        const map = copy(5524, '1a7b17c');
        set(main, 'b3cfc95', { _element_id: 'contact', padding: { unit: 'px', top: '90', right: '20', bottom: '90', left: '20', isLinked: false }, padding_mobile: { unit: 'px', top: '50', right: '15', bottom: '50', left: '15', isLinked: false } });
        set(main, '5907104', { sub: 'Contact Nashville Enclosures', title: 'Tell Us About Your Project' });
        set(main, '1283b94', { editor: ps('Whether you already know exactly what you want or you’re still trying to determine the right solution, the process starts with a conversation.',
          'Tell us about your property, how you want to use the space and what you’re hoping to accomplish.',
          'We’ll help you determine the products and design approach that make the most sense for your project.')
          + '<p class="ne-card-note"><strong>Nashville Enclosures</strong><br>Custom Outdoor Structures &amp; Enclosures<br>Residential | Commercial | Hospitality<br>Serving Nashville and Middle Tennessee</p>' });
        set(main, '1d6bd40', { title: 'Email:' });
        set(main, '37e8d7d', { title: 'Phone:', des: `<a href="${TEL}">(630) 303-1666</a>` });
        set(main, '617dda3', { title: 'Service Area:', des: 'Nashville &amp; Middle Tennessee' });
        set(main, '16fa6b7', HIDE); // no social profile URLs yet
        set(main, 'd5c2a74', { sub: 'Request a Consultation', title: 'Get a Project Quote' });
        const form = NE.byId([main], '11003c4');
        form.settings.form_fields = form.settings.form_fields.map((f) => {
          if (f.custom_id === 'field_e9d8fad') return { ...f, field_label: 'System(s) You’re Interested In', field_options: ['System(s) you’re interested in|', ...PRODUCT_OPTIONS].join('\n') };
          if (f.custom_id === 'message') return { ...f, field_label: 'Tell Us About Your Project', placeholder: 'How do you want to use the space? What are you hoping to accomplish?' };
          if (f.custom_id === 'field_94bc8e5') return { ...f, field_options: f.field_options.replace(/^How Did You Hear About Us\n/, 'How did you hear about us?|\n').replace(/\n+$/, '') };
          return f;
        });
        Object.assign(form.settings, { form_name: 'Project Inquiry', email_subject: 'New Project Inquiry — Nashville Enclosures website', button_text: 'Get a Project Quote', success_message: 'Thank you — we’ve received your project details and will be in touch shortly to schedule your consultation.' });
        set(map, '14088ed', { address: 'Nashville, TN', zoom: { unit: 'px', size: 9 } });
        reid(main); reid(map);
        return [
          B.hero({ pill: 'Contact Us', kicker: 'Built Around Your Home. Designed Around Your Life.', title: 'Let’s Build Something Outside', text: 'Custom outdoor structures &amp; enclosures — residential, commercial and hospitality — serving Nashville and Middle Tennessee.', bg: 'louvered-roofs-13', buttons: [{ text: 'Get a Project Quote', url: '#contact' }, { text: 'Call (630) 303-1666', url: TEL }], h: 55 }),
          main,
          map,
          B.effect(),
        ];
      },
    },
  });
})();
