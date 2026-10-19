// "Let's Get You Adoption Ready!" Interactive Checklist
// Directly models UK rescue adoption vetting standards (India's Hamster Rescue, Fable's Hamster Rescue, Bright Horizon)

export const adoptionChecklist = [
  {
    id: "check_enclosure",
    step: 1,
    title: "100 x 50 x 50 cm Enclosure",
    requirement: "A continuous, unbroken floor space of at least 5,000 cm² (100x50x50cm).",
    whyImportant: "Required by all ethical UK rescues. Hamsters run 9km a night in the wild and become stressed in smaller cages. Barless enclosures are preferred.",
    rescueTip: "If using a barred cage (like a Savic Plaza), fit cardboard or perspex sheets to the lower bars to allow for 20cm+ bedding depth.",
    category: "Habitat"
  },
  {
    id: "check_bedding",
    step: 2,
    title: "20cm+ Safe Burrowing Bedding",
    requirement: "A minimum depth of 20cm (8 inches) of safe paper, aspen, or hemp bedding.",
    whyImportant: "Hamsters are natural burrowers who build underground sleeping and hoard chambers. Soft paper or aspen holds sturdy tunnels when pressed gently.",
    rescueTip: "Strictly NO fluffy or cotton wool bedding, and NO scented or unextracted pine/cedar sawdust.",
    category: "Habitat"
  },
  {
    id: "check_wheel",
    step: 3,
    title: "Species-Correct Upright Wheel",
    requirement: "Robos: 21cm+ | Dwarfs: 26cm+ | Syrians: 28cm - 32cm.",
    whyImportant: "Prevents lifelong spinal curvature, pinched tails, and joint pain. The hamster's back must be completely flat while running.",
    rescueTip: "Must be upright with a solid running track. Never use wire mesh wheels or flying saucers. Stand must be placed on a platform.",
    category: "Exercise"
  },
  {
    id: "check_multichamber",
    step: 4,
    title: "Large Multi-Chamber Hide (3+ Rooms)",
    requirement: "Bottomless hide with at least 3 internal sections, removable roof, and correct entrance holes (5cm+ Dwarf, 7cm+ Syrian).",
    whyImportant: "Replicates wild subterranean burrows where hamsters separate sleeping, food hoarding, and toileting chambers.",
    rescueTip: "Place the multi-chamber hide on wooden stilts or a raised platform so it doesn't crush your hamster when they burrow below.",
    category: "Nesting"
  },
  {
    id: "check_sandbath",
    step: 5,
    title: "Large Sand Bath (A4 Size, 5cm Deep)",
    requirement: "A dish roughly the size of an A4 sheet of paper filled with 5cm+ of safe sand (Roborovskis need up to 1/3 of the enclosure).",
    whyImportant: "Hamsters must NEVER be bathed in water. Sand removes grease, cleans fur, and maintains coat health.",
    rescueTip: "Use dye-free, calcium-free reptile desert sand or baked play sand. Avoid chinchilla dust and calcium clumping sand.",
    category: "Hygiene"
  },
  {
    id: "check_digbox",
    step: 6,
    title: "Dig Box with 2-3 Texture Substrates",
    requirement: "At least two distinct textures (coco coir, beech chips, cork granules, or sphagnum moss).",
    whyImportant: "Provides tactile sensory enrichment, natural nail wear, and simulates diverse terrain for foraging.",
    rescueTip: "IKEA Kuggis boxes, glass oven roasters, or wooden corner dig boxes make perfect containers.",
    category: "Enrichment"
  },
  {
    id: "check_tunnels",
    step: 7,
    title: "Reptile Cork Log & Tunnels",
    requirement: "At least one natural cork oak log plus an additional safe wooden or ceramic tunnel.",
    whyImportant: "Hollow cork logs offer cozy darkness, file down sharp claws, and provide safe chewing texture.",
    rescueTip: "Cardboard toilet rolls are fine for dwarfs if openings are 5cm+, but too narrow for adult Syrian hamsters.",
    category: "Enrichment"
  },
  {
    id: "check_platforms",
    step: 8,
    title: "Platforms for Heavy Accessories",
    requirement: "All heavy items (wheel, sand bath, ceramic hides, dig boxes) supported on platforms or stilts.",
    whyImportant: "Hamsters burrow vigorously beneath surface items. If an unsupported ceramic hide sinks into bedding, it can trap or crush them.",
    rescueTip: "Use wooden corner platforms or glue dowels/stilts to the corners of wooden hides.",
    category: "Safety"
  },
  {
    id: "check_sprays",
    step: 9,
    title: "Foraging Sprays & Clutter",
    requirement: "A generous variety of seed sprays (flax, millet, sorghum, oat) creating sheltered cover.",
    whyImportant: "As prey animals, hamsters feel vulnerable in open spaces. Natural spray clutter gives them confidence to explore.",
    rescueTip: "Buy pet-safe spray bouquets from rescue stores or Hope's Healthy Treats. Never pick wild roadside plants.",
    category: "Enrichment"
  },
  {
    id: "check_vet_carrier",
    step: 10,
    title: "Travel Carrier & Exotic Vet Fund",
    requirement: "A large, secure transport carrier and an identified local veterinary practice with small mammal expertise.",
    whyImportant: "Rescues will inspect your carrier on collection day. Having an emergency vet fund (£100–£200) ensures immediate medical care.",
    rescueTip: "Line your carrier with clean bedding and add a chunk of fresh cucumber for moisture during the journey home.",
    category: "Welfare"
  }
];
