import { Item, Location, WeaponTypes } from "@/types/items";
import { Character } from "@/types/character";
import { INVENTORYLOCATIONS, WEAPONTYPES } from "@/utils/constants";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import InventoryLocationSelect from "./InventoryLocationSelect";

type WeaponProps = {
  id: number;
  weapon: Item;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const Weapon: React.FC<WeaponProps> = ({ id, weapon }) => {
  const [locked, setLocked] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<WeaponTypes>("light-weapon");
  const [location, setLocation] = useState<Location>("belt");

  const handleTypeChange = (event: SelectChangeEvent<WeaponTypes>) => {
    setType(event.target.value as WeaponTypes);
  };

  const handleLocationChange = (event: SelectChangeEvent<Location>) => {
    setLocation(event.target.value as Location);
  };

  const handleAddRemoveClick = () => {
    setLocked((prevLocked) => !preLocked);
    if (locked) {
      // Remove weapon
    } else {
      // Add weapon
      const weapon: Item = {
        hands: type === WEAPONTYPES.light.value ? 1 : 2,
        location,
        name,
        type,
        value: null,
        damage: type === WEAPONTYPES.heavy.value ? 1 : 0,
      };
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        inventory: [...prevCharacter.inventory, weapon],
      }));
    }
  };

  return (
    <div className="flex gap-4">
      <TextField
        id={`weapon-${id}`}
        label="Weapon"
        variant="outlined"
        disabled={locked}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Select
        labelId="weapon-type-select-label"
        id="weapon-type-select"
        value={type}
        label="Weapon Type"
        onChange={handleTypeChange}
        disabled={locked}
      >
        <MenuItem value={WEAPONTYPES.light.value}>
          {WEAPONTYPES.light.label}
        </MenuItem>
        <MenuItem value={WEAPONTYPES.heavy.value}>
          {WEAPONTYPES.heavy.label}
        </MenuItem>
        <MenuItem value={WEAPONTYPES.ranged.value}>
          {WEAPONTYPES.ranged.label}
        </MenuItem>
      </Select>
      <InventoryLocationSelect
        id="weapon"
        onChange={handleLocationChange}
        value={location}
        disabled={locked}
      />
      <Button
        variant="contained"
        onClick={}
        // onClick={() => setLocked(!locked)}
        disabled={name === ""}
      >
        {locked ? "Remove" : "Add"}
      </Button>
    </div>
  );
};

export default Weapon;
