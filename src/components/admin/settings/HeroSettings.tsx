import React from 'react';
import { Image, Upload, X } from 'lucide-react';

// Hero struktur interfeysi
export interface HeroSection {
  enabled: boolean;
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface HeroSettingsProps {
  heroSettings: HeroSection;
  onChange: (settings: HeroSection) => void;
}

const HeroSettings: React.FC<HeroSettingsProps> = ({ heroSettings, onChange }) => {
  // Dəyərləri yeniləmək üçün handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    onChange({
      ...heroSettings,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    });
  };

  // Şəkli yükləmə simulyasiyası
  const handleImageUpload = () => {
    // Mock image upload - gerçək tətbiqdə burada API çağırışı olar
    const mockImageUrl = '/images/hero/new-hero-image.jpg';
    onChange({
      ...heroSettings,
      imageUrl: mockImageUrl
    });
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Ana səhifə hero bölməsi</h3>
        <div className="flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="enabled"
              checked={heroSettings.enabled}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {heroSettings.enabled ? 'Aktiv' : 'Deaktiv'}
            </span>
          </label>
        </div>
      </div>

      {/* Hero təsvir yükləmə */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hero təsviri
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          {heroSettings.imageUrl ? (
            <div className="w-full">
              <div className="relative w-full h-48 mb-3">
                <img
                  src={heroSettings.imageUrl}
                  alt="Hero preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => onChange({ ...heroSettings, imageUrl: '' })}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Təsviri dəyişdirmək
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <Image className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                  <span>Fayl yüklə</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="pl-1">və ya köçürüb bura buraxın</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Başlıq və mətn sahələri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hero başlığı
          </label>
          <input
            type="text"
            name="title"
            value={heroSettings.title}
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
            value={heroSettings.subtitle}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Düymə mətni
          </label>
          <input
            type="text"
            name="buttonText"
            value={heroSettings.buttonText}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Düymə linki
          </label>
          <input
            type="text"
            name="buttonLink"
            value={heroSettings.buttonLink}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSettings; 