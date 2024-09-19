export type WeaponTypes = "heavy-weapon" | "light-weapon" | "ranged-weapon";

export type TypeOption =
  | WeaponTypes
  | "armor"
  | "shield"
  | "item"
  | "animal"
  | "transport"
  | "property"
  | "hireling"
  | "other";

export type Location = "hands" | "belt" | "worn" | "backpack" | null;

export type Item = {
  // hands: number | null;
  // location: Location;
  name: string;
  slots: number;
  bonus?: number;
  armorPoints?: number;
  // type: TypeOption;
  amount?: number | string;
  spell?: boolean;
  description?: string;
  // armor?: number;
  // damage?: number;
  // detail?: string;
  // starter?: boolean;
  // value?: number;
};
