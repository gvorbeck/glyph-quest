import { ChangeEvent, useState } from "react";
import GQRadioGroup from "../GQRadioGroup";
import { Character, Feature } from "@/types/character";
import { FEATURES } from "@/utils/constants";
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  capitalize,
} from "@mui/material";

type LevelUpChoice = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  handleClose: () => void;
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
  handleClose,
}) => {
  const [choice, setChoice] = useState<string | null>(null);
  const [abilityOption, setAbilityOption] = useState<string | null>(null);
  const [pathOption, setPathOption] = useState<string | null>(null);

  const getAvailablePaths = (character: Character) => {
    // Destructure the FEATURES object to exclude path, spell, and attack
    const { path, spell, attack, ...options } = FEATURES;

    // Iterate over the character's features and remove any paths already chosen
    character.features?.forEach((chosenFeature) => {
      for (const key in options) {
        if (options[key as keyof typeof options] === chosenFeature) {
          delete options[key as keyof typeof options];
        }
      }
    });

    return options;
  };

  const pathOptions = Object.keys(getAvailablePaths(character)).map((path) => ({
    label: capitalize(path),
    value: path,
  }));

  const getNewFeatures = (value: string, pathOpt: string | null) => {
    const newFeatures: Feature[] = character.features
      ? [...character.features]
      : [];
    if (value === "attack-bonus") {
      newFeatures.push(FEATURES.attack as Feature);
    }
    if (value === "path" && pathOpt) {
      newFeatures.push(FEATURES[pathOpt as keyof typeof FEATURES] as Feature);
    }
    if (value === "spell-slot") {
      newFeatures.push(FEATURES.spell as Feature);
    }

    return newFeatures;
  };

  const handleChoiceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setChoice(value);
    setPathOption(null);
  };

  const handlePathOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPathOption = event.target.value;
    setPathOption(newPathOption);
  };

  const handleAbilityOptionChange = (_: any, value: string | null) => {
    setAbilityOption(value);
  };

  const handleEvenLevelUp = () => {
    if (!abilityOption) return;

    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      level: prevCharacter.level + 1,
      healthMax: prevCharacter.healthMax + 2,
      abilities: {
        ...prevCharacter.abilities,
        [abilityOption]: {
          ...prevCharacter.abilities[
            abilityOption as keyof Character["abilities"]
          ],
          value:
            (prevCharacter.abilities[
              abilityOption as keyof Character["abilities"]
            ].value ?? 0) + 1,
        },
      },
    }));

    handleClose();
  };

  const handleOddLevelUp = () => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      level: prevCharacter.level + 1,
      healthMax: prevCharacter.healthMax + 2,
      features: getNewFeatures(choice as string, pathOption),
    }));
    handleClose();
  };

  return (
    <div className="flex flex-col gap-2 items-start">
      {ability ? (
        <>
          <Typography variant="body1">
            Choose an ability to increase:
          </Typography>
          <ToggleButtonGroup
            value={abilityOption}
            exclusive
            onChange={handleAbilityOptionChange}
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
          <Button
            variant="contained"
            onClick={handleEvenLevelUp}
            disabled={!abilityOption}
          >
            Level Up
          </Button>
        </>
      ) : (
        <>
          <GQRadioGroup
            id={radioGroupId}
            label={`Level ${character.level + 1} Features`}
            options={radioGroupOptions}
            value={choice}
            onChange={handleChoiceChange}
          />
          {choice === "path" && (
            <GQRadioGroup
              id="path"
              label="Path"
              options={pathOptions}
              onChange={handlePathOptionChange}
              value={pathOption}
            />
          )}
          <Button
            variant="contained"
            onClick={handleOddLevelUp}
            disabled={!choice || (choice === "path" && !pathOption)}
          >
            Level Up
          </Button>
        </>
      )}
    </div>
  );
};

export default LevelUpChoice;
