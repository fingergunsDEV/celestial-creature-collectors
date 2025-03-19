
import { useState, useEffect } from 'react';
import { Creature } from '@/lib/creatures';
import { toast } from '@/components/ui/use-toast';

export interface CreatureCollection {
  creatures: Creature[];
  addCreature: (creature: Creature) => void;
  removeCreature: (creatureId: string) => void;
  hasCreature: (creatureId: string) => boolean;
  clearCollection: () => void;
}

export function useCreatureCollection(): CreatureCollection {
  const [collection, setCollection] = useState<Creature[]>(() => {
    const savedCollection = localStorage.getItem('creatureCollection');
    return savedCollection ? JSON.parse(savedCollection) : [];
  });

  useEffect(() => {
    localStorage.setItem('creatureCollection', JSON.stringify(collection));
  }, [collection]);

  const addCreature = (creature: Creature) => {
    if (!hasCreature(creature.id)) {
      setCollection(prev => [...prev, creature]);
      toast({
        title: "New creature caught!",
        description: `${creature.name} has been added to your collection.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Already in collection",
        description: `You already have a ${creature.name} in your collection.`,
        duration: 3000,
      });
    }
  };

  const removeCreature = (creatureId: string) => {
    setCollection(prev => prev.filter(c => c.id !== creatureId));
  };

  const hasCreature = (creatureId: string): boolean => {
    return collection.some(c => c.id === creatureId);
  };

  const clearCollection = () => {
    setCollection([]);
  };

  return {
    creatures: collection,
    addCreature,
    removeCreature,
    hasCreature,
    clearCollection
  };
}
