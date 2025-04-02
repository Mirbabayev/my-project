import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { products } from '../../data/products';

export default function Brands() {
  const [searchQuery, setSearchQuery] = useState('');

  // Bütün brendləri əldə et və əlifba sırası ilə düz
  const allBrands = [...new Set(products.map(p => p.brand))].sort();
  
  // Brendləri ilk hərfinə görə qruplaşdır
  const groupedBrands: Record<string, string[]> = {};
  
  allBrands.forEach(brand => {
    const firstLetter = brand.charAt(0).toUpperCase();
    if (!groupedBrands[firstLetter]) {
      groupedBrands[firstLetter] = [];
    }
    groupedBrands[firstLetter].push(brand);
  });
  
  // Əlifba sırası ilə hrəfləri sırala
  const sortedLetters = Object.keys(groupedBrands).sort();
  
  // Axtarış nəticələrini filtrələ
  const filteredBrands = searchQuery
    ? allBrands.filter(brand => 
        brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allBrands;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-didot text-center mb-10">Brendlər</h1>
      
      {/* Axtarış paneli */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Brend axtarın..." 
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {searchQuery ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Axtarış Nəticələri</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredBrands.map(brand => (
              <Link 
                key={brand} 
                to={`/products?brand=${encodeURIComponent(brand)}`}
                className="text-center p-4 border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all rounded-md"
              >
                <span className="block font-medium">{brand}</span>
                <span className="text-sm text-gray-500">
                  {products.filter(p => p.brand === brand).length} məhsul
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Əlifba indeksi */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {sortedLetters.map(letter => (
              <a 
                key={letter} 
                href={`#letter-${letter}`} 
                className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-primary hover:text-primary transition-colors rounded-md"
              >
                {letter}
              </a>
            ))}
          </div>
          
          {/* Brendlərin siyahısı */}
          <div className="space-y-8">
            {sortedLetters.map(letter => (
              <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                <h2 className="text-2xl font-didot mb-4 border-b border-gray-200 pb-2">{letter}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {groupedBrands[letter].map(brand => (
                    <Link 
                      key={brand} 
                      to={`/products?brand=${encodeURIComponent(brand)}`}
                      className="text-center p-4 border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all rounded-md"
                    >
                      <span className="block font-medium">{brand}</span>
                      <span className="text-sm text-gray-500">
                        {products.filter(p => p.brand === brand).length} məhsul
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 