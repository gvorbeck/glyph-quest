import { Character } from "@/types/character";
import { TextField } from "@mui/material";
import { useState } from "react";

type StepNameProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const StepName: React.FC<StepNameProps> = ({ character, setCharacter }) => {
  const [name, setName] = useState<string>(character.name);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      name: e.target.value,
    }));
  };
  return (
    <TextField
      id="name-field"
      label="Name"
      variant="outlined"
      value={name}
      onChange={handleNameChange}
    />
  );
};

export default StepName;
