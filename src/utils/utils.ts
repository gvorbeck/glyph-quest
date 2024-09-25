import { db } from "@/lib/firebase";
import { Character } from "@/types/character";
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

export const copyToClipboard = (message: string) => {
  navigator.clipboard.writeText(message);
};

export const camelCase = (str: string) =>
  str
    .split(" ")
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");

export const camelCaseToWords = (input: string) => {
  const words = input.replace(/([A-Z])/g, " $1").toLowerCase();

  return words.charAt(0).toUpperCase() + words.slice(1);
};

// Dice
export const rollDie: (sides?: number) => number = (sides = 6) => {
  return Math.floor(Math.random() * sides) + 1;
};

export const rollDice: (
  numDice?: number,
  sides?: number,
  arr?: boolean
) => number | number[] = (numDice = 1, sides = 6, arr = false) => {
  if (!arr) {
    let total = 0;
    for (let i = 0; i < numDice; i++) {
      total += rollDie(sides);
    }
    return total;
  } else {
    const rolls = [];
    for (let i = 0; i < numDice; i++) {
      rolls.push(rollDie(sides));
    }
    return rolls;
  }
};

export const rollTable: (table: string[]) => string = (table) => {
  const index = Math.floor(Math.random() * table.length);
  return table[index];
};

// export const isCrit: (roll: number) => boolean = (roll) => roll === 12;

/**
 * * Stats
 */
export const getRemainingPoints = (character: Character) => {
  return (
    3 -
    Object.values(character.abilities).reduce(
      (acc, ability) => acc + (ability.value ?? 0),
      0
    )
  );
};

export const getSlots = (items: Character["items"]) => {
  return items.reduce((acc, item) => {
    return acc + +item.slots;
  }, 0);
};

// export const getModifier: (ability: number) => number = (ability) => {
//   if (ability < 3) return 0;
//   if (ability < 6) return 1;
//   if (ability >= 6) return 2;
//   return 0;
// };

// export const getAttackBonus: (character: Character) => number = (character) => {
//   if (character.features && character.features.length > 0) {
//     return character.features.reduce((acc, feature) => {
//       if (feature === "attack-bonus") return acc + 1;
//       return acc;
//     }, 0);
//   }
//   return 0;
// };

// export const getArmorRating: (character: Character) => number = (character) => {
//   const baseArmor = 6;
//   const wornArmorBonuses = character.items.reduce((acc, item) => {
//     if (item.type === "armor" && item.location === "worn") {
//       return acc + item.armor!;
//     }
//     return acc;
//   }, 0);
//   const shieldInHand = character.items.reduce((acc, item) => {
//     if (item.type === "shield" && item.location === "hands") {
//       return acc + item.armor!;
//     }
//     return acc;
//   }, 0);
//   return baseArmor + wornArmorBonuses + shieldInHand;
// };

// export const getFeatureTitle: (feature: Feature) => string = (feature) => {
//   switch (feature) {
//     case "attack-bonus":
//       return "+1 Attack Bonus";
//     case "spell-slot":
//       return "+1 Spell Slot";
//     case "path-briarborn":
//       return "Briarborn";
//     case "path-fingersmith":
//       return "Fingersmith";
//     case "path-roofrunner":
//       return "Roofrunner";
//     case "path-shadowjack":
//       return "Shadowjack";
//   }
//   return "";
// };

// export const getFeatureText: (feature: Feature) => string = (feature) => {
//   switch (feature) {
//     case "attack-bonus":
//       return "+1 to all attack rolls.";
//     case "spell-slot":
//       return "+1 to spells cast per day.";
//     case "path-briarborn":
//       return "Advantage on Danger Rolls relating to: Tracking, foraging, survival.";
//     case "path-fingersmith":
//       return "Advantage on Danger Rolls relating to: Tinkering, picking locks or pockets.";
//     case "path-roofrunner":
//       return "Advantage on Danger Rolls relating to: Climbing, leaping, balancing.";
//     case "path-shadowjack":
//       return "Advantage on Danger Rolls relating to: Moving silently, hiding in shadows.";
//   }
//   return "";
// };

/**
 * * Items
 */
// Get the default damage types for a weapon.
export const getWeaponDamage = (weaponType: string, weaponHands: number) => {
  if (weaponType === "Melee") {
    if (weaponHands === 1) {
      return "1d6";
    } else {
      return "1d8";
    }
  } else {
    if (weaponHands === 1) {
      return "1d4";
    } else {
      return "1d6";
    }
  }
};

/**
 * * Spells
 */

/**
 * * Firestore
 */
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
