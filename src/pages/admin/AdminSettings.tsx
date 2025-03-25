import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import { Save, Settings as SettingsIcon } from 'lucide-react';

// Import settings components
import HeroSettings, { HeroSection } from '../../components/admin/settings/HeroSettings';
import FeaturedSettings, { FeaturedSection } from '../../components/admin/settings/FeaturedSettings';
import SeoSettings, { SeoSettings as SeoSettingsType } from '../../components/admin/settings/SeoSettings';
import SocialMediaSettings, { SocialMediaSettings as SocialMediaSettingsType } from '../../components/admin/settings/SocialMediaSettings';

const AdminSettings: React.FC = () => {
  // Hero section state
  const [heroSettings, setHeroSettings] = useState<HeroSection>({
    enabled: true,
    imageUrl: '/images/hero-image.jpg',
    title: 'Ən yaxşı parfümləri kəşf edin',
    subtitle: 'Premium brendlərdən münasib qiymətlərlə',
    buttonText: 'İndi alış-veriş edin',
    buttonLink: '/products'
  });

  // Featured section state
  const [featuredSettings, setFeaturedSettings] = useState<FeaturedSection>({
    enabled: true,
    title: 'Seçilmiş məhsullar',
    subtitle: 'Ən populyar parfümlərimiz',
    maxProducts: 8,
    showDiscount: true,
    sortBy: 'popular'
  });

  // SEO settings state
  const [seoSettings, setSeoSettings] = useState<SeoSettingsType>({
    title: 'Premium Parfüm Mağazası | Ən yaxşı ətirlər',
    description: 'Premium kişi və qadın ətirləri, münasib qiymətlərlə. Orijinal parfümləri bizdən əldə edin.',
    keywords: 'parfüm, ətir, qadın ətirləri, kişi ətirləri, premium ətirlər',
    ogImage: '/images/og-image.jpg',
    twitterCard: 'summary_large_image',
    canonicalUrl: 'https://example.com',
    structuredData: '{\n  "@context": "https://schema.org",\n  "@type": "Store",\n  "name": "Premium Parfüm Mağazası"\n}',
    enableIndexing: true
  });

  // Social media settings state
  const [socialMediaSettings, setSocialMediaSettings] = useState<SocialMediaSettingsType>({
    facebook: 'https://facebook.com/perfumeshop',
    instagram: 'https://instagram.com/perfumeshop',
    twitter: 'https://twitter.com/perfumeshop',
    youtube: 'https://youtube.com/perfumeshop',
    linkedin: 'https://linkedin.com/company/perfumeshop',
    showInHeader: true,
    showInFooter: true
  });

  // Handle save button click
  const handleSave = () => {
    // Here would be API calls to save all settings
    console.log('Saving settings...');
    
    // Save hero settings
    console.log('Hero settings:', heroSettings);
    
    // Save featured settings
    console.log('Featured settings:', featuredSettings);
    
    // Save SEO settings
    console.log('SEO settings:', seoSettings);
    
    // Save social media settings
    console.log('Social media settings:', socialMediaSettings);
    
    // Show success notification
    alert('Tənzimləmələr uğurla yadda saxlanıldı!');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sayt tənzimləmələri</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Save size={18} />
          Yadda saxla
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Tabs defaultValue="hero">
          <TabsList className="border-b p-0">
            <TabsTrigger value="hero" className="flex items-center gap-2 px-4 py-3 text-gray-600 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600">
              <SettingsIcon size={18} />
              Ana səhifə
            </TabsTrigger>
            <TabsTrigger value="featured" className="flex items-center gap-2 px-4 py-3 text-gray-600 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600">
              <SettingsIcon size={18} />
              Seçilmiş məhsullar
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2 px-4 py-3 text-gray-600 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600">
              <SettingsIcon size={18} />
              SEO
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2 px-4 py-3 text-gray-600 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600">
              <SettingsIcon size={18} />
              Sosial media
            </TabsTrigger>
          </TabsList>

          <div className="p-4">
            <TabsContent value="hero">
              <HeroSettings 
                heroSettings={heroSettings} 
                onChange={setHeroSettings} 
              />
            </TabsContent>
            
            <TabsContent value="featured">
              <FeaturedSettings 
                featuredSettings={featuredSettings} 
                onChange={setFeaturedSettings} 
              />
            </TabsContent>
            
            <TabsContent value="seo">
              <SeoSettings 
                seoSettings={seoSettings} 
                onChange={setSeoSettings} 
              />
            </TabsContent>
            
            <TabsContent value="social">
              <SocialMediaSettings 
                socialMediaSettings={socialMediaSettings} 
                onChange={setSocialMediaSettings} 
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminSettings; 