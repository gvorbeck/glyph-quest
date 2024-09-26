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

export const getMaxItems = (con: number | undefined | null) => {
  return (con ?? 0) + 10;
};

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
