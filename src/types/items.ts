export type Weapon = "heavy-weapon" | "light-weapon" | "ranged-weapon";

export type TypeOption =
  | Weapon
  | "armor"
  | "item"
  | "animal"
  | "transport"
  | "property"
  | "hireling"
  | string;

export type Location = "hands" | "belt" | "worn" | "backpack" | "" | string;

export type Item = {
  hands: number | null;
  location: Location;
  name: string;
  type: TypeOption;
  value: number | null;
  amount?: number | string;
  armor?: number;
  damage?: number;
  detail?: string;
  starter?: boolean;
};
