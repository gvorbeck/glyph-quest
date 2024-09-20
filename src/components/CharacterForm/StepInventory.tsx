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
import { set } from "firebase/database";
import { camelCaseToWords } from "@/utils/utils";

type StepInventoryProps = {};

const StepInventory: React.FC<StepInventoryProps> = ({}) => {
  const { character, setCharacter, inventory, maxItems, setInventory } =
    useCharacter();

  // Track items deleted specifically from career
  // const [deletedCareerItems, setDeletedCareerItems] = useState<string[]>([]);

  // Helper function to process armor items
  const processArmor = () => {
    const armorItems: Item[] = Object.entries(inventory.armor).reduce<Item[]>(
      (acc, [key, value]) => {
        if (value) {
          acc.push({
            name: camelCaseToWords(key),
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

    const filteredItems = character.items.filter(
      (item) => item.type !== "armor"
    );
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items: [...filteredItems, ...armorItems],
    }));
  };

  // Helper function to process career items
  // const processCareers = () => {
  //   const careerItems: Item[] = [];

  //   // Check if careers.one and careers.two exist before accessing inventory
  //   if (inventory.careers?.one?.inventory) {
  //     inventory.careers.one.inventory.forEach((item) => {
  //       careerItems.push({
  //         name: item,
  //         slots: 1,
  //         amount: 1,
  //         type: "career" as TypeOption,
  //       });
  //     });
  //   }
  //   if (inventory.careers?.two?.inventory) {
  //     inventory.careers.two.inventory.forEach((item) => {
  //       careerItems.push({
  //         name: item,
  //         slots: 1,
  //         amount: 1,
  //         type: "career" as TypeOption,
  //       });
  //     });
  //   }

  //   const filteredItems = character.items.filter(
  //     (item) => item.type !== "career"
  //   );

  //   setCharacter((prevCharacter) => ({
  //     ...prevCharacter,
  //     items: [...filteredItems, ...careerItems],
  //   }));
  // };

  // Helper function to process generic items
  const processGenericItems = () => {
    const genericItems: Item[] = [];
    if (inventory.generic.rations) {
      genericItems.push({
        name: "Rations",
        slots: 1,
        amount: 2,
        type: "generic" as TypeOption,
      });
    }
    if (inventory.generic.rope) {
      genericItems.push({
        name: "Rope",
        slots: 1,
        amount: "50' ft.",
        type: "generic" as TypeOption,
      });
    }
    if (inventory.generic.torches) {
      genericItems.push({
        name: "Torches",
        slots: 1,
        amount: 2,
        type: "generic" as TypeOption,
      });
    }
    if (inventory.generic.arrows) {
      genericItems.push({
        name: "Quiver",
        slots: 1,
        amount: "20 arrows",
        type: "generic" as TypeOption,
      });
    }

    const filteredItems = character.items.filter(
      (item) => item.type !== "generic"
    );
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items: [...filteredItems, ...genericItems],
    }));
  };

  // Helper function to process weapon items
  const processWeapons = () => {
    // Get all weapon items from the inventory
    const weaponItems: Item[] = [...inventory.weapons];

    // Filter new weapons that aren't already in character.items
    const newWeapons = weaponItems.filter(
      (weapon) =>
        !character.items.some(
          (item) => item.name === weapon.name && item.type === "weapon"
        )
    );

    if (newWeapons.length > 0) {
      // Update character items by adding only the new weapons
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        items: [...prevCharacter.items, ...newWeapons],
      }));

      // Remove added weapons from the inventory
      setInventory((prevInventory) => ({
        ...prevInventory,
        weapons: prevInventory.weapons.filter(
          (weapon) =>
            !newWeapons.some((newWeapon) => newWeapon.name === weapon.name)
        ),
      }));
    }
  };

  // Helper function to process spells
  const processSpells = (): Item[] => {
    return inventory.spells.map((spell) => ({
      name: spell.name,
      slots: 1,
      amount: 1,
      description: spell.description,
      type: "spell" as TypeOption,
    }));
  };

  // Consolidated useEffect to update character.items based on inventory changes
  // useEffect(() => {
  //   const updatedItems: Item[] = [
  //     ...processArmor(),
  //     ...processCareers(),
  //     ...processGenericItems(),
  //     ...processWeapons(),
  //     ...processSpells(),
  //   ];

  //   // Update the character's items when the inventory changes
  //   setCharacter((prevCharacter) => ({
  //     ...prevCharacter,
  //     items: updatedItems, // Directly update character.items
  //   }));

  //   console.log("Items updated", updatedItems);
  // }, [inventory, setCharacter, deletedCareerItems]); // Add deletedCareerItems dependency

  // Separate useEffect to update character.coins
  useEffect(() => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      coins: inventory.coins, // Update character.coins
    }));
  }, [inventory.coins, setCharacter]);

  // Handle item deletion
  // const handleDeleteItem = (itemName: string, itemType: TypeOption) => {
  //   if (itemType === "career") {
  //     // If it's a career item, add it to the deletedCareerItems array
  //     setDeletedCareerItems((prevDeletedItems) => [
  //       ...prevDeletedItems,
  //       itemName,
  //     ]);
  //   } else {
  //     // If it's any other item, directly update character's items
  //     setCharacter((prevCharacter) => ({
  //       ...prevCharacter,
  //       items: prevCharacter.items.filter((item) => item.name !== itemName),
  //     }));
  //   }
  // };

  const handleDeleteItem = (itemName: string) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items: prevCharacter.items.filter((item) => item.name !== itemName),
    }));
  };

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
        process={processGenericItems}
      />
      <ArmorPieces
        title="Armor Pieces"
        subtitle="Select your armor pieces."
        process={processArmor}
      />
      <Weapons
        title="Weapons"
        subtitle="Select your weapons."
        process={processWeapons}
      />
      {!!character.abilities.int.value && (
        <SpellBooks
          title="Spell Books"
          subtitle="Your PC may have one spell book per INT."
        />
      )}

      {/* Render items for debugging */}
      <div>
        <Typography variant="h4" className="font-jaini-purva">
          Current Items:
        </Typography>
        <ul>
          {character.items.map((item, index) => (
            <li key={index} className="flex gap-4 items-center h-10">
              <Typography>{item.name}</Typography>
              {item.amount && item.amount !== 1 && (
                <Typography variant="caption">{item.amount}</Typography>
              )}
              {item.type !== "generic" && item.type !== "armor" && (
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteItem(item.name)}
                >
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
