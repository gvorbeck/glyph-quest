export type TypeOption = "armor" | "generic" | "spell" | "weapon" | "career";

export type Location = "hands" | "belt" | "worn" | "backpack" | null;

export type Item = {
  // hands: number | null;
  // location: Location;
  name: string;
  slots: number;
  type: TypeOption;
  damage?: string;
  bonus?: number;
  armorPoints?: number;
  amount?: number | string;
  description?: string;
  source?: string;
  // armor?: number;
  // damage?: number;
  // detail?: string;
  // starter?: boolean;
  // value?: number;
};
