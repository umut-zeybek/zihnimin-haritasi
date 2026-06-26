export interface NodeData {
  id: string;
  label: string;
  group: string;
  color: string;
  description: string;
  relatedNodes?: string[];
  val: number; // size
  icon?: string;
  link?: string;
}

export interface LinkData {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: NodeData[];
  links: LinkData[];
}

export const graphData: GraphData = {
  nodes: [
    {
      id: "ben",
      label: "Ben",
      group: "merkez",
      color: "#ffffff",
      val: 8,
      description: "Tüm evrenin merkezi. Yeteneklerimin, hedeflerimin ve tutkularımın doğduğu çekirdek. Diğer tüm gezegenler bu merkezden aldıkları enerjiyle yörüngede kalır.",
      relatedNodes: ["basketbol", "edebiyat", "felsefe", "muzik", "analitik_dusunme", "problem_cozme", "projelerim"],
      icon: "🧑‍🚀"
    },
    // İlgi Alanları & Tutkular
    {
      id: "basketbol",
      label: "Basketbol",
      group: "tutku",
      color: "#f97316", // orange
      val: 5,
      description: "Sadece fiziksel bir spor değil; saniyeler içinde karar verme, takım ruhu, strateji ve kazanma arzusu gibi kavramları gerçek hayatta pratik ettiğim bir disiplin sahası.",
      relatedNodes: ["disiplin", "takim_calismasi", "ben"],
      icon: "🏀"
    },
    {
      id: "edebiyat",
      label: "Edebiyat",
      group: "ilgi alanı",
      color: "#a855f7", // purple
      val: 5,
      description: "İnsan doğasını, farklı dünyaları ve sözcüklerin gücünü keşfetme yolculuğu. Empati kurabilmenin ve farklı hayatları yaşamanın en estetik yolu.",
      relatedNodes: ["yazma", "siir", "ben"],
      icon: "📚"
    },
    {
      id: "siir",
      label: "Şiir",
      group: "tutku",
      color: "#a855f7",
      val: 4,
      description: "Duyguların, karmaşık düşüncelerin ve estetiğin en yoğun hali. Kelimelerle oynama sanatı ve ruhun kendini en özgür hissettiği ifade biçimi.",
      relatedNodes: ["yazma", "yaratici_dusunme", "edebiyat"],
      icon: "🪶"
    },
    {
      id: "felsefe",
      label: "Felsefe",
      group: "ilgi alanı",
      color: "#3b82f6", // blue
      val: 5,
      description: "Varlığı, bilgiyi ve değerleri sorguladığım, görünenin ötesine bakmayı öğrendiğim derin düşünce evreni. Her şeyin 'neden'ini arama tutkusu.",
      relatedNodes: ["analitik_dusunme", "problem_cozme", "ben"],
      icon: "🦉"
    },
    {
      id: "muzik",
      label: "Müzik",
      group: "ilgi alanı",
      color: "#22c55e", // green
      val: 4,
      description: "Ruhun gıdası ve evrensel frekansım. Odaklanmamı sağlayan, yaratıcılığımı besleyen ve hayatın ritmini yakaladığım enerji kaynağı.",
      relatedNodes: ["yaratici_dusunme", "ben"],
      icon: "🎵"
    },
    
    // Çalışma Biçimi
    {
      id: "analitik_dusunme",
      label: "Analitik Düşünme",
      group: "çalışma biçimi",
      color: "#ef4444", // red
      val: 4,
      description: "Karmaşık sorunları küçük ve yönetilebilir parçalara bölerek, mantıksal ve sistematik çözümler üretebilme yaklaşımım.",
      relatedNodes: ["problem_cozme", "felsefe", "ben"],
      icon: "🧩"
    },
    {
      id: "disiplin",
      label: "Disiplinli Çalışma",
      group: "çalışma biçimi",
      color: "#ef4444",
      val: 4,
      description: "Motivasyonun bittiği yerde devreye giren güç. Hedeflere ulaşmak için tutarlılığı ve azmi sağlayan en temel prensibim.",
      relatedNodes: ["basketbol", "odaklanma"],
      icon: "⏳"
    },
    {
      id: "odaklanma",
      label: "Derin Odaklanma",
      group: "çalışma biçimi",
      color: "#ef4444",
      val: 4,
      description: "Dış uyarıcılardan soyutlanıp, sadece o anki işe veya hedefe tüm zihinsel enerjimi yönlendirebilme ve 'akış' halinde kalabilme yeteneği.",
      relatedNodes: ["disiplin"],
      icon: "🎯"
    },
    {
      id: "surekli_ogrenme",
      label: "Sürekli Öğrenme",
      group: "çalışma biçimi",
      color: "#ef4444",
      val: 4,
      description: "Sınırları genişletme tutkusu. Değişen dünyaya adapte olmak ve her gün dünden bir adım daha ileride olmak için bitmeyen bilgi arayışı.",
      relatedNodes: ["ben", "arastirma"],
      icon: "🌱"
    },
    {
      id: "baglanti_kurma",
      label: "Bağlantı Kurma",
      group: "çalışma biçimi",
      color: "#ef4444",
      val: 4,
      description: "Birbirinden tamamen bağımsız gibi görünen fikirler, disiplinler veya alanlar arasında köprüler kurarak inovatif ve özgün sonuçlar ortaya çıkarma becerisi.",
      relatedNodes: ["yaratici_dusunme", "ben"],
      icon: "🔗"
    },

    // Beceriler
    {
      id: "problem_cozme",
      label: "Problem Çözme",
      group: "beceri",
      color: "#eab308", // yellow
      val: 4,
      description: "Kriz anlarında sakin kalarak, eldeki kısıtlı verilerle bile en ideal çözüme hızla ulaşabilme ve engelleri aşma yetisi.",
      relatedNodes: ["analitik_dusunme", "felsefe"],
      icon: "🛠️"
    },
    {
      id: "arastirma",
      label: "Araştırma",
      group: "beceri",
      color: "#eab308",
      val: 3,
      description: "Sadece bilgi tüketmek değil; doğru bilgiye ulaşmak, kaynakları analiz etmek ve verileri sentezleyerek gerçeği bulma süreci.",
      relatedNodes: ["surekli_ogrenme"],
      icon: "🔍"
    },
    {
      id: "yaratici_dusunme",
      label: "Yaratıcı Düşünme",
      group: "beceri",
      color: "#eab308",
      val: 4,
      description: "Kalıpların dışına çıkma cesareti. Karşılaşılan sorunlara ve projelere yenilikçi, sıra dışı ve estetik açılardan yaklaşabilme.",
      relatedNodes: ["siir", "baglanti_kurma"],
      icon: "💡"
    },
    {
      id: "yazma",
      label: "Yazma",
      group: "beceri",
      color: "#eab308",
      val: 4,
      description: "Zihnimde uçuşan düşünceleri, hisleri ve bilgileri somutlaştırarak başkalarına aktarma eylemi; kendi evrenimi dış dünyaya açma köprüsü.",
      relatedNodes: ["edebiyat", "siir"],
      icon: "✍️"
    },
    {
      id: "takim_calismasi",
      label: "Takım Çalışması",
      group: "beceri",
      color: "#eab308",
      val: 4,
      description: "Bireysel egoları bir kenara bırakıp, ortak bir vizyon doğrultusunda diğer insanlarla uyum içinde ve sinerji yaratarak hedefe ilerleme becerisi.",
      relatedNodes: ["basketbol", "ben"],
      icon: "🤝"
    },
    // Yeni Eklenen: Projelerim
    {
      id: "projelerim",
      label: "Projelerim",
      group: "beceri",
      color: "#14b8a6", // teal
      val: 6,
      description: "Kodladığım, tasarladığım ve hayata geçirdiğim yazılım projeleri. Açık kaynak dünyasına katkılarım ve kişisel laboratuvarım.",
      relatedNodes: ["ben"],
      icon: "💻",
      link: "https://github.com/umut-zeybek"
    }
  ],
  links: [
    // Center connections
    { source: "ben", target: "basketbol" },
    { source: "ben", target: "edebiyat" },
    { source: "ben", target: "felsefe" },
    { source: "ben", target: "muzik" },
    { source: "ben", target: "analitik_dusunme" },
    { source: "ben", target: "surekli_ogrenme" },
    { source: "ben", target: "baglanti_kurma" },
    { source: "ben", target: "takim_calismasi" },
    { source: "ben", target: "projelerim" },

    // Cross connections
    { source: "basketbol", target: "disiplin" },
    { source: "basketbol", target: "takim_calismasi" },
    
    { source: "edebiyat", target: "yazma" },
    { source: "edebiyat", target: "siir" },
    
    { source: "felsefe", target: "analitik_dusunme" },
    { source: "felsefe", target: "problem_cozme" },
    
    { source: "muzik", target: "yaratici_dusunme" },
    
    { source: "siir", target: "yazma" },
    { source: "siir", target: "yaratici_dusunme" },

    { source: "analitik_dusunme", target: "problem_cozme" },
    { source: "disiplin", target: "odaklanma" },
    { source: "baglanti_kurma", target: "yaratici_dusunme" },
    { source: "surekli_ogrenme", target: "arastirma" }
  ]
};
