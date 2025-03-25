import React from 'react';
import { Info } from 'lucide-react';

// Note types
type NoteType = 'top' | 'heart' | 'base';

interface Note {
  name: string;
  description: string;
  type: NoteType;
}

interface Characteristic {
  name: string;
  value: number; // 1-10
  description: string;
}

interface FragranceProfileProps {
  notes: Note[];
  characteristics: Characteristic[];
}

export const FragranceProfile: React.FC<FragranceProfileProps> = ({ notes, characteristics }) => {
  const topNotes = notes.filter(note => note.type === 'top');
  const heartNotes = notes.filter(note => note.type === 'heart');
  const baseNotes = notes.filter(note => note.type === 'base');

  return (
    <div className="space-y-10">
      {/* Static Notes Display */}
      <section>
        <div className="grid grid-cols-3 gap-4">
          {/* Top notes */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-indigo-700 font-medium text-xs">01</span>
            </div>
            <h3 className="text-base font-medium mb-3 text-gray-800">Üst Notlar</h3>
            <div className="space-y-2">
              {topNotes.map((note, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="text-sm text-gray-600">{note.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-500 italic">
              İlk qoxulanan notlar - ətri çiləyəndən dərhal sonra 15-20 dəqiqə ərzində hiss olunur.
            </p>
          </div>
          
          {/* Heart notes */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center mb-4">
              <span className="text-indigo-700 font-medium text-xs">02</span>
            </div>
            <h3 className="text-base font-medium mb-3 text-gray-800">Orta Notlar</h3>
            <div className="space-y-2">
              {heartNotes.map((note, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="text-sm text-gray-600">{note.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-500 italic">
              Ətirin əsas xarakterini formalaşdıran notlar - 2-3 saat ərzində davam edir.
            </p>
          </div>
          
          {/* Base notes */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-lg flex items-center justify-center mb-4">
              <span className="text-indigo-700 font-medium text-xs">03</span>
            </div>
            <h3 className="text-base font-medium mb-3 text-gray-800">Baza Notlar</h3>
            <div className="space-y-2">
              {baseNotes.map((note, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="text-sm text-gray-600">{note.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-500 italic">
              Ən uzun müddət qalan notlar - bəzən 24 saata qədər dəridə qala bilir.
            </p>
          </div>
        </div>
      </section>
      
      {/* Timeline visualization */}
      <section className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <h3 className="text-base font-medium mb-6 text-gray-800">Ətir İnkişaf Zamanı</h3>
        <div className="relative h-16 mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-indigo-300 to-indigo-500 rounded-full h-2 top-4"></div>
          
          {/* Markers */}
          <div className="absolute left-0 top-0 flex flex-col items-center">
            <div className="w-3 h-3 bg-indigo-100 rounded-full border-2 border-white shadow-md"></div>
            <span className="text-xs mt-2 font-medium">0 saat</span>
            <span className="text-[10px] text-gray-500">Üst notlar</span>
          </div>
          
          <div className="absolute left-1/3 top-0 transform -translate-x-1/2 flex flex-col items-center">
            <div className="w-3 h-3 bg-indigo-300 rounded-full border-2 border-white shadow-md"></div>
            <span className="text-xs mt-2 font-medium">2 saat</span>
            <span className="text-[10px] text-gray-500">Orta notlar</span>
          </div>
          
          <div className="absolute left-2/3 top-0 transform -translate-x-1/2 flex flex-col items-center">
            <div className="w-3 h-3 bg-indigo-400 rounded-full border-2 border-white shadow-md"></div>
            <span className="text-xs mt-2 font-medium">4 saat</span>
            <span className="text-[10px] text-gray-500">Baza notlar</span>
          </div>
          
          <div className="absolute right-0 top-0 flex flex-col items-center">
            <div className="w-3 h-3 bg-indigo-500 rounded-full border-2 border-white shadow-md"></div>
            <span className="text-xs mt-2 font-medium">8+ saat</span>
            <span className="text-[10px] text-gray-500">Qalıcı iz</span>
          </div>
        </div>
      </section>
      
      {/* Characteristics - Rating style bars */}
      <section className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <h3 className="text-base font-medium mb-6 text-gray-800">Ətir Xarakteristikası</h3>
        
        <div className="space-y-6">
          {characteristics.map((characteristic, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium text-sm text-gray-800">{characteristic.name}</span>
                  <button className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                    <Info size={14} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">{characteristic.value}/10</span>
              </div>
              
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-full"
                  style={{ width: `${characteristic.value * 10}%` }}
                ></div>
              </div>
              
              <p className="text-xs text-gray-500">{characteristic.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p className="italic text-xs">
            Qeyd: Xarakteristikalar subyektivdir və fərdi dəri kimyasına və ətraf mühit şəraitinə görə dəyişə bilər.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FragranceProfile; 