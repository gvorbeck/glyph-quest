"use client";

import { Character } from "@/types/character";
import { rollDice } from "@/utils/utils";
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
} from "@mui/material";
import { useState } from "react";

type StepAbilityProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StepAbilities: React.FC<StepAbilityProps> = ({
  character,
  setCharacter,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

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

  const handleGroupTableRowClick = (die: number) => {
    setSelectedRow(die);
    selectAbilitySet(die);
  };

  const handleGroupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedRow(+value);
    selectAbilitySet(+value);
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
              value={selectedRow || ""}
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
                    className={selectedRow === row.die ? "bg-gray-200" : ""}
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
        Item Two
      </TabPanel>
    </>
  );
};

export default StepAbilities;
