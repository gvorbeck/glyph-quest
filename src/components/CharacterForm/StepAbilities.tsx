"use client";

import { Character } from "@/types/character";
import { getModifier, rollDice } from "@/utils/utils";
import {
  Box,
  Button,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useState, ChangeEvent } from "react";

// Constants for CSS classes
const UNSELECTED_ROW_CLASSES = "cursor-pointer";
const SELECTED_ROW_CLASSES = "bg-amber/50 cursor-pointer";

// Utility function to create data rows
const createData = (die: number, str: string, dex: string, wil: string) => ({
  die,
  str,
  dex,
  wil,
});

// Predefined rows data
const rows = [
  createData(1, "+2", "+1", "+0"),
  createData(2, "+2", "+0", "+1"),
  createData(3, "+1", "+2", "+0"),
  createData(4, "+0", "+2", "+1"),
  createData(5, "+1", "+0", "+2"),
  createData(6, "+0", "+1", "+2"),
];

type StepAbilityProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const findAbilityIndex = (character: Character) => {
  const { str, dex, wil } = character.abilities;
  const index = rows.findIndex(
    (row) =>
      +row.str === str.value && +row.dex === dex.value && +row.wil === wil.value
  );
  return index >= 0 ? index + 1 : null;
};

const StepAbilities: React.FC<StepAbilityProps> = ({
  character,
  setCharacter,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedRow, setSelectedRow] = useState<number | null>(
    findAbilityIndex(character)
  );
  const [str, setStr] = useState<number | null>(character.abilities.str.value);
  const [dex, setDex] = useState<number | null>(character.abilities.dex.value);
  const [wil, setWil] = useState<number | null>(character.abilities.wil.value);

  // Event handler for tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Select ability set based on the index
  const selectAbilitySet = (index: number) => {
    const selectedRowData = rows[index - 1];
    setStr(+selectedRowData.str);
    setDex(+selectedRowData.dex);
    setWil(+selectedRowData.wil);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      abilities: {
        str: {
          ...prevCharacter.abilities.str,
          value: +selectedRowData.str,
        },
        dex: {
          ...prevCharacter.abilities.dex,
          value: +selectedRowData.dex,
        },
        wil: {
          ...prevCharacter.abilities.wil,
          value: +selectedRowData.wil,
        },
      },
    }));
  };

  // Handle group roll click
  const handleGroupRollAllClick = () => {
    const value = rollDice();
    setSelectedRow(value as number);
    selectAbilitySet(value as number);
  };

  // Set a specific ability value
  const setSpecificAbility = (
    ability: "str" | "dex" | "wil",
    value: number
  ) => {
    if (ability === "str") setStr(value);
    if (ability === "dex") setDex(value);
    if (ability === "wil") setWil(value);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      abilities: {
        ...prevCharacter.abilities,
        [ability]: {
          ...prevCharacter.abilities[ability],
          value,
        },
      },
    }));
  };

  // Handle individual roll click
  const handleIndRollClick = (ability: "str" | "dex" | "wil") => {
    const value = getModifier(rollDice() as number);
    setSpecificAbility(ability, value);
  };

  // Handle group table row click
  const handleGroupTableRowClick = (die: number) => {
    setSelectedRow(die);
    selectAbilitySet(die);
  };

  // Handle input change for group roll
  const handleGroupInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = +e.target.value;
    setSelectedRow(value);
    selectAbilitySet(value);
  };

  // Handle input change for individual ability
  const handleIndInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ability: "str" | "dex" | "wil"
  ) => {
    const value = +e.target.value;
    setSelectedRow(null);
    setSpecificAbility(ability, value);
  };

  return (
    <>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="Types of ability rolls"
      >
        <Tab label="Group Ability Rolls" />
        <Tab label="Individual Ability Rolls" />
      </Tabs>
      <Box
        role="tabpanel"
        hidden={tabValue !== 0}
        id="tabpanel-0"
        aria-labelledby="tab-0"
      >
        <Box className="flex flex-col gap-4">
          <Box className="flex items-center gap-4 mt-4">
            <Button variant="contained" onClick={handleGroupRollAllClick}>
              Roll All Abilities
            </Button>
            <TextField
              className="pr-8"
              label="Ability Roll"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 6 } }}
              InputLabelProps={{ shrink: true }}
              value={selectedRow !== null ? selectedRow : ""}
              onChange={handleGroupInputChange}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="ability table">
              <TableHead>
                <TableRow>
                  <TableCell>1d</TableCell>
                  <TableCell>Strength</TableCell>
                  <TableCell>Dexterity</TableCell>
                  <TableCell>Will</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.die}
                    onClick={() => handleGroupTableRowClick(row.die)}
                    className={
                      selectedRow === row.die
                        ? SELECTED_ROW_CLASSES
                        : UNSELECTED_ROW_CLASSES
                    }
                  >
                    <TableCell>{row.die}</TableCell>
                    <TableCell>{row.str}</TableCell>
                    <TableCell>{row.dex}</TableCell>
                    <TableCell>{row.wil}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box
        role="tabpanel"
        hidden={tabValue !== 1}
        id="tabpanel-1"
        aria-labelledby="tab-1"
      >
        <Box className="flex flex-col gap-4 mt-4">
          <Typography variant="body2">
            If you want your abilities to be more randomized (and possibly
            unbalanced), the GM may also allow you to roll 1d for each ability
            separately.
          </Typography>
          <Box className="flex gap-4">
            <TableContainer component={Paper} className="w-fit">
              <Table aria-label="ability table">
                <TableHead>
                  <TableRow>
                    <TableCell>1d</TableCell>
                    <TableCell>Ability Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1-2</TableCell>
                    <TableCell>+0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3-5</TableCell>
                    <TableCell>+1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>6</TableCell>
                    <TableCell>+2</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Button
                  variant="contained"
                  onClick={() => handleIndRollClick("str")}
                >
                  Roll STR
                </Button>
                <TextField
                  className="pr-8"
                  label="Strength"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 2 } }}
                  InputLabelProps={{ shrink: true }}
                  value={str !== null ? str : ""}
                  onChange={(e) => handleIndInputChange(e, "str")}
                />
              </div>
              <div className="flex gap-4">
                <Button
                  variant="contained"
                  onClick={() => handleIndRollClick("dex")}
                >
                  Roll DEX
                </Button>
                <TextField
                  className="pr-8"
                  label="Dexterity"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 2 } }}
                  InputLabelProps={{ shrink: true }}
                  value={dex !== null ? dex : ""}
                  onChange={(e) => handleIndInputChange(e, "dex")}
                />
              </div>
              <div className="flex gap-4">
                <Button
                  variant="contained"
                  onClick={() => handleIndRollClick("wil")}
                >
                  Roll WIL
                </Button>
                <TextField
                  className="pr-8"
                  label="Will"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 2 } }}
                  InputLabelProps={{ shrink: true }}
                  value={wil !== null ? wil : ""}
                  onChange={(e) => handleIndInputChange(e, "wil")}
                />
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StepAbilities;
