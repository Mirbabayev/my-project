import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, Filter, Search, ShoppingBag, X, SlidersHorizontal, ArrowUpDown, Heart } from 'lucide-react';
import { products } from '../../data/products';

// Filtrlər üçün tiplər
type GenderFilter = 'hamısı' | 'kişi' | 'qadın' | 'uniseks';
type SortOption = 'default' | 'price-low-high' | 'price-high-low' | 'rating';

// Ətir qrupları
const fragranceFamilies = [
  "Çiçəkli",
  "Ədviyyəli",
  "Odunsu",
  "Sitruslu", 
  "Şərqli",
  "Meyvəli",
  "Dəniz",
  "Ətirli"
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('hamısı');
  const [brandFilters, setBrandFilters] = useState<string[]>([]);
  const [concentrationFilters, setConcentrationFilters] = useState<string[]>([]);
  const [noteFilters, setNoteFilters] = useState<string[]>([]);
  const [familyFilters, setFamilyFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Kataloqdan unikal dəyərləri əldə et
  const allBrands = useMemo(() => [...new Set(products.map(p => p.brand))], []);
  const allConcentrations = useMemo(() => [...new Set(products.map(p => p.concentration))], []);
  const allNotes = useMemo(() => {
    const notesSet = new Set<string>();
    products.forEach(product => {
      product.notes.forEach(note => notesSet.add(note));
    });
    return [...notesSet];
  }, []);

  // URL parametrlərini oxu və filterləri yenilə
  useEffect(() => {
    // URL-dən brand parametrini oxu
    const brandParam = searchParams.get('brand');
    if (brandParam) {
      setBrandFilters([brandParam]);
      // Filtr panelini avtomatik açma - istifadəçi özü düyməni klikləsin
      // setShowAdvancedFilters(true);
    }

    // URL-dən gender parametrini oxu
    const genderParam = searchParams.get('gender') as GenderFilter;
    if (genderParam && ['kişi', 'qadın', 'uniseks'].includes(genderParam)) {
      setGenderFilter(genderParam);
    }

    // URL-dən search parametrini oxu
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    // URL-dən family parametrini oxu
    const familyParam = searchParams.get('family');
    if (familyParam && fragranceFamilies.includes(familyParam)) {
      setFamilyFilters([familyParam]);
    }
    
    // URL-dən not parametrini oxu
    const noteParam = searchParams.get('note');
    if (noteParam && allNotes.includes(noteParam)) {
      setNoteFilters([noteParam]);
      // setShowAdvancedFilters(true); // Bu sətri deaktiv edirəm ki, panel avtomatik açılmasın
    }
  }, [searchParams, allNotes]);

  // Filtr dəyişdikdə URL parametrlərini yenilə
  useEffect(() => {
    const params = new URLSearchParams();
    
    // Axtarış parametri
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    // Cins parametri
    if (genderFilter !== 'hamısı') {
      params.set('gender', genderFilter);
    }
    
    // Brend parametri - sadəcə bir brend varsa
    if (brandFilters.length === 1) {
      params.set('brand', brandFilters[0]);
    }
    
    // Ətir qrupu parametri - sadəcə bir qrup varsa
    if (familyFilters.length === 1) {
      params.set('family', familyFilters[0]);
    }
    
    // Not parametri - sadəcə bir not varsa
    if (noteFilters.length === 1) {
      params.set('note', noteFilters[0]);
    }
    
    setSearchParams(params, { replace: true });
  }, [searchQuery, genderFilter, brandFilters, familyFilters, noteFilters, setSearchParams]);

  // Filtr tətbiq edilib-edilmədiyini yoxla
  const isFilterActive = 
    brandFilters.length > 0 || 
    concentrationFilters.length > 0 || 
    noteFilters.length > 0 ||
    familyFilters.length > 0;

  // Bütün filtrləri təmizlə
  const clearAllFilters = () => {
    setSearchQuery('');
    setGenderFilter('hamısı');
    setBrandFilters([]);
    setConcentrationFilters([]);
    setNoteFilters([]);
    setFamilyFilters([]);
    setSortOption('default');
  };

  // Çoxlu seçim filtrləri üçün yardımçı funksiya
  const toggleFilter = (value: string, currentFilters: string[], setFilters: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentFilters.includes(value)) {
      setFilters(currentFilters.filter(v => v !== value));
    } else {
      setFilters([...currentFilters, value]);
    }
  };

  // Məhsulların filtrələnmiş və sıralanmış siyahısı
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Axtarış filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Gender filter
    if (genderFilter !== 'hamısı') {
      filtered = filtered.filter(product => product.gender === genderFilter);
    }

    // Brend filter
    if (brandFilters.length > 0) {
      filtered = filtered.filter(product => brandFilters.includes(product.brand));
    }

    // Konsentrasiya filter
    if (concentrationFilters.length > 0) {
      filtered = filtered.filter(product => concentrationFilters.includes(product.concentration));
    }

    // Notlar filter
    if (noteFilters.length > 0) {
      filtered = filtered.filter(product => 
        product.notes.some(note => noteFilters.includes(note))
      );
    }
    
    // Qrup filter - notes massivindən qrup adları axtarmaq
    if (familyFilters.length > 0) {
      filtered = filtered.filter(product => {
        // Qeyd: Məhsul haqqında məlumatlarda məhsulun hansı qrupa aid olması açıq qeyd edilmədiyi üçün
        // biz notlar əsasında məhsulu müəyyən qruplara aid edə bilərik
        const productNotes = product.notes.map(note => note.toLowerCase());
        return familyFilters.some(family => {
          const familyLower = family.toLowerCase();
          // Şərti qayda: Əgər note-larda qrup adına oxşar söz varsa, məhsul o qrupa aiddir
          // Bu real məlumat olmadığı üçün sadə nümunədir, gerçəkdə daha dəqiq məlumat lazımdır
          switch (familyLower) {
            case 'çiçəkli':
              return productNotes.some(note => ['qızılgül', 'jasmin', 'çiçək', 'bənövşə', 'yasəmən', 'pion'].some(f => note.includes(f)));
            case 'ədviyyəli':
              return productNotes.some(note => ['ədviyyə', 'istiot', 'darçın', 'zəfəran', 'qaranfil', 'kardamon'].some(f => note.includes(f)));
            case 'odunsu':
              return productNotes.some(note => ['ağac', 'sandal', 'tütün', 'sedir', 'məxmər'].some(f => note.includes(f)));
            case 'sitruslu':
              return productNotes.some(note => ['portağal', 'limon', 'bergamot', 'sitra', 'mandarin'].some(f => note.includes(f)));
            case 'şərqli':
              return productNotes.some(note => ['amber', 'müşk', 'oud', 'dəri', 'vanil'].some(f => note.includes(f)));
            case 'meyvəli':
              return productNotes.some(note => ['alma', 'şaftalı', 'meyvə', 'armud', 'qarağat'].some(f => note.includes(f)));
            case 'dəniz':
              return productNotes.some(note => ['dəniz', 'su', 'okean'].some(f => note.includes(f)));
            case 'ətirli':
              return productNotes.some(note => ['lavanda', 'rozmarin', 'mint', 'nanə', 'yaşıl çay'].some(f => note.includes(f)));
            default:
              return false;
          }
        });
      });
    }

    // Sıralama
    switch (sortOption) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sıralama (ID üzrə)
        filtered.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    }

    return filtered;
  }, [searchQuery, genderFilter, brandFilters, concentrationFilters, noteFilters, familyFilters, sortOption]);

  return (
    <div className="container mx-auto px-4 pt-0 pb-12">
      {/* Axtarış */}
      <div className="mt-0 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="font-medium text-gray-800 px-3 py-1.5 bg-gray-100 rounded-lg">
            <span className="text-primary font-bold">{filteredProducts.length}</span> məhsul tapıldı
          </div>
          
          <div className="relative w-full sm:max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Axtarış..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filtr və sıralama kontrolları */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`flex items-center text-sm font-medium ${showAdvancedFilters ? 'bg-primary text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-800'} px-4 py-2 rounded-lg transition-colors`}
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          {showAdvancedFilters ? 'Filtrləri gizlət' : 'Ətraflı filtr'}
          {isFilterActive && (
            <span className={`ml-1.5 ${showAdvancedFilters ? 'bg-white text-primary' : 'bg-primary text-white'} rounded-full w-5 h-5 flex items-center justify-center text-xs`}>
              {brandFilters.length + concentrationFilters.length + noteFilters.length + familyFilters.length}
            </span>
          )}
        </button>

        {/* Cins filtri - ortada */}
        <div className="flex justify-center flex-1 mx-2 overflow-x-auto py-1">
          <div className="flex gap-2">
            {['hamısı', 'kişi', 'qadın', 'uniseks'].map((gender) => (
              <button
                key={gender}
                onClick={() => setGenderFilter(gender as GenderFilter)}
                className={`px-5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                  genderFilter === gender
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <ArrowUpDown className="w-4 h-4 mr-2 text-gray-600" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="default">Tövsiyə edilən</option>
            <option value="price-low-high">Qiymət: aşağıdan yuxarıya</option>
            <option value="price-high-low">Qiymət: yuxarıdan aşağıya</option>
            <option value="rating">Reytinq</option>
          </select>
        </div>
      </div>

      {/* Ətraflı filtrlər - açılıb bağlanan */}
      {showAdvancedFilters && (
        <div className="bg-white p-5 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">Ətraflı filtrlər</h3>
            {isFilterActive && (
              <button 
                onClick={clearAllFilters}
                className="text-primary hover:text-primary/80 text-sm flex items-center"
              >
                <X className="w-4 h-4 mr-1" />
                Hamısını təmizlə
              </button>
            )}
          </div>
          
          {/* Ətir qrupları filtri */}
          <div className="mb-6 border-b border-gray-200 pb-6">
            <h3 className="font-medium mb-3 text-gray-800">Ətir qrupları</h3>
            <div className="flex flex-wrap gap-2">
              {fragranceFamilies.map((family) => (
                <button 
                  key={family}
                  onClick={() => toggleFilter(family, familyFilters, setFamilyFilters)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    familyFilters.includes(family)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {family}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Brendlər filter */}
            <div className="border border-gray-200 rounded-lg p-3">
              <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Brendlər
              </h3>
              <div className="max-h-40 overflow-y-auto pr-2 space-y-1">
                {allBrands.map((brand) => (
                  <div key={brand} className="mb-1 flex items-center hover:bg-gray-50 rounded px-1">
                    <input 
                      type="checkbox" 
                      id={`brand-${brand}`}
                      checked={brandFilters.includes(brand)}
                      onChange={() => toggleFilter(brand, brandFilters, setBrandFilters)}
                      className="mr-2 accent-primary h-4 w-4" 
                    />
                    <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer py-1">{brand}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Konsentrasiya filter */}
            <div className="border border-gray-200 rounded-lg p-3">
              <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Konsentrasiya
              </h3>
              <div className="space-y-1">
                {allConcentrations.map((concentration) => (
                  <div key={concentration} className="mb-1 flex items-center hover:bg-gray-50 rounded px-1">
                    <input 
                      type="checkbox" 
                      id={`concentration-${concentration}`}
                      checked={concentrationFilters.includes(concentration)}
                      onChange={() => toggleFilter(concentration, concentrationFilters, setConcentrationFilters)}
                      className="mr-2 accent-primary h-4 w-4" 
                    />
                    <label htmlFor={`concentration-${concentration}`} className="text-sm cursor-pointer py-1">{concentration}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Notlar filter */}
            <div className="border border-gray-200 rounded-lg p-3">
              <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Notlar
              </h3>
              <div className="max-h-40 overflow-y-auto pr-2 space-y-1">
                {allNotes.map((note) => (
                  <div key={note} className="mb-1 flex items-center hover:bg-gray-50 rounded px-1">
                    <input 
                      type="checkbox" 
                      id={`note-${note}`}
                      checked={noteFilters.includes(note)}
                      onChange={() => toggleFilter(note, noteFilters, setNoteFilters)}
                      className="mr-2 accent-primary h-4 w-4" 
                    />
                    <label htmlFor={`note-${note}`} className="text-sm cursor-pointer py-1">{note}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Aktiv filtrlər göstər - əgər varsa */}
          {isFilterActive && (
            <div className="mt-5 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium mb-2 text-gray-600">Aktiv filtrlər:</h3>
              <div className="flex flex-wrap gap-2">
                {brandFilters.map(brand => (
                  <div key={brand} className="flex items-center bg-primary/10 px-3 py-1 rounded-full text-sm">
                    <span className="text-primary font-medium">{brand}</span>
                    <button onClick={() => toggleFilter(brand, brandFilters, setBrandFilters)} className="ml-2 text-primary">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {concentrationFilters.map(concentration => (
                  <div key={concentration} className="flex items-center bg-primary/10 px-3 py-1 rounded-full text-sm">
                    <span className="text-primary font-medium">{concentration}</span>
                    <button onClick={() => toggleFilter(concentration, concentrationFilters, setConcentrationFilters)} className="ml-2 text-primary">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {noteFilters.map(note => (
                  <div key={note} className="flex items-center bg-primary/10 px-3 py-1 rounded-full text-sm">
                    <span className="text-primary font-medium">{note}</span>
                    <button onClick={() => toggleFilter(note, noteFilters, setNoteFilters)} className="ml-2 text-primary">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {familyFilters.map(family => (
                  <div key={family} className="flex items-center bg-primary/10 px-3 py-1 rounded-full text-sm">
                    <span className="text-primary font-medium">{family}</span>
                    <button onClick={() => toggleFilter(family, familyFilters, setFamilyFilters)} className="ml-2 text-primary">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-3"></div>

      {/* Məhsulların siyahısı */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-500">Axtarışınıza uyğun məhsul tapılmadı.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {filteredProducts.map((product) => (
            <Link 
              to={`/products/${product.id}`} 
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
              <div className="relative overflow-hidden bg-gray-50 h-52 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={`${product.brand} ${product.name} ətri`}
                  title={`${product.brand} ${product.name}`}
                  className="max-h-44 max-w-[80%] h-auto w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://dummyimage.com/200x200/f0f0f0/333333.png&text=Şəkil+yoxdur";
                    target.onerror = null; // Prevent infinite fallback loop
                  }}
                />
                {!product.inStock && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Bitib
                  </div>
                )}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-primary mb-1">{product.brand}</h3>
                <h2 className="font-bold text-gray-800 text-lg mb-2 line-clamp-1">{product.name}</h2>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 capitalize">{product.gender} • {product.size}</span>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-lg text-gray-900">{product.price} ₼</span>
                  <button className="flex items-center justify-center bg-primary text-white rounded-full w-8 h-8 hover:bg-primary/90 transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}