import { useEffect, useState } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import { useCharacter } from "@/context/CharacterContext";
import spellsData from "@/data/spells.json";
import InventorySection from "./InventorySection";
import { Spell } from "@/types/character";
import { Delete } from "@mui/icons-material";

type SpellBooksProps = {
  title: string;
  subtitle: string;
};

const SpellBooks: React.FC<SpellBooksProps> = ({ title, subtitle }) => {
  const { inventory, setInventory, character } = useCharacter();
  const [spellBooks, setSpellBooks] = useState<(Spell | null)[]>([]);

  useEffect(() => {
    // Initialize spellBooks with the number of INT points
    if (character.abilities.int.value) {
      const spellCount = character.abilities.int.value;
      setSpellBooks(Array(spellCount).fill(null)); // Initialize with null values
    }
  }, [character.abilities.int.value]);

  // Select a random spell from spellsData
  const selectRandomSpell = (): Spell => {
    const randomIndex = Math.floor(Math.random() * spellsData.length);
    return spellsData[randomIndex];
  };

  // Add a spell book
  const handleAddSpellBook = (index: number) => {
    const newSpell = selectRandomSpell();
    setSpellBooks((prevSpellBooks) => {
      const updatedSpellBooks = [...prevSpellBooks];
      updatedSpellBooks[index] = newSpell;
      return updatedSpellBooks;
    });

    setInventory((prevInventory) => ({
      ...prevInventory,
      spells: [...prevInventory.spells, newSpell],
    }));
  };

  // Remove a spell book
  const handleRemoveSpellBook = (index: number) => {
    setSpellBooks((prevSpellBooks) => {
      const updatedSpellBooks = [...prevSpellBooks];
      updatedSpellBooks[index] = null; // Reset to null when removed
      return updatedSpellBooks;
    });

    setInventory((prevInventory) => ({
      ...prevInventory,
      spells: prevInventory.spells.filter((_, i) => i !== index),
    }));
  };

  return (
    <InventorySection title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-4">
        {spellBooks.map((spellBook, index) => (
          <div key={index} className="flex gap-4 items-center">
            <Button
              variant="outlined"
              onClick={() => handleAddSpellBook(index)}
              disabled={!!spellBook} // Disable if a spell is already assigned
            >
              {spellBook ? `Spell Book ${index + 1}` : "Add Spell Book"}
            </Button>
            {/* {spellBook && (
              <div className="flex flex-col">
                <Typography variant="body1">
                  <strong>{spellBook.name}</strong>
                </Typography>
                <Typography variant="body2">{spellBook.description}</Typography>
              </div>
            )}
            {spellBook && (
              <IconButton
                color="primary"
                onClick={() => handleRemoveSpellBook(index)}
              >
                <Delete />
              </IconButton>
            )} */}
          </div>
        ))}
      </div>
    </InventorySection>
  );
};

export default SpellBooks;
