import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type GQRadioGroupProps = {
  id: string;
  options: { value: string; label: string }[];
  label?: string;
  defaultValue?: string;
  value: string | number | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const GQRadioGroup: React.FC<GQRadioGroupProps> = ({
  id,
  label,
  defaultValue,
  options,
  value,
  onChange,
}) => {
  return (
    <FormControl>
      {label && (
        <FormLabel id={`${id}-radio-buttons-group-label`}>{label}</FormLabel>
      )}
      <RadioGroup
        aria-labelledby={label ? `${id}-radio-buttons-group-label` : undefined}
        defaultValue={defaultValue ? defaultValue : undefined}
        name={`${id}-radio-buttons-group`}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default GQRadioGroup;
