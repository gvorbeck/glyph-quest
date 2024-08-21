import { Character } from "@/types/character";
import { SelectChangeEvent, Typography } from "@mui/material";
import InventoryLocationSelect from "../InventoryLocationSelect";
import { ITEMTYPES } from "@/utils/constants";
import { Location } from "@/types/items";

type InventoryShieldProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const InventoryShield: React.FC<InventoryShieldProps> = ({
  character,
  setCharacter,
}) => {
  const shield = character.items.find(
    (item) => item.type === ITEMTYPES.shield.value
  );

  const handleShieldLocationChange = (event: SelectChangeEvent<Location>) => {
    const shieldIndex = character.items.findIndex(
      (item) => item.type === ITEMTYPES.shield.value
    );
    if (shieldIndex !== -1) {
      const updatedArmor = {
        ...character.items[shieldIndex],
        location: event.target.value as Location,
      };
      const updatedItems = [
        ...character.items.slice(0, shieldIndex),
        updatedArmor,
        ...character.items.slice(shieldIndex + 1),
      ];
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        items: updatedItems,
      }));
    }
  };
  return (
    <div className="flex flex-col gap-4 items-start">
      <div>
        <Typography variant="h3" className="font-jaini-purva">
          {ITEMTYPES.shield.label}
        </Typography>
        <Typography variant="body1">
          PCs start with a shield (+1 armor, 1 hands). Select where it is
          located.
        </Typography>
      </div>
      <InventoryLocationSelect
        id={ITEMTYPES.shield.label}
        value={shield?.location}
        onChange={handleShieldLocationChange}
      />
    </div>
  );
};

export default InventoryShield;
