import { TextField } from "@mui/material";

type AbilityBoxProps = {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  max?: number;
  className?: string;
  disabled?: boolean;
  onBlur?: () => void;
};

const AbilityBox: React.FC<AbilityBoxProps> = ({
  value,
  onChange,
  label,
  max,
  className,
  disabled,
  onBlur,
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
      className={className}
      disabled={disabled}
      onBlur={onBlur}
    />
  );
};

export default AbilityBox;
