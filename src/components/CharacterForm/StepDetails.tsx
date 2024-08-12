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

const background = [
  "Alchemist",
  "Beggar-prince",
  "Blackmailer",
  "Bounty-hunter",
  "Chimney sweep",
  "Coin-clipper",
  "Contortionist",
  "Counterfeiter",
  "Cultist",
  "Cutpurse",
  "Debt-collector",
  "Deserter",
  "Fence",
  "Fortuneteller",
  "Galley slave",
  "Gambler",
  "Gravedigger",
  "Headsman",
  "Hedge knight",
  "Highwayman",
  "Housebreaker",
  "Kidnapper",
  "Mad prophet",
  "Mountebank",
  "Peddler",
  "Pit-fighter",
  "Poisoner",
  "Rat-catcher",
  "Scrivener",
  "Sellsword",
  "Slave",
  "Smuggler",
  "Street performer",
  "Tattooist",
  "Urchin",
  "Usurer",
];

const clothing = [
  "Antique",
  "Battle-torn",
  "Bedraggled",
  "Blood-stained",
  "Ceremonial",
  "Dated",
  "Decaying",
  "Eccentric",
  "Elegant",
  "Embroidered",
  "Exotic",
  "Fashionable",
  "Flamboyant",
  "Food-stained",
  "Formal",
  "Frayed",
  "Frumpy",
  "Garish",
  "Grimy",
  "Haute couture",
  "Lacey",
  "Livery",
  "Mud-stained",
  "Ostentatious",
  "Oversized",
  "Patched",
  "Patterned",
  "Perfumed",
  "Practical",
  "Rumpled",
  "Sigils",
  "Singed",
  "Tasteless",
  "Undersized",
  "Wine-stained",
  "Worn out",
];

const personality = [
  "Bitter",
  "Brave",
  "Cautious",
  "Chipper",
  "Contrary",
  "Cowardly",
  "Cunning",
  "Driven",
  "Entitled",
  "Gregarious",
  "Grumpy",
  "Heartless",
  "Honor-bound",
  "Hotheaded",
  "Inquisitive",
  "Irascible",
  "Jolly",
  "Know-it-all",
  "Lazy",
  "Loyal",
  "Menacing",
  "Mopey",
  "Nervous",
  "Protective",
  "Righteous",
  "Rude",
  "Sarcastic",
  "Savage",
  "Scheming",
  "Serene",
  "Spacey",
  "Stoic",
  "Stubborn",
  "Stuck-up",
  "Suspicious",
  "Wisecracking",
];

const mannerism = [
  "Anecdotes",
  "Breathy",
  "Chuckles",
  "Clipped",
  "Cryptic",
  "Deep voice",
  "Drawl",
  "Enunciates",
  "Flowery speech",
  "Gravelly voice",
  "Highly formal",
  "Hypnotic",
  "Interrupts",
  "Laconic",
  "Laughs",
  "Long pauses",
  "Melodious",
  "Monotone",
  "Mumbles",
  "Narrates",
  "Overly casual",
  "Quaint sayings",
  "Rambles",
  "Random facts",
  "Rapid-fire",
  "Rhyming",
  "Robotic",
  "Slow speech",
  "Speechifies",
  "Squeaky",
  "Street slang",
  "Stutters",
  "Talks to self",
  "Trails off",
  "Very loud",
  "Whispers",
];

const sections: [string, string[]][] = [
  ["Appearance", appearance],
  ["Physical", physical],
  ["Background", background],
  ["Clothing", clothing],
  ["Personality", personality],
  ["Mannerism", mannerism],
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
