export type TypeOption =
  | "armor"
  | "generic"
  | "spell"
  | "weapon"
  | "career"
  | "wound";

export type Item = {
  name: string;
  slots: number;
  type: TypeOption;
  damage?: string;
  armorPoints?: number;
  amount?: number | string;
  description?: string;
  source?: string;
};
