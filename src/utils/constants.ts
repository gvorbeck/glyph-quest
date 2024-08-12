import { Location } from "@/types/items";

export const FEATURES = {
  attack: "attack-bonus",
  spell: "spell-slot",
  path: "path",
  briarborn: "path-briarborn",
  fingersmith: "path-fingersmith",
  roofrunner: "path-roofrunner",
  shadowjack: "path-shadowjack",
};

export const WEAPONTYPES = {
  light: {
    value: "light-weapon",
    label: "Light Weapon",
  },
  heavy: { value: "heavy-weapon", label: "Heavy Weapon" },
  ranged: { value: "ranged-weapon", label: "Ranged Weapon" },
};

export const ITEMTYPES = {
  armor: {
    value: "armor",
    label: "Armor",
  },
  shield: {
    value: "shield",
    label: "Shield",
  },
};

export const INVENTORYLOCATIONS = {
  hands: {
    value: "hands" as Location,
    label: "Hands",
  },
  belt: {
    value: "belt" as Location,
    label: "Belt",
  },
  worn: {
    value: "worn" as Location,
    label: "Worn",
  },
  backpack: {
    value: "backpack" as Location,
    label: "Backpack",
  },
};
