import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import Text from "../Text";
import { Character } from "@/types/character";
import { rollDie } from "@/utils/utils";
import { useState } from "react";
import GQDivider from "../GQDivider";
import AbilityBox from "../AbilityBox";

type LevelUpDrawerProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  setLevelUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LevelUpDrawer: React.FC<
  LevelUpDrawerProps & React.ComponentPropsWithRef<"div">
> = ({ className, character, setCharacter, setLevelUpOpen }) => {
  const [abilities, setAbilities] = useState<number[]>([]);
  const [hitPoints, setHitPoints] = useState<number>(0);
  const classNames = ["flex flex-col items-start gap-4 p-4", className].join(
    " "
  );
  const firstName = character.name.split(" ")[0];

  // Roll 3d6 until there are three unique values.
  const rollAbilities = () => {
    const abilityArr: number[] = [];
    while (abilityArr.length < 3) {
      const roll = rollDie();
      if (!abilityArr.includes(roll)) {
        abilityArr.push(roll);
      }
    }
    setAbilities(abilityArr);
  };

  const handleHPClick = (newLevel: number) => {
    let value = 0;
    for (let i = 0; i < newLevel; i++) {
      value += rollDie(6);
    }
    setHitPoints(value);
  };

  const handleHitPointsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newHitPoints = parseInt(event.target.value, 10);
    if (!isNaN(newHitPoints) && newHitPoints >= 0) {
      setHitPoints(newHitPoints);
    }
  };

  // Handles the actual leveling up process
  const handleLevelUp = () => {
    // Create a copy of the current character's abilities
    const updatedAbilities = { ...character.abilities };

    // Increment selected abilities
    abilities.forEach((abilityIndex) => {
      const abilityNames = ["str", "dex", "con", "int", "wis", "cha"] as const;
      const selectedAbility = abilityNames[abilityIndex - 1];

      if (updatedAbilities[selectedAbility].value !== null) {
        updatedAbilities[selectedAbility].value! += 1;
      }
    });

    // Update the character's health based on new HP roll or increase by 1 if lower
    const newHealthMax =
      hitPoints > character.healthMax ? hitPoints : character.healthMax + 1;

    // Update the character state with new level, abilities, and health
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      level: prevCharacter.level + 1, // Increase level by 1
      abilities: updatedAbilities, // Update abilities
      healthMax: newHealthMax, // Update max health
    }));
    setLevelUpOpen(false);
  };

  return (
    <Box className={classNames}>
      <div>
        <Text variant="h3" font className="text-3xl text-amber">
          Time to level-up, {firstName}!
        </Text>
        <Text>
          Choose three abilities to increment OR click to randomly assign them.
          Finally, roll for your new Hit Point maximum. If the new value is less
          than your current max, we'll increase {firstName}'s HP by 1.
        </Text>
      </div>
      <Button variant="outlined" onClick={rollAbilities}>
        Randomize
      </Button>
      <div className="grid xs:grid-cols-3">
        {Object.values(character.abilities).map((ability, index) => (
          <FormControlLabel
            key={ability.short}
            control={<Switch />}
            label={ability.short}
            checked={abilities.includes(index + 1)}
            disabled={abilities.length === 3 && !abilities.includes(index + 1)}
            onChange={() => {
              if (abilities.includes(index + 1)) {
                setAbilities(abilities.filter((a) => a !== index + 1));
              } else {
                setAbilities([...abilities, index + 1]);
              }
            }}
          />
        ))}
      </div>
      <GQDivider className="w-full" />
      <div className="flex gap-4 items-center">
        <Button
          variant="outlined"
          onClick={() => handleHPClick(character.level + 1)}
        >
          Roll {character.level + 1}d6
        </Button>
        <AbilityBox
          label="HP"
          onChange={handleHitPointsChange}
          value={hitPoints}
          className="w-16"
          max={6 * (character.level + 1)}
        />
      </div>
      <GQDivider className="w-full" />
      <Button variant="contained" onClick={handleLevelUp}>
        Level up
      </Button>
    </Box>
  );
};

export default LevelUpDrawer;
