import { Character } from "@/types/character";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type StepDetailsProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const appearance = [
  "Aquiline",
  "Athletic",
  "Barrel-Chested",
  "Boney",
  "Brawny",
  "Brutish",
  "Bullnecked",
  "Chiseled",
  "Coltish",
  "Corpulent",
  "Craggy",
  "Delicate",
  "Furrowed",
  "Gaunt",
  "Gorgeous",
  "Grizzled",
  "Haggard",
  "Handsome",
  "Hideous",
  "Lanky",
  "Pudgy",
  "Ripped",
  "Rosy",
  "Scrawny",
  "Sinewy",
  "Slender",
  "Slumped",
  "Solid",
  "Square-Jawed",
  "Statuesque",
  "Towering",
  "Trim",
  "Weathered",
  "Willowy",
  "Wiry",
  "Wrinkled",
];

const physical = [
  "Acid scars",
  "Battle scars",
  "Birthmark",
  "Braided hair",
  "Brand mark",
  "Broken nose",
  "Bronze skinned",
  "Burn scars",
  "Bushy eyebrows",
  "Curly hair",
  "Dark skinned",
  "Dreadlocks",
  "Exotic accent",
  "Flogging scars",
  "Freckles",
  "Gold tooth",
  "Hoarse voice",
  "Huge beard",
  "Long hair",
  "Matted hair",
  "Missing ear",
  "Missing teeth",
  "Mustache",
  "Muttonchops",
  "Nine fingers",
  "Oiled hair",
  "One-eyed",
  "Pale skinned",
  "Piercings",
  "Ritual scars",
  "Sallow skin",
  "Shaved head",
  "Sunburned",
  "Tangled hair",
  "Tattoos",
  "Topknot",
];

const sections: [string, string[]][] = [
  ["Appearance", appearance],
  ["Physical", physical],
];

const StepDetails: React.FC<StepDetailsProps> = () => {
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );

  const [selectedRadio, setSelectedRadio] = useState<Record<string, string>>(
    {}
  );

  const handleRandomizeClick = (
    sectionItems: string[],
    sectionName: string
  ) => {
    const randomValue =
      sectionItems[
        Math.floor(Math.random() * sectionItems.length)
      ].toLowerCase();
    setSelectedValues((prev) => ({
      ...prev,
      [sectionName]: randomValue,
    }));
  };

  const handleChange = (
    sectionName: string,
    event: SelectChangeEvent<string>
  ) => {
    setSelectedValues((prev) => ({
      ...prev,
      [sectionName]: event.target.value,
    }));
  };

  const handleRadioChange = (
    sectionName: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedRadio((prev) => ({
      ...prev,
      [sectionName]: event.target.value,
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      {sections.map(([sectionName, sectionItems]) => (
        <FormControl key={sectionName}>
          <FormLabel
            id={`${sectionName.toLowerCase()}-radio-buttons-group-label`}
          >
            {sectionName}
          </FormLabel>
          <RadioGroup
            aria-labelledby={`${sectionName.toLowerCase()}-radio-buttons-group-label`}
            defaultValue="random"
            name={`${sectionName.toLowerCase()}-radio-buttons-group`}
            className="flex flex-col gap-4"
            onChange={(e) => handleRadioChange(sectionName.toLowerCase(), e)}
          >
            <FormControlLabel
              value="random"
              control={<Radio />}
              label={
                <div className="flex items-center gap-4">
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleRandomizeClick(
                        sectionItems,
                        sectionName.toLowerCase()
                      )
                    }
                    disabled={
                      selectedRadio[sectionName.toLowerCase()] !== "random"
                    }
                  >
                    Randomize
                  </Button>
                  <FormControl>
                    <InputLabel
                      id={`${sectionName.toLowerCase()}-select-label`}
                    >
                      {sectionName}
                    </InputLabel>
                    <Select
                      labelId={`${sectionName.toLowerCase()}-select-label`}
                      id={`${sectionName.toLowerCase()}-select`}
                      value={selectedValues[sectionName.toLowerCase()] || ""}
                      label={sectionName}
                      onChange={(e) =>
                        handleChange(sectionName.toLowerCase(), e)
                      }
                      disabled={
                        selectedRadio[sectionName.toLowerCase()] !== "random"
                      }
                    >
                      {sectionItems.map((item) => (
                        <MenuItem key={item} value={item.toLowerCase()}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              }
            />
            <FormControlLabel
              value="manual"
              control={<Radio />}
              label={
                <TextField
                  label="Manual"
                  disabled={
                    selectedRadio[sectionName.toLowerCase()] !== "manual"
                  }
                />
              }
            />
          </RadioGroup>
        </FormControl>
      ))}
    </div>
  );
};

export default StepDetails;
