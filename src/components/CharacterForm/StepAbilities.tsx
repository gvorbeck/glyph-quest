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
import { useState } from "react";

type StepAbilityProps = {
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StepAbilities: React.FC<StepAbilityProps> = ({ setCharacter }) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [str, setStr] = useState<number | null>(null);
  const [dex, setDex] = useState<number | null>(null);
  const [wil, setWil] = useState<number | null>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  const createData = (die: number, str: string, dex: string, wil: string) => ({
    die,
    str,
    dex,
    wil,
  });

  const rows = [
    createData(1, "+2", "+1", "+0"),
    createData(2, "+2", "+0", "+1"),
    createData(3, "+1", "+2", "+0"),
    createData(4, "+0", "+2", "+1"),
    createData(5, "+1", "+0", "+2"),
    createData(6, "+0", "+1", "+2"),
  ];

  const selectAbilitySet = (index: number) => {
    setCharacter((prevCharacter) => {
      return {
        ...prevCharacter,
        abilities: {
          str: {
            ...prevCharacter.abilities.str,
            value: +rows[index - 1].str,
          },
          dex: {
            ...prevCharacter.abilities.dex,
            value: +rows[index - 1].dex,
          },
          wil: {
            ...prevCharacter.abilities.wil,
            value: +rows[index - 1].wil,
          },
        },
      };
    });
  };

  const handleGroupRollAllClick = () => {
    const value = rollDice();
    setSelectedRow(value);
    selectAbilitySet(value);
  };

  const handleIndRollClick = (ability: "str" | "dex" | "wil") => {
    const value = getModifier(rollDice());
    console.log(value);
    if (ability === "str") setStr(value);
    if (ability === "dex") setDex(value);
    if (ability === "wil") setWil(value);
    setCharacter((prevCharacter) => {
      return {
        ...prevCharacter,
        abilities: {
          ...prevCharacter.abilities,
          [ability]: {
            ...prevCharacter.abilities[ability],
            value,
          },
        },
      };
    });
  };

  const handleGroupTableRowClick = (die: number) => {
    setSelectedRow(die);
    selectAbilitySet(die);
  };

  const handleGroupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedRow(+value);
    selectAbilitySet(+value);
  };

  const handleIndInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ability: "str" | "dex" | "wil"
  ) => {
    const { value } = e.target;
    if (ability === "str") setStr(+value);
    if (ability === "dex") setDex(+value);
    if (ability === "wil") setWil(+value);
    setCharacter((prevCharacter) => {
      return {
        ...prevCharacter,
        abilities: {
          ...prevCharacter.abilities,
          [ability]: {
            ...prevCharacter.abilities[ability],
            value: +value,
          },
        },
      };
    });
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
      <TabPanel value={tabValue} index={0}>
        <Box className="flex flex-col gap-4">
          <Box className="flex items-center gap-4">
            <Button variant="contained" onClick={handleGroupRollAllClick}>
              Roll All Abilities
            </Button>
            <TextField
              className="pr-8"
              label="Ability Roll"
              type="number"
              InputProps={{
                inputProps: { min: 1, max: 6 },
              }}
              InputLabelProps={{
                shrink: true,
              }}
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
                        ? "bg-gray-200 cursor-pointer"
                        : "cursor-pointer"
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
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Box className="flex flex-col gap-4">
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
                  InputProps={{
                    inputProps: { min: 0, max: 2 },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputProps={{
                    inputProps: { min: 0, max: 2 },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputProps={{
                    inputProps: { min: 0, max: 2 },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={wil !== null ? wil : ""}
                  onChange={(e) => handleIndInputChange(e, "wil")}
                />
              </div>
            </Box>
          </Box>
        </Box>
      </TabPanel>
    </>
  );
};

export default StepAbilities;
