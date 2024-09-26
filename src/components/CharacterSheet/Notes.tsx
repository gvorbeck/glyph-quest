import { Character } from "@/types/character";
import { Box, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import Text from "../Text";

type NotesProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const Notes: React.FC<NotesProps & React.ComponentPropsWithRef<"div">> = ({
  character,
  setCharacter,
  className,
}) => {
  const [charNotes, setCharNotes] = useState<Character["notes"]>(
    character.notes
  );

  const classNames = [
    "flex flex-col gap-2 bg-darkGray/75 p-2 rounded",
    className,
  ].join(" ");

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharNotes(e.target.value);
  };

  const handleNotesBlur = () => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      notes: charNotes,
    }));
  };

  return (
    <Box className={classNames}>
      <div className="flex flex-col gap-1">
        <Text variant="h3" font className="text-3xl">
          Notes
        </Text>
        <Text variant="caption">Click away from notes to save.</Text>
      </div>
      <TextField
        multiline
        size="small"
        className="w-full"
        minRows={5}
        maxRows={15}
        value={charNotes}
        onChange={handleNotesChange}
        onBlur={handleNotesBlur}
        variant="filled"
      />
    </Box>
  );
};

export default Notes;
