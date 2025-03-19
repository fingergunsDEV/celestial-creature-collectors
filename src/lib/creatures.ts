
export interface Creature {
  id: string;
  name: string;
  description: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'mythical';
  biome: string;
  behavior?: string;
  catchDifficulty: number; // 1-10 scale
}

export const creatures: Creature[] = [
  {
    id: 'monarch_butterfly',
    name: 'Monarch Butterfly',
    description: 'A vibrant orange butterfly with distinct black markings. Known for its incredible migration patterns.',
    image: 'https://images.unsplash.com/photo-1559636765-9a61f0aac4c1',
    rarity: 'common',
    biome: 'Meadow',
    behavior: 'Flutters in patterns, attracted to milkweed plants.',
    catchDifficulty: 2
  },
  {
    id: 'blue_morpho',
    name: 'Blue Morpho',
    description: 'An electric blue butterfly with iridescent wings that shimmer in the sunlight.',
    image: 'https://images.unsplash.com/photo-1552410260-0fd9b577afa6',
    rarity: 'uncommon',
    biome: 'Forest',
    behavior: 'Stays high in the canopy, occasionally descends to forest floor.',
    catchDifficulty: 5
  },
  {
    id: 'forest_sprite',
    name: 'Forest Sprite',
    description: 'A tiny fairy-like being with luminescent green wings that blend with the forest foliage.',
    image: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8',
    rarity: 'rare',
    biome: 'Forest',
    behavior: 'Extremely shy, only visible in dappled sunlight.',
    catchDifficulty: 7
  },
  {
    id: 'luminous_wisp',
    name: 'Luminous Wisp',
    description: 'A floating ball of gentle blue light that guides lost travelers through dark woods.',
    image: 'https://images.unsplash.com/photo-1607438408655-b2eb348cfec3',
    rarity: 'uncommon',
    biome: 'Forest',
    behavior: 'Moves slowly in a winding path, reacts to sudden movements.',
    catchDifficulty: 4
  },
  {
    id: 'field_hopper',
    name: 'Field Hopper',
    description: 'A small rabbit-like creature with oversized ears and a single glowing antenna.',
    image: 'https://images.unsplash.com/photo-1591382386733-c59596ef6f31',
    rarity: 'common',
    biome: 'Meadow',
    behavior: 'Bounces playfully through tall grass, easily startled.',
    catchDifficulty: 3
  },
  {
    id: 'meadow_flutter',
    name: 'Meadow Flutter',
    description: 'A delicate butterfly with translucent wings that catch and refract sunlight into miniature rainbows.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    rarity: 'common',
    biome: 'Meadow',
    behavior: 'Dances from flower to flower in zigzag patterns.',
    catchDifficulty: 2
  },
  {
    id: 'falling_star',
    name: 'Falling Star',
    description: 'A tiny fragment of a celestial body that glows with an inner light and leaves trails of stardust.',
    image: 'https://images.unsplash.com/photo-1598889353951-59201e8327c6',
    rarity: 'rare',
    biome: 'Celestial Fields',
    behavior: 'Falls slowly to earth, pulsating with light.',
    catchDifficulty: 6
  },
  {
    id: 'aurora_moth',
    name: 'Aurora Moth',
    description: 'A large moth with wings that shimmer with the colors of the northern lights.',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b',
    rarity: 'uncommon',
    biome: 'Celestial Fields',
    behavior: 'Only active at night, drawn to moonlight.',
    catchDifficulty: 5
  },
  {
    id: 'cosmic_rabbit',
    name: 'Cosmic Rabbit',
    description: 'A small rabbit with fur that reflects the night sky, complete with stars and nebulae.',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308',
    rarity: 'mythical',
    biome: 'Celestial Fields',
    behavior: 'Only appears during meteor showers, extremely fast.',
    catchDifficulty: 9
  }
];

export const getCreaturesByBiome = (biomeId: string): Creature[] => {
  return creatures.filter(creature => 
    creature.biome.toLowerCase() === biomeId.replace('_', ' ').toLowerCase()
  );
};

export const getCreatureById = (id: string): Creature | undefined => {
  return creatures.find(creature => creature.id === id);
};
