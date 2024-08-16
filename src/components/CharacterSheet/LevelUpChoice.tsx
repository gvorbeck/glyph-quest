import { ChangeEvent, useState } from "react";
import GQRadioGroup from "../GQRadioGroup";
import { Character } from "@/types/character";

type LevelUpChoice = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const radioGroupId = "level-up-choice";
const radioGroupOptions = [
  { label: "Attack Bonus +1", value: "attack-bonus" },
  { label: "Gain a New Path", value: "path" },
  { label: "Gain a Spell Slot", value: "spell-slot" },
];

const LevelUpChoice: React.FC<LevelUpChoice> = ({ character }) => {
  const [choice, setChoice] = useState<string | null>(null);

  const handleChoiceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChoice(event.target.value);
  };

  return (
    <GQRadioGroup
      id={radioGroupId}
      label={`Level ${character.level + 1} Features`}
      options={radioGroupOptions}
      value={choice}
      onChange={handleChoiceChange}
    />
  );
};

export default LevelUpChoice;
