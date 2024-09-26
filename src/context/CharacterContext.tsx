import React, { createContext, useContext, useState } from "react";
import { Character } from "@/types/character";
import { getMaxItems } from "@/utils/utils";

// Create the context type
type CharacterContextType = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
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
      personality: "",
      detail: "",
      mannerism: "",
    },
    name: "",
    level: 1,
    xp: 0,
    coins: 0,
    settings: {
      wallpaper: "sheet-hero",
    },
    notes: "",
  });
  const maxItems = getMaxItems(character.abilities.con.value);

  return (
    <CharacterContext.Provider
      value={{
        character,
        setCharacter,
        maxItems,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
