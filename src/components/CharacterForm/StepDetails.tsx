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
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import GQRadioGroup from "../GQRadioGroup";
import { rollTable } from "@/utils/utils";

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

const StepDetails: React.FC<StepDetailsProps> = ({
  character,
  setCharacter,
}) => {
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );
  const [customValues, setCustomValues] = useState<Record<string, string>>({});
  const [selectedRadio, setSelectedRadio] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      details: {
        appearance:
          customValues.appearance || selectedValues.appearance || null,
        physical: customValues.physical || selectedValues.physical || null,
        background:
          customValues.background || selectedValues.background || null,
        clothing: customValues.clothing || selectedValues.clothing || null,
        mannerism: customValues.mannerism || selectedValues.mannerism || null,
        personality:
          customValues.personality || selectedValues.personality || null,
      },
    }));
  }, [selectedValues, customValues]);

  const handleRandomizeClick = (
    sectionItems: string[],
    sectionName: string
  ) => {
    const randomValue = rollTable(sectionItems).toLowerCase();
    setSelectedValues((prev) => ({
      ...prev,
      [sectionName]: randomValue,
    }));
    setCustomValues((prev) => ({
      ...prev,
      [sectionName]: "",
    }));
  };

  const handleSelectChange = (
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

  const handleTextFieldChange = (
    sectionName: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCustomValues((prev) => ({
      ...prev,
      [sectionName]: event.target.value,
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      {sections.map(([sectionName, sectionItems]) => (
        <GQRadioGroup
          id={sectionName.toLowerCase()}
          className="[&>div]:flex [&>div]:flex-col [&>div]:gap-4"
          key={sectionName}
          label={sectionName}
          defaultValue="random"
          value={null}
          onChange={(e) => handleRadioChange(sectionName.toLowerCase(), e)}
          options={[
            {
              value: "random",
              label: (
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
                      selectedRadio[sectionName.toLowerCase()] === "manual"
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
                        handleSelectChange(sectionName.toLowerCase(), e)
                      }
                      disabled={
                        selectedRadio[sectionName.toLowerCase()] === "manual"
                      }
                      className="min-w-[100px]"
                    >
                      {sectionItems.map((item) => (
                        <MenuItem key={item} value={item.toLowerCase()}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ),
            },
            {
              value: "manual",
              label: (
                <TextField
                  label="Manual"
                  value={customValues[sectionName.toLowerCase()] || ""}
                  onChange={(e) =>
                    handleTextFieldChange(sectionName.toLowerCase(), e)
                  }
                  disabled={
                    selectedRadio[sectionName.toLowerCase()] !== "manual"
                  }
                />
              ),
            },
          ]}
        />
      ))}
    </div>
  );
};

export default StepDetails;
