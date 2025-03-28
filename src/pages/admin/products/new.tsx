import { useState, useEffect } from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Image as ImageIcon, Plus } from "lucide-react";

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
    notes: [] as string[]
  });
  
  // Kataloq datası
  const [brands, setBrands] = useState<string[]>([]);
  const [productsByBrand, setProductsByBrand] = useState<{ [brand: string]: string[] }>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [fragranceGroups, setFragranceGroups] = useState<string[]>([]);
  const [bottleSizes, setBottleSizes] = useState<string[]>([]);
  const [perfumers, setPerfumers] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  
  // Əlavə state-lər
  const [availableProducts, setAvailableProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Default data for testing
  const defaultData = {
    brands: ["Chanel", "Dior", "Tom Ford", "Lancôme", "Guerlain"],
    productsByBrand: {
      "Chanel": ["Coco Mademoiselle", "Chance", "N°5", "Bleu de Chanel"],
      "Dior": ["Sauvage", "J'adore", "Miss Dior", "Dior Homme"],
      "Lancôme": ["La Vie Est Belle", "Trésor", "Idôle"],
      "Tom Ford": ["Black Orchid", "Oud Wood", "Tobacco Vanille"],
      "Guerlain": ["Shalimar", "Mon Guerlain", "L'Homme Idéal"]
    },
    categories: ["parfum", "skin care", "makeup", "hair care", "body care"],
    notes: ["Vanil", "Qızılgül", "Jasmin", "Müşk", "Paçuli", "Bergamot"],
    fragranceGroups: ["Şərq", "Çiçəkli", "Odunlu", "Sitrus"],
    bottleSizes: ["30ml", "50ml", "75ml", "100ml"],
    perfumers: ["Françis Kurkdjian", "Alberto Morillas", "Christine Nagel"],
    countries: ["Fransa", "İtaliya", "ABŞ", "Böyük Britaniya"]
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
        setNotes(Array.isArray(parsedData.notes) ? parsedData.notes : defaultData.notes);
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
      const products = productsByBrand[formData.brand] || [];
      setAvailableProducts(products);
    } else {
      setAvailableProducts([]);
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
  
  // Çox seçim üçün (notes)
  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues: string[] = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    
    setFormData(prev => ({ ...prev, notes: selectedValues }));
  };
  
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validasiyası
    if (!formData.name || !formData.brand || !formData.price) {
      alert('Zəhmət olmasa bütün lazımi sahələri doldurun!');
      return;
    }
    
    try {
      // Unikal ID yarat
      const timestamp = Date.now();
      const newId = `prod-${timestamp}`;
      
      // Məhsul obyekti yarat
      const newProduct = {
        id: newId,
        name: formData.name,
        brand: formData.brand,
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
                      {productName}
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
              <label className="block text-sm font-medium text-gold-700 mb-1">
                Ətir Notları
              </label>
              <select
                multiple
                name="notes"
                value={formData.notes}
                onChange={handleMultiSelectChange}
                className="w-full px-4 py-2 border border-gold-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                size={5}
              >
                {notes.map((note) => (
                  <option key={note} value={note}>
                    {note}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gold-500 mt-1">
                Birdən çox seçmək üçün CTRL (və ya CMD) düyməsini basılı saxlayın
              </p>
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