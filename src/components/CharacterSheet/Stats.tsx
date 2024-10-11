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
import { AbilityShortNameLow, Character } from "@/types/character";
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

    // go through the abilities and check if the value is a number, if not set it to 0
    const newAbilities = { ...charAbilities };
    Object.keys(newAbilities).forEach((key) => {
      if (typeof newAbilities[key as AbilityShortNameLow].value !== "number") {
        newAbilities[key as AbilityShortNameLow].value = 0;
      }
    });
    // check if the new abilities are different from the old ones
    if (JSON.stringify(newAbilities) !== JSON.stringify(charAbilities)) {
      setCharAbilities(newAbilities);
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        abilities: newAbilities,
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
};

export default Stats;
