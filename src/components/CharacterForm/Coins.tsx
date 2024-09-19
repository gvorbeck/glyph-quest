import { Button, Typography } from "@mui/material";
import AbilityBox from "../AbilityBox";
import { useCharacter } from "@/context/CharacterContext";
import { rollDice } from "@/utils/utils";
import InventorySection from "./InventorySection";
import { set } from "firebase/database";

type CoinsProps = {
  title: string;
  subtitle: string;
};

const Coins: React.FC<CoinsProps> = ({ title, subtitle }) => {
  const { inventory, setInventory } = useCharacter();

  const handleClick = () => {
    const newCoins = (rollDice(3) as number) * 10;
    setInventory((prevInventory) => ({
      ...prevInventory,
      coins: newCoins,
    }));
  };

  const handleChange = (coins: string) => {
    setInventory((prevInventory) => ({
      ...prevInventory,
      coins: +coins,
    }));
  };
  return (
    <InventorySection title={title} subtitle={subtitle}>
      <div className="flex gap-4 items-center">
        <Button variant="outlined" onClick={handleClick}>
          Roll Starting Coins
        </Button>
        <AbilityBox
          label="Coins"
          onChange={(e) => handleChange(e.target.value)}
          value={inventory.coins}
          max={180}
        />
      </div>
    </InventorySection>
  );
};

export default Coins;
