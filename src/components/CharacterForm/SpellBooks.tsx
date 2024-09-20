import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useCharacter } from "@/context/CharacterContext";
import spellsData from "@/data/spells.json";
import InventorySection from "./InventorySection";
import { Item } from "@/types/items";

type SpellBooksProps = {
  title: string;
  subtitle: string;
};

const SpellBooks: React.FC<SpellBooksProps> = ({ title, subtitle }) => {
  const { setCharacter, character } = useCharacter();
  const [spellBooks, setSpellBooks] = useState<Item[]>([]);

  useEffect(() => {
    // Initialize spellBooks with empty Item objects based on INT points
    if (character.abilities.int.value) {
      const spellCount = character.abilities.int.value;
      setSpellBooks(
        Array(spellCount).fill({ name: "", type: "spell", slots: 1 })
      );
    }
  }, [character.abilities.int.value]);

  useEffect(() => {
    console.log(spellBooks);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items: [
        ...prevCharacter.items.filter((item) => item.type !== "spell"),
        ...spellBooks.filter((spellBook) => spellBook.name !== ""), // Only add valid spells
      ],
    }));
  }, [spellBooks]);

  // Select a random spell from spellsData
  const selectRandomSpell = (): Item => {
    const randomIndex = Math.floor(Math.random() * spellsData.length);
    return spellsData[randomIndex] as Item;
  };

  // Add a spell book
  const handleAddSpellBook = (index: number) => {
    const newSpell = selectRandomSpell() as Item;
    newSpell.type = "spell";
    setSpellBooks((prevSpellBooks) => {
      const updatedSpellBooks = [...prevSpellBooks];
      updatedSpellBooks[index] = newSpell;
      return updatedSpellBooks;
    });
  };

  return (
    <InventorySection title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-4">
        {spellBooks.map((spellBook, index) => (
          <div key={index} className="flex gap-4 items-center">
            <Button
              variant="outlined"
              onClick={() => handleAddSpellBook(index)}
              disabled={!!spellBook.name} // Disable if a spell is already assigned
            >
              {spellBook.name
                ? `Spell Book ${index + 1}: ${spellBook.name}`
                : "Add Spell Book"}
            </Button>
          </div>
        ))}
      </div>
    </InventorySection>
  );
};

export default SpellBooks;
