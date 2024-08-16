import { ChangeEvent, useState } from "react";
import GQRadioGroup from "../GQRadioGroup";
import { Character } from "@/types/character";
import { FEATURES } from "@/utils/constants";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

type LevelUpChoice = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  ability?: boolean;
};

const radioGroupId = "level-up-choice";
const radioGroupOptions = [
  { label: "Attack Bonus +1", value: "attack-bonus" },
  { label: "Gain a New Path", value: "path" },
  { label: "Gain a Spell Slot", value: "spell-slot" },
];

const LevelUpChoice: React.FC<LevelUpChoice> = ({
  character,
  setCharacter,
  ability,
}) => {
  const [choice, setChoice] = useState<string | null>(null);

  const getAvailablePaths = (character: Character) => {
    // Destructure the FEATURES object to exclude path, spell, and attack
    const { path, spell, attack, ...options } = FEATURES;

    // Iterate over the character's features and remove any paths already chosen
    character.feature?.forEach((chosenFeature) => {
      for (const key in options) {
        if (options[key as keyof typeof options] === chosenFeature) {
          delete options[key as keyof typeof options];
        }
      }
    });

    // Return the remaining available options
    return options;
  };

  console.log(getAvailablePaths(character));

  const handleChoiceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChoice(event.target.value);
  };

  const handlePathChange = (event: ChangeEvent<HTMLInputElement>) => {};

  return (
    <div>
      {ability ? (
        <div className="flex flex-col gap-2">
          <Typography variant="body1">
            Choose an ability to increase:
          </Typography>
          <ToggleButtonGroup
            value={lvlUpContent.ability}
            exclusive
            onChange={handleAbilityChoice}
            aria-label="ability choices"
          >
            <ToggleButton value="str" aria-label="strength">
              STR
            </ToggleButton>
            <ToggleButton value="dex" aria-label="dexterity">
              DEX
            </ToggleButton>
            <ToggleButton value="wil" aria-label="willpower">
              WIL
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      ) : (
        <>
          <GQRadioGroup
            id={radioGroupId}
            label={`Level ${character.level + 1} Features`}
            options={radioGroupOptions}
            value={choice}
            onChange={handleChoiceChange}
          />
          {choice === "attack-bonus" && <div>foo</div>}
          {choice === "path" && (
            <GQRadioGroup
              id="path"
              label="Path"
              options={[]}
              onChange={handlePathChange}
              value={5}
            />
          )}
          {choice === "spell-slot" && <div>baz</div>}
        </>
      )}
    </div>
  );
};

export default LevelUpChoice;
