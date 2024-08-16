import { Character } from "@/types/character";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)
import Stats from "./Stats";
import { Grade, Paid, TrendingUp } from "@mui/icons-material";
import { useState } from "react";
import LevelUpAbility from "./LevelUpAbility";
import LevelUpChoice from "./LevelUpChoice";

type HeroProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const levelThresholds = [0, 2, 6, 12, 20, 30, 42];

/**
 * ! Turn this into tailwindcss classes
 */
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Hero: React.FC<HeroProps> = ({ character, setCharacter }) => {
  const [open, setOpen] = useState(false);
  const [lvlUpContent, setLvlUpContent] = useState<{
    payload: Character | null;
    ability: keyof Character["abilities"] | null;
  }>({
    payload: null,
    ability: null,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const LevelUp = () => {
    let lvlUpBtn = false;
    if (character.xp >= levelThresholds[character.level]) {
      lvlUpBtn = true;
    }
    return (
      <div className="flex gap-2 items-center">
        <Typography variant="body2">{character.level}</Typography>
        {lvlUpBtn && (
          <>
            <Button variant="contained" onClick={handleOpen}>
              Level Up
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="level-up-modal-title"
              aria-describedby="level-up-modal-description"
            >
              <Box sx={style} className="flex flex-col gap-4">
                <Typography
                  id="level-up-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Level Up to Level {character.level + 1}!
                </Typography>
                {(character.level + 1) % 2 === 0 ? (
                  <LevelUpChoice
                    character={character}
                    setCharacter={setCharacter}
                    ability
                  />
                ) : (
                  <LevelUpChoice
                    character={character}
                    setCharacter={setCharacter}
                  />
                )}
                {/* <Button
                  variant="contained"
                  onClick={() => {
                    if (lvlUpContent.payload) {
                      setCharacter(lvlUpContent.payload);
                      handleClose();
                    }
                  }}
                >
                  Level Up
                </Button> */}
              </Box>
            </Modal>
          </>
        )}
      </div>
    );
  };

  const handleXPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      xp: parseInt(e.target.value),
    }));
  };

  const stats = [
    {
      icon: <Grade />,
      primary: "Level",
      secondary: <LevelUp />,
    },
    {
      icon: <TrendingUp />,
      primary: "XP",
      secondary: (
        <TextField
          size="small"
          type="number"
          className="[&_input]:!text-sm [&_input]:py-1"
          value={character.xp}
          onChange={handleXPChange}
        />
      ),
    },
    {
      icon: <Paid />,
      primary: "Gold",
      secondary: (
        <TextField
          size="small"
          type="number"
          className="[&_input]:!text-sm [&_input]:py-1"
          value={character.gold}
        />
      ),
    },
  ];

  return (
    <>
      <Grid xs={8} className="flex flex-col gap-4">
        <Typography
          variant="h2"
          className="font-jaini-purva text-amber pl-4 text-7xl [text-shadow:2px_2px_black]"
        >
          {character.name}
        </Typography>
      </Grid>
      <Stats
        xs={4}
        stats={stats}
        className="[&>div]:bg-[rgba(18,_18,_18,_0.85)]"
      />
    </>
  );
};

export default Hero;
