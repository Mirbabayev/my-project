import React from 'react';

// Featured section structure
export interface FeaturedSection {
  enabled: boolean;
  title: string;
  subtitle: string;
  maxProducts: number;
  showDiscount: boolean;
  sortBy: 'newest' | 'popular' | 'discount';
}

interface FeaturedSettingsProps {
  featuredSettings: FeaturedSection;
  onChange: (settings: FeaturedSection) => void;
}

const FeaturedSettings: React.FC<FeaturedSettingsProps> = ({ featuredSettings, onChange }) => {
  // Handler to update values
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const isNumber = type === 'number';
    
    onChange({
      ...featuredSettings,
      [name]: isCheckbox 
        ? (e.target as HTMLInputElement).checked 
        : isNumber 
          ? Number(value)
          : value
    });
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Seçilmiş məhsullar bölməsi</h3>
        <div className="flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="enabled"
              checked={featuredSettings.enabled}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {featuredSettings.enabled ? 'Aktiv' : 'Deaktiv'}
            </span>
          </label>
        </div>
      </div>

      {/* Text fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bölmə başlığı
          </label>
          <input
            type="text"
            name="title"
            value={featuredSettings.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alt başlıq
          </label>
          <input
            type="text"
            name="subtitle"
            value={featuredSettings.subtitle}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Display options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Göstəriləcək məhsul sayı
          </label>
          <input
            type="number"
            name="maxProducts"
            min={1}
            max={12}
            value={featuredSettings.maxProducts}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sıralama meyarı
          </label>
          <select
            name="sortBy"
            value={featuredSettings.sortBy}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="newest">Ən yenilər</option>
            <option value="popular">Ən populyar</option>
            <option value="discount">Ən böyük endirim</option>
          </select>
        </div>

        <div className="flex items-end mb-1">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="showDiscount"
              checked={featuredSettings.showDiscount}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              Endirim faizini göstər
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSettings; 