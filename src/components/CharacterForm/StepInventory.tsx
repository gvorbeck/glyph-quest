import { useState, useEffect } from "react";
import Careers from "./Careers";
import { useCharacter } from "@/context/CharacterContext";
import { Alert, IconButton, Typography } from "@mui/material";
import Coins from "./Coins";
import GenericItems from "./GenericItems";
import ArmorPieces from "./ArmorPieces";
import Weapons from "./Weapons";
import SpellBooks from "./SpellBooks";
import { Item, TypeOption } from "@/types/items";
import { Delete } from "@mui/icons-material";

type StepInventoryProps = {};

const StepInventory: React.FC<StepInventoryProps> = ({}) => {
  const { character, setCharacter, inventory, maxItems } = useCharacter();
  const [items, setItems] = useState<Item[]>([]);

  // Helper function to process armor items
  const processArmor = () => {
    return Object.entries(inventory.armor).reduce<Item[]>(
      (acc, [key, value]) => {
        if (value) {
          acc.push({
            name: key,
            amount: 1,
            slots: 1,
            armorPoints: 1,
            type: "armor" as TypeOption,
          });
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
      careerItems.push({
        name: item,
        slots: 1,
        amount: 1,
        type: "career" as TypeOption,
      });
    });
    inventory.careers.two.inventory.forEach((item) => {
      careerItems.push({
        name: item,
        slots: 1,
        amount: 1,
        type: "career" as TypeOption,
      });
    });
    return careerItems;
  };

  // Helper function to process generic items
  const processGenericItems = () => {
    const genericItems: Item[] = [];
    if (inventory.generic.rations) {
      genericItems.push({
        name: "Rations",
        slots: 1,
        amount: 2,
        type: "generic" as TypeOption, // Explicitly cast as TypeOption
      });
    }
    if (inventory.generic.rope) {
      genericItems.push({
        name: "Rope",
        slots: 1,
        amount: "50' ft.",
        type: "generic" as TypeOption, // Explicitly cast as TypeOption
      });
    }
    if (inventory.generic.torches) {
      genericItems.push({
        name: "Torches",
        slots: 1,
        amount: 2,
        type: "generic" as TypeOption, // Explicitly cast as TypeOption
      });
    }
    if (inventory.generic.arrows) {
      genericItems.push({
        name: "Quiver",
        slots: 1,
        amount: "20 arrows",
        type: "generic" as TypeOption, // Explicitly cast as TypeOption
      });
    }
    return genericItems;
  };

  // Helper function to process weapon items
  const processWeapons = () => {
    const weaponItems: Item[] = [];
    inventory.weapons.oneHanded.forEach((weapon) => {
      weaponItems.push({
        name: weapon,
        slots: 1,
        amount: 1,
        type: "weapon" as TypeOption,
      });
    });
    inventory.weapons.twoHanded.forEach((weapon) => {
      weaponItems.push({
        name: weapon,
        slots: 2,
        amount: 1,
        type: "weapon" as TypeOption,
      });
    });
    inventory.weapons.missile.forEach((weapon) => {
      weaponItems.push({
        name: weapon,
        slots: 1,
        amount: 1,
        type: "weapon" as TypeOption,
      });
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
      type: "spell" as TypeOption,
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
    <div className="flex flex-col gap-6 relative">
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

      {/* USE MUI LIST COMPONENT */}
      <div>
        <Typography variant="h4" className="font-jaini-purva">
          Current Items:
        </Typography>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="flex gap-4 items-center h-10">
              <Typography>{item.name}</Typography>
              {item.amount && item.amount !== 1 && (
                <Typography variant="caption">{item.amount}</Typography>
              )}
              (item.type = {item.type})
              {item.type !== "generic" && item.type !== "armor" && (
                <IconButton aria-label="delete">
                  <Delete />
                </IconButton>
              )}
            </li>
          ))}
        </ul>
      </div>
      {maxItems < character.items.length && (
        <Alert severity="error" className="sticky bottom-2 z-10">
          You have exceeded the maximum item limit!
        </Alert>
      )}
    </div>
  );
};

export default StepInventory;
