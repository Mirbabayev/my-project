import { Product } from '../types';

// Məhsullar
export const products: Product[] = [
  {
    id: 1,
    name: 'Sauvage',
    brand: 'Dior',
    description: 'Sauvage Eau de Parfum, müasir kişilər üçün yaradılmış fərqli ətirdir. Siciliya mandarini və zəncəfildən gələn təzə və enerjili notlar kişinin enerjisini və gücünü əks etdirir.',
    price: 190,
    oldPrice: 220,
    imageUrl: '/Dior-Sauvage.jpg',
    inStock: true,
    rating: 4.9,
    volume: 100,
    gender: 'Kişi',
    fragranceType: 'Eau de Parfum',
    group: 'Odunsu-Ədviyyəli',
    discount: 14,
    notes: {
      top: ['Bergamot', 'Mandalina', 'Bibər'],
      middle: ['Paçuli', 'Lavanta', 'Çiçək Notları'],
      base: ['Ambroxan', 'Sedir', 'Selvi']
    },
    hasAtomizer: true,
    atomizerPrice: 45,
    atomizerVolume: 10
  },
  {
    id: 2,
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    description: 'Bleu de Chanel, müasir kişinin cəsarətini və azadlığını tərənnüm edən bir ətirdir. Təravətli sitrus notları, ədviyyəli aromalar və dərin odunsu notlarla qeyri-adi bir harmoniya təqdim edir.',
    price: 195,
    imageUrl: '/Chanel-Bleu-de-Chanel.jpg',
    inStock: true,
    rating: 4.8,
    volume: 100,
    gender: 'Kişi',
    fragranceType: 'Eau de Parfum',
    group: 'Odunsu-Ədviyyəli',
    notes: {
      top: ['Limon', 'Qreypfrut', 'Nanə'],
      middle: ['Zəncəfil', 'Yasəmən', 'İsiot'],
      base: ['Sedir', 'Vetiver', 'Fransız labdanumu']
    },
    hasAtomizer: true,
    atomizerPrice: 48,
    atomizerVolume: 10
  },
  {
    id: 3,
    name: 'Acqua di Gio',
    brand: 'Armani',
    description: 'Acqua di Gio, Aralıq dənizinin təmiz sularından ilhamlanaraq yaradılmış və azadlığı simvollaşdıran bir ətirdir. Tər dəniz esintilərini və günəşin işığını yaşadır.',
    price: 170,
    oldPrice: 190,
    imageUrl: '/Giorgio-Armani-Acqua-di-Gio.jpg',
    inStock: true,
    rating: 4.7,
    volume: 100,
    gender: 'Kişi',
    fragranceType: 'Eau de Toilette',
    group: 'Sitrus-Dəniz',
    discount: 11,
    notes: {
      top: ['Bergamot', 'Nerolium', 'Yaşıl mandalina'],
      middle: ['Rozmarin', 'Dəniz notları', 'Yasəmən'],
      base: ['Ənbər', 'Paçuli', 'Sedir']
    },
    hasAtomizer: true,
    atomizerPrice: 40,
    atomizerVolume: 10
  },
  {
    id: 4,
    name: 'Le Male',
    brand: 'Jean Paul Gaultier',
    description: 'Jean Paul Gaultier Le Male, kişilər üçün güclü və cəsarətli bir ətirdir. Nanə, lavanda və vanil notları ilə seçilir.',
    price: 175,
    oldPrice: 195,
    imageUrl: '/Jean-Paul-Gaultier-Le-Male.jpg',
    inStock: true,
    rating: 4.7,
    volume: 125,
    gender: 'Kişi',
    fragranceType: 'Eau de Toilette',
    group: 'Oriental-Fougere',
    discount: 10,
    notes: {
      top: ['Nanə', 'Lavanda', 'Bergamot'],
      middle: ['Darçın', 'Ağcaqayın'], 
      base: ['Vanil', 'Sedir', 'Tonka Paxlası']
    },
    hasAtomizer: true,
    atomizerPrice: 45,
    atomizerVolume: 10
  },
  {
    id: 5,
    name: 'Eros',
    brand: 'Versace',
    description: 'Versace Eros, özünə inamlı və ehtiraslı kişilər üçün yaradılmış ətirdir. Nanə, yaşıl alma və limon qabığından təzə notlar bu ətrə enerjili bir giriş verir.',
    price: 160,
    imageUrl: '/Versace-Eros.jpg',
    inStock: true,
    rating: 4.6,
    volume: 100,
    gender: 'Kişi',
    fragranceType: 'Eau de Toilette',
    group: 'Oriental-Fougere',
    notes: {
      top: ['Nanə', 'Yaşıl alma', 'Limon'],
      middle: ['Tonka Paxlası', 'Ambroxan', 'Geranium'],
      base: ['Vanil', 'Sedir', 'Vetiver', 'Moss']
    },
    hasAtomizer: true,
    atomizerPrice: 40,
    atomizerVolume: 10
  },
  {
    id: 6,
    name: 'Tobacco Vanille',
    brand: 'Tom Ford',
    description: 'Tom Ford Tobacco Vanille - şərq ədviyyələri, quru meyvələr və tütün qarışığı. Ədviyyəli-şərq qrupu ətirlərdən gözəl bir nümunədir.',
    price: 280,
    imageUrl: '/Tom-Ford-Tobacco-Vanille.jpg',
    inStock: true,
    rating: 4.9,
    volume: 50,
    gender: 'Unisex',
    fragranceType: 'Eau de Parfum',
    group: 'Oriental-Ədviyyəli',
    notes: {
      top: ['Tütün yarpağı', 'Ədviyyələr'],
      middle: ['Vanil', 'Kakao', 'Tütün çiçəyi'],
      base: ['Quru meyvələr', 'Odunsu notlar']
    },
    hasAtomizer: true,
    atomizerPrice: 70,
    atomizerVolume: 10
  },
  {
    id: 7,
    name: 'Aventus',
    brand: 'Creed',
    description: 'Creed Aventus, güc, zənginlik və müvəffəqiyyət ətrafa yayır. Meyvə və odun notlarının mürəkkəb qarışığı, kişinin qeyri-adi təbiəti və zövqlərini əks etdirir.',
    price: 350,
    oldPrice: 399,
    imageUrl: '/Creed-Aventus.jpg',
    inStock: true,
    rating: 4.9,
    volume: 100,
    gender: 'Kişi',
    fragranceType: 'Eau de Parfum',
    group: 'Fruity-Odunsu',
    discount: 12,
    notes: {
      top: ['Qara qarağat', 'Bergamot', 'Alma', 'Ananas'],
      middle: ['Qızılgül', 'Yasəmən', 'Paçuli'],
      base: ['Müşk', 'Kedr', 'Vanil', 'Amber']
    },
    hasAtomizer: true,
    atomizerPrice: 85,
    atomizerVolume: 10
  },
  {
    id: 8,
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    description: 'Baccarat Rouge 540, qırmızı və kristal parıltısı ilə cazibədar köhnə qərb və müasir şərq aroması. Özünəməxsus və bənzərsiz bir ətir.',
    price: 300,
    imageUrl: '/Baccarat-Rouge-540.jpg',
    inStock: true,
    rating: 4.8,
    volume: 70,
    gender: 'Unisex',
    fragranceType: 'Extrait de Parfum',
    group: 'Oriental-Müşk',
    notes: {
      top: ['Yasəmən'],
      middle: ['Sedir', 'Amber'],
      base: ['Şam ağacı', 'Müşk']
    },
    hasAtomizer: true,
    atomizerPrice: 75,
    atomizerVolume: 10
  }
]; 