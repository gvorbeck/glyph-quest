import { Character } from "@/types/character";
import {
  getFeatureText,
  getFeatureTitle,
  getSpellName,
  rollDice,
} from "@/utils/utils";
import { AutoFixHigh, Cancel } from "@mui/icons-material";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)
import { useState, useEffect } from "react";

type FeaturesProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  xs?: number;
};

const Features: React.FC<FeaturesProps> = ({ xs, character, setCharacter }) => {
  const [pendingSpellDescriptions, setPendingSpellDescriptions] = useState<
    Record<string, string>
  >({});

  const spellSlots =
    character.features?.reduce((acc, feature) => {
      if (feature === "spell-slot") {
        return acc + 1;
      }
      return acc;
    }, 0) ?? 0;

  const spellSlotsArray = Array.from({ length: spellSlots }).map((_, index) => {
    if (character.spells[index]) {
      return character.spells[index];
    } else {
      return null;
    }
  });

  const handleSpellDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { value } = event.target;
    setPendingSpellDescriptions((prev) => ({
      ...prev,
      [index.toString()]: value,
    }));
  };

  const handleSpellDescriptionBlur = (index: number) => {
    if (pendingSpellDescriptions[index.toString()]) {
      setCharacter((prevCharacter) => {
        const updatedSpells = [...prevCharacter.spells];
        const spellIndex = parseInt(index.toString(), 10);
        if (updatedSpells[spellIndex]) {
          updatedSpells[spellIndex] = {
            ...updatedSpells[spellIndex],
            description: pendingSpellDescriptions[index.toString()],
          };
        }

        return {
          ...prevCharacter,
          spells: updatedSpells,
        };
      });

      // Clear the pending description after updating character
      setPendingSpellDescriptions((prev) => {
        const { [index.toString()]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleDeleteSpellClick = (index: number) => {
    setCharacter((prevCharacter) => {
      const updatedSpells = [...prevCharacter.spells];
      updatedSpells.splice(index, 1);
      return {
        ...prevCharacter,
        spells: updatedSpells,
      };
    });
  };

  const handleSpellGenerateClick = () => {
    const spellName = getSpellName(rollDice(2, true) as number[]);
    const spells = character.spells;
    spells.push({ name: spellName, description: "" });
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      spells: [...spells],
    }));
  };

  useEffect(() => {
    const timers: Record<string, NodeJS.Timeout> = {};

    for (const index in pendingSpellDescriptions) {
      timers[index] = setTimeout(() => {
        handleSpellDescriptionBlur(parseInt(index));
      }, 5000);
    }

    return () => {
      for (const index in timers) {
        clearTimeout(timers[index]);
      }
    };
  }, [pendingSpellDescriptions]);

  return (
    <Grid xs={xs}>
      <Paper className="p-4">
        <Typography variant="h3" className="font-jaini-purva">
          Features
        </Typography>
        <List>
          {character.features?.map((feature, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={getFeatureTitle(feature)}
                secondary={getFeatureText(feature)}
              />
            </ListItem>
          ))}
        </List>
        {!!spellSlots && (
          <div>
            <Typography variant="h3">Spells</Typography>
            <List className="mt-4">
              {spellSlotsArray.map((spell, index) => (
                <ListItem key={index} className="px-0">
                  {spell ? (
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex gap-2 items-center">
                        <ListItemIcon className="min-w-min">
                          <AutoFixHigh />
                        </ListItemIcon>
                        <ListItemText primary={spell.name} />
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClick={() => handleDeleteSpellClick(index)}
                        >
                          <Cancel />
                        </IconButton>
                      </div>
                      <TextField
                        label="Description"
                        multiline
                        size="small"
                        placeholder="Enter spell description"
                        value={
                          pendingSpellDescriptions[index.toString()] ??
                          spell.description
                        }
                        onChange={(event) =>
                          handleSpellDescriptionChange(event, index)
                        }
                        onBlur={() => handleSpellDescriptionBlur(index)}
                      />
                    </div>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleSpellGenerateClick}
                    >
                      Generate Spell
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </Paper>
    </Grid>
  );
};

export default Features;
