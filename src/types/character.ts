export interface Ability {
  long: string;
  short: string;
  value: number | null;
}

export interface Character {
  abilities: {
    str: Ability;
    dex: Ability;
    wil: Ability;
  };
}
