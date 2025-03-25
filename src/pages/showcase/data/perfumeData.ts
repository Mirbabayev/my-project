// Nümunə ətir məlumatları
export const perfumeData = {
  id: 1,
  brand: "Viktor & Rolf",
  name: "Flowerbomb",
  description: "Viktor & Rolf-un ikonik ətrinin hər damcısı çiçək partlayışı ilə doludur. Jasmin, freziya, qızılgül və orchid notları ilə dolu bu ətirdə şərq ədviyyatları və patchouli ətrafa yayılır. Fərqli, romantik və cazibədar ətir.",
  rating: 4.7,
  reviewCount: 1245,
  price: {
    "30ml": 159.99,
    "50ml": 229.99,
    "100ml": 299.99
  },
  discount: 15,
  badges: ["Bestseller", "Orijinal", "Eksklüziv"],
  stock: true,
  images: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      alt: "Viktor & Rolf Flowerbomb ətir şüşəsi",
      isZoomable: true
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      alt: "Flowerbomb ətir şüşəsinin yaxından görünüşü",
      isZoomable: true
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1591375357916-d5a1b19bff75?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      alt: "Flowerbomb qutusunun görünüşü",
      isZoomable: false
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1522336284037-91f7da073525?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      alt: "Flowerbomb kolleksiyası",
      isZoomable: false
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1563170352-0232d8452259?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      alt: "Müxtəlif bukəqabilındakı Flowerbomb şüşəsi",
      isZoomable: true
    }
  ],
  notes: [
    {
      name: "Bergamot",
      description: "Təzə və şirin sitrus qoxusu ilə üst notlara aydınlıq və təravət qatır.",
      type: "top"
    },
    {
      name: "Çay",
      description: "Zərif və təmiz not. Bergamotla birlikdə yuxarı qalxan sərinlik hissi verir.",
      type: "top"
    },
    {
      name: "Jasmin",
      description: "Ətrin ürəyində yer alan bu çiçək notuna zəriflik və şirinlik xasdır.",
      type: "heart"
    },
    {
      name: "Freziya",
      description: "Təravətli və zərif, bu çiçək notu ətirə təmizlik və yüngüllük bəxş edir.",
      type: "heart"
    },
    {
      name: "Orxideya",
      description: "Ekzotik və zərif not, ətrin mərkəzində davamlılıq və dərinlik yaradır.",
      type: "heart"
    },
    {
      name: "Qızılgül",
      description: "Ətirin ən əsas notlarından biri olan qızılgül, zəriflik və qadınlıq simvoludur.",
      type: "heart"
    },
    {
      name: "Patçuli",
      description: "Odunsu və torpaq notları ilə ətirin baza qatında davamlılıq təmin edir.",
      type: "base"
    },
    {
      name: "Vanilya",
      description: "İsti və şirin not olaraq ətrə dərinlik və cazibədarlıq qatır.",
      type: "base"
    },
    {
      name: "Müşk",
      description: "Ətrin uzun müddət davam etməsini təmin edən isti heyvan notu.",
      type: "base"
    }
  ],
  characteristics: [
    {
      name: "İntensivlik",
      value: 8,
      description: "Yüksək konsentrasiya ilə uzun müddətli təsir yaradır"
    },
    {
      name: "Davamlılıq",
      value: 9,
      description: "Dəriyə çiləndikdən sonra 8+ saat davam edir"
    },
    {
      name: "İz buraxma (Sillage)",
      value: 7,
      description: "Orta dərəcədə iz buraxır, giriş etdiyiniz otaqda təsirli olur"
    },
    {
      name: "Şirinlik",
      value: 8,
      description: "Vanilya və çiçək notları ilə xoş şirinlik təqdim edir"
    },
    {
      name: "Təzəlik",
      value: 6,
      description: "Orta səviyyəli təzəlik, daha çox isti notlarla tarazlaşdırılmışdır"
    }
  ],
  recommendations: {
    ageGroup: {
      min: 25,
      max: 45,
      description: "Daha çox yetkin, özündən əmin qadınların seçimi olan bu ətir, şıklığı və xarizmatikliyi ilə seçilir."
    },
    occasions: [
      {
        name: "Gündəlik istifadə",
        suitability: 3
      },
      {
        name: "İşə/Ofisə",
        suitability: 4
      },
      {
        name: "Görüşlər",
        suitability: 5
      },
      {
        name: "Xüsusi tədbir",
        suitability: 5
      }
    ],
    seasons: [
      {
        name: "Qış",
        suitability: 5
      },
      {
        name: "Yaz",
        suitability: 4
      },
      {
        name: "Yay",
        suitability: 3
      },
      {
        name: "Payız",
        suitability: 5
      }
    ],
    daytime: [
      {
        name: "Səhər",
        suitability: 3
      },
      {
        name: "Gündüz",
        suitability: 4
      },
      {
        name: "Axşam",
        suitability: 5
      },
      {
        name: "Gecə",
        suitability: 5
      }
    ],
    personality: [
      "Romantik",
      "Özündən əmin",
      "Şık",
      "Zərif",
      "Cazibədar"
    ]
  },
  reviews: [
    {
      id: 1,
      user: {
        name: "Aytən M.",
        avatar: "https://i.pravatar.cc/100?img=1",
        verified: true
      },
      rating: 5,
      date: "12 May 2023",
      content: "Bu mənim ən sevdiyim ətirdir! Flowerbomb gerçəkdən də adına layiqdir - çiçək bombasıdır. Hər istifadə etdiyimdə kompliment alıram. Xüsusilə axşam tədbirlərində ən yaxşı təsiri göstərir.",
      images: [
        "https://images.unsplash.com/photo-1541108564883-bde059e594b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      ],
      pros: [
        "İnanılmaz davamlılıq",
        "Yadda qalan ətir",
        "Gözəl qablaşdırma"
      ],
      cons: [
        "Qiyməti bir az bahadır"
      ],
      helpful: 34
    },
    {
      id: 2,
      user: {
        name: "Nigar K.",
        verified: false
      },
      rating: 4,
      date: "3 Mart 2023",
      content: "Flowerbomb çox isti və şirin ətirdir. Mən bunu əsasən soyuq havada istifadə edirəm. Yayda bir az ağır ola bilər. Şüşəsi və dizaynı əladır, masada gözəl görünür.",
      pros: [
        "İsti və şirin ətir",
        "Şık şüşə dizaynı"
      ],
      cons: [
        "Yay üçün bir az ağırdır",
        "Qiymət/keyfiyyət nisbəti yaxşı deyil"
      ],
      helpful: 12
    },
    {
      id: 3,
      user: {
        name: "Rəşad Parfüm Eksperti",
        avatar: "https://i.pravatar.cc/100?img=13",
        verified: true
      },
      rating: 4.5,
      date: "17 Yanvar 2023",
      content: "Viktor & Rolf-un Flowerbomb ətri şərq çiçək ətri kateqoriyasında əsl inqilabdır. 2005-ci ildən bəri milyonlarla qadın bu unikal ətri seçir. Çiçək və şirin notların optimal tarazlığı qadınlara əsrarəngiz və cazibədar aura bəxş edir.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      pros: [
        "Mükəmməl davamlılıq",
        "Əsrarəngiz kompozisiya",
        "Şık və yüksək keyfiyyətli şüşə"
      ],
      cons: [
        "İntensivliyi bəziləri üçün çox ola bilər"
      ],
      helpful: 87,
      isExpert: true
    }
  ],
  offers: {
    discountCodes: [
      {
        code: "WELCOME15",
        discount: "15%",
        description: "İlk sifarişiniz üçün 15% endirim"
      },
      {
        code: "FREEDELIVERY",
        discount: "Pulsuz çatdırılma",
        description: "100₼-dən yüksək sifarişlər üçün pulsuz çatdırılma"
      }
    ],
    bundles: [
      {
        id: 101,
        name: "Flowerbomb Lüks Set",
        items: [
          "Flowerbomb EDP 50ml",
          "Flowerbomb bədən losyonu 50ml",
          "Flowerbomb duş geli 50ml"
        ],
        regularPrice: 299.99,
        bundlePrice: 259.99,
        image: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
      },
      {
        id: 102,
        name: "Flowerbomb Səyahət Set",
        items: [
          "Flowerbomb EDP 30ml",
          "Flowerbomb mini sprey 10ml",
          "Səyahət çantası"
        ],
        regularPrice: 189.99,
        bundlePrice: 159.99,
        image: "https://images.unsplash.com/photo-1589820833123-ef2d2f368963?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
      }
    ],
    delivery: {
      express: {
        available: true,
        time: "1-2 iş günü",
        cost: 12.99
      },
      standard: {
        available: true,
        time: "3-5 iş günü",
        cost: 5.99
      },
      freeShippingThreshold: 100
    },
    guarantee: "Bütün məhsullarımız 100% orijinaldır. 30 gün ərzində məmnun qalmasanız, pulunuzu geri qaytarırıq."
  },
  story: {
    brandPhilosophy: "Viktor & Rolf, hollandiyalı moda dizaynerləri Viktor Horsting və Rolf Snoeren tərəfindən 1993-cü ildə təsis edilmişdir. Onların fəlsəfəsi ənənəvi moda konsepsiyasını alt-üst etmək və yeni, fərqli baxış yaratmaqdır. Flowerbomb ətri də bu fəlsəfəni əks etdirir - zəriflik və qüvvətin, romantika və cəsarətin harmoniyasıdır. Brendin 'Ənənələri poz, qaydaları dəyiş' mottosuna sadiq olaraq, Flowerbomb ənənəvi ətir duyğularını yeni zirvələrə daşımışdır.",
    perfumerInfo: {
      name: "Olivier Polge",
      bio: "Olivier Polge dünya şöhrətli fransız parfümeridir və Chanel-in eksklüziv parfümeri olaraq çalışır. DIOR, Balenciaga, Ralph Lauren və Viktor & Rolf kimi lüks brendlər üçün uğurlu ətirlər yaratmışdır. Olivier, parfumeriya sənətini atasından - efsanəvi Jacques Polge'dən öyrənmişdir.",
      image: "https://i.pravatar.cc/300?img=32"
    },
    ingredientMap: {
      title: "İnqrediyentlərin Mənşəyi",
      description: "Flowerbomb ətri dünyanın müxtəlif bölgələrindən əldə edilən ən keyfiyyətli təbii inqrediyentlərdən hazırlanır. Hər bir tərkib hissəsi, ətrin unikal xarakterini formalaşdırmaq üçün xüsusi seçilmişdir.",
      mapImage: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      locations: [
        {
          name: "Türkiyə, İsparta",
          position: { x: 55, y: 34 },
          ingredient: "Türk Qızılgülü"
        },
        {
          name: "Hindistan, Kerala",
          position: { x: 70, y: 48 },
          ingredient: "Hindistan Patçulisi"
        },
        {
          name: "Hindistan və Çin",
          position: { x: 75, y: 40 },
          ingredient: "Sambac Jasmin"
        },
        {
          name: "Madagaskar",
          position: { x: 38, y: 65 },
          ingredient: "Madagaskar Vanilyası"
        }
      ]
    }
  },
  similarProducts: [
    {
      id: 2,
      brand: "Chanel",
      name: "Coco Mademoiselle",
      image: "https://images.unsplash.com/photo-1544468266-6a8948003be5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.8,
      price: 349.99,
      category: "similar",
      notesMatch: ["Patçuli", "Jasmin", "Vanilya"]
    },
    {
      id: 3,
      brand: "Lancôme",
      name: "La Vie Est Belle",
      image: "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.5,
      price: 289.99,
      category: "similar",
      notesMatch: ["Vanilya", "Patçuli", "İris"]
    },
    {
      id: 4,
      brand: "YSL",
      name: "Black Opium",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.6,
      price: 309.99,
      category: "similar",
      notesMatch: ["Qəhvə", "Vanilya", "Çiçək notları"]
    },
    {
      id: 5,
      brand: "Dior",
      name: "Miss Dior",
      image: "https://images.unsplash.com/photo-1543422655-96de818b9cbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.7,
      price: 329.99,
      category: "similar",
      notesMatch: ["Qızılgül", "Jasmin", "Patçuli"]
    },
    {
      id: 6,
      brand: "Viktor & Rolf",
      name: "Bonbon",
      image: "https://images.unsplash.com/photo-1595425970377-580c1d59d760?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.4,
      price: 259.99,
      category: "brand"
    },
    {
      id: 7,
      brand: "Viktor & Rolf",
      name: "Spicebomb",
      image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.6,
      price: 279.99,
      category: "brand"
    },
    {
      id: 8,
      brand: "Viktor & Rolf",
      name: "Flowerbomb Nectar",
      image: "https://images.unsplash.com/photo-1580618864180-f6d7d39b8ff6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.5,
      price: 289.99,
      category: "brand"
    },
    {
      id: 9,
      brand: "Viktor & Rolf",
      name: "Flowerbomb Midnight",
      image: "https://images.unsplash.com/photo-1584534066545-e27be206e952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.3,
      price: 299.99,
      category: "brand"
    },
    {
      id: 10,
      brand: "Tom Ford",
      name: "Black Orchid",
      image: "https://images.unsplash.com/photo-1592845699246-be04cb19c658?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.9,
      price: 399.99,
      category: "recommended"
    },
    {
      id: 11,
      brand: "Jo Malone",
      name: "Peony & Blush Suede",
      image: "https://images.unsplash.com/photo-1588514471803-afbd4dfa6811?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.6,
      price: 269.99,
      category: "recommended"
    },
    {
      id: 12,
      brand: "Versace",
      name: "Bright Crystal",
      image: "https://images.unsplash.com/photo-1591375304896-5d6e5ade63af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.4,
      price: 249.99,
      category: "recommended"
    },
    {
      id: 13,
      brand: "Chloé",
      name: "Chloé Eau de Parfum",
      image: "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.7,
      price: 279.99,
      category: "recommended"
    }
  ]
}; 