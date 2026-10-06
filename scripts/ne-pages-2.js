/*
 * Nashville Enclosures — product pages + Projects / Videos / Warranty / Contact.
 * Copy from "Nash Enclosures website Page Layouts.docx".
 */
(function () {
  const NE = window.NE, B = NE.B, U = B.URL;
  const ps = B.ps, list = B.list;
  const hl = (t) => `<span class="highlight">${t}</span>`;
  const h3 = (t) => `<h3 class="ne-subhead">${t}</h3>`;
  const TEL = 'tel:+16303031666';

  const processBand = () => B.dark({
    pill: 'The Nashville Enclosures Difference', title: 'Consult. Design. Build. Enjoy.',
    html: '<p>Our process takes a project from the first conversation through design, construction and final turnover so that every major decision is considered before installation begins.</p>',
    cards: B.processCards(), cols: 4, footer: [B.btn('Explore Our Process', U.process)],
  });
  const cta = (title, bg, text) => B.cta({
    sub: 'Start Your Project', title, bg,
    html: `<p>${text || 'Tell us about your property, how you want to use the space and what you’re hoping to accomplish. We’ll help you determine the products and design approach that make the most sense for your project.'}</p>`,
    buttons: [{ text: 'Request a Consultation', url: U.contact }, { text: 'Call (630) 303-1666', url: TEL }],
  });

  /*
   * Generic product page: hero → alternating text/photo sections → gallery → process band → CTA
   * sections[i] = { sub, title, html, images:[k] | [k1,k2], cta?, after? } (alternates sides/backgrounds automatically)
   */
  const product = (p) => () => {
    const out = [B.hero({ pill: 'Outdoor Living Systems', kicker: p.kicker, title: p.name, text: p.lead, bg: p.hero, pos: p.pos, buttons: [{ text: p.ctaText, url: U.contact }, { text: 'View Projects', url: U.projects }] })];
    p.sections.forEach((s, i) => {
      if (s.dark) { out.push(B.dark(s.dark)); return; }
      if (s.gallery) { out.push(B.gallery(s.gallery)); return; }
      out.push(B.split({ ...s, reverse: i % 2 === 1, bg: i % 2 === 1 ? '#FFFFFF' : undefined, cta: s.cta === undefined && i === 0 ? [p.ctaText, U.contact] : s.cta }));
    });
    out.push(B.gallery({ sub: 'Featured Gallery', title: p.galleryTitle || `${p.short} ${hl('Projects')}`, button: { text: 'View All Projects', url: U.projects }, images: p.gallery, cols: 3 }));
    out.push(processBand());
    out.push(cta(p.ctaTitle || p.ctaText, p.ctaBg));
    out.push(B.effect());
    return out;
  };

  Object.assign(NE.PAGES, {
    /* ---------------- LOUVERED ROOFS ---------------- */
    louvered: {
      id: 5513, title: 'Louvered Roofs', slug: 'louvered-roofs',
      build: product({
        name: 'Motorized Louvered Roofs', short: 'Louvered Roof', kicker: 'Control the Outdoors.', hero: 'louvered-roofs-01', pos: 'top center', ctaText: 'Design Your Louvered Roof', ctaBg: 'louvered-roofs-10',
        lead: 'Open the louvers for sunlight and fresh air, adjust them for shade, and close them when weather moves in.',
        sections: [
          { sub: 'Motorized Louvered Roofs', title: `Control the ${hl('Outdoors')}`, images: ['louvered-roofs-03', 'louvered-roofs-06'],
            html: ps('A motorized louvered roof gives you something a traditional patio cover cannot: control.',
              'Open the louvers to bring sunlight and fresh air into your patio. Adjust them throughout the day for shade. Close them when weather moves in to create a protected outdoor space.',
              'Nashville Enclosures designs and installs custom aluminum louvered roof systems for residential and commercial properties throughout all of Tennessee.',
              'Our systems use structural-grade aluminum framing, motorized adjustable louvers, integrated perimeter gutters and concealed drainage through the structure. The system can also accommodate lighting, fans, heaters, screens and other outdoor living accessories.') },
          { sub: 'One Structure. Complete Outdoor Living.', title: `Built for More ${hl('Than Shade')}`, images: ['louvered-roofs-13'],
            html: ps('A properly designed louvered roof can become the foundation of an entire outdoor living space.',
              'Systems can be configured as attached or freestanding structures and designed around patios, pools, outdoor kitchens, decks and commercial spaces.',
              'Depending on the project, we can integrate:') + list(['Motorized adjustable roof zones', 'Integrated drainage', 'Perimeter and architectural lighting', 'Ceiling fans', 'Infrared heaters', 'Motorized retractable screens', 'Glass enclosure systems', 'TVs and entertainment equipment', 'Privacy walls and architectural aluminum features', 'Smart controls']) },
          { sub: 'Built to Last', title: `Aluminum Construction. ${hl('Minimal Maintenance.')}`, images: ['louvered-roofs-07'],
            html: ps('Unlike traditional wood pergolas, our louvered roof systems utilize powder-coated structural aluminum designed for long-term exterior use.',
              'There is no regular staining or painting required, and aluminum will not rot or suffer termite damage.',
              'The result is a clean architectural structure designed to provide years of outdoor use with minimal maintenance.') },
          { sub: 'Designed Around Your Home', title: `Designed Specifically ${hl('for Your Home')}`, images: ['louvered-roofs-19'],
            html: ps('Every louvered roof project begins with the architecture of the property.',
              'We consider rooflines, mounting locations, drainage, elevations, post locations, views and how the new structure relates visually to the home.',
              'For appropriate projects, we can provide 3D modeling and renderings before construction so you can understand the design before it becomes part of your home.'),
            cta: ['Design Your Louvered Roof', U.contact] },
        ],
        gallery: ['louvered-roofs-02', 'louvered-roofs-04', 'louvered-roofs-05', 'louvered-roofs-08', 'louvered-roofs-09', 'louvered-roofs-10', 'louvered-roofs-11', 'louvered-roofs-14', 'louvered-roofs-15', 'louvered-roofs-16', 'louvered-roofs-20'],
      }),
    },

    /* ---------------- RETRACTABLE SCREENS ---------------- */
    screens: {
      id: 5514, title: 'Retractable Screens', slug: 'retractable-screens',
      build: product({
        name: 'Motorized Retractable Screens', short: 'Retractable Screen', kicker: 'Open When You Want. Protected When You Need.', hero: 'retractable-screens-05', ctaText: 'Explore Retractable Screens', ctaTitle: 'Explore Retractable Screens for Your Space', ctaBg: 'retractable-screens-01',
        lead: 'Change your outdoor space at the push of a button — open-air when you want it, protected when you need it.',
        sections: [
          { sub: 'Retractable Screens', title: `Open When You Want. ${hl('Protected When You Need.')}`, images: ['retractable-screens-04', 'retractable-screens-03'],
            html: ps('Motorized retractable screens allow an outdoor space to change at the push of a button.',
              'Keep the screens retracted when you want a completely open patio. Lower them when you need protection from insects, sunlight, wind or additional privacy.',
              'The systems offered by Nashville Enclosures can be integrated into new outdoor structures or added to many existing covered patios.',
              'Our retractable systems offer multiple mesh options, motorized operation, smart-home integration options, obstruction sensing and mounting configurations that allow the housing and tracks to be incorporated into a variety of structures.') },
          { sub: 'Uninterrupted Views', title: `Large Openings Without ${hl('Sacrificing the View')}`, images: ['retractable-screens-10'],
            html: ps('Retractable screens are particularly valuable on large outdoor openings where fixed framing would interrupt the view.',
              'When raised, the screen disappears into its housing and leaves the opening unobstructed.',
              'When lowered, the screen is retained within vertical tracks to create a substantially more secure enclosure than a conventional hanging shade.') },
          { sub: 'Clean Integration', title: `Designed Into ${hl('the Architecture')}`, images: ['retractable-screens-11'],
            html: ps('The best retractable screen installations don’t look like an afterthought.',
              'We design screen housings, tracks and supporting framework into the overall project whenever possible.',
              'Depending on the structure, screens can be face-mounted, undermounted or recessed into surrounding construction for a cleaner finished appearance.',
              'Retractable screens can be combined with:') + list(['Louvered roofs', 'Insulated patio roofs', 'Existing covered patios', 'Outdoor kitchens', 'Pool areas', 'Restaurants and hospitality patios', 'Infrared heaters', 'Lighting and fans', 'Smart-home controls']),
            cta: ['Explore Retractable Screens', U.contact] },
        ],
        gallery: ['retractable-screens-01', 'retractable-screens-02', 'retractable-screens-06', 'retractable-screens-07', 'retractable-screens-08', 'retractable-screens-09', 'retractable-screens-12', 'retractable-screens-13', 'retractable-screens-14', 'retractable-screens-15', 'retractable-screens-17', 'retractable-screens-18'],
      }),
    },

    /* ---------------- CANTILEVER ---------------- */
    cantilever: {
      id: 5519, title: 'Cantilever Roof Systems', slug: 'cantilever-roof-systems',
      build: product({
        name: 'Cantilever Roof Systems', short: 'Cantilever', kicker: 'Maximum Coverage. Minimal Obstruction.', hero: 'cantilever-01w', ctaText: 'Explore a Cantilever Design', ctaBg: 'architectural-metal-15',
        lead: 'Architectural shade and roof structures designed with fewer posts and cleaner sightlines.',
        galleryTitle: `Architectural ${hl('Shade Structures')}`,
        sections: [
          { sub: 'Cantilever Roof Systems', title: `Maximum Coverage. ${hl('Minimal Obstruction.')}`, images: ['architectural-metal-03', 'cantilever-03c'],
            html: ps('A cantilevered roof changes the way an outdoor structure interacts with the space beneath it.',
              'By supporting the roof primarily from one side, cantilever designs can reduce or eliminate posts along important sightlines — creating a more open architectural appearance and greater flexibility around pools, patios, outdoor kitchens and entertainment areas.',
              'Our cantilever system uses structural aluminum construction and is designed around large engineered spans. Available roof configurations can provide full shade and weather coverage while maintaining the clean, modern appearance of a cantilevered structure.') },
          { sub: 'Fewer Posts. Better Views.', title: `Designed Around ${hl('the View')}`, images: ['solid-roofs-10'],
            html: ps('Post placement can dramatically change how an outdoor space feels.', 'Cantilever construction is particularly useful when traditional front posts would interfere with:')
              + list(['Pool decks', 'Views', 'Furniture layouts', 'Outdoor kitchens', 'Walkways', 'Commercial seating', 'Architectural sightlines'])
              + ps('Every cantilever structure must be designed around the project’s dimensions, loading requirements, foundation conditions and local engineering requirements.') },
          { sub: 'Engineered Aluminum', title: `Architectural Aluminum ${hl('Construction')}`, images: ['architectural-metal-15'],
            html: ps('Our systems use extruded aluminum components and architectural powder-coated finishes designed for exterior environments. The product line also allows our structures to be combined with lattice, privacy walls, decorative Soleil panels and other architectural elements.'),
            cta: ['Explore a Cantilever Design', U.contact] },
        ],
        gallery: ['cantilever-01w', 'cantilever-03c', 'architectural-metal-03', 'solid-roofs-10', 'architectural-metal-15', 'architectural-metal-07'],
      }),
    },

    /* ---------------- 3 & 4 SEASON ROOMS ---------------- */
    seasons: {
      id: 5515, title: '3 & 4 Season Rooms', slug: '3-4-season-rooms',
      build: product({
        name: '3 &amp; 4 Season Rooms', short: 'Season Room', kicker: 'Enjoy More of the Outdoors — More of the Year.', hero: 'season-rooms-05', ctaText: 'Design Your Outdoor Room', ctaBg: 'season-rooms-15',
        lead: 'Transform an existing patio or new outdoor structure into a protected, comfortable and versatile extension of the home.',
        sections: [
          { sub: '3 &amp; 4 Season Rooms', title: `Enjoy More of the Outdoors — ${hl('More of the Year')}`, images: ['season-rooms-02', 'season-rooms-07'],
            html: ps('A seasonal enclosure transforms an existing patio or new outdoor structure into a more protected, comfortable and versatile extension of the home.',
              'Depending on the project, Nashville Enclosures can combine aluminum framing with vinyl windows, glass windows, screens, doors, insulated roofing, heating and other enclosure systems to create the level of protection appropriate for the space.') },
          { sub: 'Screened Porch Meets Sunroom', title: `Three-Season ${hl('Rooms')}`, images: ['season-rooms-11'],
            html: ps('Three-season rooms are designed to maintain the feeling of an outdoor space while providing significantly greater protection from insects, wind and weather.',
              'Our three-season systems utilize powder-coated aluminum framing with operable vinyl window systems and permanent exterior screening. The windows can be opened for airflow or closed when greater weather protection is desired.',
              'This creates a flexible room that can transition between a screened porch and a more protected enclosure as conditions change.') },
          { sub: 'Premium Tempered Glass', title: `Expanse Glass ${hl('Porch Windows')}`, images: ['season-rooms-04'],
            html: ps('For clients looking for a higher-end, more refined finish, Nashville Enclosures offers the Expanse glass window system as a premium alternative to traditional vinyl porch windows.',
              'Expanse uses tempered glass to create a cleaner, more substantial architectural appearance, giving the enclosure the look and feel of a finished glass room while maintaining the flexibility of a three-season outdoor space.',
              'The dual-sash design creates large expanses of glass with fewer visual obstructions, preserving views and allowing the enclosure to feel open and connected to the outdoors. Integrated retractable screens provide natural ventilation when the windows are opened, then disappear when they are not needed.',
              'Compared with traditional vinyl porch windows, Expanse provides a more polished, upscale finished appearance that pairs especially well with higher-end homes, custom outdoor rooms, and projects where maximizing the view is an important part of the design.',
              'The result is a space that feels less like an enclosed porch and more like a purpose-built extension of the home — with the clarity, weight, and finished appearance of real glass.') },
          { sub: 'Conditioned Living Space', title: `Four-Season ${hl('Applications')}`, images: ['season-rooms-09'],
            html: ps('Projects intended to function as conditioned living space require a different design approach than a typical three-season porch.',
              'During consultation and design, we evaluate the existing structure, desired use of the room, glazing, roof construction, insulation, heating and cooling requirements and applicable building-code considerations to determine the appropriate enclosure solution.'),
            cta: ['Design Your Outdoor Room', U.contact] },
        ],
        gallery: ['season-rooms-01', 'season-rooms-03', 'season-rooms-05', 'season-rooms-06', 'season-rooms-08', 'season-rooms-10', 'season-rooms-12', 'season-rooms-13', 'season-rooms-14', 'season-rooms-15', 'season-rooms-16', 'solid-roofs-02'],
      }),
    },

    /* ---------------- GLASS ENCLOSURES ---------------- */
    glass: {
      id: 5517, title: 'Sliding & Motorized Glass Enclosures', slug: 'glass-enclosures',
      build: () => {
        const p = {
          name: 'Sliding &amp; Motorized Glass Enclosures', kicker: 'Close the Weather. Keep the View.', hero: 'glide-glass-01', ctaText: 'Explore Glass Enclosure Options',
          lead: 'Protection from the elements without visually separating you from the outdoors.',
        };
        return [
          B.hero({ pill: 'Outdoor Living Systems', kicker: p.kicker, title: p.name, text: p.lead, bg: p.hero, buttons: [{ text: p.ctaText, url: U.contact }, { text: 'View Projects', url: U.projects }] }),
          B.split({ sub: 'Glass Enclosures', title: `Close the Weather. ${hl('Keep the View.')}`, images: ['glide-glass-08', 'glide-glass-10'],
            html: ps('Glass enclosure systems provide protection from the elements without visually separating you from the outdoors.',
              'Nashville Enclosures offers operable glass wall systems for residential and commercial spaces where maintaining large views and an indoor-outdoor connection is a priority.'),
            cta: [p.ctaText, U.contact] }),
          B.split({ sub: 'Sliding Glass Walls', title: `Protect the Space Without ${hl('Losing the View')}`, images: ['glide-glass-06'], reverse: true, bg: '#FFFFFF',
            html: ps('For clients who want greater protection from wind and weather without sacrificing the open feeling of their outdoor space, sliding glass walls provide a clean, architectural solution.',
              'The GLIDE frameless multi-slide system uses large tempered-glass panels with minimal vertical framing to create expansive, unobstructed views. When weather moves in, simply slide the panels closed to create a transparent barrier from the elements. When conditions are right, the panels stack together to reopen the space and reconnect you with the outdoors.')
              + h3('Large Glass. Minimal Sightlines.')
              + ps('Unlike traditional framed windows and walls, GLIDE is designed around large expanses of glass and minimal visual obstruction, creating a more refined, high-end finished appearance.',
                'Multiple track configurations allow the system to be customized around large openings, patios, outdoor rooms, louvered roofs, restaurants, and hospitality spaces.') }),
          B.split({ sub: 'Sliding Glass Walls', title: `Designed as a Complete ${hl('Outdoor Space')}`, images: ['glide-glass-11'],
            html: ps('For new projects, Nashville Enclosures can incorporate the glass system into the design from the beginning, coordinating the structure, openings, tracks, finishes, and surrounding systems for a clean, intentional result.',
              'Combine sliding glass with a louvered or insulated roof, retractable screens, infrared heaters, lighting, and fans to create an outdoor room that adapts to changing conditions.',
              '<strong>The goal isn’t to separate you from the outdoors — it’s to give you more opportunities to enjoy it.</strong>') }),
          B.gallery({ sub: 'Sliding Glass Walls', title: `GLIDE Frameless ${hl('Glass Projects')}`, images: ['glide-glass-02', 'glide-glass-03', 'glide-glass-04', 'glide-glass-05', 'glide-glass-07', 'glide-glass-16', 'glide-glass-12', 'glide-glass-13', 'glide-glass-15'], cols: 3 }),
          B.split({ sub: 'Motorized Vertical Glass', title: `Glass That Rises ${hl('and Lowers')}`, images: ['vertaslide-glass-01'], bg: '#FFFFFF',
            html: ps('For projects requiring a different type of opening, motorized vertical glass systems can raise or lower glass panels rather than sliding them horizontally.',
              'Vertaslide systems use electrically operated vertical glass and can be controlled through wireless controls, apps or compatible central control systems.',
              'These systems can be particularly effective for:') + list(['Restaurants', 'Bars', 'Hospitality spaces', 'Outdoor kitchens', 'Pool houses', 'Covered patios', 'Large residential entertaining areas'])
              + ps('The result is a space that can respond to changing weather without sacrificing the visual connection to the outdoors.'),
            cta: [p.ctaText, U.contact] }),
          B.gallery({ sub: 'Motorized Vertical Glass', title: `Vertaslide ${hl('Glass Projects')}`, images: ['vertaslide-glass-03', 'vertaslide-glass-06', 'vertaslide-glass-07', 'vertaslide-glass-08', 'vertaslide-glass-09', 'vertaslide-glass-11', 'vertaslide-glass-12', 'vertaslide-glass-13', 'vertaslide-glass-14'], cols: 3, button: { text: 'View All Projects', url: U.projects } }),
          processBand(),
          cta(p.ctaText, 'glide-glass-14'),
          B.effect(),
        ];
      },
    },

    /* ---------------- INFRARED HEATING ---------------- */
    heating: {
      id: 5518, title: 'Infrared Heating', slug: 'infrared-heating',
      build: product({
        name: 'Infrared Heating', short: 'Infrared Heating', kicker: 'Extend Patio Season.', hero: 'louvered-roofs-18', ctaText: 'Add Heat to Your Outdoor Space', ctaBg: 'commercial-13',
        lead: 'Targeted electric warmth that extends the comfortable use of your patio into cooler weather.',
        galleryTitle: `Heated ${hl('Outdoor Spaces')}`,
        sections: [
          { sub: 'Infrared Heating', title: `Extend ${hl('Patio Season')}`, images: ['commercial-13', 'heaters-05'],
            html: ps('A beautiful outdoor space is only valuable when it’s comfortable enough to use.',
              'Electric infrared heating can extend the usable season of patios, outdoor kitchens, restaurants and covered outdoor living areas by delivering targeted warmth where people actually gather.',
              'Nashville Enclosures integrates architectural infrared heating into both new structures and appropriate existing spaces.') },
          { sub: 'Integrated, Not Added On', title: `Heat Designed ${hl('Into the Space')}`, images: ['heaters-07'],
            html: ps('Rather than adding portable heaters after construction, we can incorporate electric heaters into the overall design of the structure.',
              'Depending on the project, heaters can be wall mounted, ceiling mounted or integrated using flush-mount components for a cleaner architectural appearance.',
              'Nashville Enclosures offers electric infrared systems across multiple wattages, finishes and mounting configurations for residential and commercial environments. Its 6,000-watt dual-element system, for example, uses medium-wave infrared technology and can be wall, ceiling, flush or pole mounted depending on the application.') },
          { sub: 'Year-Round Comfort', title: `Complete Outdoor ${hl('Comfort')}`, images: ['heaters-06'],
            html: ps('Infrared heating becomes especially effective when considered as part of the entire outdoor environment.',
              'Pair heating with retractable screens or glass walls to reduce exposure to wind, add a roof overhead for protection, and integrate fans and lighting to create a space designed for changing Tennessee weather.'),
            cta: ['Add Heat to Your Outdoor Space', U.contact] },
        ],
        gallery: ['heaters-01', 'heaters-02', 'heaters-03', 'heaters-04', 'heaters-08', 'heaters-09', 'heaters-10', 'heaters-11', 'heaters-12'],
      }),
    },

    /* ---------------- SCREEN ROOMS ---------------- */
    screenrooms: {
      id: null, title: 'Screen Rooms', slug: 'screen-rooms', parent: 5512,
      build: product({
        name: 'Screen Rooms', short: 'Screen Room', kicker: 'Fresh Air Without the Bugs.', hero: 'screen-rooms-03', ctaText: 'Enclose Your Patio', ctaBg: 'screen-rooms-13',
        lead: 'Custom aluminum screen enclosures designed for airflow, visibility and protection from insects.',
        sections: [
          { sub: 'Screen Rooms', title: `Fresh Air Without ${hl('the Bugs')}`, images: ['screen-rooms-01', 'screen-rooms-02'],
            html: ps('A custom screen room allows you to maintain the open feeling of a porch while creating a more comfortable and protected environment.',
              'Nashville Enclosures builds fixed aluminum screen enclosures for existing covered patios as well as complete new outdoor structures.') },
          { sub: 'Made to Measure', title: `Custom Built for ${hl('the Opening')}`, images: ['screen-rooms-07'],
            html: ps('Rather than relying on standard-size panels, our screen enclosures can be designed around the dimensions and architecture of the existing space.',
              'Our screen rooms use powder-coated aluminum framing and are available with different screen densities depending on the desired balance of airflow, visibility, sun reduction, wind reduction and privacy. Custom aluminum doors and chair rails can also be incorporated into the enclosure.') },
          { sub: 'Built to Last', title: `Simple. Durable. ${hl('Low Maintenance.')}`, images: ['screen-rooms-12'],
            html: ps('Screen rooms are an excellent solution for homeowners who want:')
              + list(['Protection from mosquitoes and other insects', 'Better control of sunlight', 'Additional privacy', 'Reduced wind', 'An enclosed area for children and pets', 'Protection for outdoor furniture', 'A cleaner, more usable patio environment'])
              + ps('Powder-coated aluminum framing provides a durable alternative to traditional painted wood screen construction and requires minimal ongoing maintenance.'),
            cta: ['Enclose Your Patio', U.contact] },
        ],
        gallery: ['screen-rooms-04', 'screen-rooms-06', 'screen-rooms-08', 'screen-rooms-09', 'screen-rooms-11', 'screen-rooms-14'],
      }),
    },

    /* ---------------- ARCHITECTURAL METAL ---------------- */
    metal: {
      id: 5520, title: 'Architectural Metal', slug: 'architectural-metal',
      build: product({
        name: 'Architectural Metal', short: 'Architectural Metal', kicker: 'The Look of Wood. The Durability of Aluminum.', hero: 'architectural-metal-02', ctaText: 'Design a Custom Architectural Feature', ctaBg: 'architectural-metal-05',
        lead: 'Privacy walls, cladding, ceilings, decorative panels and custom architectural features in low-maintenance aluminum.',
        galleryTitle: `Architectural ${hl('Aluminum Projects')}`,
        sections: [
          { sub: 'Architectural Metal', title: `Architectural Aluminum Without the ${hl('Maintenance of Wood')}`, images: ['architectural-metal-01', 'architectural-metal-16'],
            html: ps('Some of the most important elements of an outdoor project aren’t the roof or enclosure — they’re the details surrounding it.',
              'Nashville Enclosures designs and installs architectural aluminum features that can add privacy, texture, warmth and visual interest to residential and commercial spaces.',
              'Applications can include:') + list(['Privacy walls', 'Slat walls', 'Aluminum cladding', 'Ceilings and soffits', 'Accent walls', 'Fencing', 'Equipment screening', 'Outdoor kitchen surrounds', 'Decorative panels', 'Pergola elements', 'Commercial façades', 'Custom architectural features']) },
          { sub: 'Aluminum Cladding', title: `The Look of Wood. ${hl('The Durability of Aluminum.')}`, images: ['architectural-metal-09'],
            html: ps('Modern aluminum cladding systems are available in architectural colors as well as wood-inspired finishes, allowing us to create warm, natural-looking surfaces without many of the maintenance concerns associated with real wood.',
              'Our systems include concealed-fastener Click and Universal profiles designed for applications ranging from walls and ceilings to fences and exterior cladding. The systems are lightweight, resistant to rust, rot and pests, and available in numerous colors and textures.') },
          { sub: 'Laser-Cut Panels', title: `Decorative Aluminum &amp; ${hl('Soleil Panels')}`, images: ['architectural-metal-07'],
            html: ps('For projects requiring something more distinctive, our aluminum Pergo-Soleil panels provide laser-cut decorative aluminum elements that can be incorporated into privacy walls, shade structures, fencing and commercial architectural features.',
              'Architectural aluminum gives us the ability to solve functional problems while making the solution part of the design.'),
            cta: ['Design a Custom Architectural Feature', U.contact] },
        ],
        gallery: ['architectural-metal-04', 'architectural-metal-05', 'architectural-metal-06', 'architectural-metal-08', 'architectural-metal-10', 'architectural-metal-11', 'architectural-metal-12', 'architectural-metal-13', 'architectural-metal-14', 'architectural-metal-15', 'architectural-metal-17', 'architectural-metal-18'],
      }),
    },

    /* ---------------- COMMERCIAL ---------------- */
    commercial: {
      id: null, title: 'Commercial Outdoor Spaces', slug: 'commercial-outdoor-spaces', parent: 5512,
      build: product({
        name: 'Commercial Outdoor Structures &amp; Enclosures', short: 'Commercial', kicker: 'Commercial Outdoor Spaces Designed to Perform.', hero: 'commercial-12', ctaText: 'Discuss Your Commercial Project', ctaBg: 'commercial-08',
        lead: 'Custom structures and enclosure systems that help restaurants, hotels and commercial properties get more use from their exterior spaces.',
        galleryTitle: `Commercial ${hl('Projects')}`,
        sections: [
          { sub: 'Commercial Outdoor Spaces', title: `Turn Outdoor Square Footage Into ${hl('Productive Space')}`, images: ['commercial-02', 'commercial-05'],
            html: ps('For restaurants, hotels, bars, rooftops, event venues and commercial properties, an outdoor area represents valuable square footage.',
              'The challenge is making that square footage usable through changing sun, rain, wind, insects and temperature.',
              'Nashville Enclosures designs and builds custom commercial outdoor structures and enclosure systems that help businesses get more use from their exterior spaces.') },
          { sub: 'Single Point of Responsibility', title: `One Contractor. ${hl('Multiple Systems.')}`, images: ['commercial-07'],
            html: ps('Commercial outdoor projects often require more than one product.',
              'A restaurant patio, for example, may require a roof system, motorized screens, glass walls, heaters, lighting, fans and architectural metal — all working together.',
              'Nashville Enclosures can help coordinate these systems into a cohesive project rather than treating each one as an unrelated addition.')
              + h3('Commercial Solutions Include')
              + list(['Motorized louvered roofs', 'Cantilevered structures', 'Insulated roof systems', 'Retractable screens', 'Sliding glass walls', 'Motorized vertical glass', 'Fixed screen enclosures', 'Infrared heating', 'Lighting and fans', 'Privacy walls', 'Architectural aluminum', 'Cladding and decorative features']) },
          { sub: 'Preconstruction &amp; Design', title: `Built Around ${hl('Your Business')}`, images: ['commercial-14'],
            html: ps('Commercial projects have different priorities than residential construction.',
              'Guest comfort matters. Appearance matters. Seating capacity matters. Construction schedules matter. And downtime matters.',
              'Our process begins by understanding how the space needs to operate, then developing a solution around the property’s architecture, traffic flow and business requirements.',
              'For projects requiring engineering, permitting or coordination with architects, general contractors and other trades, we work through those requirements as part of the preconstruction and design process.'),
            cta: ['Discuss Your Commercial Project', U.contact] },
          { dark: {
            pill: 'Hospitality &amp; Commercial Applications', title: 'Our Systems Are Well Suited For', cols: 3,
            cards: [
              { title: 'Restaurants &amp; Bars', text: 'Protect patio seating and create a more comfortable environment through changing weather.', icon: 'fas fa-utensils' },
              { title: 'Hotels &amp; Resorts', text: 'Create premium outdoor guest areas around pools, restaurants, rooftops and gathering spaces.', icon: 'fas fa-hotel' },
              { title: 'Event &amp; Wedding Venues', text: 'Reduce weather uncertainty while maintaining the atmosphere of an outdoor venue.', icon: 'fas fa-glass-cheers' },
              { title: 'Multifamily &amp; Mixed-Use Developments', text: 'Create durable outdoor amenity spaces designed for frequent use.', icon: 'fas fa-building' },
              { title: 'Corporate &amp; Commercial Properties', text: 'Develop outdoor meeting, dining and gathering areas that complement the architecture of the property.', icon: 'fas fa-briefcase' },
            ],
          } },
        ],
        gallery: ['commercial-04', 'commercial-06', 'commercial-09', 'commercial-11', 'commercial-13', 'commercial-16', 'commercial-18', 'commercial-20', 'vertaslide-glass-06', 'vertaslide-glass-09', 'vertaslide-glass-12', 'vertaslide-glass-14'],
      }),
    },

    /* =========================== PROJECTS =========================== */
    projects: {
      id: 5521, title: 'Projects', slug: 'projects',
      build: () => {
        const R = B.range;
        const groups = [
          { title: 'Louvered Roofs', images: R('louvered-roofs', 20) },
          { title: 'Retractable Screens', images: R('retractable-screens', 18) },
          { title: 'Glass Enclosures', images: [...R('glide-glass', 18), ...R('vertaslide-glass', 14)] },
          { title: 'Season &amp; Screen Rooms', images: [...R('season-rooms', 16), ...R('screen-rooms', 14)] },
          { title: 'Patio Roofs &amp; Cantilevers', images: [...R('solid-roofs', 14), 'cantilever-01w', 'cantilever-03c'] },
          { title: 'Architectural Metal', images: R('architectural-metal', 18) },
          { title: 'Commercial', images: R('commercial', 20) },
        ];
        const gal = B.container({ content_width: 'boxed', boxed_width: { unit: 'px', size: 1200 }, flex_direction: 'column', background_background: 'classic', background_color: '#F9F9F9', padding: { unit: 'px', top: '70', right: '20', bottom: '90', left: '20', isLinked: false }, _element_id: 'gallery' }, [B.filterGallery(groups)], false);
        return [
          B.hero({ pill: 'Projects / Gallery', kicker: 'Explore Our Work. Find Inspiration. Start Designing Yours.', title: 'Built Throughout Middle Tennessee', text: 'Residential and commercial projects featuring louvered roofs, retractable screens, glass enclosures, seasonal rooms, cantilever structures, screen rooms and architectural aluminum.', bg: 'glide-glass-02', buttons: [{ text: 'Start Your Project', url: U.contact }, { text: 'View Products', url: U.products }], h: 58 }),
          B.intro({
            sub: 'Projects / Gallery', title: `Every Project Starts With ${hl('a Different Property')}`,
            html: ps('Every Nashville Enclosures project starts with a different property, a different challenge and a different vision.',
              'Explore completed residential and commercial projects featuring motorized louvered roofs, retractable screens, glass enclosures, seasonal rooms, cantilever structures, screen rooms and architectural aluminum.',
              'Our gallery isn’t intended simply to show individual products. It’s designed to show what’s possible when those products are thoughtfully combined into a complete outdoor space.'),
            bg: '#F9F9F9',
          }),
          gal,
          B.cta({ sub: 'Explore Our Work. Find Inspiration.', title: 'Start Designing Yours.', bg: 'louvered-roofs-04', html: '<p>Tell us about your property and how you want to use the space — we’ll help you design the right combination of systems.</p>', buttons: [{ text: 'Start Your Project', url: U.contact }, { text: 'View Products', url: U.products }] }),
          B.effect(),
        ];
      },
    },

    /* =========================== VIDEOS & RESOURCES =========================== */
    videos: {
      id: 5522, title: 'Videos & Resources', slug: 'videos-resources',
      build: () => {
        const featured = JSON.parse(JSON.stringify(NE.byId(NE.docs[5522].elements, 'ea0d992'))); // edit by original ids, re-id at the end
        // featured video card + side list of product guides
        const card = NE.byId([featured], 'aebe389');
        Object.assign(card.settings, { link: { url: U.louvered }, background_image: { id: NE.M('louvered-roofs-06').id, url: NE.M('louvered-roofs-06').url, source: 'library', size: '1536x1536' } });
        Object.assign(NE.byId([featured], '6408b17').settings, { title: 'Featured Video', header_size: 'div' });
        Object.assign(NE.byId([featured], '98980fe').settings, { title: 'Motorized Louvered Roofs', header_size: 'h3' });
        Object.assign(NE.byId([featured], '46d6656').settings, { editor: '<p>See how a motorized louvered roof opens for sunlight and fresh air, adjusts for shade and closes for weather protection.</p>' });
        const side = NE.byId([featured], 'c695e78');
        Object.assign(side.elements[0].settings, { title: 'Product Guides', header_size: 'h2' });
        const lineProto = side.elements[1];
        const guides = [['Louvered Roof Systems', U.louvered], ['Retractable Screens', U.screens], ['Glass Enclosures', U.glass], ['Three- &amp; Four-Season Rooms', U.seasons], ['Cantilever Structures', U.cantilever], ['Infrared Heating', U.heating], ['Screen Rooms', U.screenrooms], ['Architectural Aluminum', U.metal], ['Commercial Outdoor Spaces', U.commercial]];
        side.elements = [side.elements[0], ...guides.map(([t, u]) => {
          const l = NE.clone(lineProto);
          Object.assign(l.elements[0].settings, { link: { url: u } });
          const hd = NE.find([l], (e) => e.widgetType === 'heading');
          Object.assign(hd.settings, { title: t, header_size: 'h3' });
          const ic = NE.find([l], (e) => e.widgetType === 'icon');
          if (ic) Object.assign(ic.settings, { selected_icon: { value: 'fas fa-arrow-right', library: 'fa-solid' } });
          return l;
        })];
        NE.walk([featured], (e) => (e.id = NE.uid()));
        const testimonialVideo = {
          id: NE.uid(), elType: 'widget', widgetType: 'video',
          settings: { youtube_url: 'https://www.youtube.com/watch?v=zP1hCw9jOu0', show_image_overlay: 'yes', image_overlay: { id: NE.M('louvered-roofs-16').id, url: NE.M('louvered-roofs-16').url }, image_overlay_size: 'large', lightbox: '', aspect_ratio: '169', modestbranding: 'yes', yt_privacy: 'yes', rel: '', _border_radius: { unit: 'px', top: '15', right: '15', bottom: '15', left: '15', isLinked: true }, _css_classes: 'ne-video' },
          elements: [],
        };
        const mainVideo = { ...NE.clone(testimonialVideo), settings: { ...testimonialVideo.settings, youtube_url: 'https://www.youtube.com/watch?v=bQhgYTguZDM', image_overlay: { id: NE.M('louvered-roofs-02').id, url: NE.M('louvered-roofs-02').url } } };
        const videoRow = B.container({ content_width: 'boxed', boxed_width: { unit: 'px', size: 1200 }, flex_direction: 'column', padding: { unit: 'px', top: '20', right: '20', bottom: '90', left: '20', isLinked: false } }, [
          B.container({ flex_direction: 'column', flex_gap: { unit: 'px', size: 12, column: '12', row: '12', isLinked: true }, margin: { unit: 'px', top: '0', right: '0', bottom: '30', left: '0', isLinked: false } }, [B.sub('Product Demonstrations'), B.h2(`Watch &amp; ${hl('Learn')}`)]),
          B.grid(2, [
            B.container({ flex_direction: 'column', flex_gap: { unit: 'px', size: 12, column: '12', row: '12', isLinked: true } }, [mainVideo, B.h2('Motorized Louvered Roof Overview', { size: 20, tag: 'h3' })]),
            B.container({ flex_direction: 'column', flex_gap: { unit: 'px', size: 12, column: '12', row: '12', isLinked: true } }, [testimonialVideo, B.h2('Louvered Roof Project Walkthrough', { size: 20, tag: 'h3' })]),
          ], { gap: 30, tablet: 2 }),
        ], false);
        return [
          B.hero({ pill: 'Videos &amp; Resources', kicker: 'Informed Decisions Start Here.', title: 'Understand Your Options Before You Build', text: 'Product demonstrations, project walkthroughs, design considerations, budgets and answers to common questions.', bg: 'louvered-roofs-06', buttons: [{ text: 'Request a Consultation', url: U.contact }], h: 58 }),
          B.split({
            sub: 'Resource Center', title: `Understand Your Options ${hl('Before You Build')}`,
            html: ps('Outdoor living systems are a significant investment, and many of the products we install aren’t things homeowners purchase every day.',
              'Our resource center is designed to make the process easier to understand.',
              'Explore product demonstrations, project walkthroughs, design considerations, frequently asked questions, budget discussions and comparisons between different outdoor living systems.', 'Topics include:')
              + list(['Louvered roof systems', 'Retractable screens', 'Glass enclosures', 'Three- and four-season rooms', 'Cantilever structures', 'Infrared heating', 'Screen rooms', 'Architectural aluminum', 'Commercial outdoor spaces', 'Project budgets', 'Design considerations', 'Product maintenance', 'Frequently asked questions'])
              + ps('<strong>Our goal is to give you enough information to make an informed decision before your project ever begins.</strong>'),
            images: ['louvered-roofs-17', 'retractable-screens-09'],
          }),
          featured,
          videoRow,
          B.faq({
            sub: 'Common Questions', title: `Frequently Asked ${hl('Questions')}`, image: 'louvered-roofs-20',
            items: [
              ['What areas do you serve?', 'Nashville Enclosures designs and builds outdoor structures and enclosure systems for residential and commercial properties throughout Nashville, Middle Tennessee and all of Tennessee.'],
              ['Can I combine different systems in one project?', 'Yes. A louvered roof, for example, can integrate lighting, fans, infrared heaters, motorized retractable screens, glass enclosures, privacy walls and smart controls. We design the products together as one complete outdoor space rather than as unrelated additions.'],
              ['How much maintenance do your structures require?', 'Our structures use powder-coated aluminum designed for long-term exterior use. There is no regular staining or painting required, and aluminum will not rot or suffer termite damage.'],
              ['Can retractable screens be added to my existing covered patio?', 'In many cases, yes. Our retractable screen systems can be integrated into new outdoor structures or added to many existing covered patios, with face-mounted, undermounted or recessed installation options.'],
              ['Will I be able to see the design before construction?', 'For appropriate projects, we develop layouts, models and realistic renderings so you can visualize the finished space — including post locations, rooflines, colors and accessories — before construction begins.'],
              ['Do you handle engineering and permitting?', 'For projects requiring engineering or permitting, we coordinate the technical design necessary to move the project toward construction, including work with architects, general contractors and other trades on commercial projects.'],
              ['What happens after my project is complete?', 'We walk through the finished space with you, explain how to operate and care for each system, and provide maintenance, warranty and service information. If you need us later, we’re still here.'],
            ],
          }),
          B.cta({ sub: 'Still Have Questions?', title: 'The Process Starts With a Conversation', bg: 'season-rooms-08', html: '<p>Whether you already know exactly what you want or you’re still trying to determine the right solution, we’re happy to help.</p>', buttons: [{ text: 'Request a Consultation', url: U.contact }, { text: 'Call (630) 303-1666', url: TEL }] }),
          B.effect(),
        ];
      },
    },
  });
})();
