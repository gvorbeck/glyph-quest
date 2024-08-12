import { Location, Weapon } from "@/types/items";
import { INVENTORYLOCATIONS, WEAPONTYPES } from "@/utils/constants";
import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import InventoryLocationSelect from "./InventoryLocationSelect";

type WeaponProps = {
  id: number;
};

const Weapon: React.FC<WeaponProps> = ({ id }) => {
  const [locked, setLocked] = useState<boolean>(false);
  const [type, setType] = useState<Weapon>("light-weapon");
  const [location, setLocation] = useState<Location>("belt");

  const handleTypeChange = (event: SelectChangeEvent<Weapon>) => {
    setType(event.target.value as Weapon);
  };

  const handleLocationChange = (event: SelectChangeEvent<Location>) => {
    setLocation(event.target.value as Location);
  };
  return (
    <div className="flex gap-4">
      <TextField id={`weapon-${id}`} label="Weapon" variant="outlined" />
      <Select
        labelId="weapon-type-select-label"
        id="weapon-type-select"
        value={type}
        label="Weapon Type"
        onChange={handleTypeChange}
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
      />
    </div>
  );
};

export default Weapon;
