"use client";

import { Character } from "@/types/character";
import { rollDice } from "@/utils/utils";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import AbilityBox from "../AbilityBox";

type StepAbilityProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  remainingPoints: number;
  setRemainingPoints: React.Dispatch<React.SetStateAction<number>>;
};

const StepAbilities: React.FC<StepAbilityProps> = ({
  character,
  setCharacter,
  remainingPoints,
  setRemainingPoints,
}) => {
  const [rolledAbilities, setRolledAbilities] = useState<number[]>([]);

  // Abilities array for easier mapping
  const abilities = [
    {
      name: "str", // Use ability keys directly
      label: character.abilities.str.short,
      value: character.abilities.str.value ?? 0, // Ensure value is never null
    },
    {
      name: "dex",
      label: character.abilities.dex.short,
      value: character.abilities.dex.value ?? 0,
    },
    {
      name: "con",
      label: character.abilities.con.short,
      value: character.abilities.con.value ?? 0,
    },
    {
      name: "int",
      label: character.abilities.int.short,
      value: character.abilities.int.value ?? 0,
    },
    {
      name: "wis",
      label: character.abilities.wis.short,
      value: character.abilities.wis.value ?? 0,
    },
    {
      name: "cha",
      label: character.abilities.cha.short,
      value: character.abilities.cha.value ?? 0,
    },
  ];

  // Handle rolling abilities (optional)
  const handleAbilitiesClick = () => {
    // Reset all abilities to zero first
    const resetAbilities = abilities.map((ability) => ({
      ...ability,
      value: 0, // Reset each ability's value to 0
    }));

    const rolled = rollDice(3, true) as number[];

    // Add 1 point to each ability based on the die rolls
    rolled.forEach((die) => {
      const index = die - 1;
      resetAbilities[index].value += 1;
    });

    setRolledAbilities(rolled);
    setRemainingPoints(0); // No points left after rolling

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

  // Handle ability point changes
  const handleAbilityChange = (abilityName: string, newValue: string) => {
    const newAbilityValue = parseInt(newValue);

    const currentAbility = abilities.find(
      (ability) => ability.name === abilityName
    );

    if (!currentAbility) return;

    const pointDiff = newAbilityValue - (currentAbility.value ?? 0); // Ensure currentAbility.value is not null

    // Ensure total points do not exceed remainingPoints
    if (remainingPoints - pointDiff >= 0 && newAbilityValue >= 0) {
      setRemainingPoints((prev) => prev - pointDiff); // Update remaining points

      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        abilities: {
          ...prevCharacter.abilities,
          [abilityName]: {
            ...prevCharacter.abilities[
              abilityName as keyof Character["abilities"]
            ],
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
          (Optional) Roll Abilities
        </Button>
        <Typography className="text-lg">
          <strong>{rolledAbilities.join(", ")}</strong>
        </Typography>
      </div>
      <Typography className="text-lg">
        Points remaining: {remainingPoints}
      </Typography>
      <div className="flex flex-col gap-4">
        <Typography variant="h2" className="font-jaini-purva">
          Ability Scores
        </Typography>
        <div className="flex gap-4">
          {abilities.map((ability) => (
            <AbilityBox
              key={ability.name}
              value={ability.value || 0}
              onChange={(e) =>
                handleAbilityChange(ability.name, e.target.value)
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
