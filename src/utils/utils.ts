import {
  etherealEffects,
  etherealElements,
  etherealForms,
  physicalEffects,
  physicalElements,
  physicalForms,
} from "@/data/spellNames";
import { db } from "@/lib/firebase";
import { Character, Feature } from "@/types/character";
import { Item } from "@/types/items";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

/**
 * * Table of Contents:
 * * - Misc
 * * - Dice
 * * - Stats
 * * - Items
 * * - Spells
 * * - Firestore
 */

// Misc
export const capitalize: (s: string) => string = (s) =>
  s.charAt(0).toUpperCase() + s.slice(1);

// Dice
export const rollDie: () => number = () => Math.floor(Math.random() * 6) + 1;

export const rollDice: (
  numDice?: number,
  arr?: boolean
) => number | number[] = (numDice = 1, arr = false) => {
  if (!arr) {
    let total = 0;
    for (let i = 0; i < numDice; i++) {
      total += rollDie();
    }
    return total;
  } else {
    const rolls = [];
    for (let i = 0; i < numDice; i++) {
      rolls.push(rollDie());
    }
    return rolls;
  }
};

export const rollTable: (table: string[]) => string = (table) => {
  const index = Math.floor(Math.random() * table.length);
  return table[index];
};

export const isCrit: (roll: number) => boolean = (roll) => roll === 12;

// Stats
export const getModifier: (ability: number) => number = (ability) => {
  if (ability < 3) return 0;
  if (ability < 6) return 1;
  if (ability >= 6) return 2;
  return 0;
};

export const getAttackBonus: (character: Character) => number = (character) => {
  if (character.features && character.features.length > 0) {
    return character.features.reduce((acc, feature) => {
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

export const getFeatureText: (feature: Feature) => string = (feature) => {
  switch (feature) {
    case "attack-bonus":
      return "+1 to all attack rolls.";
    case "spell-slot":
      return "+1 to spells cast per day.";
    case "path-briarborn":
      return "Advantage on Danger Rolls relating to: Tracking, foraging, survival.";
    case "path-fingersmith":
      return "Advantage on Danger Rolls relating to: Tinkering, picking locks or pockets.";
    case "path-roofrunner":
      return "Advantage on Danger Rolls relating to: Climbing, leaping, balancing.";
    case "path-shadowjack":
      return "Advantage on Danger Rolls relating to: Moving silently, hiding in shadows.";
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

// Spells
const spellNames = [
  [
    [physicalEffects, physicalForms],
    [etherealElements, physicalForms],
  ],
  [
    [physicalEffects, etherealForms],
    [etherealElements, etherealForms],
  ],
  [
    [etherealEffects, physicalForms],
    [physicalEffects, physicalElements],
  ],
  [
    [etherealEffects, etherealForms],
    [physicalEffects, etherealElements],
  ],
  [
    [physicalElements, physicalForms],
    [etherealEffects, physicalElements],
  ],
  [
    [physicalElements, etherealForms],
    [etherealEffects, etherealElements],
  ],
];

export const getSpellName = (dice: number[]): string => {
  const [firstDie, secondDie] = dice;
  const rowIndex = firstDie - 1;
  const columnIndex = secondDie > 3 ? 1 : 0;

  const [firstOptions, secondOptions] = spellNames[rowIndex][columnIndex];
  const firstWord =
    firstOptions[Math.floor(Math.random() * firstOptions.length)];
  const secondWord =
    secondOptions[Math.floor(Math.random() * secondOptions.length)];

  return `${firstWord} ${secondWord}`;
};

// Firestore
type UpdatePayload = {
  collection: string;
  docId: string;
  subCollection?: string;
  subDocId?: string;
  data: any;
};

type DeletePayload = {
  collection: string;
  docId: string;
  uid: string;
};

export const updateDocument = async ({
  collection,
  docId,
  subCollection,
  subDocId,
  data,
}: UpdatePayload) => {
  if (!docId) {
    console.error("Document ID is undefined");
    return;
  }

  let docRef;
  if (subCollection && subDocId) {
    docRef = doc(db, collection, docId, subCollection, subDocId);
  } else {
    docRef = doc(db, collection, docId);
  }

  try {
    await updateDoc(docRef, data);
  } catch (error) {
    console.warn(data);
    console.error("Error updating document: ", error);
  }
};

export const deleteDocument = async ({
  collection,
  docId,
  uid,
}: DeletePayload) => {
  if (!docId) {
    console.error("Document ID is undefined");
    return;
  }

  try {
    const docRef = doc(db, `users/${uid}/${collection}/${docId}`);
    await deleteDoc(docRef);
    console.info(`Document ${docId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
