import { useCharacter } from "@/context/CharacterContext";
import InventorySection from "./InventorySection";
import { Button } from "@mui/material";

type SpellBooksProps = {};

const SpellBooks: React.FC<SpellBooksProps> = () => {
  const { character } = useCharacter();

  const spellBooksButtons = Array.from(
    { length: character.abilities.int.value || 0 },
    (_, index) => (
      <div className="flex gap-4">
        <Button key={index} variant="outlined">
          Spell Book {index + 1}
        </Button>
      </div>
    )
  );

  return (
    <InventorySection
      title="Spell Books"
      subtitle="Your PC may start with a random spell book for every point of INT they have."
    >
      <div className="flex gap-4 flex-col items-start">{spellBooksButtons}</div>
    </InventorySection>
  );
};

export default SpellBooks;
