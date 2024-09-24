import { Box, Button } from "@mui/material";
import { useState } from "react";
import AbilityBox from "../AbilityBox";
import { rollDice } from "@/utils/utils";
import { useCharacter } from "@/context/CharacterContext";

type StepHitPointsProps = {};

const StepHitPoints: React.FC<StepHitPointsProps> = () => {
  const { character, setCharacter } = useCharacter();
  const [hitPoints, setHitPoints] = useState<number>(character.health);

  const handleClick = () => {
    const rolledHitPoints = rollDice(1, 6, true) as number;
    setHitPoints(rolledHitPoints);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      health: rolledHitPoints,
      healthMax: rolledHitPoints,
    }));
  };

  // Handle manual input for hit points
  const handleHitPointsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newHitPoints = parseInt(event.target.value, 10);
    if (!isNaN(newHitPoints) && newHitPoints >= 0 && newHitPoints <= 6) {
      setHitPoints(newHitPoints);
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        health: newHitPoints,
        healthMax: newHitPoints,
      }));
    }
  };

  return (
    <Box className="flex gap-2 items-center">
      <Button variant="outlined" onClick={handleClick}>
        Roll d6
      </Button>
      <AbilityBox
        label="HP"
        onChange={handleHitPointsChange}
        value={hitPoints}
      />
    </Box>
  );
};

export default StepHitPoints;
