import { Character } from "@/types/character";
import { IconButton, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import GQModal from "../GQModal";
import ModalSettings from "./ModalSettings";
import Text from "../Text";

type HeroProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const Hero: React.FC<HeroProps> = ({ character, setCharacter }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSettingsOpen = () => setSettingsOpen(true);
  const handleSettingsClose = () => setSettingsOpen(false);

  return (
    <>
      <Grid xs={12} className="relative">
        <Text
          level="h2"
          className="text-amber pl-4 text-7xl [text-shadow:2px_2px_#242120] h-[300px]"
          font
        >
          {character.name}
        </Text>
        <Tooltip title="Settings">
          <IconButton
            aria-label="close"
            onClick={handleSettingsOpen}
            className="absolute bottom-0 left-4 bg-darkGray"
          >
            <SettingsIcon color="primary" className="w-10 h-10" />
          </IconButton>
        </Tooltip>
        <GQModal
          handleClose={handleSettingsClose}
          id="settings"
          open={settingsOpen}
          title="Settings"
          // width={600}
        >
          <ModalSettings character={character} setCharacter={setCharacter} />
        </GQModal>
      </Grid>
    </>
  );
};

export default Hero;
