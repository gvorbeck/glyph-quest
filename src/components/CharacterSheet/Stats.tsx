import usePopover from "@/hooks/usePopover";
import useSnackbar from "@/hooks/useSnackbar";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CopySnackbarAction from "../SnackbarActions/CopySnackbarAction";
import { Character } from "@/types/character";
import Text from "../Text";
import EditButton from "../EditButton";
import AbilityBox from "../AbilityBox";
import BorderedBox from "./BorderedBox";

type StatsProps = {
  abilities: Character["abilities"];
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const Stats: React.FC<StatsProps & React.ComponentPropsWithRef<"div">> = ({
  abilities,
  setCharacter,
  className,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [charAbilities, setCharAbilities] = useState({ ...abilities });
  const prevEditMode = useRef(editMode);

  const classNames = [
    "flex flex-col gap-2 bg-darkGray/75 p-2 rounded",
    className,
  ].join(" ");

  // Define the specific order of abilities
  const abilityOrder: (keyof Character["abilities"])[] = [
    "str",
    "dex",
    "con",
    "int",
    "wis",
    "cha",
  ];

  // UseEffect to trigger setCharacter only when `editMode` changes from true to false
  useEffect(() => {
    if (prevEditMode.current && !editMode) {
      // If we transitioned from editMode === true to editMode === false
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        abilities: charAbilities,
      }));
    }

    // Update the ref value for the next render
    prevEditMode.current = editMode;
  }, [editMode, charAbilities, setCharacter]);

  const toggleEditMode = () => setEditMode((prev) => !prev);

  const handleAbilityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    abilityKey: keyof Character["abilities"]
  ) => {
    const parsedValue = parseInt(event.target.value, 10);

    // Only update if the parsed value is a valid number
    if (!isNaN(parsedValue)) {
      setCharAbilities((prevAbilities) => ({
        ...prevAbilities,
        [abilityKey]: {
          ...prevAbilities[abilityKey],
          value: parsedValue,
        },
      }));
    }
  };

  return (
    <Box className={classNames}>
      <div className="flex gap-2">
        <Text variant="h3" font className="text-3xl">
          Abilities
        </Text>
        <EditButton onClick={toggleEditMode} />
      </div>
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {abilityOrder.map((key) => (
          <BorderedBox
            top={
              editMode ? (
                <AbilityBox
                  label=""
                  value={charAbilities[key].value ?? 0}
                  onChange={(e) => handleAbilityChange(e, key)}
                  max={12}
                  className="w-full [&_input]:text-2xl [&_input]:pt-2 [&_input]:text-center"
                />
              ) : (
                <Text className="text-center text-4xl pb-1" font>
                  {charAbilities[key].value}
                </Text>
              )
            }
            bottomSize="text-2xl"
            bottom={charAbilities[key].short}
            key={charAbilities[key].short}
          />
        ))}
      </div>
    </Box>
  );
  // const { openPopover, closePopover, popoverProps } = usePopover();
  // const [selectedStat, setSelectedStat] = useState<Stat | null>(null);
  // const handleButtonClick = (
  //   e: React.MouseEvent<HTMLButtonElement>,
  //   stat: Stat
  // ) => {
  //   setSelectedStat(stat);
  //   openPopover(e);
  // };
  // const { snackbar, showSnackbar } = useSnackbar();
  // const handleDangerRoll = (
  //   stat: string | undefined,
  //   value: string | undefined,
  //   isAdvantage: boolean = false
  // ) => {
  //   closePopover();
  //   if (!stat || value === undefined) return;
  //   let rollArr = rollDice(isAdvantage ? 3 : 2, true) as number[];
  //   let rollSum: number;
  //   let rollMsg: string;
  //   if (isAdvantage) {
  //     // Sort the array, remove the lowest number, and sum the remaining two highest
  //     const sortedRolls = rollArr.sort((a, b) => a - b);
  //     const removedRoll = sortedRolls.shift(); // Remove the lowest roll
  //     rollSum = sortedRolls.reduce((a, b) => a + b, 0);
  //     rollMsg = `Advantage ${stat} Danger Roll (3d6): (${removedRoll}, ${sortedRolls.join(
  //       ", "
  //     )}) + ${value} = ${rollSum + Number(value)}`;
  //   } else {
  //     rollSum = rollArr.reduce((a, b) => a + b, 0);
  //     rollMsg = `${stat} Danger Roll (2d6): (${rollArr.join(
  //       ", "
  //     )}) + ${value} = ${rollSum + Number(value)}`;
  //   }
  //   showSnackbar(rollMsg, "info", <CopySnackbarAction message={rollMsg} />);
  // };
  // return (
  //   <>
  //     <Grid
  //       xs={xs}
  //       className={`${className} [&>div]:h-full [&_p]:font-jaini-purva [&_p]:text-6xl [&_div_button_div]:text-4xl [&_div_div_div]:text-4xl [&_button:hover]:bg-white/10 [&_button:hover]:rounded`}
  //     >
  //       <Paper className="bg-[rgba(18,_18,_18,_0.85)]">
  //         <List>
  //           {stats.map((stat, index) => {
  //             const Tag = stat.button ? "button" : "div";
  //             return (
  //               <ListItem key={index} className="items-start">
  //                 {stat.icon && (
  //                   <ListItemIcon className="[&_svg]:fill-amber mt-4">
  //                     {stat.icon}
  //                   </ListItemIcon>
  //                 )}
  //                 <Tag
  //                   className="flex flex-col gap-2 p-1"
  //                   aria-describedby={popoverProps.id}
  //                   onClick={(e) => {
  //                     if (stat.button) {
  //                       handleButtonClick(
  //                         e as React.MouseEvent<HTMLButtonElement>,
  //                         stat
  //                       );
  //                     }
  //                   }}
  //                 >
  //                   <Typography variant="body1">{stat.primary}</Typography>
  //                   <Box
  //                     typography="body2"
  //                     className="[&_p]:opacity-70 [&_input]:py-1 [&_input]:w-12 [&_input]:text-xl"
  //                   >
  //                     {stat.secondary}
  //                   </Box>
  //                 </Tag>
  //                 <Popover
  //                   {...popoverProps}
  //                   className="[&_div]:flex [&_div]:flex-col [&_div]:gap-2 [&_div]:p-2"
  //                 >
  //                   <Button
  //                     variant="contained"
  //                     onClick={() =>
  //                       handleDangerRoll(
  //                         selectedStat?.primary,
  //                         selectedStat?.secondary
  //                       )
  //                     }
  //                   >
  //                     {selectedStat?.primary} Danger Roll
  //                   </Button>
  //                   <Button
  //                     variant="outlined"
  //                     onClick={() =>
  //                       handleDangerRoll(
  //                         selectedStat?.primary,
  //                         selectedStat?.secondary,
  //                         true
  //                       )
  //                     }
  //                   >
  //                     Advantage {selectedStat?.primary} Danger Roll
  //                   </Button>
  //                 </Popover>
  //               </ListItem>
  //             );
  //           })}
  //         </List>
  //       </Paper>
  //     </Grid>
  //     {snackbar}
  //   </>
  // );
};

export default Stats;
