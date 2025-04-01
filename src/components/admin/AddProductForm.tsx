import React, { useState, useEffect } from 'react';
import { Eye, Plus, X, Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { products as allProducts } from '../../data/products';

// Not tipləri
type NoteType = 'top' | 'middle' | 'base';

// Məhsul interfeysi
interface ProductFormData {
  name: string;
  brand: string;
  price: string;
  description: string;
  category: string;
  gender: 'kişi' | 'qadın' | 'uniseks';
  size: string;
  concentration: string;
  inStock: boolean;
  featured: boolean;
  fragranceGroup: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  image: string;
}

// Props interfeysi
interface AddProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  isSubmitting?: boolean;
}

// Default kataloq məlumatları
const defaultCatalogData = {
  brands: [
    "Chanel", "Dior", "Tom Ford", "Lancôme", "Guerlain", "Givenchy", 
    "Yves Saint Laurent", "Jo Malone", "Hermès", "Prada", "Armani", 
    "Versace", "Dolce & Gabbana", "Burberry", "Byredo", "Creed", 
    "Marc Jacobs", "Maison Francis Kurkdjian", "Kilian", "Atelier Cologne", 
    "Penhaligon's", "Parfums de Marly", "Jean Paul Gaultier", "Thierry Mugler", 
    "Gucci", "Calvin Klein", "Diptyque", "Escada", "Valentino"
  ],
  categories: ["parfum", "skin care", "makeup", "hair care", "body care"],
  fragranceGroups: [
    "Şərq", "Çiçəkli", "Odunlu", "Sitrus", "Fougère", "Aldehydic", 
    "Aromatic", "Chypre", "Dəri", "Gourmand", "Yaşıl", "Su", "Tərəvəz", 
    "Meyvəli", "Spicy", "Ədviyyatlı", "Tütün", "İçki"
  ],
  bottleSizes: ["30ml", "50ml", "75ml", "100ml", "125ml", "150ml", "200ml"],
  concentrations: ["Eau de Toilette", "Eau de Parfum", "Parfum", "Cologne", "Eau de Cologne", "Elixir", "Extrait"],
  notes: {
    top: [
      "Bergamot", "Limon", "Portağal", "Mandalin", "Qreypfrut", "Laym",
      "Alma", "Armud", "Ananas", "Şaftalı", "Ərik", "Gilas", 
      "Albalı", "Qara qarağat", "Qırmızı qarağat", "Çiyələk", "Moruq",
      "Yaşıl yarpaqlar", "Nanə", "Rozmarin", "Bənövşə yarpağı", 
      "Zəncəfil", "Qara istiot", "Çili", "Mixək", "Darçın", "Nutmeg",
      "Aldehidlər", "Dəniz notları", "Konyak", "Viski", "Anise"
    ],
    middle: [
      "Qızılgül", "Jasmin", "Lavanda", "Yasəmən", "Bənövşə", "Süsən", 
      "Zanbaq", "Orkide", "Mimoza", "Süsəngülü (İris)", "Günəbaxan", "Tubereuse",
      "Nərgiz", "Qartopu çiçəyi", "Freziya", "Pion", "Hibiskus", "Magnoliya",
      "Hil", "Zəfəran", "Muskat", "Dəfnə yarpağı", "Keşniş", "Şüyüd",
      "Bal", "Ulduz anisi", "Çay", "Yaşıl çay", "Kakao", "Espresso",
      "Süd", "Badəm", "Qəhvə", "Kakos südü", "İçki notları", "Tütün çiçəyi"
    ],
    base: [
      "Vanil", "Müşk", "Paçuli", "Ənbər", "Oud", "Sedir", "Sandal ağacı",
      "Vetiver", "Benzoin", "Labdanum", "Qatran", "Kəhrəba", "Daş kömür",
      "Peru balzamı", "Kopaiva balzamı", "Tolu balzamı", "Kopal", "Styrax",
      "Kastoreum", "Civetta", "Ambergris", "Dəri",
      "Tonka paxlası", "Tütün", "Kakao", "Qəhvə", "Karamel", 
      "Pralini", "Şokolad", "Məxmər", "Mirrha", "Buxur", "Ladanum"
    ]
  }
};

