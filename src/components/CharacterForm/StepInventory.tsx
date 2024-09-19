import { useState, useEffect } from "react";
import Careers from "./Careers";
import { useCharacter } from "@/context/CharacterContext";
import { Typography } from "@mui/material";
import Coins from "./Coins";
import GenericItems from "./GenericItems";
import ArmorPieces from "./ArmorPieces";
import Weapons from "./Weapons";
import SpellBooks from "./SpellBooks";

type StepInventoryProps = {};

const StepInventory: React.FC<StepInventoryProps> = ({}) => {
  const { character, setCharacter, inventory, setInventory } = useCharacter();

  useEffect(() => {
    console.log("inventory has changed, setCharacter?");
  }, [inventory]);

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h2" className="font-jaini-purva">
        Careers & Inventory
      </Typography>
      <Careers
        title="Careers"
        subtitle="Roll or select two careers to build your PC's background."
      />
      <Coins title="Coins" subtitle="Roll or input your starting coins." />
      <GenericItems
        title="Generic Items"
        subtitle="Every PC may start with any of these items."
      />
      <ArmorPieces title="Armor Pieces" subtitle="Select your armor pieces." />
      <Weapons title="Weapons" subtitle="Select your weapons." />
      {!!character.abilities.int.value && (
        <SpellBooks
          title="Spell Books"
          subtitle="Your PC may have one spell book per INT."
        />
      )}
    </div>
  );
};

export default StepInventory;
