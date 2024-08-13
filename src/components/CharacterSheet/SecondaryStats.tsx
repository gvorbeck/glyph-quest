import { Character } from "@/types/character";
import { getArmorRating, getAttackBonus } from "@/utils/utils";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)

type SecondaryStatsProps = {
  character: Character;
  xs?: number;
};

const SecondaryStats: React.FC<SecondaryStatsProps> = ({ character, xs }) => {
  return (
    <Grid xs={xs}>
      <Paper className="p-4">
        <List>
          <ListItem>
            <ListItemText
              primary="Attack"
              secondary={`+${getAttackBonus(character)}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Armor"
              secondary={getArmorRating(character)}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Health" secondary={character.health} />
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
};

export default SecondaryStats;
