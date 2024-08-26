import useSnackbar from "@/hooks/useSnackbar";
import { rollDice } from "@/utils/utils";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)
import CopySnackbarAction from "../SnackbarActions/CopySnackbarAction";
import { FlashOn } from "@mui/icons-material";

type Stat = {
  icon?: React.ReactNode;
  primary: string;
  secondary: any;
  button?: boolean;
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
  const { snackbar, showSnackbar } = useSnackbar();

  const handleDangerRoll = (statValue: number, statName: string) => {
    const rollString = (rolls: number[]) => rolls.join(", ");
    const rollTotal = (rolls: number[]) => rolls.reduce((a, b) => a + b, 0);
    const rollMessage = (
      rollName: string,
      rollFormula: string,
      rollArray: string,
      total: number
    ) =>
      `${rollName} Roll (${rollFormula}): [${rollArray}] + ${statValue} = ${total}`;

    const abilityRoll = rollDice(2, true) as number[];
    const abilityRollString = rollString(abilityRoll);
    const abilityRollTotal = rollTotal(abilityRoll) + statValue;
    const message = rollMessage(
      `${statName} Danger`,
      `2d6+${statValue}`,
      abilityRollString,
      abilityRollTotal
    );

    const advantageRoll = rollDice(3, true) as number[];
    const removedDie = advantageRoll.sort().shift();
    const advantageRollString = rollString(advantageRoll);
    const advantageRollTotal = rollTotal(advantageRoll) + statValue;

    // JSX message for the Snackbar with the removed die crossed out
    const advantageMessageJSX = (
      <span>
        {statName} Danger Roll w/Advantage (3d6+{statValue}): [
        <s>{removedDie}</s>, {advantageRollString}] + {statValue} ={" "}
        {advantageRollTotal}
      </span>
    );

    // Plain text message for copying to the clipboard
    const advantageMessageText = `${statName} Danger Roll w/Advantage (3d6+${statValue}): [${removedDie}, ${advantageRollString}] + ${statValue} = ${advantageRollTotal}`;

    showSnackbar(
      message,
      "info",
      <>
        <CopySnackbarAction message={message} />
        <IconButton
          color="inherit"
          size="small"
          onClick={() => {
            showSnackbar(
              advantageMessageJSX,
              "info",
              <CopySnackbarAction message={advantageMessageText} />
            );
          }}
        >
          <FlashOn />
        </IconButton>
      </>
    );
  };

  return (
    <>
      <Grid
        xs={xs}
        className={`${className} [&>div]:h-full [&_p]:font-jaini-purva [&_p]:text-6xl [&_div_button_div]:text-4xl [&_div_div_div]:text-4xl [&_button:hover]:bg-white/10 [&_button:hover]:rounded`}
      >
        <Paper className="bg-[rgba(18,_18,_18,_0.85)]">
          <List>
            {stats.map((stat, index) => {
              const Tag = stat.button ? "button" : "div";
              return (
                <ListItem key={index} className="items-start">
                  {stat.icon && (
                    <ListItemIcon className="[&_svg]:fill-amber mt-4">
                      {stat.icon}
                    </ListItemIcon>
                  )}
                  <Tag
                    className="flex flex-col gap-2 p-1"
                    onClick={() =>
                      stat.button &&
                      handleDangerRoll(stat.secondary, stat.primary)
                    }
                  >
                    <Typography variant="body1">{stat.primary}</Typography>
                    <Box
                      typography="body2"
                      className="[&_p]:opacity-70 [&_input]:py-1 [&_input]:w-12 [&_input]:text-xl"
                    >
                      {stat.secondary}
                    </Box>
                  </Tag>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Grid>
      {snackbar}
    </>
  );
};

export default Stats;
