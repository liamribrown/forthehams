// Safe vs Toxic Hamster Food Database
// Thoroughly verified against UK Veterinary Welfare standards (RSPCA, PDSA, HamsterWelfare, India's Hamster Rescue)

export const foodDatabase = [
  // --- TOXIC / FORBIDDEN FOODS (RED) ---
  {
    name: "Onions, Garlic, Leeks & Chives",
    category: "toxic",
    status: "TOXIC",
    speciesNotes: "All Hamster Species",
    details: "Contains thiosulphate and N-propyl disulfide, which ruptures and destroys red blood cells, causing fatal haemolytic anaemia. NEVER feed in any form (raw, cooked, or powdered).",
    prep: "Strictly forbidden."
  },
  {
    name: "Apple & Pear Seeds (Pips)",
    category: "toxic",
    status: "TOXIC",
    speciesNotes: "All Hamster Species",
    details: "Fruit seeds contain amygdalin, which breaks down into toxic cyanide when chewed and digested. Apple flesh is safe (for Syrians), but seeds must be completely removed.",
    prep: "Discard all seeds and core."
  },
  {
    name: "Citrus Fruits (Orange, Lemon, Lime, Grapefruit)",
    category: "toxic",
    status: "TOXIC",
    speciesNotes: "All Hamster Species",
    details: "Highly acidic citric acid causes severe gastric distress, stomach ulceration, and painful acid burns inside hamster cheek pouches.",
    prep: "Strictly forbidden."
  },
  {
    name: "Raw Kidney Beans & Raw Legumes",
    category: "toxic",
    status: "TOXIC",
    speciesNotes: "All Hamster Species",
    details: "Contains high levels of phytohaemagglutinin, a toxic lectin that causes acute gastrointestinal poisoning and fatal organ failure.",
    prep: "Strictly forbidden raw."
  },
  {
    name: "Rhubarb (Leaves & Stalks)",
    category: "toxic",
    status: "TOXIC",
    speciesNotes: "All Hamster Species",
    details: "Extremely high concentrations of toxic oxalic acid cause acute renal (kidney) failure and calcium binding.",
    prep: "Strictly forbidden."
  },
  {
    name: "Raw Potato & Green Potato Sprouts",
    category: "toxic",
    status: "TOXIC",
    speciesNotes: "All Hamster Species",
    details: "Contains solanine and chaconine glycoalkaloids, which are potent neurotoxins for rodents. Green parts and eyes are especially lethal.",
    prep: "Strictly forbidden."
  },
  {
    name: "Tomato Leaves, Vines & Unripe Green Tomatoes",
    category: "toxic",
    status: "TOXIC",
    speciesNotes: "All Hamster Species",
    details: "Nightshade family greens contain solanine and tomatine poisons. Only tiny amounts of ripe red tomato flesh without seeds are tolerable, but rescues advise avoiding entirely.",
    prep: "Avoid all green tomato parts."
  },
  {
    name: "Stone Fruit Pits (Plum, Peach, Cherry, Apricot)",
    category: "toxic",
    status: "TOXIC",
    speciesNotes: "All Hamster Species",
    details: "The hard kernel contains lethal cyanogenic glycosides. If cracked, releases cyanide into cheek pouches.",
    prep: "Strictly forbidden."
  },
  {
    name: "Chocolate, Sweets & Confectionery",
    category: "toxic",
    status: "TOXIC",
    speciesNotes: "All Hamster Species",
    details: "Contains theobromine and caffeine (cardiac stimulants lethal to rodents). Sticky sugar also melts inside cheek pouches, cementing them shut and causing life-threatening abscesses.",
    prep: "Strictly forbidden."
  },
  {
    name: "Avocado",
    category: "toxic",
    status: "TOXIC",
    speciesNotes: "All Hamster Species",
    details: "Contains persin (a fungicidal toxin dangerous to rodents) and extreme levels of fat that cause acute liver and digestive collapse.",
    prep: "Strictly forbidden."
  },
  {
    name: "Iceberg Lettuce",
    category: "toxic",
    status: "TOXIC",
    speciesNotes: "All Hamster Species",
    details: "Has zero nutritional value and consists almost entirely of water and lactucarium, causing severe watery diarrhea and life-threatening dehydration.",
    prep: "Replace with dark leafy greens (kale, romaine, spinach)."
  },
  {
    name: "Salty Foods, Crisps & Processed Meats",
    category: "toxic",
    status: "TOXIC",
    speciesNotes: "All Hamster Species",
    details: "Hamster kidneys are adapted for dry habitats and cannot excrete human sodium levels, triggering rapid kidney failure and hypertension.",
    prep: "Strictly forbidden."
  },

  // --- CAUTION / SPECIES SPECIFIC (YELLOW) ---
  {
    name: "Apples, Pears & Blueberries",
    category: "fruits",
    status: "CAUTION_DIABETES",
    speciesNotes: "Safe for Syrians (rare treat); Avoid for Dwarfs & Chinese",
    details: "Naturally high in fructose. Syrian hamsters can have a fingernail-sized piece once weekly. Campbell's, Winter Whites, and Chinese hamsters are genetically predisposed to Type-2 Diabetes and should NOT be fed fruit.",
    prep: "Wash, peel, remove all seeds, feed tiny pea-sized portion."
  },
  {
    name: "Bananas & Grapes",
    category: "fruits",
    status: "CAUTION_DIABETES",
    speciesNotes: "Syrians only (Strict moderation); Forbidden for Dwarfs",
    details: "Extremely high sugar concentration. Sticky banana can also get stuck in cheek pouches. Grapes must be peeled and deseeded.",
    prep: "Tiny crumb-sized portion only for Syrians."
  },
  {
    name: "Carrots & Sweetcorn (Corn)",
    category: "vegetables",
    status: "CAUTION_DIABETES",
    speciesNotes: "Safe for Syrians; Strictly avoid or rare for Dwarfs",
    details: "Sweet root veg and corn kernels contain high simple sugars that spike blood glucose levels in diabetes-prone dwarf species.",
    prep: "Syrians can have a thin coin slice once weekly."
  },
  {
    name: "Spinach & Swiss Chard",
    category: "vegetables",
    status: "CAUTION_DIABETES",
    speciesNotes: "All species (Feed in strict moderation)",
    details: "Rich in vitamins, but contains high levels of oxalates which bind to calcium and can form painful bladder or kidney stones if fed frequently.",
    prep: "Feed only a single small baby leaf once every 10–14 days."
  },

  // --- SAFE STAPLES (GREEN) ---
  {
    name: "Broccoli (Florets & Stem)",
    category: "vegetables",
    status: "SAFE",
    speciesNotes: "Safe for all species (Including all dwarfs)",
    details: "A superstar hamster vegetable! Low in sugar, packed with fiber, vitamin C, and antioxidants. Does not cause blood sugar spikes.",
    prep: "Wash in cold water, dry thoroughly, feed a pea-sized floret."
  },
  {
    name: "Cucumber",
    category: "vegetables",
    status: "SAFE",
    speciesNotes: "Safe for all species",
    details: "Crisp, mild, and beloved by hamsters. Provides gentle hydration on hot days without overwhelming sugar.",
    prep: "Wash well. Slice into small quarter-coin size. Remove mushy center seeds."
  },
  {
    name: "Courgette (Zucchini)",
    category: "vegetables",
    status: "SAFE",
    speciesNotes: "Safe for all species",
    details: "Low calorie, low sugar, gentle on the digestive tract. An ideal green vegetable for diabetes-prone dwarfs.",
    prep: "Wash, peel a small cube, serve raw."
  },
  {
    name: "Cauliflower",
    category: "vegetables",
    status: "SAFE",
    speciesNotes: "Safe for all species",
    details: "Crunchy floret low in natural sugars. Helps wear down teeth while offering healthy micronutrients.",
    prep: "Feed a tiny raw piece once or twice weekly."
  },
  {
    name: "Bell Peppers (Red, Green, Yellow)",
    category: "vegetables",
    status: "SAFE",
    speciesNotes: "Safe for all species",
    details: "Rich in vitamin C and crunchy. Green peppers have the lowest sugar; red and yellow have slightly more natural sugars.",
    prep: "Remove all internal white pith and seeds. Feed a fingernail-sized strip."
  },
  {
    name: "Dandelion Leaves",
    category: "herbs",
    status: "SAFE",
    speciesNotes: "Safe for all species",
    details: "Packed with vitamins A, C, and K, potassium, and beneficial bitters that aid digestion. Must be bought dried from reputable pet shops or grown organically at home.",
    prep: "Never pick from roadside verges (pesticide & dog urine contamination)."
  },
  {
    name: "Flaxseeds / Linseeds",
    category: "seeds",
    status: "SAFE",
    speciesNotes: "Safe for all species",
    details: "Rich in omega-3 and omega-6 fatty acids. Promotes healthy skin and a glossy, dense coat.",
    prep: "Sprinkle 1/4 teaspoon into forage mix twice weekly."
  },
  {
    name: "Pumpkin & Sunflower Seeds",
    category: "seeds",
    status: "SAFE",
    speciesNotes: "Safe for all species (Feed in moderation)",
    details: "High in healthy oils, protein, and zinc. Great for taming and bonding, but calorie-dense so feed sparingly (1-2 seeds per day).",
    prep: "Feed raw, unsalted, unroasted seeds only."
  },
  {
    name: "Mealworms & Crickets (Dried or Live)",
    category: "proteins",
    status: "SAFE",
    speciesNotes: "Essential animal protein for all species",
    details: "Hamsters are omnivores, not herbivores! In the wild, they hunt insects and grubs. Essential for protein and active foraging.",
    prep: "Feed 2–3 mealworms 2–3 times a week."
  },
  {
    name: "Plain Boiled Egg",
    category: "proteins",
    status: "SAFE",
    speciesNotes: "Safe for all species",
    details: "Excellent protein boost for young growing hamsters, pregnant/nursing mothers, or senior hamsters losing weight.",
    prep: "Hardboiled plain in water only (no salt, butter, oil, or seasonings). Feed pea-sized piece of white and yolk."
  }
];
