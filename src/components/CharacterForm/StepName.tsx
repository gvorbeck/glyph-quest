import { Character } from "@/types/character";
import { rollTable } from "@/utils/utils";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import {
  maleFirstNames,
  femaleFirstNames,
  lowerclassSurnames,
  upperclassSurnames,
} from "@/data/characterNames";

type StepNameProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const StepName: React.FC<StepNameProps> = ({ character, setCharacter }) => {
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
        <Button
          variant="contained"
          onClick={() => handleFirstNameClick(maleFirstNames)}
        >
          Male First Name
        </Button>
        <Button
          variant="contained"
          onClick={() => handleFirstNameClick(femaleFirstNames)}
        >
          Female First Name
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="contained"
          onClick={() => handleSurNameClick(upperclassSurnames)}
        >
          Upperclass Surname
        </Button>
        <Button
          variant="contained"
          onClick={() => handleSurNameClick(lowerclassSurnames)}
        >
          Lowerclass Surname
        </Button>
      </div>
    </div>
  );
};

export default StepName;
