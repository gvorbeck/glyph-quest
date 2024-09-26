import { TextField } from "@mui/material";
import React, { useRef } from "react";

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
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current) {
      inputRef.current.blur(); // Blur the input on "Enter" key press
    }
  };

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
      inputRef={inputRef} // Assign ref to the input element
      onKeyDown={handleKeyDown} // Handle "Enter" key press
    />
  );
};

export default AbilityBox;
