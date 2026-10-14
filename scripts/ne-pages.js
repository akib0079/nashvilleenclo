/*
 * Nashville Enclosures — page content (copy from "Nash Enclosures website Page Layouts.docx").
 * NE.PAGES[key].build() returns the Elementor element tree for that page.
 */
(function () {
  const NE = window.NE, B = NE.B, U = B.URL;
  const ps = B.ps, list = B.list;
  const quote = (text = 'Request a Consultation') => [text, U.contact];
  const hl = (t) => `<span class="highlight">${t}</span>`;

  /* product cards used on Home + Products */
  const SYSTEMS = [
    { title: 'Motorized Louvered Roofs', text: 'Control sun, shade and protection from rain at the push of a button.', url: U.louvered, img: 'louvered-roofs-05' },
    { title: 'Solid Roof Systems', text: 'Polycarbonate, insulated panel and solid aluminum roofs for dependable, all-weather coverage.', url: U.solid, img: 'solid-roofs-08' },
    { title: 'Retractable Screens', text: 'Create an open-air space when you want it and a protected enclosure when you need it.', url: U.screens, img: 'retractable-screens-02' },
    { title: 'Cantilever Roof Systems', text: 'Architectural shade and roof structures designed with fewer posts and cleaner sightlines.', url: U.cantilever, img: 'architectural-metal-03' },
    { title: '3 &amp; 4 Season Rooms', text: 'Extend the use of your outdoor space with custom window, glass, screen and enclosure systems.', url: U.seasons, img: 'season-rooms-01' },
    { title: 'Sliding &amp; Motorized Glass Enclosures', text: 'Create expansive glass walls that can open your space to the outdoors or close it for protection.', url: U.glass, img: 'glide-glass-03' },
    { title: 'Infrared Heating', text: 'Integrated electric heating systems designed to extend the comfortable use of your patio into cooler weather.', url: U.heating, img: 'heaters-02' },
    { title: 'Screen Rooms', text: 'Custom aluminum screen enclosures designed for airflow, visibility and protection from insects.', url: U.screenrooms, img: 'screen-rooms-04' },
    { title: 'Architectural Metal', text: 'Custom aluminum privacy walls, cladding, ceilings, decorative panels and architectural features.', url: U.metal, img: 'architectural-metal-06' },
  ];
  const systemCards = () => SYSTEMS.map((s, i) => ({ ...s, label: String(i + 1).padStart(2, '0') }));

  const processBand = (title) => B.processLight(title); // light card grid (was a dark band)

  const productCta = (title, bg, text) => B.cta({
    sub: 'Start Your Project', title, bg,
    html: `<p>${text || 'Tell us about your property, how you want to use the space and what you’re hoping to accomplish. We’ll help you determine the products and design approach that make the most sense for your project.'}</p>`,
    buttons: [{ text: 'Request a Consultation', url: U.contact }, { text: 'Call ' + B.PHONE, url: B.TEL }],
  });

  const productHero = (o) => B.hero({ pill: 'Outdoor Living Systems', buttons: [{ text: o.cta, url: U.contact }, { text: 'View Projects', url: U.projects }], ...o });

  NE.PAGES = {
    /* =========================== HOME =========================== */
    home: {
      id: 5476, title: 'Home',
      build: () => {
        // client's "Top of Page Carousel" selection (2026-10-15); low-resolution originals placed last
        const slides = ['louvered-roofs-01', 'hero-03', 'louvered-roofs-08', 'glide-glass-18', 'hero-06', 'louvered-roofs-19', 'hero-04', 'hero-02', 'louvered-roofs-16', 'hero-05', 'hero-01', 'hero-07'];
        const hero = B.wrap(B.shortcode(`[ne_hero ids="${B.ids(slides)}" pill="Nashville’s Premier Custom Outdoor Structure &amp; Enclosure Professionals" title="Designed for the Way You Live." accent="Built for the outdoors." text="Elevating outdoor living through luxury architectural structures and premium enclosure systems, thoughtfully designed and expertly built for residential and commercial spaces throughout Tennessee." cta1="View Products|${U.products}" cta2="Start Your Project|${U.contact}"]`), { cls: 'ne-home-hero ne-fullbleed' });
        const steps = [
          ['Consult', 'We listen before we design and help determine the right combination of products for your goals.'],
          ['Design', 'Layouts, models and realistic renderings help you see the space before we build it.'],
          ['Build', 'Organized, efficient construction with attention to the details that determine performance.'],
          ['Live', 'We walk you through every system, then stay available for service and support.'],
        ];
        const process = B.wrap(B.container({ css_classes: 'ne-steps-sec', flex_direction: 'column',
          padding: { unit: 'px', top: '90', right: '64', bottom: '84', left: '64', isLinked: false }, padding_mobile: { unit: 'px', top: '56', right: '24', bottom: '52', left: '24', isLinked: false } }, [B.html(
          '<div class="ne-steps-head"><span class="ne-eyebrow-txt">Consult. Design. Build. Live.</span><h2>Custom outdoor living, <span class="highlight">designed around you</span></h2>'
          + '<p>Every property is different. We start by understanding how you want to use the space, then design a complete solution around your home and lifestyle.</p></div>'
          + '<ol class="ne-steps">' + steps.map(([t, d], n) => `<li class="ne-step"><span class="ne-step-n">0${n + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('') + '</ol>'
          + `<div class="ne-steps-foot"><a class="ne-link-btn" href="${U.process}">Explore Our Process</a></div>`)]),
          { boxed: 1240, pt: 30, pb: 110, px: 20, ptm: 10, pbm: 70, pxm: 10 });
        const band = B.wrap(B.shortcode(`[ne_band id="${B.M('architectural-metal-05').id}" side="left"]`
          + '<span class="ne-eyebrow-txt">Designed Around Your Lifestyle</span><h2>Built to become part of <span class="highlight">the way you live</span></h2>'
          + '<p>Great outdoor living starts with how you want to live — slow mornings with coffee, family dinners, game days and evenings entertaining friends.</p>'
          + '<p>We design every space around those moments, and around your home, so the finished structure feels like it has always belonged there. Proportion, rooflines, colors, sightlines, drainage, lighting, fans, heaters and screens are all considered from the start.</p>'
          + `<div class="ne-band-ctas"><a href="${U.contact}">Start Your Project</a><a href="${B.TEL}">Call ${B.PHONE}</a></div>[/ne_band]`),
          { boxed: 1240, pt: 110, pb: 110, px: 20, ptm: 70, pbm: 70, pxm: 10 });
        return [
          hero,
          B.split({
            sub: 'About Nashville Enclosures',
            title: `Custom Outdoor Spaces Designed Around ${hl('Your Lifestyle')}`,
            html: ps(
              'Nashville Enclosures designs and builds luxury outdoor structures and premium enclosure systems for homes and businesses throughout Tennessee.',
              'From motorized louvered roofs and solid roof systems to retractable screens, glass enclosures, season rooms, cantilever structures and architectural aluminum, every project is custom designed for the property — and for the people who will enjoy it.',
              'Our focus is simple: understand how you want to use your outdoor space, then design and build the right solution — beautiful, comfortable and made to be enjoyed for years to come.'),
            images: ['louvered-roofs-02', 'architectural-metal-06'],
            bubbles: [
              { title: 'Residential', text: 'Homes, patios, pools &amp; outdoor rooms', icon: 'home', url: U.products },
              { title: 'Commercial', text: 'Restaurants, hospitality &amp; businesses', icon: 'building', url: U.commercial },
            ],
            cta: { text: 'Our Story', url: U.about }, bg: '#FFFFFF',
          }),
          B.cards({
            sub: 'Our Outdoor Living Systems', title: `Systems Built for ${hl('Tennessee Living')}`,
            button: { text: 'View All Products', url: U.products }, items: systemCards(), bento: true, bg: '#F7F5F0',
          }),
          process,
          band,
          B.gallery({
            id: 'home-work', mosaic: true, sub: 'Featured Projects', title: `Explore ${hl('Our Work')}`, button: { text: 'View All Projects', url: U.projects },
            images: ['louvered-roofs-06', 'season-rooms-01', 'glide-glass-01', 'louvered-roofs-04', 'solid-roofs-03', 'commercial-04'], bg: '#FFFFFF',
          }),
          B.cta({
            sub: 'Videos &amp; Resources', title: 'Understand Your Options Before You Build', bg: 'glide-glass-02', href: U.videos,
            html: '<p>Product demonstrations, project walkthroughs, design considerations, budget discussions and answers to frequently asked questions — so you can make an informed decision before your project ever begins.</p>',
            buttons: [{ text: 'Explore Resources', url: U.videos }],
          }),
          B.effect(),
        ];
      },
    },

    /* =========================== ABOUT =========================== */
    about: {
      id: 5511, title: 'About',
      build: () => [
        B.hero({ pill: 'About Nashville Enclosures', kicker: 'Elevated by Design. Built for Living.', title: 'Redefining the Outdoor Living Experience', text: 'We design and build luxury outdoor structures and innovative enclosure systems that transform ordinary spaces into extraordinary places to live, gather, and entertain.', bg: 'louvered-roofs-08', buttons: [{ text: 'Start Your Project', url: U.contact }, { text: 'Our Process', url: U.process }], h: 58 }),
        B.split({
          sub: 'About Nashville Enclosures', title: `More Time Outside. ${hl('Less Time Maintaining It.')}`,
          html: ps('Nashville Enclosures is a design-build contractor specializing in premium outdoor structures and enclosure systems.',
            'Our purpose is to create outdoor spaces that allow people to spend more time outside — relaxing, entertaining, gathering with friends and family, and enjoying their homes.',
            'We believe the best outdoor living projects combine thoughtful design, high-quality materials, proper construction and products that require as little maintenance as possible.',
            '<strong>We’re not just here to build your project.</strong> We’re here to create something you’ll love, enjoy, and be proud of for years to come.'),
          images: ['louvered-roofs-09', 'retractable-screens-10'],
          // same bubble component as the Home page (replaces the old icon row)
          bubbles: [
            { title: 'Design-Build', text: 'One team from consultation to completion', icon: 'compass', url: U.process },
            { title: 'Statewide', text: 'Residential &amp; commercial projects throughout Tennessee', icon: 'pin', url: U.projects },
          ],
        }),
        B.split({
          id: 'our-story', sub: 'Our Story', title: `Built on Experience. ${hl('Inspired by Outdoor Living.')}`,
          html: ps('Nashville Enclosures was founded by Brian Watters, bringing together a lifetime of experience in construction, a background in Mechanical Engineering, and a genuine passion for the outdoors.',
            'With experience spanning large-scale commercial and industrial construction to custom residential projects, Brian developed a deep appreciation for thoughtful design, quality craftsmanship, and the technical details that make exceptional projects possible.',
            'Beyond construction, a lifelong appreciation for outdoor living helped shape the vision for Nashville Enclosures. The belief that some of life’s best moments happen outdoors — whether relaxing with family, entertaining friends, or simply enjoying the space around you — became the inspiration for creating outdoor environments that people truly love spending time in.',
            'Combining that passion with an engineering and construction background led to a specialization in luxury aluminum structures, innovative motorized roof systems, and custom outdoor enclosures. These systems offer the opportunity to transform ordinary outdoor areas into beautiful, comfortable, and functional living spaces that can be enjoyed throughout the seasons.',
            'Today, Nashville Enclosures is built around the same core principles that inspired its founding: use the finest products available, approach every project with thoughtful design, execute with exceptional craftsmanship, and stand behind our work.',
            '<strong>Our goal is more than simply building outdoor structures.</strong> It’s about understanding our clients’ vision, bringing that vision to life, and creating exceptional spaces that enhance the way people live, gather, and enjoy the outdoors for years to come.'),
          images: ['louvered-roofs-14', 'louvered-roofs-03'], reverse: true, bg: '#FFFFFF',
        }),
        B.split({
          sub: 'Our Team', title: `People Who Take Pride in ${hl('Their Craft')}`,
          html: ps('That same philosophy extends to the team we’re building today.',
            'Nashville Enclosures is made up of experienced tradesmen, installers, designers, and construction professionals who take pride in their craft and understand the level of detail these projects demand.',
            'As our company continues to grow, we’re focused on bringing in some of the best people in the industry — people who share our standards for craftsmanship, communication, problem-solving, and taking care of the client.',
            'We believe the people building your project matter just as much as the products being installed. That’s why we’re building a team capable of handling every project with the professionalism, technical knowledge, and attention to detail our clients expect.',
            'Today, we bring that experience to projects ranging from custom residential patios and outdoor rooms to restaurants, hotels, hospitality venues, and large commercial outdoor spaces.',
            'We’re not simply building structures and enclosures. We’re building a team dedicated to creating outdoor spaces people can enjoy for years to come.'),
          images: ['commercial-11'],
        }),
        B.dark({
          pill: 'Our Core Values', title: 'Commitment to Excellence',
          cards: [
            { title: 'Stand Behind Your Word and Your Work', text: 'We believe clients should understand what they are buying, what it will accomplish and what they can expect from the project. We communicate clearly, make realistic commitments and do what we say we are going to do.', icon: 'fas fa-handshake' },
            { title: 'Build It Right', text: 'Quality is measured years after construction — not just on installation day. That means durable materials, proven systems, attention to the details people don’t always see, and never compromising long-term performance to make a project cheaper or faster.', icon: 'fas fa-ruler-combined' },
            { title: 'Design for Longevity', text: 'We specialize in aluminum, powder-coated finishes and high-performance outdoor products because outdoor structures should withstand the environment without becoming another maintenance project. Less maintenance means more time to simply enjoy the space.', icon: 'fas fa-shield-alt' },
            { title: 'Stand Behind Our Work', text: 'Our relationship doesn’t end when construction is complete. We provide project closeout, product education, warranty support and ongoing service — years later, we want to still be the company you call.', icon: 'fas fa-tools' },
            { title: 'Build Spaces That Bring People Together', text: 'Outdoor spaces aren’t really about aluminum, glass, screens or roofs. They’re about what happens underneath them. Family dinners. Football games. Quiet mornings. Birthday parties. We build the structure. You create what happens inside it.', icon: 'fas fa-users' },
          ], cols: 3,
        }),
        processBand('A Better Project Starts With a Better Process'),
        productCta('We Build the Structure. You Create What Happens Inside It.', 'louvered-roofs-04'), // the former Home hero photo
        B.effect(),
      ],
    },

    /* =========================== OUR PROCESS =========================== */
    process: {
      id: null, title: 'Our Process', slug: 'our-process', parent: 5511,
      build: () => [
        B.hero({ pill: 'The Nashville Enclosures Difference', kicker: 'Consult. Design. Build. Enjoy.', title: 'A Better Project Starts With a Better Process', text: 'Every major decision is considered before installation begins — from the first conversation through design, construction and final turnover.', bg: 'louvered-roofs-20', buttons: [{ text: 'Start Your Project', url: U.contact }], h: 58 }),
        B.intro({
          sub: 'The Nashville Enclosures Difference', title: `Great Outdoor Spaces Don’t Start ${hl('With a Product')}`,
          html: ps('They start with understanding the problem you’re trying to solve.', 'Our process takes a project from the first conversation through design, construction and final turnover so that every major decision is considered before installation begins.'),
        }),
        B.split({
          id: 'consult', sub: 'Step 1 — Consult', title: `We Listen ${hl('Before We Design')}`,
          html: ps('Our first job isn’t to sell you a product. It’s to understand your space.',
            'During the consultation, we’ll discuss how you currently use the area, what you don’t like about it and what you want it to become.',
            'Are you trying to create shade? Keep out insects? Protect furniture from weather? Create a year-round entertaining area? Preserve a particular view? Add privacy? Connect an outdoor kitchen to the house?',
            'Sometimes the product a client initially asks about isn’t the best solution for what they’re actually trying to accomplish.',
            'Our job is to understand the goal and help determine the right combination of products, construction and design to achieve it.'),
          images: ['louvered-roofs-15'], bg: '#FFFFFF',
        }),
        B.split({
          id: 'design', sub: 'Step 2 — Design', title: `See the Space ${hl('Before We Build It')}`,
          html: ps('Outdoor structures become a major architectural component of your home or business. You should understand what you’re getting before construction begins.',
            'For appropriate projects, Nashville Enclosures develops layouts, models and realistic renderings that help clients visualize the finished space.',
            'We consider dimensions, post locations, rooflines, colors, sightlines, furniture placement and the integration of screens, glass, lighting, fans, heaters and other accessories.',
            'For projects requiring engineering or permitting, we also coordinate the technical design necessary to move the project toward construction.',
            'The goal is to solve as many questions as possible on the front end — instead of figuring them out in the field.'),
          images: ['architectural-metal-07'], reverse: true,
        }),
        B.split({
          id: 'build', sub: 'Step 3 — Build', title: `Professional Construction. ${hl('Efficient Installation.')}`,
          html: ps('Many of the systems we install are highly engineered and fabricated specifically for the project.',
            'That allows a significant amount of planning and preparation to happen before installation begins.',
            'Once we’re on site, our focus is on organized construction, clear communication and completing the work efficiently without sacrificing quality.',
            'We pay attention to the details that determine how a project ultimately looks and performs: structural connections, alignment, drainage, trim, penetrations, wiring, transitions and finish work.',
            '<strong>Speed matters. Quality matters more.</strong> Our process is designed to deliver both.'),
          images: ['louvered-roofs-10'], bg: '#FFFFFF',
        }),
        B.split({
          id: 'enjoy', sub: 'Step 4 — Enjoy', title: `We Don’t Just Finish the Project ${hl('and Leave')}`,
          html: ps('At project completion, we walk through the finished space with the client and explain how to properly operate and care for the installed systems.',
            'That may include operation of motorized roofs, screens, glass systems, remotes, smart controls, heaters, lighting and other equipment.',
            'We also provide information regarding maintenance, warranties and future service.',
            'The objective is simple: when we turn the project over, you should feel completely comfortable using the space we built.',
            '<strong>And if you need us later, we’re still here.</strong>'),
          images: ['season-rooms-14'], reverse: true,
          cta: ['Start Your Project', U.contact],
        }),
        productCta('Turn Your Patio Into Your Favorite Room in the House.', 'glide-glass-07'),
        B.effect(),
      ],
    },

    /* =========================== PRODUCTS =========================== */
    products: {
      id: 5512, title: 'Products',
      build: () => [
        B.hero({ pill: 'Our Outdoor Living Systems', kicker: 'Better Products. Better Design. Better Outdoor Spaces.', title: 'Outdoor Living Without Compromise', text: 'Motorized louvered roofs, solid roof systems, retractable screens, glass enclosures, seasonal rooms, cantilever structures and architectural aluminum — designed as one complete outdoor space.', bg: 'architectural-metal-01', buttons: [{ text: 'Start Your Project', url: U.contact }, { text: 'View Projects', url: U.projects }], h: 58 }),
        B.cards({
          sub: 'Our Outdoor Living Systems', title: `Choose the Right ${hl('Combination')}`,
          intro: '<p>Shade. Weather protection. Bug control. Heating. Privacy. An unobstructed view. A fully enclosed room. Or a combination of all of them — each system can stand alone or be designed together as a complete outdoor space.</p>',
          items: systemCards(), minH: 400, bg: '#FFFFFF',
        }),
        processBand(),
        productCta('Not Sure Which System Is Right?', 'season-rooms-10', 'Whether you already know exactly what you want or you’re still trying to determine the right solution, the process starts with a conversation.'),
        B.effect(),
      ],
    },
  };
})();
