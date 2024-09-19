import { useCharacter } from "@/context/CharacterContext";
import InventorySection from "./InventorySection";
import { Button, IconButton, Typography } from "@mui/material";
import spellsData from "@/data/spells.json";
import { Spell } from "@/types/character";
import { useEffect } from "react";
import { Delete } from "@mui/icons-material";

type SpellBooksProps = {
  title: string;
  subtitle: string;
};

const SpellBooks: React.FC<SpellBooksProps> = ({ title, subtitle }) => {
  const { character, setCharacter } = useCharacter();

  // Initialize the spell array if it is empty
  useEffect(() => {
    if (!character.spells.length) {
      setCharacter((prev) => ({
        ...prev,
        spells: Array.from(
          { length: character.abilities.int.value || 0 },
          () => null as unknown as Spell
        ),
      }));
    }
  }, [character.abilities.int.value, character.spells.length, setCharacter]);

  // Select a random spell from the spellsData
  const handleClick = (index: number) => {
    const randomSpell =
      spellsData[Math.floor(Math.random() * spellsData.length)];
    setCharacter((prev) => {
      const newSpells = [...prev.spells];
      newSpells[index] = randomSpell;
      return { ...prev, spells: newSpells };
    });
  };

  // Remove the spell at the given index
  const handleRemoveSpell = (index: number) => {
    setCharacter((prev) => {
      const newSpells = [...prev.spells];
      newSpells[index] = null as unknown as Spell; // Set the spell to null
      return { ...prev, spells: newSpells };
    });
  };

  // Render spell book buttons and spells
  const spellBooksButtons = Array.from(
    { length: character.abilities.int.value || 0 },
    (_, index) => (
      <div className="flex gap-4 items-center" key={index}>
        <Button
          variant="outlined"
          onClick={() => handleClick(index)}
          className="shrink-0"
        >
          Spell Book {index + 1}
        </Button>
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => handleRemoveSpell(index)}
        >
          <Delete />
        </IconButton>
        {character.spells[index] && character.spells[index].name && (
          <div className="flex flex-col gap-2">
            <Typography>
              <strong>{character.spells[index].name}</strong>
            </Typography>
            <Typography>{character.spells[index].description}</Typography>
          </div>
        )}
      </div>
    )
  );

  return (
    <InventorySection title={title} subtitle={subtitle}>
      <div className="flex gap-4 flex-col items-start">{spellBooksButtons}</div>
    </InventorySection>
  );
};

export default SpellBooks;
