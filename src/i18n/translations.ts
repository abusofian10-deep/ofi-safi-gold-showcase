export type Language = 'ar' | 'en';

export interface TranslationDict {
  header: {
    brandTitle: string;
    screens: string[];
    prevTooltip: string;
    nextTooltip: string;
    fullscreenTooltip: string;
    exitFullscreenTooltip: string;
  };
  footer: {
    tagline: string;
    clientName: string;
    madeInOman: string;
  };
  screen1: {
    badge: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    subheadline: string;
    subheadlineProduct: string;
    subheadlineRest: string;
    tabMilk: string;
    tabMozzarella: string;
    beforeLabelMilk: string;
    afterLabelMilk: string;
    taglineMilk: string;
    beforeLabelMozzarella: string;
    afterLabelMozzarella: string;
    taglineMozzarella: string;
    sliderHint: string;
    diagnosisTitle: string;
    card1Title: string;
    card1Tag: string;
    card1Text: string;
    card2Title: string;
    card2Tag: string;
    card2Text: string;
    card3Title: string;
    card3Tag: string;
    card3Text: string;
  };
  screen2: {
    sectionTag: string;
    headlinePrefix: string;
    headlineProduct: string;
    headlineSuffix: string;
    subheadline: string;
    phoneCaption: string;
    phoneBadge: string;
    card1Title: string;
    card1Tag: string;
    card1Text: string;
    card2Title: string;
    card2Tag: string;
    card2Text: string;
    card3Title: string;
    card3Tag: string;
    card3Text: string;
    summaryLabel: string;
    summaryText: string;
    modalTitle: string;
  };
  screen3: {
    sectionTag: string;
    headlinePrefix: string;
    headlineProduct: string;
    headlineSuffix: string;
    subheadline: string;
    phoneCaption: string;
    phoneBadge: string;
    card1Title: string;
    card1Tag: string;
    card1Text: string;
    card2Title: string;
    card2Tag: string;
    card2Text: string;
    card3Title: string;
    card3Tag: string;
    card3Text: string;
    summaryLabel: string;
    summaryText: string;
    modalTitle: string;
  };
  screen4: {
    sectionTag: string;
    headlinePrefix: string;
    headlineHighlight: string;
    subheadline: string;
    phoneCaption: string;
    phoneBadge: string;
    card1Title: string;
    card1Tag: string;
    card1Text: string;
    card2Title: string;
    card2Tag: string;
    card2Text: string;
    card3Title: string;
    card3Tag: string;
    card3Text: string;
    summaryLabel: string;
    summaryText: string;
    modalTitle: string;
  };
  screen5: {
    sectionTag: string;
    headlinePrefix: string;
    headlineHighlight: string;
    headlineSuffix: string;
    subheadline: string;
    deliverablesLabel: string;
    steps: Array<{
      stepNumber: string;
      phase: string;
      title: string;
      timeline: string;
      summary: string;
      deliverables: string[];
    }>;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
    ctaButtonCelebrated: string;
  };
}

