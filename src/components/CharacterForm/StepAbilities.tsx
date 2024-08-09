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
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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

  const handleAllClick = () => {
    console.log("handleAllClick");
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

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Types of ability rolls"
      >
        <Tab label="Group Ability Rolls" />
        <Tab label="Individual Ability Rolls" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box className="flex flex-col gap-4">
          <Box className="flex items-center gap-4">
            <Button variant="contained" onClick={handleAllClick}>
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
                  <TableRow key={row.die}>
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
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </>
  );
};

export default StepAbilities;
