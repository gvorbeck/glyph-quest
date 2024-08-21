import { Character } from "@/types/character";
import {
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)
import Stats from "./Stats";
import { Grade, Paid, TrendingUp } from "@mui/icons-material";
import { useState } from "react";
import LevelUpChoice from "./LevelUpChoice";
import SettingsIcon from "@mui/icons-material/Settings";
import GQModal from "../GQModal";
import ModalSettings from "./ModalSettings";

type HeroProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const levelThresholds = [0, 2, 6, 12, 20, 30, 42];

const Hero: React.FC<HeroProps> = ({ character, setCharacter }) => {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleSettingsOpen = () => setSettingsOpen(true);
  const handleClose = () => setOpen(false);
  const handleSettingsClose = () => setSettingsOpen(false);

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

  const handleXPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      xp: parseInt(e.target.value),
    }));
  };

  const handleGoldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      gold: parseInt(e.target.value),
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
          className="[&_input]:text-sm [&_input]:py-1"
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
          className="[&_input]:text-sm [&_input]:py-1"
          value={character.gold}
          onChange={handleGoldChange}
        />
      ),
    },
  ];

  return (
    <>
      <Grid xs={8} className="flex flex-col gap-4 relative">
        <Typography
          variant="h2"
          className="font-jaini-purva text-amber pl-4 text-7xl [text-shadow:2px_2px_#242120]"
        >
          {character.name}
        </Typography>
        <Tooltip title="Settings">
          <IconButton
            aria-label="close"
            onClick={handleSettingsOpen}
            className="absolute bottom-0 left-4 bg-darkGray"
          >
            <SettingsIcon color="primary" />
          </IconButton>
        </Tooltip>
        <GQModal
          handleClose={handleSettingsClose}
          id="settings"
          open={settingsOpen}
          title="Settings"
          width={600}
        >
          <ModalSettings character={character} setCharacter={setCharacter} />
        </GQModal>
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
