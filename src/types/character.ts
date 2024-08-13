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
  | "path-shadowjack"
  | null;

export interface Character {
  abilities: {
    str: Ability;
    dex: Ability;
    wil: Ability;
  };
  health: number;
  feature: Feature;
  items: Item[];
  details: {
    appearance: string | null;
    physical: string | null;
    background: string | null;
    clothing: string | null;
    personality: string | null;
    mannerism: string | null;
  };
  name: string;
}
