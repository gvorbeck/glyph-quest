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
          {details.appearance && (
            <ListItem>
              <ListItemText
                primary={capitalize(detailsArr[0])}
                secondary={capitalize(details.appearance)}
              />
            </ListItem>
          )}
          {details.background && (
            <ListItem>
              <ListItemText
                primary={capitalize(detailsArr[1])}
                secondary={capitalize(details.background)}
              />
            </ListItem>
          )}
          {details.clothing && (
            <ListItem>
              <ListItemText
                primary={capitalize(detailsArr[2])}
                secondary={capitalize(details.clothing)}
              />
            </ListItem>
          )}
          {details.mannerism && (
            <ListItem>
              <ListItemText
                primary={capitalize(detailsArr[3])}
                secondary={capitalize(details.mannerism)}
              />
            </ListItem>
          )}
          {details.personality && (
            <ListItem>
              <ListItemText
                primary={capitalize(detailsArr[4])}
                secondary={capitalize(details.personality)}
              />
            </ListItem>
          )}
          {details.physical && (
            <ListItem>
              <ListItemText
                primary={capitalize(detailsArr[5])}
                secondary={capitalize(details.physical)}
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Grid>
  );
};

export default Description;
