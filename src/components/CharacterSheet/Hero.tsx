import { Character } from "@/types/character";
import { Box, Button, Drawer, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Text from "../Text";
import { LEVELS } from "@/utils/constants";
import SettingsDrawer from "./SettingsDrawer";

type HeroProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Hero: React.FC<HeroProps & React.ComponentPropsWithRef<"div">> = ({
  character,
  setCharacter,
  className,
  drawerOpen,
  setDrawerOpen,
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const classNames = ["relative", className].filter(Boolean).join(" ");

  const toggleDrawerOpen = () => {
    setDrawerOpen((prevDrawerOpen) => !prevDrawerOpen);
  };

  return (
    <Box className={classNames}>
      <Text
        variant="h2"
        className="text-amber text-7xl [text-shadow:2px_2px_#242120] pb-14 truncate"
        font
      >
        {character.name}
      </Text>
      <div className="absolute bottom-0 -left-2 flex items-center gap-4">
        <Tooltip title="Settings">
          <IconButton
            aria-label="close"
            onClick={toggleDrawerOpen}
            className="bg-darkGray"
          >
            <SettingsIcon color="primary" className="w-10 h-10" />
          </IconButton>
        </Tooltip>
        <Drawer open={drawerOpen} onClose={toggleDrawerOpen}>
          <SettingsDrawer
            setCharacter={setCharacter}
            toggleDrawerOpen={toggleDrawerOpen}
            character={character}
          />
        </Drawer>
        {character.xp >= LEVELS[character.level] && (
          <Button variant="contained">Level up</Button>
        )}
      </div>
    </Box>
  );
};

export default Hero;
