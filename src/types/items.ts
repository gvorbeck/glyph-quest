export type TypeOption =
  | "heavy-weapon"
  | "light-weapon"
  | "ranged-weapon"
  | "armor"
  | "item"
  | "animal"
  | "transport"
  | "property"
  | "hireling"
  | string;

export type Item = {
  hands: number | null;
  location: "hands" | "belt" | "worn" | "backpack" | null;
  name: string;
  type: TypeOption;
  value: number | null;
  amount?: number | string;
  armor?: number;
  damage?: number;
  detail?: string;
  starter?: boolean;
};
