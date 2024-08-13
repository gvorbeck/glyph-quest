import { Character, Feature } from "@/types/character";
import { FEATURES } from "@/utils/constants";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";

type StepFeatureProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const getStartingFeature = (character: Character) => {
  if (character.feature?.includes("path")) {
    return FEATURES.path;
  } else {
    return character.feature;
  }
};

const StepFeature: React.FC<StepFeatureProps> = ({
  character,
  setCharacter,
}) => {
  const [feature, setFeature] = useState(getStartingFeature(character));
  const [path, setPath] = useState(character.feature);

  const onFeatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFeature(value);
    setPath(null);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      feature: [value] as Feature[],
    }));
  };

  const onPathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPath([value] as Feature[]);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      feature: [value] as Feature[],
    }));
  };

  return (
    <Box className="flex flex-col gap-4">
      <FormControl>
        <FormLabel id="feature-radio-buttons-group">Features</FormLabel>
        <RadioGroup
          aria-labelledby="feature-radio-buttons-group"
          name="radio-buttons-group"
          onChange={onFeatureChange}
          value={feature}
        >
          <FormControlLabel
            value={FEATURES.attack}
            control={<Radio />}
            label="+1 attack bonus (add 1 to all attack rolls)."
          />
          <FormControlLabel
            value={FEATURES.spell}
            control={<Radio />}
            label="1 spell slot (cast one spell per day)."
          />
          <FormControlLabel
            value={FEATURES.path}
            control={<Radio />}
            label="A single path
(gain advantage on related danger rolls)."
          />
        </RadioGroup>
      </FormControl>
      <FormControl className={feature !== FEATURES.path ? "hidden" : ""}>
        <FormLabel id="path-radio-buttons-group">Paths</FormLabel>
        <RadioGroup
          aria-labelledby="path-radio-buttons-group"
          name="radio-buttons-group"
          onChange={onPathChange}
          value={path}
        >
          <FormControlLabel
            value={FEATURES.briarborn}
            control={<Radio />}
            label="Briarborn: Tracking, foraging, survival."
          />
          <FormControlLabel
            value={FEATURES.fingersmith}
            control={<Radio />}
            label="Fingersmith: Tinkering, picking locks or pockets."
          />
          <FormControlLabel
            value={FEATURES.roofrunner}
            control={<Radio />}
            label="Roofrunner: Climbing, leaping, balancing."
          />
          <FormControlLabel
            value={FEATURES.shadowjack}
            control={<Radio />}
            label="Shadowjack: Moving silently, hiding in shadows."
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default StepFeature;
