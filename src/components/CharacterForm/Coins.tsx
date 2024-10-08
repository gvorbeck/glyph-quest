import { Button } from "@mui/material";
import AbilityBox from "../AbilityBox";
import { useCharacter } from "@/context/CharacterContext";
import { rollDice } from "@/utils/utils";
import InventorySection from "./InventorySection";

type CoinsProps = {
  title: string;
  subtitle: string;
};

const Coins: React.FC<CoinsProps> = ({ title, subtitle }) => {
  const { character, setCharacter } = useCharacter();

  const handleClick = () => {
    const newCoins = (rollDice(3) as number) * 10;
    setCharacter((prevInventory) => ({
      ...prevInventory,
      coins: newCoins,
    }));
  };

  const handleChange = (coins: string) => {
    setCharacter((prevInventory) => ({
      ...prevInventory,
      coins: +coins,
    }));
  };
  return (
    <InventorySection title={title} subtitle={subtitle}>
      <div className="flex gap-4 items-center">
        <Button variant="outlined" onClick={handleClick}>
          Roll Coins
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
