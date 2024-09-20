import { Character } from "@/types/character";
import { rollTable } from "@/utils/utils";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import {
  maleFirstNames,
  femaleFirstNames,
  surnameStart,
  surnameEnd,
} from "@/data/characterNames";
import { useCharacter } from "@/context/CharacterContext";

type StepNameProps = {};

const StepName: React.FC<StepNameProps> = ({}) => {
  const { character, setCharacter } = useCharacter();
  const [name, setName] = useState<string>(character.name);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      name: e.target.value,
    }));
  };

  const handleFirstNameClick = (list: string[]) => {
    const newName = rollTable(list);
    const surname = lastName || "";
    setName(newName + (surname ? ` ${surname}` : ""));
    setFirstName(newName);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      name: newName + (surname ? ` ${surname}` : ""),
    }));
  };
  const handleSurNameClick = (list: string[]) => {
    const newSurName = rollTable(list);
    const fName = firstName || "";
    setName((fName ? `${fName} ` : "") + newSurName);
    setLastName(newSurName);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      name: (fName ? `${fName} ` : "") + newSurName,
    }));
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <TextField
        id="name-field"
        label="Name"
        variant="outlined"
        value={name}
        onChange={handleNameChange}
      />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => handleFirstNameClick(maleFirstNames)}>
          Male First Name
        </Button>
        <Button onClick={() => handleFirstNameClick(femaleFirstNames)}>
          Female First Name
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {/* <Button onClick={() => handleSurNameClick(upperclassSurnames)}>
          Upperclass Surname
        </Button>
        <Button onClick={() => handleSurNameClick(lowerclassSurnames)}>
          Lowerclass Surname
        </Button> */}
      </div>
    </div>
  );
};

export default StepName;
