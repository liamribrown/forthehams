// For the Hams! — Series 1: Ham Basics Collectible Trading Cards Definition
// Numbers are strictly open-ended: "No. 001", "No. 002" with NO finite totals.
// Species cards pull their stats directly from speciesList to prevent desync.

import { speciesList } from './species.js?v=3.1';
import { clean } from '../icons.js?v=3.1';

export const series = [{ id: 1, name: "Ham Basics" }];

export function formatCardNo(num) {
  const n = parseInt(num, 10);
  if (isNaN(n)) return `No. 000`;
  return `No. ${String(n).padStart(3, '0')}`;
}

export const cards = [
  {
    no: 1,
    id: "enclosures",
    series: 1,
    kind: "guide",
    guideId: "enclosures",
    rarity: "common",
    careLv: 3,
    name: "Enclosures",
    frame: "mustard",
    typeIcon: "cage",
    art: "assets/img/cards/001-enclosures.webp",
    overlay: "dimensions",
    flavour: "Unbroken floor space lets hamsters thrive naturally.",
    hero: { label: "Min Size", value: "100×50cm" },
    yes: ["Unbroken floor", "Glass tanks", "Deep trays"],
    nope: ["Connected tubes", "Wire bars", "Modular pods"]
  },
  {
    no: 2,
    id: "bedding",
    series: 1,
    kind: "guide",
    guideId: "bedding",
    rarity: "common",
    careLv: 3,
    name: "Bedding",
    frame: "mint",
    typeIcon: "log",
    art: "assets/img/cards/002-bedding.webp",
    overlay: "ruler",
    flavour: "Deep bedding lets them tunnel and nest.",
    hero: { label: "Depth", value: "20cm+" },
    yes: ["Paper bedding", "Aspen shavings", "Pack it down"],
    nope: ["Hay or straw", "Fluffy cotton", "Pine or cedar"]
  },
  {
    no: 3,
    id: "wheels",
    series: 1,
    kind: "guide",
    guideId: "wheels",
    rarity: "common",
    careLv: 3,
    name: "Wheels",
    frame: "sky",
    typeIcon: "wheel",
    art: "assets/img/cards/003-wheels.webp",
    overlay: "wheelCompare",
    flavour: "A flat spine protects hamsters from spinal trauma.",
    hero: { label: "Diameter", value: "28cm+" },
    yes: ["Flat spine", "Solid track", "Sturdy stand"],
    nope: ["Banana back", "Wire mesh", "Flying saucers"]
  },
  {
    no: 4,
    id: "sand_baths",
    series: 1,
    kind: "guide",
    guideId: "sand_baths",
    rarity: "common",
    careLv: 2,
    name: "Sand Baths",
    frame: "mustard",
    typeIcon: "sand",
    art: "assets/img/cards/004-sand.webp",
    overlay: null,
    flavour: "Sand cleans fur without stripping natural protective oils.",
    hero: { label: "Grooming", value: "No Water" },
    yes: ["Desert sand", "Children play sand", "Deep dish"],
    nope: ["Water baths", "Chinchilla dust", "Calcium sand"]
  },
  {
    no: 5,
    id: "multi_chamber",
    series: 1,
    kind: "guide",
    guideId: "multi_chamber",
    rarity: "uncommon",
    careLv: 2,
    name: "Multi-Chamber",
    frame: "lilac",
    typeIcon: "hide",
    art: "assets/img/cards/005-hide.webp",
    overlay: "rooms",
    flavour: "Replicates natural underground burrow chambers and pantries.",
    hero: { label: "Rooms", value: "3+ Rooms" },
    yes: ["Bottomless base", "Removable roof", "Wide doorways"],
    nope: ["Plastic igloos", "Narrow holes", "No stilts"]
  },
  {
    no: 6,
    id: "substrates_textures",
    series: 1,
    kind: "guide",
    guideId: "substrates_textures",
    rarity: "uncommon",
    careLv: 1,
    name: "Dig Textures",
    frame: "lime",
    typeIcon: "sprout",
    art: "assets/img/cards/006-textures.webp",
    overlay: null,
    flavour: "Tactile dig boxes keep claws neat and minds active.",
    hero: { label: "Variety", value: "3 Textures" },
    yes: ["Coco coir", "Beech chips", "Sphagnum moss"],
    nope: ["Artificial turf", "Garden dirt", "Scented wood"]
  },
  {
    no: 7,
    id: "forage_sprays",
    series: 1,
    kind: "guide",
    guideId: "forage_sprays",
    rarity: "uncommon",
    careLv: 1,
    name: "Sprays & Forage",
    frame: "mint",
    typeIcon: "sprout",
    art: "assets/img/cards/007-forage.webp",
    overlay: null,
    flavour: "Dense clutter makes prey animals feel brave and calm.",
    hero: { label: "Clutter", value: "Dense Cover" },
    yes: ["Flax sprays", "Red millet", "Oat sprays"],
    nope: ["Wild picked", "Pesticide plants", "Garden twigs"]
  },
  {
    no: 8,
    id: "food_mixes_nutrition",
    series: 1,
    kind: "guide",
    guideId: "food_mixes_nutrition",
    rarity: "uncommon",
    careLv: 3,
    name: "Food & Diet",
    frame: "mustard",
    typeIcon: "bowl",
    art: "assets/img/cards/008-nutrition.webp",
    overlay: null,
    flavour: "Scatter feeding healthy seeds sparks natural instincts.",
    hero: { label: "Protein", value: "15–18%" },
    yes: ["25+ seeds", "Scatter feed", "Freeze 48h"],
    nope: ["Pellet mueslis", "Dyed biscuits", "Sugary treats"]
  },
  {
    no: 9,
    id: "solitary_rule",
    series: 1,
    kind: "guide",
    guideId: "solitary_rule",
    rarity: "uncommon",
    careLv: 3,
    name: "Live Alone",
    frame: "tomato",
    typeIcon: "solo",
    art: "assets/img/cards/009-solitary.webp",
    overlay: "onePlusOne",
    flavour: "Hamsters are strictly solitary and require individual homes.",
    hero: { label: "Per Cage", value: "1 Only" },
    yes: ["Solo territory", "Own wheel", "Peace of mind"],
    nope: ["Cohousing pairs", "Play dates", "Shared cages"]
  },
  {
    no: 10,
    id: "syrian",
    series: 1,
    kind: "species",
    speciesId: "syrian",
    rarity: "rare",
    careLv: 3,
    name: "Syrian Hamster",
    frame: "mustard",
    typeIcon: "hamster",
    art: "assets/img/cards/010-syrian.webp",
    stats: [
      { icon: "cage", label: "Cage", statValue: "100×50cm" },
      { icon: "wheel", label: "Wheel", statValue: "28–32cm" },
      { icon: "log", label: "Bedding", statValue: "25cm+" },
      { icon: "sand", label: "Sand", statValue: "A4 Dish" }
    ],
    strip: "Strictly solitary. Lives 100% alone.",
    dietWarning: null
  },
  {
    no: 11,
    id: "roborovski",
    series: 1,
    kind: "species",
    speciesId: "roborovski",
    rarity: "rare",
    careLv: 3,
    name: "Roborovski Dwarf",
    frame: "sky",
    typeIcon: "hamster",
    art: "assets/img/cards/011-roborovski.webp",
    stats: [
      { icon: "cage", label: "Cage", statValue: "100×50cm" },
      { icon: "wheel", label: "Wheel", statValue: "21–25cm" },
      { icon: "log", label: "Bedding", statValue: "20cm+" },
      { icon: "sand", label: "Sand", statValue: "1/3 Cage" }
    ],
    strip: "Desert native. Needs massive sand area.",
    dietWarning: "High diabetes risk: strictly no added sugar"
  },
  {
    no: 12,
    id: "winter_white",
    series: 1,
    kind: "species",
    speciesId: "winter_white",
    rarity: "rare",
    careLv: 3,
    name: "Winter White",
    frame: "pink",
    typeIcon: "hamster",
    art: "assets/img/cards/012-winter-white.webp",
    stats: [
      { icon: "cage", label: "Cage", statValue: "100×50cm" },
      { icon: "wheel", label: "Wheel", statValue: "26cm+" },
      { icon: "log", label: "Bedding", statValue: "20cm+" },
      { icon: "sand", label: "Sand", statValue: "A4 Dish" }
    ],
    strip: "Placid burrower. Must live alone.",
    dietWarning: "High diabetes risk: strictly no fruit or sugars"
  },
  {
    no: 13,
    id: "campbells",
    series: 1,
    kind: "species",
    speciesId: "campbells",
    rarity: "rare",
    careLv: 3,
    name: "Campbell's Dwarf",
    frame: "pink",
    typeIcon: "hamster",
    art: "assets/img/cards/013-campbells.webp",
    stats: [
      { icon: "cage", label: "Cage", statValue: "100×50cm" },
      { icon: "wheel", label: "Wheel", statValue: "26cm+" },
      { icon: "log", label: "Bedding", statValue: "20cm+" },
      { icon: "sand", label: "Sand", statValue: "A4 Dish" }
    ],
    strip: "Very inquisitive. Must live alone.",
    dietWarning: "Severe diabetes risk: strictly zero sugar"
  },
  {
    no: 14,
    id: "chinese",
    series: 1,
    kind: "species",
    speciesId: "chinese",
    rarity: "rare",
    careLv: 3,
    name: "Chinese Hamster",
    frame: "mint",
    typeIcon: "hamster",
    art: "assets/img/cards/014-chinese.webp",
    stats: [
      { icon: "cage", label: "Cage", statValue: "100×50cm" },
      { icon: "wheel", label: "Wheel", statValue: "26cm+" },
      { icon: "log", label: "Bedding", statValue: "20cm+" },
      { icon: "sand", label: "Sand", statValue: "A4 Dish" }
    ],
    strip: "Prehensile tail climber. Lives alone.",
    dietWarning: "High diabetes risk: strictly low-sugar diet"
  }
];

export function getCardById(id, type = 'guide') {
  if (type === 'species') {
    return cards.find(c => c.kind === 'species' && c.speciesId === id) || null;
  }
  return cards.find(c => c.kind === 'guide' && (c.guideId === id || c.id === id)) || null;
}

export function getCardByNumber(no) {
  const n = parseInt(no, 10);
  return cards.find(c => c.no === n) || null;
}
