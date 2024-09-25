"use client";

import { getRemainingPoints, rollDice } from "@/utils/utils";
import { Button } from "@mui/material";
import { useState } from "react";
import AbilityBox from "../AbilityBox";
import { useCharacter } from "@/context/CharacterContext";
import { Character } from "@/types/character";
import Text from "../Text";

type StepAbilityProps = {};

const StepAbilities: React.FC<StepAbilityProps> = ({}) => {
  const { character, setCharacter } = useCharacter();

  // State to track rolled ability dice (optional feature)
  const [rolledAbilities, setRolledAbilities] = useState<number[]>([]);

  // Calculate remaining points based on current ability values
  const remainingPoints = getRemainingPoints(character);

  // List of abilities to be mapped over
  const abilities = [
    { name: "str", label: character.abilities.str.short },
    { name: "dex", label: character.abilities.dex.short },
    { name: "con", label: character.abilities.con.short },
    { name: "int", label: character.abilities.int.short },
    { name: "wis", label: character.abilities.wis.short },
    { name: "cha", label: character.abilities.cha.short },
  ];

  // Handle rolling abilities (optional)
  const handleAbilitiesClick = () => {
    // Reset all abilities to zero first
    const resetAbilities = abilities.map((ability) => ({
      ...ability,
      value: 0, // Reset each ability's value to 0
    }));

    const rolled = rollDice(3, 6, true) as number[];

    // Add 1 point to each ability based on the die rolls
    rolled.forEach((die) => {
      const index = die - 1;
      resetAbilities[index].value += 1;
    });

    setRolledAbilities(rolled);

    // Update character's abilities in state
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      abilities: resetAbilities.reduce(
        (acc, ability) => ({
          ...acc,
          [ability.name]: {
            ...prevCharacter.abilities[
              ability.name as keyof Character["abilities"]
            ],
            value: ability.value, // Use the updated value
          },
        }),
        prevCharacter.abilities
      ),
    }));
  };

  // Define ability names type
  type AbilityName = keyof Character["abilities"];

  // Handle ability point changes
  const handleAbilityChange = (abilityName: AbilityName, newValue: string) => {
    const newAbilityValue = parseInt(newValue);

    // Ensure valid point update
    if (isNaN(newAbilityValue)) return;

    const currentAbilityValue = character.abilities[abilityName].value || 0;
    const pointDiff = newAbilityValue - currentAbilityValue;

    if (remainingPoints - pointDiff >= 0 && newAbilityValue >= 0) {
      // Update the specific ability value
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        abilities: {
          ...prevCharacter.abilities,
          [abilityName]: {
            ...prevCharacter.abilities[abilityName],
            value: newAbilityValue,
          },
        },
      }));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Button variant="outlined" onClick={handleAbilitiesClick}>
          Roll Abilities
        </Button>
        {rolledAbilities.length > 0 && (
          <Text className="text-lg">
            <strong>{rolledAbilities.join(", ")}</strong>
          </Text>
        )}
      </div>
      <Text className="text-lg">Points remaining: {remainingPoints}</Text>
      <div className="flex flex-col gap-4">
        <Text font variant="h3">
          Ability Scores
        </Text>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {abilities.map((ability) => (
            <AbilityBox
              key={ability.name}
              value={
                character.abilities[ability.name as AbilityName].value || 0
              }
              onChange={(e) =>
                handleAbilityChange(ability.name as AbilityName, e.target.value)
              }
              label={ability.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepAbilities;
