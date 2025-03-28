import { useState, useEffect } from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Image as ImageIcon, Plus } from "lucide-react";

// Not tipləri
type NoteType = 'top' | 'middle' | 'base';

export default function NewProduct() {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    category: "parfum",
    inStock: true,
    featured: false,
    fragranceGroup: "",
    bottleSize: "",
    perfumer: "",
    country: "",
    notes: {
      top: [] as string[],
      middle: [] as string[],
      base: [] as string[]
    }
  });
  
  // Kataloq datası
  const [brands, setBrands] = useState<string[]>([]);
  const [productsByBrand, setProductsByBrand] = useState<{ [brand: string]: string[] }>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [notes, setNotes] = useState<{
    top: string[];
    middle: string[];
    base: string[];
  }>({
    top: [],
    middle: [],
    base: []
  });
  const [fragranceGroups, setFragranceGroups] = useState<string[]>([]);
  const [bottleSizes, setBottleSizes] = useState<string[]>([]);
  const [perfumers, setPerfumers] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  
  // Aktiv not tipi
  const [activeNoteType, setActiveNoteType] = useState<NoteType>('top');
  
  // Not axtarış funksiyası
  const [noteSearchTerm, setNoteSearchTerm] = useState("");
  
  // Filtrlənmiş notlar
  const filteredNotes = (noteType: NoteType) => {
    if (!noteSearchTerm.trim()) return notes[noteType];
    
    return notes[noteType].filter(note => 
      note.toLowerCase().includes(noteSearchTerm.toLowerCase())
    );
  };
  
  // Əlavə state-lər
  const [availableProducts, setAvailableProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Default data for testing
  const defaultData = {
    brands: [
      "Chanel", "Dior", "Tom Ford", "Lancôme", "Guerlain", "Givenchy", 
      "Yves Saint Laurent", "Jo Malone", "Hermès", "Prada", "Armani", 
      "Versace", "Dolce & Gabbana", "Burberry", "Byredo", "Creed", 
      "Marc Jacobs", "Maison Francis Kurkdjian", "Kilian", "Atelier Cologne", 
      "Penhaligon's", "Parfums de Marly", "Jean Paul Gaultier", "Thierry Mugler", 
      "Gucci", "Calvin Klein", "Diptyque", "Escada", "Valentino"
    ],
    productsByBrand: {
      "Chanel": ["Coco Mademoiselle", "Chance", "N°5", "Bleu de Chanel", "Allure", "Gabrielle", "Cristalle", "Antaeus"],
      "Dior": ["Sauvage", "J'adore", "Miss Dior", "Dior Homme", "Fahrenheit", "Poison", "Hypnotic Poison", "Jadore Dior"],
      "Lancôme": ["La Vie Est Belle", "Trésor", "Idôle", "Hypnôse", "Miracle", "Ô de Lancôme", "Magie Noire"],
      "Tom Ford": ["Black Orchid", "Oud Wood", "Tobacco Vanille", "Neroli Portofino", "Tuscan Leather", "Soleil Blanc", "F*cking Fabulous"],
      "Guerlain": ["Shalimar", "Mon Guerlain", "L'Homme Idéal", "La Petite Robe Noire", "Aqua Allegoria", "Habit Rouge", "Vetiver"],
      "Yves Saint Laurent": ["Black Opium", "Libre", "Mon Paris", "Y", "L'Homme", "Kouros", "La Nuit de L'Homme", "Opium"],
      "Jo Malone": ["English Pear & Freesia", "Lime Basil & Mandarin", "Wood Sage & Sea Salt", "Peony & Blush Suede"],
      "Hermès": ["Terre d'Hermès", "Un Jardin sur le Nil", "Twilly d'Hermès", "Eau des Merveilles", "Kelly Calèche"],
      "Prada": ["Luna Rossa", "L'Homme", "La Femme", "Candy", "Infusion d'Iris", "Amber"],
      "Armani": ["Acqua di Giò", "Code", "Sì", "Armani Privé", "My Way", "Stronger With You", "Diamonds"],
      "Givenchy": ["L'Interdit", "Gentleman", "Amarige", "Ange ou Démon", "Pi", "Very Irrésistible"],
      "Creed": ["Aventus", "Green Irish Tweed", "Silver Mountain Water", "Viking", "Original Santal", "Royal Oud"],
      "Byredo": ["Gypsy Water", "Bal d'Afrique", "Mojave Ghost", "Blanche", "Bibliothèque", "Slow Dance"],
      "Maison Francis Kurkdjian": ["Baccarat Rouge 540", "Grand Soir", "Aqua Universalis", "Amyris", "Oud Satin Mood"],
      "Versace": ["Bright Crystal", "Eros", "Dylan Blue", "Crystal Noir", "The Dreamer", "Blue Jeans", "Yellow Diamond", "Versense"],
      "Dolce & Gabbana": ["Light Blue", "The One", "K", "Pour Homme", "Dolce", "The Only One", "Pour Femme"],
      "Burberry": ["Her", "Brit", "Touch", "My Burberry", "London", "Mr. Burberry", "Weekend"],
      "Kilian": ["Good Girl Gone Bad", "Black Phantom", "Straight to Heaven", "Love Don't Be Shy", "Moonlight in Heaven"],
      "Marc Jacobs": ["Daisy", "Decadence", "Perfect", "Dot", "Divine Decadence", "Honey"],
      "Atelier Cologne": ["Orange Sanguine", "Vanille Insensée", "Clémentine California", "Cédrat Enivrant", "Café Tuberosa"],
      "Penhaligon's": ["Halfeti", "Empressa", "Endymion", "Luna", "Portraits Collection", "Quercus"],
      "Parfums de Marly": ["Layton", "Percival", "Delina", "Pegasus", "Herod", "Carlisle"],
      "Jean Paul Gaultier": ["Le Male", "Classique", "Scandal", "Ultra Male", "Le Beau"],
      "Thierry Mugler": ["Angel", "Alien", "Womanity", "A*Men", "Aura", "Angel Muse"],
      "Gucci": ["Bloom", "Guilty", "Flora", "Memoire", "Bamboo", "Made to Measure"],
      "Calvin Klein": ["CK One", "Eternity", "Obsession", "Euphoria", "CK Be", "CK Everyone"],
      "Diptyque": ["Philosykos", "Do Son", "Eau Rose", "L'Ombre dans L'Eau", "Tam Dao", "Eau Duelle"],
      "Escada": ["Cherry in the Air", "Born in Paradise", "Flor del Sol", "Island Kiss", "Moon Sparkle", "Turquoise Summer"],
      "Valentino": ["Valentino Uomo", "Valentina", "Born in Roma", "Donna", "Voce Viva", "Noir Absolu"]
    },
    categories: ["parfum", "skin care", "makeup", "hair care", "body care"],
    notes: {
      top: [
        // Sitrus notları
        "Bergamot", "Limon", "Portağal", "Mandalin", "Qreypfrut", "Laym",
        // Meyvə notları
        "Alma", "Armud", "Ananas", "Şaftalı", "Ərik", "Gilas", 
        "Albalı", "Qara qarağat", "Qırmızı qarağat", "Çiyələk", "Moruq",
        // Yaşıl notlar
        "Yaşıl yarpaqlar", "Nanə", "Rozmarin", "Bənövşə yarpağı", 
        // Ədviyyat notları
        "Zəncəfil", "Qara istiot", "Çili", "Mixək", "Darçın", "Nutmeg",
        // Digər
        "Aldehidlər", "Dəniz notları", "Konyak", "Viski", "Anise"
      ],
      middle: [
        // Çiçək notları
        "Qızılgül", "Jasmin", "Lavanda", "Yasəmən", "Bənövşə", "Süsən", 
        "Zanbaq", "Orkide", "Mimoza", "Süsəngülü (İris)", "Günəbaxan", "Tubereuse",
        "Nərgiz", "Qartopu çiçəyi", "Freziya", "Pion", "Hibiskus", "Magnoliya",
        // Ədviyyat notları
        "Hil", "Zəfəran", "Muskat", "Dəfnə yarpağı", "Keşniş", "Şüyüd",
        // Digər
        "Bal", "Ulduz anisi", "Çay", "Yaşıl çay", "Kakao", "Espresso",
        "Süd", "Badəm", "Qəhvə", "Kakos südü", "İçki notları", "Tütün çiçəyi"
      ],
      base: [
        // Odunlu notlar
        "Vanil", "Müşk", "Paçuli", "Ənbər", "Oud", "Sedir", "Sandal ağacı",
        "Vetiver", "Benzoin", "Labdanum", "Qatran", "Kəhrəba", "Daş kömür",
        // Balzamik notlar
        "Peru balzamı", "Kopaiva balzamı", "Tolu balzamı", "Kopal", "Styrax",
        // Heyvan notları
        "Kastoreum", "Civetta", "Ambergris", "Dəri",
        // Digər
        "Tonka paxlası", "Tütün", "Kakao", "Qəhvə", "Karamel", 
        "Pralini", "Şokolad", "Məxmər", "Mirrha", "Buxur", "Ladanum"
      ]
    },
    fragranceGroups: [
      "Şərq", "Çiçəkli", "Odunlu", "Sitrus", "Fougère", "Aldehydic", 
      "Aromatic", "Chypre", "Dəri", "Gourmand", "Yaşıl", "Su", "Tərəvəz", 
      "Meyvəli", "Spicy", "Ədviyyatlı", "Tütün", "İçki"
    ],
    bottleSizes: ["30ml", "50ml", "75ml", "100ml", "125ml", "150ml", "200ml"],
    perfumers: [
      "Françis Kurkdjian", "Alberto Morillas", "Christine Nagel",
      "Olivier Polge", "Jacques Polge", "Jean-Claude Ellena", 
      "Mathilde Laurent", "Daniela Andrier", "Thierry Wasser",
      "Maurice Roucel", "Jean-Louis Sieuzac", "Sophia Grojsman",
      "Christopher Sheldrake", "Dominique Ropion", "Anne Flipo",
      "Carlos Benaim", "Calice Becker", "Jacques Cavallier",
      "Edouard Fléchier", "Pierre Bourdon", "Michel Almairac",
      "Annick Menardo", "Nathalie Lorson", "Olivier Cresp"
    ],
    countries: [
      "Fransa", "İtaliya", "ABŞ", "Böyük Britaniya", "İspaniya", 
      "Almaniya", "İsveçrə", "Birləşmiş Ərəb Əmirlikləri", "Yaponiya", 
      "Kanada", "Niderland", "İsveç", "Avstraliya", "Hindistan", 
      "Belçika", "Rusiya", "Braziliya", "Portuqaliya", "Türkiyə"
    ]
  };
  
  // Kataloq datasını yüklə
  useEffect(() => {
    setIsLoading(true);
    try {
      // localStorage-dən yüklə
      const savedData = localStorage.getItem('catalogData');
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // Data varsa istifadə et
        setBrands(parsedData.brands || defaultData.brands);
        setProductsByBrand(parsedData.productsByBrand || defaultData.productsByBrand);
        setCategories(parsedData.categories || defaultData.categories);
        
        // Notlar
        if (parsedData.notes && typeof parsedData.notes === 'object' && 
            parsedData.notes.top && parsedData.notes.middle && parsedData.notes.base) {
          setNotes(parsedData.notes);
        } else {
          setNotes(defaultData.notes);
        }
        
        setFragranceGroups(parsedData.fragranceGroups || defaultData.fragranceGroups);
        setBottleSizes(parsedData.bottleSizes || defaultData.bottleSizes);
        setPerfumers(parsedData.perfumers || defaultData.perfumers);
        setCountries(parsedData.countries || defaultData.countries);
      } else {
        // Default data istifadə et
        setBrands(defaultData.brands);
        setProductsByBrand(defaultData.productsByBrand);
        setCategories(defaultData.categories);
        setNotes(defaultData.notes);
        setFragranceGroups(defaultData.fragranceGroups);
        setBottleSizes(defaultData.bottleSizes);
        setPerfumers(defaultData.perfumers);
        setCountries(defaultData.countries);
      }
    } catch (error) {
      // Xəta halında default data istifadə et
      setBrands(defaultData.brands);
      setProductsByBrand(defaultData.productsByBrand);
      setCategories(defaultData.categories);
      setNotes(defaultData.notes);
      setFragranceGroups(defaultData.fragranceGroups);
      setBottleSizes(defaultData.bottleSizes);
      setPerfumers(defaultData.perfumers);
      setCountries(defaultData.countries);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Brend dəyişdikdə məhsul siyahısını yenilə
  useEffect(() => {
    if (formData.brand) {
      // Seçilmiş brend üçün məhsulları göstər
      const products = productsByBrand[formData.brand] || [];
      setAvailableProducts(products);
    } else {
      // Brend seçilmədikdə bütün məhsulları göstər
      const allProducts: string[] = [];
      Object.values(productsByBrand).forEach(products => {
        allProducts.push(...products);
      });
      // Məhsulları əlifba sırasına düz
      setAvailableProducts(allProducts.sort());
    }
  }, [formData.brand, productsByBrand]);
  
  // Input dəyişiklik handleri
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      // Brend dəyişdikdə məhsul adını saxla
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Məhsul adına görə brend adını tapan funksiya
  const getBrandForProduct = (productName: string): string => {
    for (const [brand, products] of Object.entries(productsByBrand)) {
      if (products.includes(productName)) {
        return `(${brand})`;
      }
    }
    return "";
  };
  
  // Çox seçim üçün (notes)
  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues: string[] = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [activeNoteType]: selectedValues
      }
    }));
  };
  
  // Not əlavə etmək
  const addNote = (note: string) => {
    if (!note || formData.notes[activeNoteType].includes(note)) return;
    
    setFormData(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [activeNoteType]: [...prev.notes[activeNoteType], note]
      }
    }));
  };
  
  // Not silmək
  const removeNote = (note: string) => {
    setFormData(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [activeNoteType]: prev.notes[activeNoteType].filter(n => n !== note)
      }
    }));
  };
  
  // Not tipini dəyişmək üçün
  const handleNoteTypeChange = (type: NoteType) => {
    setActiveNoteType(type);
  };
  
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validasiyası
    if (!formData.name || !formData.price) {
      alert('Zəhmət olmasa məhsul adı və qiymət sahələrini doldurun!');
      return;
    }
    
    // Əgər brend seçilməyibsə, məhsul adına görə brendi təyin edirik
    let brandToUse = formData.brand;
    if (!brandToUse) {
      brandToUse = getBrandForProduct(formData.name).replace(/[()]/g, ""); // Mötərizələri silir
      
      if (!brandToUse) {
        alert('Məhsulun brendi təyin edilmədi. Zəhmət olmasa brend seçin və ya başqa məhsul adı seçin.');
        return;
      }
    }
    
    try {
      // Unikal ID yarat
      const timestamp = Date.now();
      const newId = `prod-${timestamp}`;
      
      // Məhsul obyekti yarat
      const newProduct = {
        id: newId,
        name: formData.name,
        brand: brandToUse,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        inStock: formData.inStock,
        featured: formData.featured,
        notes: formData.notes,
        fragranceGroup: formData.fragranceGroup,
        bottleSize: formData.bottleSize,
        perfumer: formData.perfumer,
        country: formData.country,
        createdAt: new Date().toISOString(),
        image: "/images/products/default.jpg",
      };
      
      // LocalStorage'a yaz
      const existingProducts = localStorage.getItem('products');
      const products = existingProducts ? JSON.parse(existingProducts) : [];
      products.push(newProduct);
      localStorage.setItem('products', JSON.stringify(products));
      
      // Əsas məhsul siyahısına qayıt
      navigate('/admin/products', { 
        state: { success: true, message: 'Məhsul uğurla əlavə edildi!' } 
      });
    } catch (error) {
      alert('Məhsul əlavə edilərkən xəta baş verdi!');
    }
  };
  
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center p-8">
          <p>Yüklənir...</p>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link 
              to="/admin/products" 
              className="p-2 border border-gold-200 rounded-md text-gold-700 hover:bg-gold-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-didot tracking-wider text-dark">Yeni Məhsul</h1>
          </div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Əsas məlumatlar */}
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-medium mb-4">Əsas Məlumatlar</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Brend seçimi */}
              <div>
                <label className="block text-sm font-medium text-gold-700 mb-1">
                  Brend*
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gold-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                >
                  <option value="">Brend seçin</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Məhsul adı - ƏSAS FUNKSİONALLIQ BURADIR */}
              <div>
                <label className="block text-sm font-medium text-gold-700 mb-1">
                  Məhsul Adı*
                </label>
                <select
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gold-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                >
                  <option value="">Məhsul adı seçin</option>
                  {availableProducts.map((productName) => (
                    <option key={productName} value={productName}>
                      {!formData.brand 
                        ? `${productName} ${getBrandForProduct(productName)}`  // Brend seçilmədikdə, məhsul adı - (Brend) formatında göstər
                        : productName  // Brend seçildikdə sadəcə məhsul adını göstər
                      }
                    </option>
                  ))}
                </select>
                
                {/* Xəbərdarlıq mesajı silindi */}
                {formData.brand && availableProducts.length === 0 && (
                  <p className="text-sm text-gold-500 mt-1">
                    Bu brend üçün məhsul tapılmadı. Kataloqda əlavə edin.
                  </p>
                )}
              </div>
              
              {/* Qiymət */}
              <div>
                <label className="block text-sm font-medium text-gold-700 mb-1">
                  Qiymət (₼)*
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gold-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              
              {/* Kateqoriya */}
              <div>
                <label className="block text-sm font-medium text-gold-700 mb-1">
                  Kateqoriya
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gold-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Təsvir */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gold-700 mb-1">
                Məhsul Təsviri
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gold-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              ></textarea>
            </div>
            
            {/* Çekbokslar */}
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="inStock"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary focus:ring-primary border-gold-300 rounded"
                />
                <label htmlFor="inStock" className="ml-2 text-sm text-gold-700">
                  Stokda var
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary focus:ring-primary border-gold-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gold-700">
                  Seçilmiş məhsul
                </label>
              </div>
            </div>
          </div>
          
          {/* Əlavə məlumatlar */}
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-medium mb-4">Ətir Xüsusiyyətləri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ətir qrupu */}
              <div>
                <label className="block text-sm font-medium text-gold-700 mb-1">
                  Ətir Qrupu
                </label>
                <select
                  name="fragranceGroup"
                  value={formData.fragranceGroup}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gold-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Qrup seçin</option>
                  {fragranceGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Şüşə ölçüsü */}
              <div>
                <label className="block text-sm font-medium text-gold-700 mb-1">
                  Həcm
                </label>
                <select
                  name="bottleSize"
                  value={formData.bottleSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gold-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Ölçü seçin</option>
                  {bottleSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Parfümer */}
              <div>
                <label className="block text-sm font-medium text-gold-700 mb-1">
                  Parfümer
                </label>
                <select
                  name="perfumer"
                  value={formData.perfumer}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gold-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Parfümer seçin</option>
                  {perfumers.map((perfumer) => (
                    <option key={perfumer} value={perfumer}>
                      {perfumer}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Ölkə */}
              <div>
                <label className="block text-sm font-medium text-gold-700 mb-1">
                  Mənşə Ölkəsi
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gold-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Ölkə seçin</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Notlar */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gold-700 mb-2">
                Ətir Notları (Piramida)
              </label>
              
              {/* Not tipləri seçimi */}
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 mb-3">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleNoteTypeChange('top')}
                    className={`px-4 py-2 rounded-md text-sm ${
                      activeNoteType === 'top'
                        ? 'bg-primary text-white'
                        : 'bg-gold-100 text-gold-700 hover:bg-gold-200'
                    }`}
                  >
                    Baş Notlar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNoteTypeChange('middle')}
                    className={`px-4 py-2 rounded-md text-sm ${
                      activeNoteType === 'middle'
                        ? 'bg-primary text-white'
                        : 'bg-gold-100 text-gold-700 hover:bg-gold-200'
                    }`}
                  >
                    Orta Notlar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNoteTypeChange('base')}
                    className={`px-4 py-2 rounded-md text-sm ${
                      activeNoteType === 'base'
                        ? 'bg-primary text-white'
                        : 'bg-gold-100 text-gold-700 hover:bg-gold-200'
                    }`}
                  >
                    Baza Notlar
                  </button>
                </div>
                
                <div className="flex-grow">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Not axtar..."
                      value={noteSearchTerm}
                      onChange={(e) => setNoteSearchTerm(e.target.value)}
                      className="w-full py-2 pl-3 pr-10 border border-gold-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                    />
                    {noteSearchTerm && (
                      <button
                        type="button"
                        onClick={() => setNoteSearchTerm("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-500 hover:text-gold-700"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Notlar seçim paneli */}
              <div className="border border-gold-200 rounded-md p-4 mb-3 bg-gold-50/50 max-h-60 overflow-y-auto">
                {filteredNotes(activeNoteType).length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {filteredNotes(activeNoteType).map((note) => (
                      <div key={note} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`note-${note}`}
                          checked={formData.notes[activeNoteType].includes(note)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              addNote(note);
                            } else {
                              removeNote(note);
                            }
                          }}
                          className="w-4 h-4 text-primary focus:ring-primary border-gold-300 rounded"
                        />
                        <label htmlFor={`note-${note}`} className="ml-2 text-sm text-gold-700 cursor-pointer truncate">
                          {note}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gold-500">
                    <p>Axtarışınıza uyğun not tapılmadı</p>
                  </div>
                )}
              </div>
              
              {/* Seçilmiş notlar göstərişi */}
              <div className="mt-3">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium text-gold-700">Baş Notlar:</span>
                    {formData.notes.top.length > 0 ? (
                      formData.notes.top.map((note) => (
                        <span key={note} className="text-xs bg-gold-100 text-gold-700 px-2 py-1 rounded flex items-center gap-1">
                          {note}
                          <button 
                            type="button" 
                            onClick={() => {
                              setActiveNoteType('top');
                              removeNote(note);
                            }}
                            className="text-gold-500 hover:text-gold-700 focus:outline-none"
                          >
                            &times;
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gold-500">Seçilməyib</span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium text-gold-700">Orta Notlar:</span>
                    {formData.notes.middle.length > 0 ? (
                      formData.notes.middle.map((note) => (
                        <span key={note} className="text-xs bg-gold-100 text-gold-700 px-2 py-1 rounded flex items-center gap-1">
                          {note}
                          <button 
                            type="button" 
                            onClick={() => {
                              setActiveNoteType('middle');
                              removeNote(note);
                            }}
                            className="text-gold-500 hover:text-gold-700 focus:outline-none"
                          >
                            &times;
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gold-500">Seçilməyib</span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium text-gold-700">Baza Notlar:</span>
                    {formData.notes.base.length > 0 ? (
                      formData.notes.base.map((note) => (
                        <span key={note} className="text-xs bg-gold-100 text-gold-700 px-2 py-1 rounded flex items-center gap-1">
                          {note}
                          <button 
                            type="button" 
                            onClick={() => {
                              setActiveNoteType('base');
                              removeNote(note);
                            }}
                            className="text-gold-500 hover:text-gold-700 focus:outline-none"
                          >
                            &times;
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gold-500">Seçilməyib</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Düymələr */}
          <div className="flex justify-end gap-3">
            <Link
              to="/admin/products"
              className="px-6 py-2 border border-gold-200 text-gold-700 rounded-md hover:bg-gold-50 transition-colors"
            >
              Ləğv et
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Məhsul Əlavə Et
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
} 