import { Character } from "@/types/character";
import Text from "../Text";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import SettingsBackground from "./SettingsBackground";

type SettingsDrawerProps = {
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  toggleDrawerOpen: () => void;
  character: Character;
};

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  setCharacter,
  toggleDrawerOpen,
  character,
}) => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <Text font variant="h3">
          Settings
        </Text>
        <IconButton color="primary" onClick={toggleDrawerOpen}>
          <CloseIcon />
        </IconButton>
      </div>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-bg-img-content"
            id="panel-bg-img-header"
          >
            Background Image
          </AccordionSummary>
          <AccordionDetails>
            <SettingsBackground
              setCharacter={setCharacter}
              character={character}
            />
          </AccordionDetails>
          {/* <AccordionActions>
            <Button>Cancel</Button>
            <Button>Agree</Button>
          </AccordionActions> */}
        </Accordion>
      </div>
    </div>
  );
};

export default SettingsDrawer;
