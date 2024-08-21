import { Character } from "@/types/character";
import { Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";

type NotesProps = {
  xs?: number;
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const Notes: React.FC<NotesProps> = ({ xs, character, setCharacter }) => {
  const [notes, setNotes] = useState<Character["notes"]>(character.notes);

  const handleNotesChange = () => {};
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
          value={notes}
          onChange={handleNotesChange}
        />
      </Paper>
    </Grid>
  );
};

export default Notes;
