import { Feature } from "@/types/character";
import { getFeatureText, getFeatureTitle } from "@/utils/utils";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)
import Spells from "./Spells";

type FeaturesProps = {
  features: Feature[];
  xs?: number;
};

const Features: React.FC<FeaturesProps> = ({ features, xs }) => {
  const spellSlots = features?.reduce((acc, feature) => {
    if (feature === "spell-slot") {
      return acc + 1;
    }
    return acc;
  }, 0);
  return (
    <Grid xs={xs}>
      <Paper className="p-4">
        <Typography variant="h3">Features</Typography>
        <List>
          {features?.map((feature, index) => (
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
            <Spells />
          </div>
        )}
      </Paper>
    </Grid>
  );
};

export default Features;
