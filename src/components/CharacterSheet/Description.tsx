import { Character } from "@/types/character";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  capitalize,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)

type DescriptionProps = {
  details: Character["details"];
  xs?: number;
};

const Description: React.FC<DescriptionProps> = ({ details, xs }) => {
  const detailsArr = Object.keys(details).sort();
  return (
    <Grid xs={xs}>
      <Paper className="p-4">
        <Typography variant="h3" className="font-jaini-purva">
          Description
        </Typography>
        <List dense>
          {details.detail && (
            <ListItem>
              <ListItemText
                primary={capitalize(detailsArr[0])}
                secondary={capitalize(details.detail ?? "")}
              />
            </ListItem>
          )}
          {details.personality && (
            <ListItem>
              <ListItemText
                primary={capitalize(detailsArr[1])}
                secondary={capitalize(details.personality)}
              />
            </ListItem>
          )}
          {details.mannerism && (
            <ListItem>
              <ListItemText
                primary={capitalize(detailsArr[2])}
                secondary={capitalize(details.mannerism)}
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Grid>
  );
};

export default Description;
