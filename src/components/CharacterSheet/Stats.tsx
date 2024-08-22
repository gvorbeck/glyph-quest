import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Typography,
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
};

const Stats: React.FC<StatsProps & React.ComponentPropsWithRef<"div">> = ({
  xs,
  stats,
  className,
}) => {
  return (
    <Grid xs={xs} className={className}>
      <Paper className="bg-[rgba(18,_18,_18,_0.85)]">
        <List>
          {stats.map((stat, index) => (
            <ListItem key={index} className="items-start">
              {stat.icon && (
                <ListItemIcon className="[&_svg]:fill-amber mt-3">
                  {stat.icon}
                </ListItemIcon>
              )}
              <div className="flex flex-col gap-2">
                <Typography variant="body1">{stat.primary}</Typography>
                <Box typography="body2" className="[&_p]:opacity-70">
                  {stat.secondary}
                </Box>
              </div>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  );
};

export default Stats;
