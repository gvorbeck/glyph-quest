import { Box } from "@mui/material";
import Text from "../Text";
import EditButton from "../EditButton";
import { useEffect, useRef, useState } from "react";
import BorderedBox from "./BorderedBox";
import AbilityBox from "../AbilityBox";
import { Character } from "@/types/character";
import { Item } from "@/types/items";

type MetricsProps = {
  level: number;
  health: number;
  healthMax: number;
  xp: number;
  items: Item[];
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const Metrics: React.FC<MetricsProps & React.ComponentPropsWithRef<"div">> = ({
  className,
  level,
  health,
  healthMax,
  xp,
  items,
  setCharacter,
}) => {
  const [editMode, setEditMode] = useState(false);
  // Synchronize local state with the character's health, max health, and XP from props
  const [charCurrHealth, setCharCurrHealth] = useState(health);
  const [charMaxHealth, setCharMaxHealth] = useState(healthMax);
  const [charXp, setCharXp] = useState(xp);
  const prevEditMode = useRef(editMode);

  const classNames = [
    "flex flex-col gap-2 bg-darkGray/75 p-2 rounded",
    className,
  ].join(" ");

  const abilityBoxClassNames =
    "w-full [&>div]:w-full h-full [&>div]:h-full [&_input]:font-jaini-purva [&_input]:text-2xl [&_input]:h-full [&_input]:text-center [&_input]:pt-0 [&_input]:pb-0 [&_label]:text-xs [&_label]:absolute [&_label]:-top-2 [&_label]:-left-2";

  const armorPoints = items.reduce((acc, item) => {
    if (item.type === "armor" && item.armorPoints) {
      return acc + +item.armorPoints;
    }
    return acc;
  }, 0);
  const armorClass = 11 + armorPoints;

  const toggleEditMode = () => setEditMode((prev) => !prev);

  const handleCurrentHealthChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    setCharCurrHealth(value);
  };

  const handleCurrentHealthBlur = () => {
    setCharacter((prev) => ({ ...prev, health: charCurrHealth }));
  };

  const handleMaxHealthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCharMaxHealth(value);
  };

  const handleCurrentXpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCharXp(value);
  };

  const handleCurrentXpBlur = () => {
    setCharacter((prev) => ({ ...prev, xp: charXp }));
  };

  // Synchronize local state with the parent character's health and XP when props change
  useEffect(() => {
    setCharCurrHealth(health);
    setCharMaxHealth(healthMax);
    setCharXp(xp);
  }, [health, healthMax, xp]);

  // UseEffect to trigger setCharacter only when `editMode` changes from true to false
  useEffect(() => {
    if (prevEditMode.current && !editMode) {
      // If we transitioned from editMode === true to editMode === false
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        healthMax: charMaxHealth,
      }));
    }

    // Update the ref value for the next render
    prevEditMode.current = editMode;
  }, [editMode, charMaxHealth, setCharacter]);

  return (
    <Box className={classNames}>
      <EditButton onClick={toggleEditMode} className="self-start" />
      <div className="grid grid-cols-3 grid-rows-2 gap-2">
        <BorderedBox
          top={
            <Text className="text-center text-2xl pb-1" font>
              {level}
            </Text>
          }
          bottom="Level"
        />
        <BorderedBox
          className="col-span-2"
          top={
            <div className="flex justify-between items-center [&>div]:w-1/2 [&_div]:text-center h-full">
              <div className="relative w-full h-full border-r border-r-solid border-r-amber">
                <AbilityBox
                  label="Current"
                  max={healthMax}
                  value={charCurrHealth}
                  onChange={handleCurrentHealthChange}
                  className={abilityBoxClassNames}
                  onBlur={handleCurrentHealthBlur}
                />
              </div>
              <div className="relative w-full h-full">
                <AbilityBox
                  label="Max"
                  value={charMaxHealth}
                  onChange={handleMaxHealthChange}
                  className={abilityBoxClassNames}
                  disabled={!editMode}
                />
              </div>
            </div>
          }
          bottom="Hit Points"
        />
        <BorderedBox
          className="col-span-1"
          top={
            <AbilityBox
              label=""
              value={charXp}
              onChange={handleCurrentXpChange}
              className={`${abilityBoxClassNames} [&_input]:text-lg`}
              onBlur={handleCurrentXpBlur}
              max={500000}
            />
          }
          bottom="XP"
        />
        <BorderedBox
          className="col-span-2"
          top={
            <div className="flex justify-between items-center [&_p]:w-1/2 [&_p]:text-center [&_p]:text-2xl h-full">
              <Text font className="border-r border-r-solid border-r-amber">
                {armorPoints}
              </Text>
              <Text font>{armorClass}</Text>
            </div>
          }
          bottom={
            <div className="flex justify-between [&>div]:w-1/2">
              <div>Armor Points</div>
              <div>Armor Class</div>
            </div>
          }
        />
      </div>
    </Box>
  );
};

export default Metrics;
