import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type GQRadioGroupProps = {
  id: string;
  onChange: (event: any) => void;
  options: { value: string; label: any }[];
  value: string | number | null;
  defaultValue?: string;
  label?: string;
};

const GQRadioGroup: React.FC<
  GQRadioGroupProps & React.ComponentPropsWithRef<"div">
> = ({ id, label, defaultValue, options, value, onChange, className }) => {
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
        className={className}
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
