import { Feature } from "@/types/character";
import { getFeatureText, getFeatureTitle } from "@/utils/utils";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)

type FeaturesProps = {
  features: Feature[];
  xs?: number;
};

const Features: React.FC<FeaturesProps> = ({ features, xs }) => {
  return (
    <Grid xs={xs}>
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
    </Grid>
  );
};

export default Features;
