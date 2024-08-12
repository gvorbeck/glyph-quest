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
  TextField,
  Typography,
} from "@mui/material";

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
  const handleRandomizeClick = (section: string[]) => {
    console.log(section);
  };
  return (
    <div className="flex flex-col gap-8">
      {sections.map((section) => (
        <FormControl>
          <FormLabel
            id={`${section[0].toLowerCase()}-radio-buttons-group-label`}
          >
            {section[0]}
          </FormLabel>
          <RadioGroup
            aria-labelledby={`${section[0].toLowerCase()}-radio-buttons-group-label`}
            defaultValue="random"
            name="radio-buttons-group"
            className="flex flex-col gap-4"
          >
            <FormControlLabel
              value="random"
              control={<Radio />}
              label={
                <div className="flex items-center gap-4">
                  <Button
                    variant="contained"
                    onClick={() => handleRandomizeClick(section[1])}
                  >
                    Randomize
                  </Button>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                      {section[0]}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={section[1]}
                      label={section[0]}
                      // onChange={handleChange}
                    >
                      {section[1].map((item) => (
                        <MenuItem value={item.toLowerCase()}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              }
            />
            <FormControlLabel
              value="manual"
              control={<Radio />}
              label={<TextField label="Manual" />}
            />
          </RadioGroup>
        </FormControl>
      ))}
    </div>
  );
};

export default StepDetails;
