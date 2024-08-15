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
  secondary: any;
};

type StatsProps = {
  stats: Stat[];
  xs?: number;
  className?: string;
};

const Stats: React.FC<StatsProps> = ({ xs, stats, className }) => {
  return (
    <Grid xs={xs} className={className}>
      <Paper className="p-4">
        <List>
          {stats.map((stat, index) => (
            <ListItem key={index}>
              {stat.icon && (
                <ListItemIcon className="[&_svg]:fill-amber">
                  {stat.icon}
                </ListItemIcon>
              )}
              <ListItemText primary={stat.primary} secondary={stat.secondary} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  );
};

export default Stats;
