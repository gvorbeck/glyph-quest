import { Button, Typography } from "@mui/material";
import AbilityBox from "../AbilityBox";
import { useCharacter } from "@/context/CharacterContext";
import { rollDice } from "@/utils/utils";
import InventorySection from "./InventorySection";

type CoinsProps = {};

const Coins: React.FC<CoinsProps> = () => {
  const { character, setCharacter } = useCharacter();

  const handleClick = () => {
    const newCoins = (rollDice(3) as number) * 10;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      coins: newCoins,
    }));
  };

  const handleChange = (coins: string) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      coins: +coins,
    }));
  };
  return (
    <InventorySection
      title="Coins"
      subtitle="Roll for your character's starting coinage."
    >
      <div className="flex gap-4 items-center">
        <Button variant="outlined" onClick={handleClick}>
          Roll Starting Coins
        </Button>
        <AbilityBox
          label="Coins"
          onChange={(e) => handleChange(e.target.value)}
          value={character.coins}
          max={180}
        />
      </div>
    </InventorySection>
  );
};

export default Coins;
