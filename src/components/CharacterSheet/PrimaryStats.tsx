import { Character } from "@/types/character";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)

type PrimaryStatsProps = {
  character: Character;
  xs?: number;
};

const PrimaryStats: React.FC<PrimaryStatsProps> = ({ character, xs }) => {
  return (
    <Grid xs={xs}>
      <Paper className="p-4">
        <List>
          <ListItem>
            <ListItemText
              primary={character.abilities.str.short}
              secondary={character.abilities.str.value}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={character.abilities.dex.short}
              secondary={character.abilities.dex.value}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={character.abilities.wil.short}
              secondary={character.abilities.wil.value}
            />
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
};

export default PrimaryStats;
