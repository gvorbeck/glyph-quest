import { Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)

type GQDividerProps = {};

const GQDivider: React.FC<GQDividerProps> = () => {
  return (
    <Grid xs={12}>
      <Divider />
    </Grid>
  );
};

export default GQDivider;
