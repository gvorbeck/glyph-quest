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
  const { character, setCharacter, inventory, maxItems, setInventory } =
    useCharacter();

  // Move spellBooks state to StepInventory
  const [spellBooks, setSpellBooks] = useState<Item[]>([]);

  useEffect(() => {
    // Initialize spellBooks based on INT value
    if (character.abilities.int.value) {
      const spellCount = character.abilities.int.value;
      setSpellBooks(
        Array(spellCount).fill({ name: "", type: "spell", slots: 1 })
      ); // Initialize with empty spell objects
    }
  }, [character.abilities.int.value]);

  useEffect(() => {
    // Sync spellBooks with character.items when they change
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items: [
        ...prevCharacter.items.filter((item) => item.type !== "spell"),
        ...spellBooks.filter((spellBook) => spellBook.name !== ""), // Only add valid spells
      ],
    }));
  }, [spellBooks]);

  const handleDeleteItem = (itemName: string) => {
    // Update character items and remove the item
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items: prevCharacter.items.filter((item) => item.name !== itemName),
    }));

    // Also update the spellBooks state to remove the corresponding spell
    setSpellBooks((prevSpellBooks) =>
      prevSpellBooks.map((spellBook) =>
        spellBook.name === itemName
          ? { name: "", type: "spell", slots: 1 }
          : spellBook
      )
    );
  };

  const handleAddSpellBook = (index: number, spell: Item) => {
    setSpellBooks((prevSpellBooks) => {
      const updatedSpellBooks = [...prevSpellBooks];
      updatedSpellBooks[index] = spell;
      return updatedSpellBooks;
    });
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
      />
      <ArmorPieces title="Armor Pieces" subtitle="Select your armor pieces." />
      <Weapons title="Weapons" subtitle="Add your weapons." />
      {!!character.abilities.int.value && (
        <SpellBooks
          title="Spell Books"
          subtitle="Your PC may have one spell book per INT."
          spellBooks={spellBooks}
          onAddSpellBook={handleAddSpellBook}
        />
      )}

      {/* Render items for debugging */}
      <div>
        <Typography variant="h4" className="font-jaini-purva">
          Current Items:
        </Typography>
        <ul>
          {character.items.map((item, index) =>
            item && item.name ? (
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
            ) : null
          )}
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