const AddProductForm: React.FC<AddProductFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const navigate = useNavigate();
  
  // Form məlumatlarının state'i
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    brand: "",
    price: "",
    description: "",
    category: "parfum",
    gender: "uniseks",
    size: "",
    concentration: "",
    inStock: true,
    featured: false,
    fragranceGroup: "",
    notes: {
      top: [],
      middle: [],
      base: []
    },
    image: ""
  });
  
  // Brendə aid məhsulları göstərmək üçün state'lər
  const [showBrandProducts, setShowBrandProducts] = useState(false);
  const [brandProducts, setBrandProducts] = useState<any[]>([]);
  
  // Kataloq məlumatları
  const [brands, setBrands] = useState<string[]>(defaultCatalogData.brands);
  const [categories, setCategories] = useState<string[]>(defaultCatalogData.categories);
  const [fragranceGroups, setFragranceGroups] = useState<string[]>(defaultCatalogData.fragranceGroups);
  const [bottleSizes, setBottleSizes] = useState<string[]>(defaultCatalogData.bottleSizes);
  const [concentrations, setConcentrations] = useState<string[]>(defaultCatalogData.concentrations);
  const [notes, setNotes] = useState(defaultCatalogData.notes);
  
  // Not əlavə etmə interfeysi üçün state'lər
  const [activeNoteType, setActiveNoteType] = useState<NoteType>('top');
  const [noteSearchTerm, setNoteSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState("");
  
  // LocalStorage'dan kataloq məlumatlarını yüklə
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('catalogData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setBrands(parsedData.brands || defaultCatalogData.brands);
        setCategories(parsedData.categories || defaultCatalogData.categories);
        setFragranceGroups(parsedData.fragranceGroups || defaultCatalogData.fragranceGroups);
        setBottleSizes(parsedData.bottleSizes || defaultCatalogData.bottleSizes);
        
        if (parsedData.notes && typeof parsedData.notes === 'object' && 
            parsedData.notes.top && parsedData.notes.middle && parsedData.notes.base) {
          setNotes(parsedData.notes);
        }
      }
    } catch (error) {
      console.error("Kataloq məlumatlarını yükləməkdə xəta:", error);
    }
  }, []);
  
  // Not axtarışı üçün filtrlənmiş notlar
  const filteredNotes = (noteType: NoteType) => {
    if (!noteSearchTerm.trim()) return notes[noteType];
    
    return notes[noteType].filter(note => 
      note.toLowerCase().includes(noteSearchTerm.toLowerCase())
    );
  };
  
  // Input dəyişiklik handleri
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Əgər brand dəyişirsə, həmin brendə aid məhsulları tap
      if (name === 'brand' && value) {
        const products = allProducts.filter(p => p.brand === value).slice(0, 5);
        setBrandProducts(products);
        setShowBrandProducts(products.length > 0);
      } else if (name === 'brand' && !value) {
        setShowBrandProducts(false);
      }
    }
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
    setSelectedNote("");
  };
  
  // Not silmək
  const removeNote = (noteType: NoteType, note: string) => {
    setFormData(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [noteType]: prev.notes[noteType].filter(n => n !== note)
      }
    }));
  };
  
  // Form göndərmə
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  // Şəkil yükləmə simulyasiyası
  const handleImageUpload = () => {
    // Burada şəkil yükləmə əməliyyatı olacaq, hələlik sadəcə placeholder
    setFormData(prev => ({
      ...prev,
      image: "https://via.placeholder.com/500x500?text=Product+Image"
    }));
  };
  
  // Məhsul seçimi
  const selectProduct = (product: any) => {
    // Seçilən məhsul'un bəzi məlumatlarını forma əlavə et
    setFormData(prev => ({
      ...prev,
      name: product.name,
      description: product.description,
      category: product.category,
      gender: product.gender,
      size: product.size,
      concentration: product.concentration,
      fragranceGroup: product.fragranceGroup || "",
      notes: {
        top: product.notes?.top || [],
        middle: product.notes?.middle || [],
        base: product.notes?.base || []
      }
    }));
    setShowBrandProducts(false);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sol tərəf */}
          <div className="space-y-6">
            {/* Əsas məlumatlar */}
            <div className="border rounded-lg p-4 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Əsas Məlumatlar</h2>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brend *
                </label>
                <select 
                  name="brand" 
                  value={formData.brand} 
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-primary focus:ring-primary rounded-md w-full"
                  required
                >
                  <option value="">Brendi seçin</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
                
                {/* Brend məhsullarının siyahısı */}
                {showBrandProducts && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    <div className="sticky top-0 bg-gray-100 px-4 py-2 border-b">
                      <h3 className="text-sm font-medium text-gray-700">
                        {formData.brand} brendinə aid məhsullar
                      </h3>
                    </div>
                    <ul className="py-1">
                      {brandProducts.map(product => (
                        <li 
                          key={product.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                          onClick={() => selectProduct(product)}
                        >
                          <div className="flex items-center">
                            {product.image && (
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="h-8 w-8 mr-3 object-cover rounded"
                              />
                            )}
                            <span>{product.name}</span>
                          </div>
                          <button 
                            type="button"
                            className="text-primary hover:text-primary/80"
                            onClick={(e) => {
                              e.stopPropagation();
                              selectProduct(product);
                            }}
                          >
                            <Eye size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Məhsul adı *
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className="border-gray-300 focus:border-primary focus:ring-primary rounded-md w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qiymət (₼) *
                </label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleInputChange} 
                  min="0" 
                  step="0.01"
                  className="border-gray-300 focus:border-primary focus:ring-primary rounded-md w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kateqoriya *
                </label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-primary focus:ring-primary rounded-md w-full"
                  required
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Məhsul təsviri
                </label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  rows={4}
                  className="border-gray-300 focus:border-primary focus:ring-primary rounded-md w-full"
                ></textarea>
              </div>
            </div>
            
            {/* Şəkil yükləmə */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Məhsul Şəkli</h2>
              
              {formData.image ? (
                <div className="relative">
                  <img 
                    src={formData.image} 
                    alt="Məhsul şəkli" 
                    className="w-full h-64 object-cover rounded-md"
                  />
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center cursor-pointer hover:border-primary"
                  onClick={handleImageUpload}
                >
                  <Upload className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-500">Şəkil yükləmək üçün klikləyin</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF format (max 2MB)</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Sağ tərəf */}
          <div className="space-y-6">
            {/* Əlavə məlumatlar */}
            <div className="border rounded-lg p-4 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Əlavə Məlumatlar</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cins
                </label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-primary focus:ring-primary rounded-md w-full"
                >
                  <option value="uniseks">Uniseks</option>
                  <option value="kişi">Kişi</option>
                  <option value="qadın">Qadın</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şüşə həcmi
                </label>
                <select 
                  name="size" 
                  value={formData.size} 
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-primary focus:ring-primary rounded-md w-full"
                >
                  <option value="">Həcmi seçin</option>
                  {bottleSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Konsentrasiya
                </label>
                <select 
                  name="concentration" 
                  value={formData.concentration} 
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-primary focus:ring-primary rounded-md w-full"
                >
                  <option value="">Konsentrasiya seçin</option>
                  {concentrations.map(conc => (
                    <option key={conc} value={conc}>{conc}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ətir qrupu
                </label>
                <select 
                  name="fragranceGroup" 
                  value={formData.fragranceGroup} 
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-primary focus:ring-primary rounded-md w-full"
                >
                  <option value="">Ətir qrupu seçin</option>
                  {fragranceGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="inStock" 
                    name="inStock"
                    checked={formData.inStock} 
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
                    Stokda var
                  </label>
                </div>
                
                <div className="flex items-center ml-4">
                  <input 
                    type="checkbox" 
                    id="featured" 
                    name="featured"
                    checked={formData.featured} 
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                    Seçilmiş məhsul
                  </label>
                </div>
              </div>
            </div>
            
            {/* Notlar */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Notlar</h2>
              
              {/* Not tiplərini seçmək üçün tab'lar */}
              <div className="mb-4 border-b">
                <div className="flex space-x-4">
                  <button 
                    type="button"
                    className={`py-2 px-3 font-medium text-sm ${activeNoteType === 'top' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
                    onClick={() => setActiveNoteType('top')}
                  >
                    Top Notlar
                  </button>
                  <button 
                    type="button"
                    className={`py-2 px-3 font-medium text-sm ${activeNoteType === 'middle' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
                    onClick={() => setActiveNoteType('middle')}
                  >
                    Middle Notlar
                  </button>
                  <button 
                    type="button"
                    className={`py-2 px-3 font-medium text-sm ${activeNoteType === 'base' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
                    onClick={() => setActiveNoteType('base')}
                  >
                    Base Notlar
                  </button>
                </div>
              </div>
              
              {/* Not əlavə etmə */}
              <div className="flex gap-2 mb-4">
                <select 
                  value={selectedNote}
                  onChange={(e) => setSelectedNote(e.target.value)}
                  className="border-gray-300 focus:border-primary focus:ring-primary rounded-md flex-1"
                >
                  <option value="">Not seçin</option>
                  {filteredNotes(activeNoteType).map(note => (
                    <option key={note} value={note}>{note}</option>
                  ))}
                </select>
                <button 
                  type="button"
                  onClick={() => addNote(selectedNote)}
                  className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  <Plus size={18} />
                </button>
              </div>
              
              {/* Seçilmiş notların siyahısı */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Seçilmiş {activeNoteType} notlar:</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.notes[activeNoteType].length > 0 ? (
                    formData.notes[activeNoteType].map(note => (
                      <span 
                        key={note} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {note}
                        <button 
                          type="button" 
                          onClick={() => removeNote(activeNoteType, note)}
                          className="ml-1 text-primary hover:text-primary/80"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">Heç bir not seçilməyib</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Əməliyyat düymələri */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Link 
            to="/admin/products"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Ləğv et
          </Link>
          <button 
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Əlavə edilir...' : 'Məhsulu əlavə et'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm; 