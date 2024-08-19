import { Character } from "@/types/character";
import { Typography } from "@mui/material";
import InventoryErrors from "../InventoryErrors";
import InventoryWeapons from "./InventoryWeapons";
import InventoryArmor from "./InventoryArmor";
import InventoryShield from "./InventoryShield";
import InventoryItems from "./InventoryItems";

type StepInventoryProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  setError: React.Dispatch<React.SetStateAction<number>>;
};

const StepInventory: React.FC<StepInventoryProps> = ({
  character,
  setCharacter,
  setError,
}) => {
  return (
    <>
      <Typography variant="h3" className="font-jaini-purva">
        Items
      </Typography>
      <div className="flex flex-col gap-4">
        <InventoryItems character={character} setCharacter={setCharacter} />
        <InventoryWeapons character={character} setCharacter={setCharacter} />
        <InventoryArmor character={character} setCharacter={setCharacter} />
        <InventoryShield character={character} setCharacter={setCharacter} />
        <InventoryErrors items={character.items} setError={setError} />
      </div>
    </>
  );
};

export default StepInventory;
