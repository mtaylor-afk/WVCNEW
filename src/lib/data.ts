export const siteData = {
  company: {
    name: "WV Construction",
    tagline: "Building excellence across the Wirral Peninsula.",
    phone: "07XXX XXX XXX",
    email: "info@wvconstructionltd.co.uk",
    location: "Wallasey, Wirral, Merseyside",
    hours: "Mon–Sat, 7:30am – 6:00pm",
    companyNo: "12345678",
    vatNo: "123456789",
    founded: "Est. on the Peninsula",
    place: "Wallasey, Wirral",
  },

  nav: {
    links: [
      { label: "Services", href: "#services" },
      { label: "About", href: "#why-us" },
      { label: "Reviews", href: "#testimonials" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
    cta: "Get a Quote",
  },

  hero: {
    label: "Wallasey, Wirral · Est. on the Peninsula",
    headline: ["Building Excellence", "Across the Wirral."],
    subheadline:
      "WV Construction LTD delivers exceptional building and maintenance services across the Wirral Peninsula. Every project finished to the standard you deserve.",
    cta: {
      primary: "Get a Free Quote",
      secondary: "Our Services",
    },
    stats: [
      { number: "200+", label: "Projects Completed" },
      { number: "5.0 ★", label: "Average Rating" },
      { number: "15+", label: "Years on Wirral" },
    ],
    marquee:
      "RENOVATION  ◆  EXTENSIONS  ◆  ROOFING  ◆  BRICKWORK  ◆  MAINTENANCE  ◆  WIRRAL  ◆  RENOVATION  ◆  EXTENSIONS  ◆  ROOFING  ◆  BRICKWORK  ◆  MAINTENANCE  ◆  WIRRAL  ◆  ",
  },

  services: {
    label: "What We Do",
    heading: "Every Project. Done Right.",
    items: [
      {
        id: "renovations",
        name: "Full Renovations",
        icon: "Home",
        description:
          "Complete home transformations from structural work to finishing touches. We manage every trade, every detail, every step of the way.",
        hero: "Complete home transformations, managed end-to-end.",
        detail:
          "A full renovation is one of the most significant investments you can make in your property. WV Construction takes ownership of the entire project — coordinating every trade, managing every timeline, and ensuring every detail is finished to the highest standard. From strip-out through to decoration, we're with you at every step.",
        features: [
          "Full project management from first visit to final handover",
          "All trades coordinated by us — no juggling contractors",
          "Structural, electrical, plumbing, plastering and decoration",
          "Fixed price — what we quote is what you pay",
          "Daily site tidiness and regular progress updates",
          "Workmanship guarantee on all completed work",
        ],
      },
      {
        id: "extensions",
        name: "Extensions & Loft Conversions",
        icon: "Maximize2",
        description:
          "Thoughtfully designed extensions that blend seamlessly with your existing property. Structural expertise with an eye for proportion.",
        hero: "Intelligent extensions that increase space, value, and livability.",
        detail:
          "Adding space to your home should feel seamless — as though it was always there. Our extensions and loft conversions are structurally sound, beautifully finished, and designed to complement your existing property. We handle everything from foundations to final coat, including guidance on planning requirements.",
        features: [
          "Single and double storey rear and side extensions",
          "Full and partial loft conversions with Velux or dormer options",
          "Structural calculations and planning application guidance",
          "Foundations, brickwork and roof integration",
          "All internal trades: electrical, plumbing, plastering",
          "Insulated to current building regulations standards",
        ],
      },
      {
        id: "maintenance",
        name: "Building Maintenance",
        icon: "Wrench",
        description:
          "Ongoing maintenance contracts and one-off repairs. We keep properties in exceptional condition, proactively and efficiently.",
        hero: "Keep your property in exceptional condition, always.",
        detail:
          "Whether you own a single home or a portfolio of rental properties, WV Construction provides reliable maintenance services that keep everything running smoothly. We respond fast, work cleanly, and carry out every job — large or small — to the same high standard. Ideal for landlords, estate managers, and homeowners alike.",
        features: [
          "Rolling monthly maintenance contracts available",
          "Emergency call-out response for urgent repairs",
          "Planned preventative maintenance programmes",
          "General repairs: plastering, tiling, joinery, painting",
          "Landlord compliance works and condition surveys",
          "Trusted by multiple Wirral landlords and letting agents",
        ],
      },
      {
        id: "roofing",
        name: "Roofing",
        icon: "Triangle",
        description:
          "Flat roofs, pitched roofs, re-roofing, and repairs. Fully certified, guaranteed workmanship on every roofing project.",
        hero: "Fully certified roofing, guaranteed to last.",
        detail:
          "Your roof is your home's first line of defence. WV Construction carries out all roofing work to the highest standard, using quality materials and proven techniques. Every project is completed by experienced roofers and backed by a workmanship guarantee — whether it's a minor repair or a full re-roof.",
        features: [
          "Pitched roof installation, re-roofing and repairs",
          "Flat roof installation using EPDM and GRP systems",
          "New felt, battens, and natural or concrete slates",
          "Ridge repointing and hip tile re-bedding",
          "Guttering, fascias, soffits and downpipe installation",
          "Full workmanship guarantee on all roofing projects",
        ],
      },
      {
        id: "kitchens",
        name: "Kitchen & Bathroom Fitting",
        icon: "LayoutGrid",
        description:
          "High-specification kitchen and bathroom installations. Supply and fit, or fit-only — exactly as you need it.",
        hero: "High-specification kitchens and bathrooms, fitted to perfection.",
        detail:
          "A well-fitted kitchen or bathroom transforms daily life. WV Construction installs to a meticulous standard — every unit level, every tile perfect, every fixture properly seated. We work with your chosen supplier or can source units, sanitaryware and appliances on your behalf. The result is a space that functions flawlessly and looks exceptional.",
        features: [
          "Full kitchen installation including supply-and-fit option",
          "Bathroom and en-suite fitting to full specification",
          "All associated plumbing and electrical first and second fix",
          "Floor and wall tiling with precision layout and grouting",
          "Bespoke storage and cabinetry solutions",
          "Luxury finishes and premium fixture options available",
        ],
      },
      {
        id: "brickwork",
        name: "Brickwork & Rendering",
        icon: "Layers",
        description:
          "Expert brickwork, repointing, and rendering services. Clean lines, solid construction, beautiful results.",
        hero: "Expert masonry that stands the test of time.",
        detail:
          "Good brickwork and rendering is both structural and decorative — it needs to be built correctly and look beautiful. Our experienced masons deliver clean lines, accurate coursing, and durable finishes on every job. From new-build blockwork to heritage repointing, we bring the same level of craft to every project.",
        features: [
          "New brickwork and blockwork construction",
          "Repointing of existing brickwork in matching mortars",
          "Sand and cement render application and repairs",
          "Silicone through-colour render systems",
          "Garden walls, boundary structures and pillars",
          "Decorative stonework and architectural detailing",
        ],
      },
    ],
  },

  whyUs: {
    label: "Why Choose Us",
    heading: "Wirral's Most Trusted Construction Team.",
    body: "Every review WV Construction has ever received online is five stars. Not because we ask for reviews — because we earn them.",
    features: [
      {
        icon: "Star",
        title: "100% Five-Star Reviews",
        description:
          "Every single online review is five stars. Our reputation is built on results.",
      },
      {
        icon: "Shield",
        title: "Fixed Price Guarantees",
        description:
          "What we quote is what you pay. No surprises, no hidden extras.",
      },
      {
        icon: "MapPin",
        title: "Local Wirral Team",
        description:
          "Based in Wallasey. We know the Peninsula, we respond fast, and we care about our community.",
      },
      {
        icon: "Award",
        title: "Quality That Lasts",
        description:
          "We use premium materials and back our workmanship with a guarantee.",
      },
    ],
    rating: {
      score: "5.0 / 5.0 average",
      label: "Based on all online reviews",
    },
  },

  testimonials: {
    label: "Customer Reviews",
    heading: "What the Wirral Thinks.",
    reviews: [
      {
        name: "Sarah T.",
        location: "Wallasey",
        stars: 5,
        quote:
          "WV Construction transformed our kitchen and bathroom beyond anything I imagined. From the very first consultation, they listened carefully to what we wanted and delivered exactly that — on time and exactly on budget. The team was polite, kept the house spotless every single day, and the quality of the finishing is outstanding. I've had so many compliments from visitors. Genuinely could not recommend them more highly.",
      },
      {
        name: "Mark D.",
        location: "West Kirby",
        stars: 5,
        quote:
          "I had WV Construction carry out a full renovation of our Victorian terrace — new electrics, full replumb, all internal walls skimmed and redecorated throughout, new flooring downstairs, and a complete bathroom and en-suite fit out. It was a big project and I was nervous, but they were completely transparent at every stage. The price never moved from the quote. The result is extraordinary — it feels like a different house. Brilliant team.",
      },
      {
        name: "Helen R.",
        location: "Heswall",
        stars: 5,
        quote:
          "Our rear extension was handled from planning through to final handover by WV Construction and they were exceptional throughout. Every trade they brought in was professional and tidy. Communication was superb — I always knew what was happening and when. The extension has genuinely transformed how we live in our home. It's beautifully built and finished to a very high standard. Worth every penny.",
      },
      {
        name: "Dave W.",
        location: "Birkenhead",
        stars: 5,
        quote:
          "Had them re-roof the entire property — stripped back, new felt and battens, new slates throughout, and the ridge repointed. They were on site when they said they would be, worked cleanly, and finished ahead of schedule. The price was fair and competitive and there were no hidden extras. Roof looks brilliant and I feel reassured knowing it's been done properly. Great company.",
      },
      {
        name: "Julie H.",
        location: "Hoylake",
        stars: 5,
        quote:
          "We have WV Construction on a rolling maintenance contract for our rental properties and they are absolutely invaluable. They respond quickly, the work is always done to a high standard, and the tenants are always happy with how respectful and tidy the team are. Having a reliable, trustworthy building company you can call on is rare — we found that in WV Construction. Highly recommended to any landlord on the Wirral.",
      },
      {
        name: "Tom B.",
        location: "Bebington",
        stars: 5,
        quote:
          "Full re-render of the house exterior plus full repaint — what a transformation. WV Construction came highly recommended and they absolutely lived up to it. The rendering is perfectly flat and smooth and the paintwork is immaculate. They even noticed a small area of damaged brickwork and sorted it out without being asked or charging extra. That kind of care and attention to detail is rare. Brilliant job, brilliant company.",
      },
    ],
  },

  process: {
    label: "How It Works",
    heading: "Simple. Transparent. Done.",
    steps: [
      {
        number: "01",
        title: "Free Consultation",
        description:
          "We visit your property, discuss your needs, and listen carefully.",
      },
      {
        number: "02",
        title: "Clear Written Quote",
        description:
          "A detailed, itemised quote with no ambiguity. What we quote is what you pay.",
      },
      {
        number: "03",
        title: "Work Begins",
        description:
          "Our team arrives on schedule. Your property is kept clean and you are kept informed.",
      },
      {
        number: "04",
        title: "Sign-Off & Aftercare",
        description:
          "We walk through the finished work with you and remain contactable long after completion.",
      },
    ],
  },

  quote: {
    label: "Get in Touch",
    heading: "Let's Build Something\nTogether.",
    body: "Fill in the form and we'll come back to you within one working day with a free, no-obligation consultation.",
    services: [
      "Full Renovation",
      "Extension / Loft Conversion",
      "Building Maintenance",
      "Roofing",
      "Kitchen & Bathroom Fitting",
      "Brickwork & Rendering",
      "Other",
    ],
    button: "REQUEST YOUR FREE QUOTE",
    success: {
      heading: "Thank you.",
      body: "We'll be in touch within one working day.",
    },
  },

  footer: {
    tagline: "Building excellence across the Wirral Peninsula.",
    nav: {
      heading: "Navigation",
      links: [
        { label: "Services", href: "#services" },
        { label: "About", href: "#why-us" },
        { label: "Reviews", href: "#testimonials" },
        { label: "Process", href: "#process" },
        { label: "Contact", href: "#contact" },
      ],
    },
    company: {
      heading: "Company",
      companyNo: "12345678",
      vatNo: "123456789",
      registered: "Wallasey, Wirral, Merseyside",
    },
    copyright:
      "© 2024 WV Construction LTD · All rights reserved · Wallasey, Wirral",
  },
};

  ourWork: {
    label: "Our Work",
    headline: ["Completed Projects", "Across the Wirral."],
    subheadline:
      "Every project below is an example of the type of work we carry out for homeowners across the Wirral Peninsula. Real trades, real results, and an honest account of what each job involved.",
    cta: {
      primary: "Request a Quote",
      secondary: "Speak to Us",
    },
    trustIntro: {
      heading: "Real projects. Real homeowners. Real results.",
      body: "We know that choosing a builder is a significant decision, and that most homeowners want to see genuine examples of completed work before they pick up the phone. Below you'll find one realistic example for each of the services we offer — drawn from our experience working with homeowners across the Wirral.",
      sub: "WV Construction manages every project from the initial consultation through to final sign-off, coordinating all required trades and keeping you informed at every stage of the build.",
    },
    projects: [
      {
        id: "renovation-wallasey",
        serviceId: "renovations",
        serviceLabel: "Full Renovation",
        title: "Victorian Terrace Full Renovation",
        location: "Wallasey",
        overview:
          "A complete internal renovation of a three-bedroom Victorian terrace, stripped back to brick and rebuilt to a modern specification whilst retaining the character of the original property.",
        challenge:
          "The property had not been seriously touched in over thirty years. The electrics were outdated and failing, the plumbing had corroded in several areas, all internal plasterwork needed stripping and replacing, and the kitchen and bathroom were well past the point of repair. The owners wanted a fully managed renovation without the stress of coordinating multiple contractors themselves.",
        solution:
          "WV Construction managed the project end-to-end: full rewire with new consumer unit, new first-fix plumbing throughout, all walls hacked back and re-skimmed, new kitchen supply and installation, new bathroom suite, engineered oak flooring to the ground floor, and full redecoration throughout.",
        result:
          "A completely transformed family home delivered on time and exactly on budget. The owners described the finished result as feeling like a different house. The property was revalued significantly higher following completion.",
        included: [
          "Full electrical rewire with new consumer unit",
          "Complete first and second fix plumbing",
          "Full internal re-plaster throughout",
          "New kitchen supply and installation",
          "New bathroom suite supply and installation",
          "Engineered oak flooring, ground floor",
          "Full internal redecoration",
          "Project management from day one to handover",
        ],
        tags: ["Full Renovation", "Victorian Terrace", "Wallasey"],
        imageAlt: "Renovated Victorian terrace interior, Wallasey",
        imageBg: "linear-gradient(150deg, #2A2A2C 0%, #3C3C3E 60%, #2A2A2C 100%)",
      },
      {
        id: "extension-heswall",
        serviceId: "extensions",
        serviceLabel: "Extensions & Loft Conversions",
        title: "Single-Storey Rear Extension",
        location: "Heswall",
        overview:
          "A single-storey rear extension creating an open-plan kitchen-dining space for a young family, with a flat EPDM roof, bi-fold doors to the garden, and a fully glazed roof lantern.",
        challenge:
          "The existing rear kitchen was small, poorly laid out, and disconnected from the garden. The owners wanted to open up the back of the house substantially, create a proper kitchen-diner, and bring in significantly more natural light — without pushing the footprint further than planning would comfortably allow.",
        solution:
          "We designed and built a 4m by 5m rear extension with a flat EPDM roof, a central glazed roof lantern, and full-width bi-fold doors to the garden. Structurally, the existing rear wall was partially removed and an RSJ installed. The extension was insulated to current building regulation standards and all internal finishes were matched to the existing property.",
        result:
          "A generous, light-filled kitchen-diner that transformed daily family life. The extension added meaningful floor space and noticeably improved the property's value and appeal.",
        included: [
          "Planning application guidance and structural drawings",
          "Foundations, blockwork and facing brickwork",
          "Flat EPDM roof with central glazed roof lantern",
          "Bi-fold door supply and installation",
          "Internal structural opening with RSJ",
          "Electrical and plumbing first and second fix",
          "Plastering, flooring and full decoration",
          "Building regulations sign-off",
        ],
        tags: ["Rear Extension", "Open-Plan Kitchen", "Heswall"],
        imageAlt: "Single-storey rear extension with roof lantern, Heswall",
        imageBg: "linear-gradient(150deg, #1E1E20 0%, #2C2C2E 60%, #1E1E20 100%)",
      },
      {
        id: "maintenance-birkenhead",
        serviceId: "maintenance",
        serviceLabel: "Building Maintenance",
        title: "Landlord Maintenance Contract",
        location: "Birkenhead",
        overview:
          "An ongoing rolling maintenance contract for a portfolio of six residential rental properties in Birkenhead, covering both planned preventative maintenance and reactive repairs throughout the year.",
        challenge:
          "The landlord had been managing repairs through a series of uncoordinated tradespeople, resulting in inconsistent quality, delayed responses, and frustrated tenants. They needed a single reliable contractor to take full ownership of all maintenance across the portfolio.",
        solution:
          "WV Construction took on a rolling monthly contract covering all maintenance across the portfolio. This includes quarterly inspection visits, a fast response to tenant repair requests, and a schedule of planned works to keep all six properties in good lettable condition throughout the year.",
        result:
          "Tenant satisfaction improved, void periods reduced as properties are returned to lettable condition faster, and the landlord stepped back from day-to-day management entirely. All work is invoiced clearly on a monthly basis.",
        included: [
          "Quarterly property inspections across all six units",
          "Rapid reactive response to tenant repair requests",
          "Plastering, joinery, tiling and painting repairs",
          "Bathroom and kitchen remedial works",
          "External maintenance: gutters, pointing, paintwork",
          "End-of-tenancy condition reinstatement works",
          "Monthly itemised invoice and written report",
        ],
        tags: ["Maintenance Contract", "Rental Portfolio", "Birkenhead"],
        imageAlt: "Rental property maintenance and repair work, Birkenhead",
        imageBg: "linear-gradient(150deg, #2A2A2C 0%, #383838 60%, #2A2A2C 100%)",
      },
      {
        id: "roofing-west-kirby",
        serviceId: "roofing",
        serviceLabel: "Roofing",
        title: "Full Re-Roof — Detached Property",
        location: "West Kirby",
        overview:
          "A complete re-roof of a four-bedroom detached property, stripping existing worn tiles and deteriorated felt and reinstating with new breathable felt, treated battens, and natural Welsh slate throughout.",
        challenge:
          "The existing roof was over forty years old. Slates were slipping and cracking across multiple elevations, the underlying felt had failed in several areas, and the ridge had shifted. The property was showing signs of water ingress, particularly around the chimney stacks.",
        solution:
          "A full strip and re-roof was carried out: new breathable felt laid, new treated timber battens, natural Welsh slate installed throughout, new lead flashing formed around both chimney stacks, the ridge repointed, and all hip tiles re-bedded in fresh mortar.",
        result:
          "A watertight, beautifully finished roof with a natural slate appearance well suited to the character of the property. A full workmanship guarantee was issued and the owners have had no further issues.",
        included: [
          "Full strip of existing slates, felt and battens",
          "New breathable roofing felt throughout",
          "New treated timber battens",
          "Natural Welsh slate installation",
          "Lead flashing to both chimney stacks",
          "Ridge repointing and hip tile re-bedding",
          "Guttering inspection and downpipe replacement",
          "Full workmanship guarantee",
        ],
        tags: ["Full Re-Roof", "Natural Welsh Slate", "West Kirby"],
        imageAlt: "Full re-roof with natural Welsh slate, West Kirby",
        imageBg: "linear-gradient(150deg, #1E1E20 0%, #2C2C2E 60%, #1E1E20 100%)",
      },
      {
        id: "kitchen-bathroom-bebington",
        serviceId: "kitchens",
        serviceLabel: "Kitchen & Bathroom Fitting",
        title: "Kitchen Replacement & En-Suite Installation",
        location: "Bebington",
        overview:
          "A full kitchen replacement and new en-suite installation in a semi-detached property — supply and fit on the kitchen, fit-only on the en-suite, with all associated plumbing, electrical and tiling works carried out by our team.",
        challenge:
          "The existing kitchen was poorly laid out, low quality, and well overdue for replacement. The master bedroom had the footprint for an en-suite but had never been converted. The owners wanted both projects completed simultaneously to minimise disruption and achieve a consistent finish throughout.",
        solution:
          "The old kitchen was stripped and a new layout planned to improve workflow and worktop space. A full new kitchen was supplied and installed with integrated appliances. In parallel, the en-suite was built from the bedroom space — stud walling, full waterproofing and tanking, large-format floor and wall tiling, sanitaryware installation, and all associated plumbing and electrical.",
        result:
          "Two fully completed, beautifully finished rooms delivered within a three-week programme. The kitchen is now the centrepiece of the ground floor and the en-suite has been a genuine quality-of-life improvement for the family.",
        included: [
          "Kitchen design consultation and full supply",
          "Full kitchen strip-out and installation",
          "Integrated appliance connection",
          "En-suite stud wall and doorway formation",
          "Full waterproofing and tanking",
          "Large-format floor and wall tiling",
          "Sanitaryware and heated towel rail installation",
          "All associated plumbing and electrical works",
        ],
        tags: ["Kitchen Fitting", "En-Suite", "Bebington"],
        imageAlt: "New kitchen and en-suite fitting, Bebington",
        imageBg: "linear-gradient(150deg, #2A2A2C 0%, #383838 60%, #2A2A2C 100%)",
      },
      {
        id: "brickwork-hoylake",
        serviceId: "brickwork",
        serviceLabel: "Brickwork & Rendering",
        title: "Full External Re-Render",
        location: "Hoylake",
        overview:
          "Complete removal of the original failed sand and cement render from a 1930s semi-detached property, followed by application of a modern silicone through-colour render system — transforming the external appearance of the property.",
        challenge:
          "The original render had reached the end of its useful life: cracked in multiple areas, stained, and no longer weathertight. Isolated patch repairs had been attempted twice and failed each time. The only long-term solution was a full strip and re-render.",
        solution:
          "All existing render was hacked off back to the original brickwork. The substrate was inspected and minor brick repairs were carried out before a basecoat was applied. A through-colour silicone render system was then applied to all elevations. Silicone render is flexible, breathable, and self-cleaning, requiring no future painting.",
        result:
          "A completely rejuvenated exterior that the owners described as looking like a new house. The silicone system is guaranteed and maintenance-free, making it a sound long-term investment.",
        included: [
          "Scaffold erection and dismantling",
          "Full strip of existing render to brickwork",
          "Brick inspection, repair and substrate preparation",
          "Application of bonding slurry coat",
          "Silicone through-colour basecoat",
          "Silicone through-colour finish coat",
          "Window and door bead and detail formation",
          "External sill reinstatement",
        ],
        tags: ["External Render", "Silicone System", "Hoylake"],
        imageAlt: "Full external re-render in silicone system, Hoylake",
        imageBg: "linear-gradient(150deg, #1E1E20 0%, #2C2C2E 60%, #1E1E20 100%)",
      },
    ],
    verifiedReviews: {
      platform: "MyBuilder",
      url: "https://www.mybuilder.com/",
      claim:
        "Our reviews on MyBuilder are independently posted by homeowners after work is completed and verified by the platform — we don't select which reviews appear or moderate what is written.",
      cta: "View our reviews on MyBuilder",
      note: "MyBuilder is a third-party platform. Reviews are posted and hosted independently.",
    },
  },
};

export type SiteData = typeof siteData;
export type ServiceItem = (typeof siteData.services.items)[number];
export type Review = (typeof siteData.testimonials.reviews)[number];
export type ProcessStep = (typeof siteData.process.steps)[number];
export type OurWorkProject = (typeof siteData.ourWork.projects)[number];
