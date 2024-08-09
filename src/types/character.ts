export type AbilityLongName = "Strength" | "Dexterity" | "Will";

export type AbilityShortName = "STR" | "DEX" | "WIL";

export interface Ability {
  long: AbilityLongName;
  short: AbilityShortName;
  value: number | null;
}

export interface Character {
  abilities: {
    str: Ability;
    dex: Ability;
    wil: Ability;
  };
}
