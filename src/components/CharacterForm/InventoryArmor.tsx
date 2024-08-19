import { Character } from "@/types/character";
import { getWornArmor } from "@/utils/utils";
import { SelectChangeEvent, TextField, Typography } from "@mui/material";
import InventoryLocationSelect from "../InventoryLocationSelect";
import { INVENTORYLOCATIONS } from "@/utils/constants";
import { Location } from "@/types/items";

type InventoryArmorProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const InventoryArmor: React.FC<InventoryArmorProps> = ({
  character,
  setCharacter,
}) => {
  const armor = getWornArmor(character.items);

  const handleArmorLocationChange = (event: SelectChangeEvent<Location>) => {
    const armorIndex = character.items.findIndex(
      (item) => item.type === "armor"
    );
    if (armorIndex !== -1) {
      const updatedArmor = {
        ...character.items[armorIndex],
        location: event.target.value as Location,
      };

      const updatedItems = [
        ...character.items.slice(0, armorIndex),
        updatedArmor,
        ...character.items.slice(armorIndex + 1),
      ];

      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        items: updatedItems,
      }));
    }
  };

  const handleArmorNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const armorIndex = character.items.findIndex(
      (item) => item.type === "armor"
    );
    if (armorIndex !== -1) {
      const updatedArmor = {
        ...character.items[armorIndex],
        name: event.target.value,
      };

      const updatedItems = [
        ...character.items.slice(0, armorIndex),
        updatedArmor,
        ...character.items.slice(armorIndex + 1),
      ];

      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        items: updatedItems,
      }));
    }
  };

  return (
    <div>
      <Typography variant="h3" className="font-jaini-purva">
        Armor
      </Typography>
      <Typography variant="body1" className="mb-4">
        PCs start with light armor (+1 armor) and a shield (+1 armor, 1 hand).
        Characters have a base armor rating of 6. Wearing light armor increases
        it to 7, and holding a shield in one hand increases it to 8.
      </Typography>
      <div className="flex gap-4">
        <TextField
          id="outlined-basic"
          label="Light Armor"
          variant="outlined"
          value={armor?.name || ""}
          onChange={handleArmorNameChange}
        />
        <InventoryLocationSelect
          id="armor"
          value={armor?.location || INVENTORYLOCATIONS.worn.value}
          onChange={handleArmorLocationChange}
        />
      </div>
    </div>
  );
};

export default InventoryArmor;
