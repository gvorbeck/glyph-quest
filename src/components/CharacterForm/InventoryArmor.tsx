import { Character } from "@/types/character";
import { getWornArmor } from "@/utils/utils";
import { SelectChangeEvent, TextField, Typography } from "@mui/material";
import InventoryLocationSelect from "./InventoryLocationSelect";
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

  const handleArmorLocationChange = (event: SelectChangeEvent<string>) => {
    const armor = character.items.find((item) => item.type === "armor");
    const otherItems = character.items.filter((item) => item.type !== "armor");
    if (armor) {
      armor.location = event.target.value as Location;
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        items: [...otherItems, armor],
      }));
    }
  };

  const handleArmorNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const armor = character.items.find((item) => item.type === "armor");
    const otherItems = character.items.filter((item) => item.type !== "armor");
    if (armor) {
      armor.name = event.target.value;
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        items: [...otherItems, armor],
      }));
    }
  };

  return (
    <div>
      <Typography variant="h3">Armor</Typography>
      <Typography variant="body1">
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
