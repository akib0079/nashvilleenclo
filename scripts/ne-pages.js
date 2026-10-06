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
    { title: 'Retractable Screens', text: 'Create an open-air space when you want it and a protected enclosure when you need it.', url: U.screens, img: 'retractable-screens-02' },
    { title: 'Cantilever Roof Systems', text: 'Architectural shade and roof structures designed with fewer posts and cleaner sightlines.', url: U.cantilever, img: 'architectural-metal-03' },
    { title: '3 &amp; 4 Season Rooms', text: 'Extend the use of your outdoor space with custom window, glass, screen and enclosure systems.', url: U.seasons, img: 'season-rooms-01' },
    { title: 'Sliding &amp; Motorized Glass Enclosures', text: 'Create expansive glass walls that can open your space to the outdoors or close it for protection.', url: U.glass, img: 'glide-glass-03' },
    { title: 'Infrared Heating', text: 'Integrated electric heating systems designed to extend the comfortable use of your patio into cooler weather.', url: U.heating, img: 'heaters-02' },
    { title: 'Screen Rooms', text: 'Custom aluminum screen enclosures designed for airflow, visibility and protection from insects.', url: U.screenrooms, img: 'screen-rooms-04' },
    { title: 'Architectural Metal', text: 'Custom aluminum privacy walls, cladding, ceilings, decorative panels and architectural features.', url: U.metal, img: 'architectural-metal-06' },
    { title: 'Commercial Outdoor Spaces', text: 'Custom structures and enclosure systems for restaurants, hotels, rooftops, hospitality venues and other commercial properties.', url: U.commercial, img: 'commercial-04' },
  ];
  const systemCards = () => SYSTEMS.map((s, i) => ({ ...s, label: String(i + 1).padStart(2, '0') }));

  const processBand = (title = 'Consult. Design. Build. Enjoy.') => B.dark({
    pill: 'The Nashville Enclosures Difference', title,
    html: '<p>Great outdoor spaces don’t start with a product. They start with understanding the problem you’re trying to solve.</p>',
    cards: B.processCards(), cols: 4,
    footer: [B.btn('Explore Our Process', U.process)],
  });

  const productCta = (title, bg, text) => B.cta({
    sub: 'Start Your Project', title, bg,
    html: `<p>${text || 'Tell us about your property, how you want to use the space and what you’re hoping to accomplish. We’ll help you determine the products and design approach that make the most sense for your project.'}</p>`,
    buttons: [{ text: 'Request a Consultation', url: U.contact }, { text: 'Call (630) 303-1666', url: 'tel:+16303031666' }],
  });

  const productHero = (o) => B.hero({ pill: 'Outdoor Living Systems', buttons: [{ text: o.cta, url: U.contact }, { text: 'View Projects', url: U.projects }], ...o });

  NE.PAGES = {
    /* =========================== HOME =========================== */
    home: {
      id: 5476, title: 'Home',
      build: () => [
        B.homeHero({
          pill: 'Nashville’s Premier Custom Outdoor Structure &amp; Enclosure Professionals',
          line1: 'Designed for Your Home.', line2: 'Built for the Outdoors.',
          text: 'Made to last. Premium outdoor structures and enclosure systems for residential and commercial properties throughout Tennessee.',
          bg: 'louvered-roofs-04',
          buttons: [{ text: 'View Products', url: U.products }, { text: 'Start Your Project', url: U.contact }],
        }),
        B.split({
          sub: 'About Nashville Enclosures',
          title: `Nashville’s Premier Custom Outdoor Structure &amp; ${hl('Enclosure Professionals')}`,
          html: ps(
            'Nashville Enclosures designs and builds premium outdoor structures and enclosure systems for residential and commercial properties throughout All of Tennessee.',
            'From motorized louvered roofs and retractable screens to glass enclosures, three- and four-season rooms, cantilevered structures and architectural aluminum, we create custom outdoor spaces designed around the way you want to live.',
            'Our focus is simple: understand what you want from your outdoor living space and create the right solution — a beautiful, comfortable, functional space designed around the way you live and built for a lifetime of enjoyment.'),
          images: ['retractable-screens-02', 'glide-glass-03'],
          features: [['Residential', 'Commercial &amp; Hospitality'], ['Design-Build', 'Consult to Completion']],
          cta: { text: 'Our Story', url: U.about },
        }),
        B.dark({
          pill: 'Consult. Design. Build. Live.',
          title: 'Custom Outdoor Living, Designed Around You',
          html: ps('Every property is different. Every client uses their outdoor space differently.',
            'Rather than forcing a project into a predetermined package, we start by understanding what you want the space to accomplish. Shade. Weather protection. Bug control. Heating. Privacy. An unobstructed view. A fully enclosed room. Or a combination of all of them.',
            'We then design a complete solution around your home, architecture and lifestyle.'),
          cards: [
            { title: 'Consult', text: 'We listen before we design and help determine the right combination of products for your goals.', icon: 'fas fa-comments', url: U.process },
            { title: 'Design', text: 'Layouts, models and realistic renderings help you see the space before we build it.', icon: 'fas fa-drafting-compass', url: U.process },
            { title: 'Build', text: 'Organized, efficient construction with attention to the details that determine performance.', icon: 'fas fa-hard-hat', url: U.process },
            { title: 'Live', text: 'We walk you through every system, then stay available for service and support.', icon: 'fas fa-couch', url: U.process },
          ],
        }),
        B.cards({
          sub: 'Our Outdoor Living Systems', title: `Systems Built for ${hl('Tennessee Living')}`,
          button: { text: 'View All Products', url: U.products }, items: systemCards(), minH: 390,
        }),
        B.split({
          sub: 'Designed Around Your Home', title: `Built to Become ${hl('Part of Your Home')}`,
          html: ps('We don’t approach outdoor living projects as accessories added onto a house.', 'We design them to look and feel like they belong there.',
            'Proportion, rooflines, colors, attachment points, sightlines, drainage, lighting, fans, heaters, screens and surrounding architecture are all considered during the design process.',
            'The result is a finished outdoor space that is functional, intentional and built for years of use.'),
          images: ['louvered-roofs-11'], reverse: true, bg: '#FFFFFF',
          cta: ['Start Your Project', U.contact],
        }),
        B.gallery({
          sub: 'Featured Projects', title: `Explore ${hl('Our Work')}`, button: { text: 'View All Projects', url: U.projects },
          images: ['louvered-roofs-06', 'season-rooms-01', 'glide-glass-01', 'retractable-screens-05', 'architectural-metal-05', 'commercial-02'], cols: 3,
        }),
        B.cta({
          sub: 'Videos &amp; Resources', title: 'Understand Your Options Before You Build', bg: 'glide-glass-02', href: U.videos,
          html: '<p>Product demonstrations, project walkthroughs, design considerations, budget discussions and answers to frequently asked questions — so you can make an informed decision before your project ever begins.</p>',
          buttons: [{ text: 'Explore Resources', url: U.videos }],
        }),
        B.effect(),
      ],
    },

    /* =========================== ABOUT =========================== */
    about: {
      id: 5511, title: 'About',
      build: () => [
        B.hero({ pill: 'About Nashville Enclosures', kicker: 'Built to Last. Designed to Be Used.', title: 'We Build Outdoor Spaces That Are Made to Be Used', text: 'A design-build contractor specializing in premium outdoor structures and enclosure systems.', bg: 'louvered-roofs-08', buttons: [{ text: 'Start Your Project', url: U.contact }, { text: 'Our Process', url: U.process }], h: 58 }),
        B.split({
          sub: 'About Nashville Enclosures', title: `More Time Outside. ${hl('Less Time Maintaining It.')}`,
          html: ps('Nashville Enclosures is a design-build contractor specializing in premium outdoor structures and enclosure systems.',
            'Our purpose is to create outdoor spaces that allow people to spend more time outside — relaxing, entertaining, gathering with friends and family, and enjoying their homes.',
            'We believe the best outdoor living projects combine thoughtful design, high-quality materials, proper construction and products that require as little maintenance as possible.',
            '<strong>Our goal isn’t simply to complete your project.</strong> Our goal is to build something you will still be enjoying years from now.'),
          images: ['louvered-roofs-09', 'retractable-screens-10'],
          features: [['Design-Build', 'Contractor'], ['Statewide', 'Throughout Tennessee']],
        }),
        B.split({
          sub: 'Our Story', title: `Founded on a Lifetime Spent Around ${hl('Construction')}`,
          html: ps('Nashville Enclosures was founded by Brian Watters after a lifetime spent around construction.',
            'With a degree in Mechanical Engineering and a background spanning large commercial construction, industrial projects, and custom residential construction, Brian developed an appreciation for both the technical side of building and the details that separate an average project from an exceptional one.',
            'That experience eventually led to a specialization in premium aluminum outdoor structures, motorized systems, and custom enclosure products.',
            'Nashville Enclosures was built around a straightforward idea:',
            '<strong>Offer clients the best systems, design projects properly, build them correctly, and stand behind the finished work.</strong>'),
          images: ['louvered-roofs-14'], reverse: true, bg: '#FFFFFF',
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
          pill: 'Our Core Values', title: 'What We Stand For',
          cards: [
            { title: 'Stand Behind Your Word and Your Work', text: 'We believe clients should understand what they are buying, what it will accomplish and what they can expect from the project. We communicate clearly, make realistic commitments and do what we say we are going to do.', icon: 'fas fa-handshake' },
            { title: 'Build It Right', text: 'Quality is measured years after construction — not just on installation day. That means durable materials, proven systems, attention to the details people don’t always see, and never compromising long-term performance to make a project cheaper or faster.', icon: 'fas fa-ruler-combined' },
            { title: 'Design for Longevity', text: 'We specialize in aluminum, powder-coated finishes and high-performance outdoor products because outdoor structures should withstand the environment without becoming another maintenance project. Less maintenance means more time to simply enjoy the space.', icon: 'fas fa-shield-alt' },
            { title: 'Stand Behind Our Work', text: 'Our relationship doesn’t end when construction is complete. We provide project closeout, product education, warranty support and ongoing service — years later, we want to still be the company you call.', icon: 'fas fa-tools' },
            { title: 'Build Spaces That Bring People Together', text: 'Outdoor spaces aren’t really about aluminum, glass, screens or roofs. They’re about what happens underneath them. Family dinners. Football games. Quiet mornings. Birthday parties. We build the structure. You create what happens inside it.', icon: 'fas fa-users' },
          ], cols: 3,
        }),
        processBand('A Better Project Starts With a Better Process'),
        productCta('We Build the Structure. You Create What Happens Inside It.', 'season-rooms-14'),
        B.effect(),
      ],
    },

    /* =========================== OUR PROCESS =========================== */
    process: {
      id: null, title: 'Our Process', slug: 'our-process', parent: 5511,
      build: () => [
        B.hero({ pill: 'The Nashville Enclosures Difference', kicker: 'Consult. Design. Build. Enjoy.', title: 'A Better Project Starts With a Better Process', text: 'Every major decision is considered before installation begins — from the first conversation through design, construction and final turnover.', bg: 'glide-glass-09', buttons: [{ text: 'Start Your Project', url: U.contact }], h: 58 }),
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
          images: ['louvered-roofs-12'], bg: '#FFFFFF',
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
        B.hero({ pill: 'Our Outdoor Living Systems', kicker: 'Better Products. Better Design. Better Outdoor Spaces.', title: 'Outdoor Living Without Compromise', text: 'Motorized louvered roofs, retractable screens, glass enclosures, seasonal rooms, cantilever structures and architectural aluminum — designed as one complete outdoor space.', bg: 'architectural-metal-01', buttons: [{ text: 'Start Your Project', url: U.contact }, { text: 'View Projects', url: U.projects }], h: 58 }),
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
