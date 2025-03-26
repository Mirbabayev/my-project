import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Brand {
  id: string;
  name: string;
  description: string;
}

interface BrandContextType {
  brands: Brand[];
  loading: boolean;
  error: string | null;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const mockBrands: Brand[] = [
          { id: '1', name: 'Chanel', description: 'Lüks Fransız moda evi' },
          { id: '2', name: 'Christian Dior', description: 'Fransız lüks moda evi' },
          { id: '3', name: 'Gucci', description: 'İtalyan lüks moda evi' },
          { id: '4', name: 'Tom Ford', description: 'Amerikan dizayner' },
          { id: '5', name: 'Yves Saint Laurent', description: 'Fransız lüks moda evi' },
          { id: '6', name: 'Versace', description: 'İtalyan lüks moda evi' },
          { id: '7', name: 'Giorgio Armani', description: 'İtalyan lüks moda evi' },
          { id: '8', name: 'Lancôme', description: 'Fransız kosmetika markası' },
          { id: '9', name: 'Paco Rabanne', description: 'Fransız moda evi' },
          { id: '10', name: 'Hermès', description: 'Fransız lüks moda evi' },
          { id: '11', name: 'Dolce & Gabbana', description: 'İtalyan lüks moda evi' },
          { id: '12', name: 'Jean Paul Gaultier', description: 'Fransız moda dizayneri' },
          { id: '13', name: 'Creed', description: 'İngilis ətir evi' },
          { id: '14', name: 'Jo Malone London', description: 'İngilis ətir markası' },
          { id: '15', name: 'Byredo', description: 'İsveç ətir markası' },
          { id: '16', name: 'Prada', description: 'İtalyan lüks moda evi' },
          { id: '17', name: 'Maison Francis Kurkdjian', description: 'Fransız ətir evi' },
          { id: '18', name: 'Carolina Herrera', description: 'Venesuela moda dizayneri' },
          { id: '19', name: 'Hugo Boss', description: 'Alman moda evi' },
          { id: '20', name: 'Montale Paris', description: 'Fransız ətir evi' },
          { id: '21', name: 'Amouage', description: 'Oman ətir evi' },
          { id: '22', name: 'Mugler', description: 'Fransız moda evi' },
          { id: '23', name: 'Zara', description: 'İspan moda markası' },
          { id: '24', name: 'Narciso Rodriguez', description: 'Amerikan moda dizayneri' },
          { id: '25', name: 'Bvlgari', description: 'İtalyan lüks moda evi' }
        ];
        setBrands(mockBrands);
      } catch (err) {
        setError('Brendlər yüklənərkən xəta baş verdi');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <BrandContext.Provider value={{ brands, loading, error }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrands = () => {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrands must be used within a BrandProvider');
  }
  return context;
}; 