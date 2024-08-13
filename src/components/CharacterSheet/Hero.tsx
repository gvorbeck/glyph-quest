import { Character } from "@/types/character";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)

type HeroProps = {
  character: Character;
};

const Hero: React.FC<HeroProps> = ({ character }) => {
  return (
    <>
      <Grid xs={8} className="flex flex-col gap-4">
        <Typography variant="h2">{character.name}</Typography>
      </Grid>
      <Grid xs={4}>
        <Paper className="p-4">
          <List>
            <ListItem>
              <ListItemText primary="Level" secondary={character.level} />
            </ListItem>
            <ListItem>
              <ListItemText primary="XP" secondary={character.xp} />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </>
  );
};

export default Hero;
