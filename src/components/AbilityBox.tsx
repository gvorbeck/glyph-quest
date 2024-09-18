import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

type AbilityBoxProps = {
  value: number;
  onChange:
    | ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
  label: string;
  max?: number;
};

const AbilityBox: React.FC<AbilityBoxProps> = ({
  value,
  onChange,
  label,
  max,
}) => {
  return (
    <TextField
      label={label}
      type="number"
      variant="filled"
      InputProps={{ inputProps: { min: 0, max: max ?? 6 } }}
      InputLabelProps={{ shrink: true }}
      value={value}
      onChange={onChange}
    />
  );
};

export default AbilityBox;
