import { Button, Typography } from "@mui/material";
import { useState } from "react";
import AbilityBox from "../AbilityBox";
import { rollDice } from "@/utils/utils";
import { useCharacter } from "@/context/CharacterContext";

type StepHitPointsProps = {};

const StepHitPoints: React.FC<StepHitPointsProps> = ({}) => {
  const { character, setCharacter } = useCharacter();
  const [hitPoints, setHitPoints] = useState(character.health);

  const handleClick = () => {
    const rolledHitPoints = rollDice(1, true) as number; // Assuming rolling 1d6
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
    if (!isNaN(newHitPoints)) {
      setHitPoints(newHitPoints);
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        health: newHitPoints,
        healthMax: newHitPoints,
      }));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2" className="font-jaini-purva">
        Hit Points
      </Typography>
      <div className="flex gap-2 items-center">
        <Button variant="outlined" onClick={handleClick}>
          Roll d6
        </Button>
        <AbilityBox
          label="HP"
          onChange={handleHitPointsChange}
          value={hitPoints}
        />
      </div>
    </div>
  );
};

export default StepHitPoints;
