import React, { createContext, useContext, useState } from "react";
import { Character, InventoryType } from "@/types/character";

// Create the context type
type CharacterContextType = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  inventory: InventoryType;
  setInventory: React.Dispatch<React.SetStateAction<InventoryType>>;
  maxItems: number;
};

// Create the context with default values
const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

// Custom hook to use the context
export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
};

// Provider component to wrap the app or part of the app that needs access to character
export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [character, setCharacter] = useState<Character>({
    abilities: {
      str: { long: "Strength", short: "STR", value: null },
      dex: { long: "Dexterity", short: "DEX", value: null },
      con: { long: "Constitution", short: "CON", value: null },
      int: { long: "Intelligence", short: "INT", value: null },
      wis: { long: "Wisdom", short: "WIS", value: null },
      cha: { long: "Charisma", short: "CHA", value: null },
    },
    health: 0,
    healthMax: 0,
    careers: [],
    items: [],
    details: {
      appearance: null,
      background: null,
      clothing: null,
      mannerism: null,
      personality: null,
      physical: null,
    },
    name: "",
    level: 1,
    xp: 0,
    spells: [],
    coins: 0,
    settings: {
      wallpaper: "sheet-hero",
    },
    notes: "",
  });
  const [inventory, setInventory] = useState<InventoryType>({
    careers: {
      one: {
        name: "",
        inventory: [],
      },
      two: {
        name: "",
        inventory: [],
      },
    },
    coins: 0,
    generic: {
      rations: false,
      rope: false,
      torches: false,
      arrows: false,
    },
    armor: {
      shield: false,
      helmet: false,
      gambeson: false,
      mailShirt: false,
      breastplate: false,
      armPlate: false,
      legPlate: false,
    },
    weapons: {
      oneHanded: [],
      twoHanded: [],
      missile: [],
    },
    spells: [],
  });
  const maxItems = 10 + (character.abilities.con.value ?? 0);

  return (
    <CharacterContext.Provider
      value={{
        character,
        setCharacter,
        inventory,
        setInventory,
        maxItems,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
