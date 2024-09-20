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
  coins: number;
  settings: Settings;
  notes: string;
}

export type CareersType = {
  one: {
    name: string;
    inventory: string[];
  };
  two: {
    name: string;
    inventory: string[];
  };
};

export type InventoryType = {
  careers: CareersType;
  coins: number;
  generic: {
    rations: boolean;
    rope: boolean;
    torches: boolean;
    arrows: boolean;
  };
  armor: {
    shield: boolean;
    helmet: boolean;
    gambeson: boolean;
    mailShirt: boolean;
    breastplate: boolean;
    armPlate: boolean;
    legPlate: boolean;
  };
  weapons: {
    name: string;
    slots: 1 | 2;
    type: "weapon";
  }[];
};
