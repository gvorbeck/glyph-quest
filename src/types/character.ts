import { Item } from "./items";

export type AbilityLongName =
  | "Strength"
  | "Dexterity"
  | "Constitution"
  | "Intelligence"
  | "Wisdom"
  | "Charisma";

export type AbilityShortName = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

export interface Ability {
  long: AbilityLongName;
  short: AbilityShortName;
  value: number | null;
}

export type Spell = {
  name: string;
  description: string;
};

export type Settings = {
  wallpaper:
    | "sheet-hero"
    | "sheet-wizard"
    | "sheet-dwarf"
    | "sheet-cleric"
    | "sheet-ranger"
    | "sheet-thief";
};

export interface Character {
  id?: string;
  abilities: {
    str: Ability;
    dex: Ability;
    con: Ability;
    int: Ability;
    wis: Ability;
    cha: Ability;
  };
  health: number;
  healthMax: number;
  careers: string[];
  items: Item[];
  details: {
    appearance: string | null;
    background: string | null;
    clothing: string | null;
    mannerism: string | null;
    personality: string | null;
    physical: string | null;
  };
  name: string;
  level: number;
  xp: number;
  spells: Spell[];
  gold: number;
  settings: Settings;
  notes: string;
}
