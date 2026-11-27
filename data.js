const EMOTIONS = [
  {
    id: "sevinc",
    emoji: "😊",
    name: "Sevinc",
    shortDesc: "Özünü şən, enerjili və xoşbəxt hiss edirsən.",
    color: "#f59e0b",
    bgSoft: "#fef3c7",
    borderSoft: "#fcd34d",
    resultLead: "Sevinc hissini yaşamaq çox gözəldir! Bu müsbət enerjini yadda saxlamaq çətin günlərdə də sənə güc verəcək.",
    mainAdvice: "Səni sevindirən hadisəni başqaları ilə bölüş.",
    extraTips: [
      "Bu gözəl anı xatırlamaq üçün kiçik bir qeyd və ya rəsm çəkə bilərsən.",
      "Dostuna və ya ailə üzvlərinə səni nəyin sevindirdiyini danış.",
      "Özünü təbrik et və bu hissdən zövq al."
    ],
    questions: {
      when: [
        "Dostlarımla vaxt keçirəndə və ya oynayanda",
        "Uğur qazananda və ya tərif eşidəndə",
        "Sevdiyim bir fəaliyyətlə məşğul olanda",
        "Ailəmlə xoş bir an paylaşanda"
      ],
      body: [
        "Üzümdə gülümsəmə yaranır",
        "Özümü yüngül və enerjili hiss edirəm",
        "Ürəyim sevinclə döyünür",
        "Hərəkət etmək və danışmaq istəyirəm"
      ],
      help: [
        "Bu sevinci dostumla və ya ailəmlə bölüşmək",
        "Sevincimi ifadə edən şəkil çəkmək və ya yazı yazmaq",
        "Başqalarına da xoş söz demək",
        "Bu anı yaddaşımda saxlamaq"
      ]
    }
  },
  {
    id: "keder",
    emoji: "😢",
    name: "Kədər",
    shortDesc: "Özünü qəmli, yorğun və ya məyus hiss edirsən.",
    color: "#3b82f6",
    bgSoft: "#dbeafe",
    borderSoft: "#93c5fd",
    resultLead: "Kədərlənmək tamamilə normal bir hissdir. Hər kəs bəzən özünü qəmli hiss edə bilər və bu hissi gizlətmək məcburiyyətində deyilsən.",
    mainAdvice: "Hisslərini bölüş, güvəndiyin biri ilə danış və özünə vaxt ayır.",
    extraTips: [
      "Ağlamaq istəyirsənsə, özünü saxlama — bu, gərginliyi azalda bilər.",
      "Səni dinləyəcək bir böyüklə və ya yaxın dostunla danış.",
      "Sevdiyin sakit bir musiqi dinlə və ya ilıq su iç."
    ],
    questions: {
      when: [
        "İstədiyim bir şey alınmayanda",
        "Darıxanda və ya özümü tək hiss edəndə",
        "Kiminləsə aramızda anlaşılmazlıq olanda",
        "Mənim üçün önəmli bir hadisə bitəndə"
      ],
      body: [
        "Gözlərim dolur və ya ağlamaq istəyirəm",
        "Enerjim azalır, özümü yorğun hiss edirəm",
        "Boğazımda və ya sinəmdə sıxılma olur",
        "Danışmaq və hərəkət etmək çətin gəlir"
      ],
      help: [
        "Güvəndiyim biri ilə hisslərimi bölüşmək",
        "Özümə bir az sakit vaxt ayırmaq",
        "Sevdiyim bir məşğuliyyətlə (rəsm, kitab, musiqi) rahatlamaq",
        "Özümə qarşı mehriban olmaq"
      ]
    }
  },
  {
    id: "qezeb",
    emoji: "😠",
    name: "Qəzəb",
    shortDesc: "Özünü əsəbi, gərgin və ya narazı hiss edirsən.",
    color: "#ef4444",
    bgSoft: "#fee2e2",
    borderSoft: "#fca5a5",
    resultLead: "Qəzəb hiss etmək pis insan olduğun demək deyil. Əsas olan bu hissi özünə və başqalarına zərər vermədən ifadə etməyi öyrənməkdir.",
    mainAdvice: "Dərindən nəfəs al, bir qədər fasilə ver və səni narahat edən hadisəni sakit şəkildə ifadə et.",
    extraTips: [
      "1-dən 10-a qədər yavaşca say və çiyinlərini boşalt.",
      "Cavab verməzdən əvvəl bir neçə dəqiqə uzaqlaşmaq sənə kömək edə bilər.",
      "\"Mən belə hiss edirəm, çünki...\" cümləsindən istifadə edərək fikrini izah et."
    ],
    questions: {
      when: [
        "Haqsızlıqla qarşılaşdığımı düşünəndə",
        "Məni dinləmədiklərini hiss edəndə",
        "Planladığım iş pozulanda",
        "Kimsə sərhədimi və ya əşyamı icazəsiz götürəndə"
      ],
      body: [
        "Üzüm qızarır və bədənim istilənir",
        "Əllərimi yumruq kimi sıxıram",
        "Ürəyim sürətlə döyünür",
        "Səsim yüksəlir və ya dişlərimi sıxıram"
      ],
      help: [
        "Dərindən nəfəs alıb bir neçə saniyə fasilə vermək",
        "Sakitləşənə qədər bir qədər kənara çəkilmək",
        "İdman etmək və ya sürətli gəzməklə enerjini çıxarmaq",
        "Nəyin məni narahat etdiyini sakit sözlərlə demək"
      ]
    }
  },
  {
    id: "narahatliq",
    emoji: "😟",
    name: "Narahatlıq",
    shortDesc: "Özünü gərgin, həyəcanlı və ya nigaran hiss edirsən.",
    color: "#8b5cf6",
    bgSoft: "#ede9fe",
    borderSoft: "#c4b5fd",
    resultLead: "Narahatlıq çox vaxt gələcəkdə nə olacağını bilməyəndə yaranır. Diqqətini hazırkı ana qaytarmaq fikirlərini sakitləşdirməyə kömək edir.",
    mainAdvice: "Nəfəs məşqi et və diqqətini hazırda edə biləcəyin kiçik bir işə yönəlt.",
    extraTips: [
      "Ətrafında gördüyün 3 əşyanı, eşitdiyin 2 səsi diqqətlə müşahidə et.",
      "Böyük tapşırığı kiçik addımlara böl və yalnız ilk addıma fokuslan.",
      "Fikirlərini kağıza yazmaq başını yüngülləşdirə bilər."
    ],
    questions: {
      when: [
        "İmtahan, yoxlama və ya çıxış öncəsi",
        "Yeni bir mühitə və ya dərsə başlayanda",
        "Nəyinsə səhv gedəcəyindən ehtiyat edəndə",
        "Çox iş üst-üstə yığılanda"
      ],
      body: [
        "Qarnımda qəribə sıxılma və ya narahatlıq olur",
        "Fikirlərim dayanmadan fırlanır",
        "Ürəyim tez-tez döyünür",
        "Diqqətimi toplamaq çətinləşir"
      ],
      help: [
        "Yavaş və dərin nəfəs məşqi etmək",
        "İşi kiçik hissələrə bölüb birindən başlamaq",
        "Güvəndiyim biri ilə narahatlığımı paylaşmaq",
        "Su içib bir neçə dəqiqə dincəlmək"
      ]
    }
  },
  {
    id: "sakitlik",
    emoji: "😌",
    name: "Sakitlik",
    shortDesc: "Özünü rahat, tarazlıqlı və dinc hiss edirsən.",
    color: "#10b981",
    bgSoft: "#d1fae5",
    borderSoft: "#6ee7b7",
    resultLead: "Sakitlik özünü ən yaxşı dinləyə bildiyin hallardan biridir. Nələrin sənə bu rahatlığı verdiyini yadda saxlamaq çox faydalıdır.",
    mainAdvice: "Bu sakitliyi qorumağa kömək edən fəaliyyətləri davam etdir.",
    extraTips: [
      "Sənə yaxşı təsir edən vərdişləri (oxumaq, gəzmək, rəsm) siyahıya ala bilərsən.",
      "Bu rahatlıqdan istifadə edərək sevdiyin sakit bir işlə məşğul ol.",
      "Gərgin günlərdə bu anı və nə etdiyini xatırla."
    ],
    questions: {
      when: [
        "Təbiətdə gəzəndə və ya təmiz hava alanda",
        "Sevdiyim sakit fəaliyyətlə məşğul olanda",
        "İşlərimi vaxtında bitirib dincələndə",
        "Özümü güvənli və anlaşılan hiss edəndə"
      ],
      body: [
        "Nəfəsim rahat və nizamlıdır",
        "Çiyinlərim və əzələlərim boşalmışdır",
        "Zehnim aydın və dincdir",
        "Ürəyim sakit ritmlə döyünür"
      ],
      help: [
        "Bu sakitliyi verən vərdişləri davam etdirmək",
        "Dincəlməyə və yuxuma diqqət yetirmək",
        "Təbiətdə və ya sakit mühitdə vaxt keçirmək",
        "Bu hissi qorumaq üçün özümə vaxt ayırmaq"
      ]
    }
  },
  {
    id: "qorxu",
    emoji: "😨",
    name: "Qorxu",
    shortDesc: "Özünü çəkinən, həyəcanlı və ya qorunmaya ehtiyaclı hiss edirsən.",
    color: "#6366f1",
    bgSoft: "#e0e7ff",
    borderSoft: "#a5b4fc",
    resultLead: "Qorxu bizi təhlükələrdən qorumağa çalışan təbii bir siqnaldır. Qorxunu gizlətmək yerinə onun adını çəkmək və kömək istəmək güclü olmaq deməkdir.",
    mainAdvice: "Hissini adlandır, güvəndiyin böyüklə danış.",
    extraTips: [
      "Özünə \"Hazırda təhlükəsiz yerdəyəm\" deyə xatırlat və ətrafına bax.",
      "Valideynin, müəllimin və ya güvəndiyin bir böyükdən dəstək istə.",
      "Yavaş-yavaş nəfəs alaraq bədəninin sakitləşməsinə kömək et."
    ],
    questions: {
      when: [
        "Tanımadığım və ya qaranlıq bir mühitdə olanda",
        "Səhv etməkdən və ya tənqid olunmaqdan çəkinəndə",
        "Qəfil səs və ya gözlənilməz hadisə baş verəndə",
        "Özümü müdafiəsiz və ya tək hiss edəndə"
      ],
      body: [
        "Ürəyim çox sürətlə döyünür",
        "Əllərim və ya ayaqlarım titrəyə bilər",
        "Bədənim gərginləşir, donub qalmaq istəyirəm",
        "Nəfəsim sürətlənir"
      ],
      help: [
        "Hiss etdiyim qorxunu sözlə adlandırmaq",
        "Güvəndiyim böyüyün yanına gedib danışmaq",
        "İşıqlı və təhlükəsiz bir yerdə dincəlmək",
        "Dərin nəfəs alıb ətrafımdakı güvənli şeylərə baxmaq"
      ]
    }
  }
];

const QUESTION_STEPS = [
  {
    key: "when",
    title: "Bu hissi nə zaman yaşayırsan?",
    subtitle: "Sənə uyğun gələn vəziyyətləri seç və ya öz nümunəni yaz."
  },
  {
    key: "body",
    title: "Bu hiss zamanı bədənində nə dəyişir?",
    subtitle: "Bədənində müşahidə etdiyin əlamətləri işarələ və ya qısa qeyd et."
  },
  {
    key: "help",
    title: "Belə hiss etdikdə nə etmək sənə kömək edə bilər?",
    subtitle: "Sənə yaxşı təsir edə biləcək üsulları seç və ya öz fikrini əlavə et."
  }
];
