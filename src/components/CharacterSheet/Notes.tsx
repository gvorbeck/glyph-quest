import { Character } from "@/types/character";
import { Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";

type NotesProps = {
  xs?: number;
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const Notes: React.FC<NotesProps> = ({ xs, character, setCharacter }) => {
  const [pendingNotes, setPendingNotes] = useState<Character["notes"]>(
    character.notes
  );

  const handleNotesChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setPendingNotes(value);
  };

  const handleNotesBlur = () => {
    if (pendingNotes !== character.notes) {
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        notes: pendingNotes,
      }));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNotesBlur();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [pendingNotes]);

  return (
    <Grid xs={xs}>
      <Paper className="p-4">
        <Typography variant="h3" className="font-jaini-purva">
          Notes
        </Typography>
        <TextField
          multiline
          size="small"
          className="w-full"
          minRows={5}
          maxRows={15}
          value={pendingNotes}
          onChange={handleNotesChange}
          onBlur={handleNotesBlur}
        />
      </Paper>
    </Grid>
  );
};

export default Notes;
