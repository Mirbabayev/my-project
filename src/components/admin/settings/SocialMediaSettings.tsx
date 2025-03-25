import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

// Social media settings structure
export interface SocialMediaSettings {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  showInHeader: boolean;
  showInFooter: boolean;
}

interface SocialMediaSettingsProps {
  socialMediaSettings: SocialMediaSettings;
  onChange: (settings: SocialMediaSettings) => void;
}

const SocialMediaSettings: React.FC<SocialMediaSettingsProps> = ({ 
  socialMediaSettings, 
  onChange 
}) => {
  // Handler to update values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    onChange({
      ...socialMediaSettings,
      [name]: isCheckbox ? e.target.checked : value
    });
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sosial media tənzimləmələri</h3>
      </div>

      {/* Social Media Links */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Facebook className="h-6 w-6 text-blue-600 mr-2" />
          <input
            type="text"
            name="facebook"
            value={socialMediaSettings.facebook}
            onChange={handleChange}
            placeholder="Facebook URL"
            className="flex-1 p-2 border rounded-lg"
          />
        </div>

        <div className="flex items-center">
          <Instagram className="h-6 w-6 text-pink-600 mr-2" />
          <input
            type="text"
            name="instagram"
            value={socialMediaSettings.instagram}
            onChange={handleChange}
            placeholder="Instagram URL"
            className="flex-1 p-2 border rounded-lg"
          />
        </div>

        <div className="flex items-center">
          <Twitter className="h-6 w-6 text-blue-400 mr-2" />
          <input
            type="text"
            name="twitter"
            value={socialMediaSettings.twitter}
            onChange={handleChange}
            placeholder="Twitter URL"
            className="flex-1 p-2 border rounded-lg"
          />
        </div>

        <div className="flex items-center">
          <Youtube className="h-6 w-6 text-red-600 mr-2" />
          <input
            type="text"
            name="youtube"
            value={socialMediaSettings.youtube}
            onChange={handleChange}
            placeholder="YouTube URL"
            className="flex-1 p-2 border rounded-lg"
          />
        </div>

        <div className="flex items-center">
          <Linkedin className="h-6 w-6 text-blue-700 mr-2" />
          <input
            type="text"
            name="linkedin"
            value={socialMediaSettings.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn URL"
            className="flex-1 p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Display Options */}
      <div className="border-t pt-4 mt-4">
        <h4 className="text-md font-medium text-gray-800 mb-4">Göstərmə parametrləri</h4>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="showInHeader"
              checked={socialMediaSettings.showInHeader}
              onChange={handleChange}
              id="showInHeader"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="showInHeader" className="ml-2 block text-sm text-gray-700">
              Header-də göstər
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="showInFooter"
              checked={socialMediaSettings.showInFooter}
              onChange={handleChange}
              id="showInFooter"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="showInFooter" className="ml-2 block text-sm text-gray-700">
              Footer-də göstər
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSettings; 