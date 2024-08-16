import { Item } from "./items";

export type AbilityLongName = "Strength" | "Dexterity" | "Will";

export type AbilityShortName = "STR" | "DEX" | "WIL";

export interface Ability {
  long: AbilityLongName;
  short: AbilityShortName;
  value: number | null;
}

export type Feature =
  | "attack-bonus"
  | "spell-slot"
  | "path"
  | "path-briarborn"
  | "path-fingersmith"
  | "path-roofrunner"
  | "path-shadowjack";

export type Spell = {
  name: string;
  description: string;
};

export interface Character {
  abilities: {
    str: Ability;
    dex: Ability;
    wil: Ability;
  };
  health: number;
  healthMax: number;
  features: Feature[] | null;
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
}
