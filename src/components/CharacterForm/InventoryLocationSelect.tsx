import { Location } from "@/types/items";
import { INVENTORYLOCATIONS } from "@/utils/constants";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

type InventoryLocationSelectProps = {
  id: string;
  value: string;
  onChange: (event: SelectChangeEvent<Location>) => void;
};

const InventoryLocationSelect: React.FC<InventoryLocationSelectProps> = ({
  id,
  value,
  onChange,
}) => {
  return (
    <>
      <Select
        id={`${id}-location-select`}
        value={value}
        label="Location"
        onChange={onChange}
      >
        <MenuItem value={INVENTORYLOCATIONS.hands.value}>
          {INVENTORYLOCATIONS.hands.label}
        </MenuItem>
        <MenuItem value={INVENTORYLOCATIONS.belt.value}>
          {INVENTORYLOCATIONS.belt.label}
        </MenuItem>
        <MenuItem value={INVENTORYLOCATIONS.worn.value}>
          {INVENTORYLOCATIONS.worn.label}
        </MenuItem>
        <MenuItem value={INVENTORYLOCATIONS.backpack.value}>
          {INVENTORYLOCATIONS.backpack.label}
        </MenuItem>
      </Select>
    </>
  );
};

export default InventoryLocationSelect;
