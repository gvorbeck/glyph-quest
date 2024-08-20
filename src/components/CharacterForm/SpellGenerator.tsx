import { getSpellName, rollDice } from "@/utils/utils";
import { Button, TextField, Typography } from "@mui/material";
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

  const handleSpellNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCharacter((prevCharacter) => {
      const spells = prevCharacter.spells;
      spells[index].name = value;
      return {
        ...prevCharacter,
        spells,
      };
    });
  };

  const handleSpellDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setCharacter((prevCharacter) => {
      const spells = prevCharacter.spells;
      spells[index].description = value;
      return {
        ...prevCharacter,
        spells,
      };
    });
  };

  return (
    <div>
      <Typography variant="h3">Spells</Typography>
      {instruction && <Typography variant="body2">{instruction}</Typography>}
      <div className="flex flex-col gap-4 mt-4 items-start">
        <div className="flex gap-2">
          <TextField
            size="small"
            placeholder="Spell Name"
            value={character.spells[index]?.name}
            onChange={handleSpellNameChange}
          />
          <Button
            variant="contained"
            onClick={handleSpellGenerateClick}
            // disabled={!!character.spells.length}
          >
            Generate Spell
          </Button>
        </div>
        <TextField
          size="small"
          placeholder="Spell Description (optional)"
          multiline
          value={character.spells[index]?.description}
          onChange={handleSpellDescriptionChange}
        />
      </div>
    </div>
  );
};

export default SpellGenerator;
