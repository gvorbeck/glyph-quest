import { Item } from "./items";

export type Settings = {
  wallpaper:
    | "sheet-hero"
    | "sheet-wizard"
    | "sheet-dwarf"
    | "sheet-cleric"
    | "sheet-ranger"
    | "sheet-thief";
};

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
    personality: string | undefined;
    detail: string | undefined;
    mannerism: string | undefined;
  };
  name: string;
  level: number;
  xp: number;
  coins: number;
  settings: Settings;
  notes: string;
}

export type InventoryType = {
  careers: string[];
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
