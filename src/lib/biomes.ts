
import { Creature, getCreaturesByBiome } from './creatures';

export interface Biome {
  id: string;
  name: string;
  description: string;
  image: string;
  ambientSound?: string;
  timeOfDay?: 'day' | 'night' | 'any';
  creatures?: Creature[];
  unlockedByDefault: boolean;
}

export const biomes: Biome[] = [
  {
    id: 'forest',
    name: 'Enchanted Forest',
    description: 'A mystical woodland where ancient trees whisper secrets and magical beings hide amid the foliage.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    ambientSound: '/sounds/forest-ambient.mp3',
    timeOfDay: 'any',
    unlockedByDefault: true
  },
  {
    id: 'meadow',
    name: 'Whispering Meadow',
    description: 'Rolling fields of wildflowers where gentle breezes carry seeds of magical plants and tiny creatures frolic.',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    ambientSound: '/sounds/meadow-ambient.mp3',
    timeOfDay: 'day',
    unlockedByDefault: true
  },
  {
    id: 'celestial',
    name: 'Celestial Fields',
    description: 'A realm where the boundaries between earth and sky blur, where falling stars and cosmic beings leave trails of stardust.',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
    ambientSound: '/sounds/celestial-ambient.mp3',
    timeOfDay: 'night',
    unlockedByDefault: true
  }
];

// Initialize creatures for each biome
biomes.forEach(biome => {
  biome.creatures = getCreaturesByBiome(biome.id);
});

export const getBiomeById = (id: string): Biome | undefined => {
  return biomes.find(biome => biome.id === id);
};
