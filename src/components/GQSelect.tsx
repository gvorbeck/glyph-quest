import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ReactNode } from "react";

type GQSelectProps = {
  onChange: (event: SelectChangeEvent<any>, child: ReactNode) => void;
  label: string;
  value: any;
  labelId: string;
  options: { value: any; label: string }[];
  minWidthClassName?: string;
  disabled?: boolean;
};

const GQSelect: React.FC<
  GQSelectProps & React.ComponentPropsWithRef<"div">
> = ({
  onChange,
  value,
  label,
  id,
  labelId,
  options,
  minWidthClassName,
  disabled,
}) => {
  return (
    <Box className={minWidthClassName}>
      <FormControl fullWidth>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          id={id}
          value={value}
          label={label}
          onChange={onChange}
          disabled={disabled}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default GQSelect;
