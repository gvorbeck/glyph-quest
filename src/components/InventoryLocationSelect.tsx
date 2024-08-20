import { Location } from "@/types/items";
import { INVENTORYLOCATIONS } from "@/utils/constants";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

type InventoryLocationSelectProps = {
  id: string;
  value: any;
  onChange: (event: SelectChangeEvent<Location>) => void;
  disabled?: boolean;
};

const InventoryLocationSelect: React.FC<InventoryLocationSelectProps> = ({
  id,
  value,
  onChange,
  disabled,
}) => {
  return (
    <>
      <Select
        id={`${id}-location-select`}
        value={value}
        label="Location"
        onChange={onChange}
        disabled={disabled}
        size="small"
      >
        <MenuItem value={INVENTORYLOCATIONS.hands.value as string}>
          {INVENTORYLOCATIONS.hands.label}
        </MenuItem>
        <MenuItem value={INVENTORYLOCATIONS.belt.value as string}>
          {INVENTORYLOCATIONS.belt.label}
        </MenuItem>
        <MenuItem value={INVENTORYLOCATIONS.worn.value as string}>
          {INVENTORYLOCATIONS.worn.label}
        </MenuItem>
        <MenuItem value={INVENTORYLOCATIONS.backpack.value as string}>
          {INVENTORYLOCATIONS.backpack.label}
        </MenuItem>
      </Select>
    </>
  );
};

export default InventoryLocationSelect;
