import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)

type Stat = {
  icon?: React.ReactNode;
  primary: string;
  secondary: number | string | null;
};

type StatsProps = {
  stats: Stat[];
  xs?: number;
};

const Stats: React.FC<StatsProps> = ({ xs, stats }) => {
  return (
    <Grid xs={xs}>
      <Paper className="p-4">
        <List>
          {stats.map((stat, index) => (
            <ListItem key={index}>
              {stat.icon && <ListItemIcon>{stat.icon}</ListItemIcon>}
              <ListItemText primary={stat.primary} secondary={stat.secondary} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  );
};

export default Stats;
