import { Button } from "@mui/material";
import { Item } from "@/types/items";
import InventorySection from "./InventorySection";
import spellsData from "@/data/spells.json";

type SpellBooksProps = {
  title: string;
  subtitle: string;
  spellBooks: Item[]; // Receive the spellBooks as props
  onAddSpellBook: (index: number, spell: Item) => void; // Receive the add spell handler as props
};

const SpellBooks: React.FC<SpellBooksProps> = ({
  title,
  subtitle,
  spellBooks,
  onAddSpellBook,
}) => {
  // Select a random spell from spellsData
  const selectRandomSpell = (): Item => {
    const randomIndex = Math.floor(Math.random() * spellsData.length);
    return {
      ...spellsData[randomIndex],
      type: "spell",
      slots: 1,
    } as Item;
  };

  // Add a spell book
  const handleAddSpellBook = (index: number) => {
    const newSpell = selectRandomSpell();
    onAddSpellBook(index, newSpell); // Use the passed prop function to add spell
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
              {spellBook.name ? `Spell Book ${index + 1}` : "Add Spell Book"}
            </Button>
          </div>
        ))}
      </div>
    </InventorySection>
  );
};

export default SpellBooks;
