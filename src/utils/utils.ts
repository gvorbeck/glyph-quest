import { Character, Feature } from "@/types/character";
import { Item } from "@/types/items";

// Dice
export const rollDie: () => number = () => Math.floor(Math.random() * 6) + 1;

export const rollDice: (numDice?: number) => number = (numDice = 1) => {
  let total = 0;
  for (let i = 0; i < numDice; i++) {
    total += rollDie();
  }
  return total;
};

// Stats
export const getModifier: (ability: number) => number = (ability) => {
  if (ability < 3) return 0;
  if (ability < 6) return 1;
  if (ability >= 6) return 2;
  return 0;
};

export const getAttackBonus: (character: Character) => number = (character) => {
  console.log(character);
  if (character.feature && character.feature.length > 0) {
    return character.feature.reduce((acc, feature) => {
      if (feature === "attack-bonus") return acc + 1;
      return acc;
    }, 0);
  }
  return 0;
};

export const getArmorRating: (character: Character) => number = (character) => {
  const baseArmor = 6;
  const wornArmorBonuses = character.items.reduce((acc, item) => {
    if (item.type === "armor" && item.location === "worn") {
      return acc + item.armor!;
    }
    return acc;
  }, 0);
  const shieldInHand = character.items.reduce((acc, item) => {
    if (item.type === "shield" && item.location === "hands") {
      return acc + item.armor!;
    }
    return acc;
  }, 0);
  return baseArmor + wornArmorBonuses + shieldInHand;
};

export const getFeatureTitle: (feature: Feature) => string = (feature) => {
  switch (feature) {
    case "attack-bonus":
      return "+1 Attack Bonus";
    case "spell-slot":
      return "+1 Spell Slot";
    case "path-briarborn":
      return "Briarborn";
    case "path-fingersmith":
      return "Fingersmith";
    case "path-roofrunner":
      return "Roofrunner";
    case "path-shadowjack":
      return "Shadowjack";
  }
  return "";
};

// Items
export const getWeapons: (items: readonly Item[]) => readonly Item[] = (
  items
) => items.filter((item: Item) => item.type.includes("weapon"));

export const getWornArmor: (items: readonly Item[]) => Item | undefined = (
  items
) => items.find((item) => item.type === "armor" && item.location === "worn");
