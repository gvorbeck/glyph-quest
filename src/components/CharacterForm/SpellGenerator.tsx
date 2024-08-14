import { getSpellName, rollDice } from "@/utils/utils";
import { Button, Typography } from "@mui/material";
import {
  physicalEffects,
  etherealEffects,
  etherealElements,
  etherealForms,
  physicalElements,
  physicalForms,
} from "@/data/spellNames";
import { Character } from "@/types/character";

type SpellGeneratorProps = {
  instruction?: string;
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  index?: number;
};

const SpellGenerator: React.FC<SpellGeneratorProps> = ({
  instruction,
  character,
  setCharacter,
  index = 0,
}) => {
  const handleSpellGenerateClick = () => {
    const spellName = getSpellName(rollDice(2, true) as number[]);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      spells: [{ name: spellName, description: "" }],
    }));
  };

  return (
    <div>
      <Typography variant="h3">Spells</Typography>
      {instruction && <Typography variant="body2">{instruction}</Typography>}
      <div className="flex gap-4 mt-4 items-center">
        <Button
          variant="contained"
          onClick={handleSpellGenerateClick}
          disabled={!!character.spells.length}
        >
          Generate Spell
        </Button>
        {!!character.spells[index] && (
          <Typography variant="body1">
            Spell Name: <strong>{character.spells[index].name}</strong>
          </Typography>
        )}
      </div>
    </div>
  );
};

export default SpellGenerator;