export const translations: Record<Language, TranslationDict> = {
  ar: {
    header: {
      brandTitle: 'أومني تيرنكي للاستشارات الإدارية والحوكمة',
      screens: [
        'الغلاف والتشخيص',
        'صناعة الطلب (B2C)',
        'التفاوض مع الهايبرات (B2B)',
        'الحوكمة وسلسلة الإمداد',
        'خارطة الطريق والتنفيذ',
      ],
      prevTooltip: 'الشاشة السابقة (السهم الأيمن)',
      nextTooltip: 'الشاشة التالية (السهم الأيسر)',
      fullscreenTooltip: 'وضع العرض الكامل للبريزنتيشن',
      exitFullscreenTooltip: 'إنهاء وضع العرض',
    },
    footer: {
      tagline: 'الاستشارات الإدارية والحوكمة وبناء العلامات التجارية',
      clientName: 'عبر البحار للصناعات الغذائية (OFI)',
      madeInOman: 'صنع في عُمان',
    },
    screen1: {
      badge: 'Omni Turnkey × عبر البحار للصناعات الغذائية (OFI)',
      headlinePart1: 'من منتج مصنع.. إلى',
      headlineHighlight: 'براند عُماني',
      headlinePart2: 'يفرض نفسه على كل رف',
      subheadline: 'كيف نحوّل الجودة الفعلية لمنتجات',
      subheadlineProduct: '"صافي الذهبي"',
      subheadlineRest: 'إلى قوة طلب لدى المستهلك، وقوة تفاوضية أمام الهايبرات الكبرى؟',
      tabMilk: 'حليب صافي الذهبي',
      tabMozzarella: 'موزاريلا صافي الذهبي',
      beforeLabelMilk: 'التصوير الحالي',
      afterLabelMilk: 'الظهور التجاري الاحترافي',
      taglineMilk: 'النقلة من مجرد صورة منتج إلى لقطة حيوية تثير الرغبة في الشراء',
      beforeLabelMozzarella: 'التصميم المسطح الحالي',
      afterLabelMozzarella: 'التجسيم التجاري الاحترافي',
      taglineMozzarella: 'النقلة من كيس مسطح بارد إلى تجسيم ثلاثي الأبعاد يُبرز الجودة والذوبان',
      sliderHint: 'اسحب المقبض يميناً ويساراً للمقارنة',
      diagnosisTitle: 'التشخيص الاستراتيجي للواقع والفرصة',
      card1Title: 'قوة المنتج الحقيقية',
      card1Tag: 'ميزة استثنائية',
      card1Text: 'صناعة عُمانية موثوقة وموزاريلا بدهون حيوانية 100% — ميزة تنافسية نادرة وقوية ولكنها غير مستغلة بصرياً وتجارياً على واجهة العبوة.',
      card2Title: 'فجوة تشتت الهوية',
      card2Tag: 'تحدي تسويقي',
      card2Text: 'اختلاف شكل شعار "صافي الذهبي" بين عبوات الحليب والموزاريلا يضعف الربط الذهني لدى المستهلك ويضيع فرص البيع المتقاطع (Cross-Selling) كعائلة واحدة.',
      card3Title: 'معادلة النمو (B2B2C)',
      card3Tag: 'سرعة الدوران',
      card3Text: 'الهايبرات الكبرى لا تشتري من مصانع تبحث عن تصريف إنتاج، بل تشتري براندات مطلوبة تتحرك بسرعة من على الرف وتضمن لهم هوامش وسيولة.',
    },
    screen2: {
      sectionTag: 'المحور الأول | استراتيجية السحب (B2C)',
      headlinePrefix: 'المستهلك الذي يطلب',
      headlineProduct: '"صافي الذهبي"',
      headlineSuffix: 'بالاسم',
      subheadline: 'صناعة رغبة الشراء العاطفية والحسية قبل أن تطأ قدم المستهلك أرض الهايبر ماركت',
      phoneCaption: 'عينة حية (1) — فيديو المستهلك (20 ثانية)',
      phoneBadge: 'فيديو B2C رأسي 9:16',
      card1Title: 'الانتقال من المواصفات إلى الشهية',
      card1Tag: 'Appetite Appeal',
      card1Text: 'إبراز لحظة الاستخدام اليومي، وسرعة الذوبان، ومطّة الموزاريلا الذهبية، وتدفق الحليب الطازج، لتحويل التردد الذهني إلى رغبة شراء حسية فورية لا تُقاوم.',
      card2Title: 'بناء الوعي قبل دخول الهايبر',
      card2Tag: 'Pre-Store Recall',
      card2Text: 'محتوى بصري قصير ومكثّف (Short-Form 9:16) يرسخ شكل العبوة الذهبية وعلامة "صنع في عُمان"، فتتجه عين المستهلك تلقائياً نحو عبوة "صافي الذهبي" متجاهلة المنافسين.',
      card3Title: 'الأثر المباشر: قوة السحب',
      card3Tag: 'Pull Strategy',
      card3Text: 'تحويل كل ريال يُنفق تسويقياً إلى طلب مستهلك حقيقي في الفروع؛ مما يفرض ضغطاً إيجابياً متواصلاً على مدراء المشتريات لتوفير المنتج باستمرار.',
      summaryLabel: 'النتيجة للمصنع:',
      summaryText: 'تقليل الاعتماد على العروض السعرية القاسية وحماية هوامش الربح',
      modalTitle: 'عينة حية (1) — فيديو المستهلك B2C (صافي الذهبي)',
    },
    screen3: {
      sectionTag: 'المحور الثاني | التموضع التجاري (B2B)',
      headlinePrefix: 'لماذا يكسب الهايبر ماركت مع',
      headlineProduct: '"صافي الذهبي"',
      headlineSuffix: '؟',
      subheadline: 'تحويل منتجات OFI من مجرد أصناف على الرف إلى "Shelf-Stopper" عالي الربحية والدوران',
      phoneCaption: 'عينة حية (2) — فيديو إقناع الهايبرات (25 ثانية)',
      phoneBadge: 'فيديو B2B إقناعي 9:16',
      card1Title: 'حجز مساحة الرف كعائلة واحدة',
      card1Tag: 'Brand Block',
      card1Text: 'توحيد لغة التصميم والهوية البصرية بين الحليب والموزاريلا يصنع كتلة بصرية ذهبية موحدة (Shelf Monopoly) تخطف أنظار المتسوق وتلغي تشتت الهوية تماماً.',
      card2Title: 'سلاح بيعي لفريق المبيعات',
      card2Tag: 'B2B Sales Enablement',
      card2Text: 'تزويد مندوبي ومسؤولي مبيعات OFI بأفلام تجارية وعروض تفاوضية ترسل لمدراء المشتريات على واتساب؛ تُثبت أن المصنع يقود حملة تسويقية داعمة للمنتج ولا يتركه راكداً.',
      card3Title: 'دوران أسرع وهامش ربح أفضل',
      card3Tag: 'High Turnover',
      card3Text: 'الانتقال النهائي من حرب الأسعار ومطالبات فترات السداد الطويلة (Credit Terms) إلى التفاوض من موقع قوة: منتج وطني عالي الجودة يدور بسرعة ويحقق أعلى عائد على المتر المربع للهايبر.',
      summaryLabel: 'القوة التفاوضية:',
      summaryText: 'الحصول على مواقع العرض المميزة (End-Caps & Eye-Level Shelves)',
      modalTitle: 'عينة حية (2) — فيديو إقناع الهايبرات ومسؤولي المشتريات B2B',
    },
    screen4: {
      sectionTag: 'المحور الثالث | الحوكمة وسلسلة الإمداد',
      headlinePrefix: 'البراندنج القوي يستند إلى',
      headlineHighlight: 'مصنع محوكم',
      subheadline: 'كيف تتحول معايير الجودة الصارمة والانضباط التشغيلي الداخلي إلى ركيزة الثقة الأكبر مع كبار العملاء',
      phoneCaption: 'عينة حية (3) — فيديو الحوكمة والثقة (30 ثانية)',
      phoneBadge: 'فيديو الحوكمة والاعتمادية 9:16',
      card1Title: 'الجودة كنظام موثّق وليس مجرد شعار',
      card1Tag: 'Institutional Quality',
      card1Text: 'إبراز الانضباط الصناعي، الفحص المخبري المستمر، والالتزام بالمواصفات القياسية الخليجية في كل مرحلة إنتاجية؛ لنبني لدى العميل التجاري يقيناً بأن جودة الدفعة الأولى مطابقة للدفعة الألف.',
      card2Title: 'الالتزام بسلسلة التبريد (-18°م) واستمرارية التوريد',
      card2Tag: 'Cold Chain & Zero OOS',
      card2Text: 'حماية سمعة OFI أمام سلاسل التجزئة من خلال إدارة لوجستية منضبطة تضمن الحفاظ على سلامة المنتج حتى وصوله ليد المستهلك، ومنع أي انقطاع في التوريد (Zero Out-of-Stock).',
      card3Title: 'قيمة Omni Turnkey المضافة',
      card3Tag: 'Integrated Synergy',
      card3Text: 'نحن لا نبيع إعلانات منفصلة؛ قوتنا تكمن في دمج الحوكمة التشغيلية الداخلية والهيكلة الإدارية مع بناء الهوية التجارية الخارجية في مسار استراتيجي متناغم يرفع قيمة الشركة السوقية.',
      summaryLabel: 'مؤشر الموثوقية:',
      summaryText: 'حماية العقود التجارية طويلة الأجل مع كبار موزعي الخليج',
      modalTitle: 'عينة حية (3) — فيديو الحوكمة وسلسلة الإمداد والثقة المؤسسية',
    },
    screen5: {
      sectionTag: 'خارطة الطريق المقترحة',
      headlinePrefix: 'من هذه العينات.. إلى',
      headlineHighlight: 'ميثاق البراند والحوكمة',
      headlineSuffix: 'لـ OFI',
      subheadline: 'ما تم عرضه اليوم هو نموذج عملي لمنهجيتنا؛ وتبدأ المرحلة القادمة بثلاث خطوات منظمة:',
      deliverablesLabel: 'المخرجات الرئيسية:',
      steps: [
        {
          stepNumber: '01',
          phase: 'المرحلة 1',
          title: 'ورشة توحيد الهوية والأولويات',
          timeline: 'الأسبوع 1 - 2',
          summary: 'اعتماد الهوية الموحدة لـ "صافي الذهبي" وتحديد المنتجات ذات الهامش الأعلى للانطلاق بها أولاً.',
          deliverables: [
            'اعتماد الشعار الموحد وتطبيقاته على عائلة المنتجات',
            'تحديد منتجات رأس الحربة (Flagship SKUs)',
            'مواءمة الرسائل التسويقية مع متطلبات قطاع التجزئة',
          ],
        },
        {
          stepNumber: '02',
          phase: 'المرحلة 2',
          title: 'بناء خطة الـ 90 يوم (B2B2C)',
          timeline: 'الأسبوع 3 - 4',
          summary: 'ربط خطة المحتوى الرقمي والظهور البصري بخريطة التوزيع المستهدفة ومواقع التواجد في الهايبرات.',
          deliverables: [
            'جدول زمني لإنتاج الأصول المرئية والحملات الرقمية',
            'تجهيز الحقيبة البيعية لفريق المبيعات التجاري B2B',
            'تنسيق حملات السحب بالتزامن مع تواريخ التوريد للهايبرات',
          ],
        },
        {
          stepNumber: '03',
          phase: 'المرحلة 3',
          title: 'التفعيل والقياس المؤسسي',
          timeline: 'الشهر 2 - 3',
          summary: 'إطلاق الحملة المتكاملة مع مؤشرات أداء واضحة لمعدل الدوران ونمو العقود التجارية طويلة الأجل.',
          deliverables: [
            'مراقبة سرعة دوران الأصناف على الأرفف (Turnover Rate)',
            'قياس أثر الحملة على معدل طلب المستهلك (Sell-Out)',
            'حوكمة دورة التوريد وضمان استدامة علاقات الشراكة',
          ],
        },
      ],
      ctaTitle: 'جاهزون لبدء ورشة العمل التأسيسية',
      ctaSubtitle: 'دعنا نحوّل هذه الرؤية إلى عقود توريد وحضور استثنائي على أرفف سلطنة عُمان والخليج.',
      ctaButton: 'اعتماد الخطوة القادمة',
      ctaButtonCelebrated: 'تم تأكيد التوافق!',
    },
  },
  en: {
    header: {
      brandTitle: 'Omni Turnkey — Management Consulting & Governance',
      screens: [
        'Diagnosis & Overview',
        'Demand Generation (B2C)',
        'Hypermarket Pitch (B2B)',
        'Governance & Supply Trust',
        'Roadmap & Implementation',
      ],
      prevTooltip: 'Previous Slide (Right Arrow / Left in LTR)',
      nextTooltip: 'Next Slide (Left Arrow / Right in LTR)',
      fullscreenTooltip: 'Fullscreen Presentation Mode',
      exitFullscreenTooltip: 'Exit Fullscreen',
    },
    footer: {
      tagline: 'Strategic Governance & Integrated Management Consulting',
      clientName: 'Overseas Food Industries (OFI)',
      madeInOman: 'Made in Oman',
    },
    screen1: {
      badge: 'Omni Turnkey × Overseas Food Industries (OFI)',
      headlinePart1: 'From Factory Output.. to an',
      headlineHighlight: 'Omani Brand',
      headlinePart2: 'Dominating Every Shelf',
      subheadline: 'How do we transform the intrinsic quality of',
      subheadlineProduct: '"Safi GOLD"',
      subheadlineRest: 'into consumer pull power and decisive retail negotiation leverage?',
      tabMilk: 'Safi GOLD Milk',
      tabMozzarella: 'Safi GOLD Mozzarella',
      beforeLabelMilk: 'Current Photography',
      afterLabelMilk: 'Commercial 3D Showcase',
      taglineMilk: 'Transitioning from a flat pack photo into an appetizing visual that sparks instant purchase desire',
      beforeLabelMozzarella: 'Current Flat Design',
      afterLabelMozzarella: 'Commercial 3D Showcase',
      taglineMozzarella: 'Transitioning from a cold flat bag into a photorealistic 3D render highlighting molten stretch',
      sliderHint: 'Drag the handle left and right to compare',
      diagnosisTitle: 'Executive Strategic Diagnosis & Opportunity',
      card1Title: 'Genuine Product Strength',
      card1Tag: 'Core Edge',
      card1Text: 'Trusted Omani manufacturing with 100% natural animal fat mozzarella — a rare and formidable competitive advantage that remains visually untapped on retail packaging.',
      card2Title: 'Identity Fragmentation Gap',
      card2Tag: 'Brand Risk',
      card2Text: 'Discrepancy in the Safi GOLD logo design between milk and mozzarella packs weakens consumer brand recall and loses cross-selling synergies across product lines.',
      card3Title: 'Growth Formula (B2B2C)',
      card3Tag: 'Shelf Velocity',
      card3Text: 'Major hypermarkets do not purchase from manufacturing plants offloading inventory; they buy sought-after brands that turn over rapidly and safeguard category margins.',
    },
    screen2: {
      sectionTag: 'Pillar 1 | Pull Strategy (B2C)',
      headlinePrefix: 'Shoppers Who Demand',
      headlineProduct: '"Safi GOLD"',
      headlineSuffix: 'by Name',
      subheadline: 'Cultivating sensory and emotional purchase desire before the consumer enters the hypermarket aisle',
      phoneCaption: 'Live Sample (1) — Consumer Pull Video (20s)',
      phoneBadge: 'Vertical 9:16 B2C Video',
      card1Title: 'Moving from Specs to Appetite Appeal',
      card1Tag: 'Appetite Appeal',
      card1Text: 'Spotlighting daily usage moments, rapid solubility, and irresistible golden mozzarella stretch to transform shopper hesitation into immediate appetite craving.',
      card2Title: 'Building Pre-Store Recall',
      card2Tag: 'Pre-Store Recall',
      card2Text: 'Short-form visual content (9:16) that embeds the golden packaging and "Made in Oman" emblem so the shopper’s eye instinctively locks onto Safi GOLD.',
      card3Title: 'Direct Impact: The Pull Effect',
      card3Tag: 'Pull Strategy',
      card3Text: 'Channeling marketing spend into verifiable in-store demand, exerting continuous positive pull on category buyers to maintain high replenishment rates.',
      summaryLabel: 'Outcome for OFI:',
      summaryText: 'Diminishing reliance on deep discounting while protecting healthy gross margins',
      modalTitle: 'Live Sample (1) — Consumer B2C Commercial (Safi GOLD)',
    },
    screen3: {
      sectionTag: 'Pillar 2 | Commercial Positioning (B2B)',
      headlinePrefix: 'Why Supermarkets Win with',
      headlineProduct: '"Safi GOLD"',
      headlineSuffix: '?',
      subheadline: 'Transforming OFI lines from passive shelf items into high-velocity, high-margin shelf-stoppers',
      phoneCaption: 'Live Sample (2) — Hypermarket Pitch Video (25s)',
      phoneBadge: 'Vertical 9:16 B2B Pitch',
      card1Title: 'Commanding the Shelf as a Brand Block',
      card1Tag: 'Brand Block',
      card1Text: 'Harmonizing visual design across milk and mozzarella forms an unmissable golden shelf block (Shelf Monopoly) that captivates shoppers and cancels competitor noise.',
      card2Title: 'Sales Enablement Weapon for B2B Reps',
      card2Tag: 'Sales Enablement',
      card2Text: 'Equipping OFI commercial teams with punchy video pitches delivered directly to retail buyers via WhatsApp, demonstrating proactive consumer demand support.',
      card3Title: 'Faster Turnover & Superior Returns',
      card3Tag: 'High Turnover',
      card3Text: 'Shifting permanently from defensive price cuts and extended credit terms to negotiating from strength: high-velocity Omani dairy maximizing revenue per shelf meter.',
      summaryLabel: 'Negotiation Power:',
      summaryText: 'Securing prime eye-level shelves and lucrative promotional end-caps',
      modalTitle: 'Live Sample (2) — B2B Retail Pitch Commercial',
    },
    screen4: {
      sectionTag: 'Pillar 3 | Governance & Supply Reliability',
      headlinePrefix: 'Strong Branding Rests on a',
      headlineHighlight: 'Governed Factory',
      subheadline: 'How uncompromising quality control and internal operational discipline establish lasting institutional credibility',
      phoneCaption: 'Live Sample (3) — Governance & Trust Video (30s)',
      phoneBadge: 'Vertical 9:16 Governance Video',
      card1Title: 'Quality as a Verified System, Not a Slogan',
      card1Tag: 'Institutional Quality',
      card1Text: 'Demonstrating strict industrial hygiene, continuous lab testing, and GSO compliance across all production cycles, guaranteeing that batch 1,000 matches batch 1.',
      card2Title: 'Cold-Chain Integrity (-18°C) & Supply Continuity',
      card2Tag: 'Cold Chain & Zero OOS',
      card2Text: 'Protecting OFI’s retail reputation through disciplined cold-chain management from plant to shelf, ensuring zero out-of-stock incidents during peak shopping hours.',
      card3Title: 'Omni Turnkey Integrated Synergy',
      card3Tag: 'Integrated Synergy',
      card3Text: 'We do not sell isolated ad creative; our strength lies in seamlessly uniting internal operational governance and structural hierarchy with outward commercial branding.',
      summaryLabel: 'Reliability Metric:',
      summaryText: 'Safeguarding multi-year commercial supply contracts with tier-1 regional distributors',
      modalTitle: 'Live Sample (3) — Factory Governance & Cold Chain Video',
    },
    screen5: {
      sectionTag: 'Proposed Strategic Roadmap',
      headlinePrefix: 'From These Prototypes.. to the',
      headlineHighlight: 'Brand & Governance Charter',
      headlineSuffix: 'for OFI',
      subheadline: 'What was presented today is a working prototype of our methodology; the next phase initiates with three structured milestones:',
      deliverablesLabel: 'Key Deliverables:',
      steps: [
        {
          stepNumber: '01',
          phase: 'Phase 1',
          title: 'Identity Harmonization & Priorities Workshop',
          timeline: 'Weeks 1 - 2',
          summary: 'Adopting the unified Safi GOLD visual architecture and identifying top-margin hero SKUs for commercial launch.',
          deliverables: [
            'Approval of unified logo and packaging guidelines across all lines',
            'Identification and prioritization of high-margin flagship SKUs',
            'Alignment of commercial messaging with retail procurement expectations',
          ],
        },
        {
          stepNumber: '02',
          phase: 'Phase 2',
          title: '90-Day Execution Blueprint (B2B2C)',
          timeline: 'Weeks 3 - 4',
          summary: 'Synchronizing digital consumer pull campaigns with target hypermarket retail distribution routes.',
          deliverables: [
            'Production calendar for high-impact social and commercial assets',
            'Comprehensive B2B sales enablement kits for key account managers',
            'Coordinating consumer pull schedules with supermarket distribution dates',
          ],
        },
        {
          stepNumber: '03',
          phase: 'Phase 3',
          title: 'Market Activation & Institutional Tracking',
          timeline: 'Months 2 - 3',
          summary: 'Rolling out the integrated campaign backed by transparent KPIs for shelf turnover and long-term contract expansion.',
          deliverables: [
            'Continuous tracking of SKU turnover rate and shelf velocity',
            'Measuring campaign impact on consumer sell-out vs historic baseline',
            'Supply chain governance safeguarding sustained retail partnerships',
          ],
        },
      ],
      ctaTitle: 'Ready to Launch the Foundation Workshop',
      ctaSubtitle: 'Let us transform this vision into robust distribution contracts and distinguished shelf leadership across Oman and the GCC.',
      ctaButton: 'Approve Next Step',
      ctaButtonCelebrated: 'Alignment Confirmed!',
    },
  },
};
