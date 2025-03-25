import React from 'react';
import { Info } from 'lucide-react';

// SEO settings structure
export interface SeoSettings {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  twitterCard: string;
  canonicalUrl: string;
  structuredData: string;
  enableIndexing: boolean;
}

interface SeoSettingsProps {
  seoSettings: SeoSettings;
  onChange: (settings: SeoSettings) => void;
}

const SeoSettings: React.FC<SeoSettingsProps> = ({ seoSettings, onChange }) => {
  // Handler to update values
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    onChange({
      ...seoSettings,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    });
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">SEO tənzimləmələri</h3>
        <div className="flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="enableIndexing"
              checked={seoSettings.enableIndexing}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {seoSettings.enableIndexing ? 'İndekslənir' : 'İndekslənmir'}
            </span>
          </label>
        </div>
      </div>

      {/* Basic SEO fields */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <div className="flex items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Sayt başlığı (Title)
            </label>
            <div className="relative ml-2 group">
              <Info className="h-4 w-4 text-gray-400 cursor-help" />
              <div className="absolute left-0 bottom-6 z-10 p-2 bg-gray-800 text-white text-xs rounded w-48 hidden group-hover:block">
                Başlıq 60 simvoldan az olmalıdır. Saytın əsas açar sözlərini ilə başlayır.
              </div>
            </div>
          </div>
          <input
            type="text"
            name="title"
            value={seoSettings.title}
            onChange={handleChange}
            maxLength={60}
            className="w-full p-2 border rounded-lg"
          />
          <div className="text-xs text-gray-500 mt-1">
            {seoSettings.title.length}/60 simvol
          </div>
        </div>

        <div>
          <div className="flex items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Məta təsvir (Meta Description)
            </label>
            <div className="relative ml-2 group">
              <Info className="h-4 w-4 text-gray-400 cursor-help" />
              <div className="absolute left-0 bottom-6 z-10 p-2 bg-gray-800 text-white text-xs rounded w-48 hidden group-hover:block">
                Məta təsvir 160 simvoldan az olmalıdır. Google axtarış nəticələrində göstərilir.
              </div>
            </div>
          </div>
          <textarea
            name="description"
            value={seoSettings.description}
            onChange={handleChange}
            maxLength={160}
            rows={3}
            className="w-full p-2 border rounded-lg"
          />
          <div className="text-xs text-gray-500 mt-1">
            {seoSettings.description.length}/160 simvol
          </div>
        </div>

        <div>
          <div className="flex items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Açar sözlər (Keywords)
            </label>
            <div className="relative ml-2 group">
              <Info className="h-4 w-4 text-gray-400 cursor-help" />
              <div className="absolute left-0 bottom-6 z-10 p-2 bg-gray-800 text-white text-xs rounded w-48 hidden group-hover:block">
                Vergüllə ayrılmış əsas açar sözlər
              </div>
            </div>
          </div>
          <input
            type="text"
            name="keywords"
            value={seoSettings.keywords}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Advanced SEO fields */}
      <div className="border-t pt-4 mt-4">
        <h4 className="text-md font-medium text-gray-800 mb-4">Əlavə SEO parametrləri</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OG təsvir URL-i
            </label>
            <input
              type="text"
              name="ogImage"
              value={seoSettings.ogImage}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter kart növü
            </label>
            <select
              name="twitterCard"
              value={seoSettings.twitterCard}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="summary">Summary</option>
              <option value="summary_large_image">Summary with large image</option>
              <option value="app">App</option>
              <option value="player">Player</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Canonical URL
          </label>
          <input
            type="text"
            name="canonicalUrl"
            value={seoSettings.canonicalUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Strukturlanmış data (JSON-LD)
            </label>
            <div className="relative ml-2 group">
              <Info className="h-4 w-4 text-gray-400 cursor-help" />
              <div className="absolute left-0 bottom-6 z-10 p-2 bg-gray-800 text-white text-xs rounded w-48 hidden group-hover:block">
                Google tərəfindən istifadə olunan schema.org formatında JSON kodu
              </div>
            </div>
          </div>
          <textarea
            name="structuredData"
            value={seoSettings.structuredData}
            onChange={handleChange}
            rows={5}
            className="w-full p-2 border rounded-lg font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default SeoSettings; 