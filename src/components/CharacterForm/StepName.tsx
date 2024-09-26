import { rollTable } from "@/utils/utils";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import {
  maleFirstNames,
  femaleFirstNames,
  surnameEnd,
  surnameStart,
} from "@/data/characterNames";
import { useCharacter } from "@/context/CharacterContext";
import Text from "../Text";
import { details, mannerisms, personalities } from "@/data/characterDetails";
import GQDivider from "../GQDivider";

type StepNameProps = {};

const StepName: React.FC<StepNameProps> = ({}) => {
  const { character, setCharacter } = useCharacter();

  // Initialize states for name and character details
  const [name, setName] = useState<string>(character.name || "");
  const [personality, setPersonality] = useState<string>(
    character.details.personality || ""
  );
  const [detail, setDetail] = useState<string>(character.details.detail || "");
  const [mannerism, setMannerism] = useState<string>(
    character.details.mannerism || ""
  );

  // Helper function to handle changes in fields
  const handleFieldChange = (
    setField: React.Dispatch<React.SetStateAction<string>>,
    fieldKey: keyof typeof character.details,
    value: string
  ) => {
    setField(value);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      details: {
        ...prevCharacter.details,
        [fieldKey]: value,
      },
    }));
  };

  // Helper function to handle random generation of values
  const handleRandomClick = (
    list: string[],
    setField: React.Dispatch<React.SetStateAction<string>>,
    fieldKey: keyof typeof character.details
  ) => {
    const newValue = rollTable(list);
    setField(newValue);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      details: {
        ...prevCharacter.details,
        [fieldKey]: newValue,
      },
    }));
  };

  // Handle name changes and random generation separately
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      name: e.target.value,
    }));
  };

  const handleNameClick = (list: string[]) => {
    const newName = rollTable(list);
    const surname = rollTable(surnameStart) + rollTable(surnameEnd);
    const fullName = `${newName} ${surname}`;
    setName(fullName);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      name: fullName,
    }));
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <TextField
        id="name-field"
        label="Name"
        variant="filled"
        value={name}
        onChange={handleNameChange}
      />
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => handleNameClick(maleFirstNames)}
          variant="outlined"
        >
          Male Name
        </Button>
        <Button
          onClick={() => handleNameClick(femaleFirstNames)}
          variant="outlined"
        >
          Female Name
        </Button>
      </div>
      <div>
        <Text variant="h3" font>
          Optional
        </Text>
        <Text>Give your character some description.</Text>
      </div>

      {/* Personality Section */}
      <TextField
        id="personality-field"
        label="Personality"
        variant="filled"
        value={personality}
        onChange={(e) =>
          handleFieldChange(setPersonality, "personality", e.target.value)
        }
      />
      <Button
        variant="outlined"
        onClick={() =>
          handleRandomClick(personalities, setPersonality, "personality")
        }
      >
        Random Personality
      </Button>

      <GQDivider />

      {/* Detail Section */}
      <TextField
        id="detail-field"
        label="Detail"
        variant="filled"
        value={detail}
        onChange={(e) => handleFieldChange(setDetail, "detail", e.target.value)}
      />
      <Button
        variant="outlined"
        onClick={() => handleRandomClick(details, setDetail, "detail")}
      >
        Random Detail
      </Button>

      <GQDivider />

      {/* Mannerism Section */}
      <TextField
        id="mannerism-field"
        label="Mannerism"
        variant="filled"
        value={mannerism}
        onChange={(e) =>
          handleFieldChange(setMannerism, "mannerism", e.target.value)
        }
      />
      <Button
        variant="outlined"
        onClick={() => handleRandomClick(mannerisms, setMannerism, "mannerism")}
      >
        Random Mannerism
      </Button>
    </div>
  );
};

export default StepName;
