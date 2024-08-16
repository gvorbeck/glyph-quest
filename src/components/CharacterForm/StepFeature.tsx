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
import SpellGenerator from "./SpellGenerator";
import GQRadioGroup from "../GQRadioGroup";

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
      spells: [],
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

  const features = [
    {
      value: FEATURES.attack,
      label: "+1 attack bonus (add 1 to all attack rolls).",
    },
    {
      value: FEATURES.spell,
      label: "1 spell slot (cast one spell per day).",
    },
    {
      value: FEATURES.path,
      label: "A single path (gain advantage on related danger rolls).",
    },
  ];

  const paths = [
    {
      value: FEATURES.briarborn,
      label: "Briarborn: Tracking, foraging, survival.",
    },
    {
      value: FEATURES.fingersmith,
      label: "Fingersmith: Tinkering, picking locks or pockets.",
    },
    {
      value: FEATURES.roofrunner,
      label: "Roofrunner: Climbing, leaping, balancing.",
    },
    {
      value: FEATURES.shadowjack,
      label: "Shadowjack: Moving silently, hiding in shadows.",
    },
  ];

  const radioGroups = [
    {
      id: "feature",
      label: "Features",
      onChange: onFeatureChange,
      value: feature,
      options: features,
      className: "",
    },
    {
      id: "path",
      label: "Paths",
      onChange: onPathChange,
      value: path,
      options: paths,
      className: feature !== FEATURES.path ? "hidden" : "",
    },
  ];

  return (
    <Box className="flex flex-col gap-4">
      {radioGroups.map((radioGroup) => (
        <GQRadioGroup
          id={radioGroup.id}
          key={radioGroup.id}
          label={radioGroup.label}
          onChange={radioGroup.onChange}
          options={radioGroup.options}
          value={radioGroup.value}
          className={radioGroup.className}
        />
      ))}
      {character.feature?.[0] === "spell-slot" && (
        <SpellGenerator
          instruction="Generate your first spell."
          character={character}
          setCharacter={setCharacter}
        />
      )}
    </Box>
  );
};

export default StepFeature;
