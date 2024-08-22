import { Box, Button, Typography } from "@mui/material";
import GQModal from "../GQModal";
import LevelUpChoice from "./LevelUpChoice";
import { Character } from "@/types/character";
import { useState } from "react";

type LevelUpProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const levelThresholds = [0, 2, 6, 12, 20, 30, 42];

const LevelUp: React.FC<LevelUpProps> = ({ character, setCharacter }) => {
  const [open, setOpen] = useState(false);
  let lvlUpBtn = false;
  if (character.xp >= levelThresholds[character.level]) {
    lvlUpBtn = true;
  }
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <div className="flex gap-2 items-center">
      <Box>{character.level}</Box>
      {lvlUpBtn && (
        <>
          <Button variant="contained" onClick={handleOpen}>
            Level Up
          </Button>
          <GQModal
            handleClose={handleClose}
            id="level-up"
            open={open}
            title={`Level Up to Level ${character.level + 1}!`}
          >
            {(character.level + 1) % 2 === 0 ? (
              <LevelUpChoice
                character={character}
                setCharacter={setCharacter}
                handleClose={handleClose}
                ability
              />
            ) : (
              <LevelUpChoice
                character={character}
                setCharacter={setCharacter}
                handleClose={handleClose}
              />
            )}
          </GQModal>
        </>
      )}
    </div>
  );
};

export default LevelUp;
