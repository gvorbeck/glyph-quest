import { useState, useEffect } from "react";
import Careers from "./Careers";
import { useCharacter } from "@/context/CharacterContext";
import { Typography } from "@mui/material";
import Coins from "./Coins";
import GenericItems from "./GenericItems";
import ArmorPieces from "./ArmorPieces";
import Weapons from "./Weapons";
import SpellBooks from "./SpellBooks";
import { Item } from "@/types/items";

type StepInventoryProps = {};

const StepInventory: React.FC<StepInventoryProps> = ({}) => {
  const { character, setCharacter, inventory } = useCharacter();
  const [items, setItems] = useState<Item[]>([]); // Initialize items as a state

  // Helper function to process armor items
  const processArmor = () => {
    return Object.entries(inventory.armor).reduce<Item[]>(
      (acc, [key, value]) => {
        if (value) {
          acc.push({ name: key, amount: 1, slots: 1, armorPoints: 1 });
        }
        return acc;
      },
      []
    );
  };

  // Helper function to process career items
  const processCareers = () => {
    const careerItems: Item[] = [];
    inventory.careers.one.inventory.forEach((item) => {
      careerItems.push({ name: item, slots: 1, amount: 1 });
    });
    inventory.careers.two.inventory.forEach((item) => {
      careerItems.push({ name: item, slots: 1, amount: 1 });
    });
    return careerItems;
  };

  // Helper function to process generic items
  const processGenericItems = () => {
    const genericItems: Item[] = [];
    if (inventory.generic.rations) {
      genericItems.push({ name: "Rations", slots: 1, amount: 1 });
    }
    if (inventory.generic.rope) {
      genericItems.push({ name: "Rope", slots: 1, amount: 1 });
    }
    if (inventory.generic.torches) {
      genericItems.push({ name: "Torches", slots: 1, amount: 1 });
    }
    if (inventory.generic.arrows) {
      genericItems.push({ name: "Arrows", slots: 1, amount: 1 });
    }
    return genericItems;
  };

  // Helper function to process weapon items
  const processWeapons = () => {
    const weaponItems: Item[] = [];
    inventory.weapons.oneHanded.forEach((weapon) => {
      weaponItems.push({ name: weapon, slots: 1, amount: 1 });
    });
    inventory.weapons.twoHanded.forEach((weapon) => {
      weaponItems.push({ name: weapon, slots: 2, amount: 1 });
    });
    inventory.weapons.missile.forEach((weapon) => {
      weaponItems.push({ name: weapon, slots: 1, amount: 1 });
    });
    return weaponItems;
  };

  // Helper function to process spells
  const processSpells = () => {
    return inventory.spells.map((spell) => ({
      name: spell.name,
      slots: 1,
      amount: 1,
      description: spell.description,
      spell: true,
    }));
  };

  // Consolidated useEffect to update items based on inventory changes
  useEffect(() => {
    const updatedItems: Item[] = [
      ...processArmor(),
      ...processCareers(),
      ...processGenericItems(),
      ...processWeapons(),
      ...processSpells(),
    ];

    setItems(updatedItems);

    // Update the character's items when the inventory changes
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items: updatedItems, // Update character.items
    }));

    console.log("Items updated", updatedItems);
  }, [inventory, setCharacter]);

  // Separate useEffect to update character.coins
  useEffect(() => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      coins: inventory.coins, // Update character.coins
    }));
  }, [inventory.coins, setCharacter]);

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

      {/* Render items for debugging */}
      <div>
        <Typography variant="h4">Current Items:</Typography>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name} (Amount: {item.amount}, Slots: {item.slots}, Armor
              Points: {item.armorPoints || 0})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StepInventory;
