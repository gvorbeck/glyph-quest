import { rollDice } from "@/utils/utils";
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
  instruction: string;
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const spellNames = [
  [
    [physicalEffects, physicalForms],
    [etherealElements, physicalForms],
  ],
  [
    [physicalEffects, etherealForms],
    [etherealElements, etherealForms],
  ],
  [
    [etherealEffects, physicalForms],
    [physicalEffects, physicalElements],
  ],
  [
    [etherealEffects, etherealForms],
    [physicalEffects, etherealElements],
  ],
  [
    [physicalElements, physicalForms],
    [etherealEffects, physicalElements],
  ],
  [
    [physicalElements, etherealForms],
    [etherealEffects, etherealElements],
  ],
];

const getSpellName = (dice: number[]): string => {
  const [firstDie, secondDie] = dice;
  const rowIndex = firstDie - 1;
  const columnIndex = secondDie > 3 ? 1 : 0;

  const [firstOptions, secondOptions] = spellNames[rowIndex][columnIndex];
  const firstWord =
    firstOptions[Math.floor(Math.random() * firstOptions.length)];
  const secondWord =
    secondOptions[Math.floor(Math.random() * secondOptions.length)];

  return `${firstWord} ${secondWord}`;
};

const SpellGenerator: React.FC<SpellGeneratorProps> = ({
  instruction,
  character,
  setCharacter,
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
      <Typography variant="body2">{instruction}</Typography>
      <div className="flex gap-4 mt-4 items-center">
        <Button
          variant="contained"
          onClick={handleSpellGenerateClick}
          disabled={!!character.spells.length}
        >
          Generate Spell
        </Button>
        {!!character.spells.length && (
          <Typography variant="body1">
            Spell Name: <strong>{character.spells[0].name}</strong>
          </Typography>
        )}
      </div>
    </div>
  );
};

export default SpellGenerator;
