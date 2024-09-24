import { Character } from "@/types/character";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import GQModal from "../GQModal";
import ModalSettings from "./ModalSettings";
import Text from "../Text";

type HeroProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const Hero: React.FC<HeroProps & React.ComponentPropsWithRef<"div">> = ({
  character,
  setCharacter,
  className,
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const classNames = ["relative", className].filter(Boolean).join(" ");

  const handleSettingsOpen = () => setSettingsOpen(true);
  const handleSettingsClose = () => setSettingsOpen(false);

  return (
    <Box className={classNames}>
      <Text
        variant="h2"
        className="text-amber text-7xl [text-shadow:2px_2px_#242120] pb-14"
        font
      >
        {character.name}
      </Text>
      <Tooltip title="Settings">
        <IconButton
          aria-label="close"
          onClick={handleSettingsOpen}
          className="absolute bottom-0 -left-2 bg-darkGray"
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
    </Box>
  );
};

export default Hero;
