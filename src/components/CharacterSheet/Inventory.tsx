import { Character } from "@/types/character";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  capitalize,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)
import InventoryLocationSelect from "../InventoryLocationSelect";
import { Item, Location } from "@/types/items";
import { Bolt, Cancel, Edit, ContentCopy } from "@mui/icons-material";
import { useState } from "react";
import InventoryErrors from "../InventoryErrors";
import NewInventoryItem from "./NewInventoryItem";
import { getAttackBonus, isCrit, rollDice } from "@/utils/utils";
import useSnackbar from "@/hooks/useSnackbar";
import Text from "../Text";
import BorderedBox from "./BorderedBox";

type InventoryProps = {
  items: Item[];
  coins: Character["coins"];
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

type RowsType = {
  name: string;
  type: string;
  slots: number;
  amount: string | number | undefined;
  damage: string | undefined;
  armorPoints: number | undefined;
  description: string | undefined;
}[];

type RowKeys =
  | "name"
  | "type"
  | "slots"
  | "amount"
  | "damage"
  | "armorPoints"
  | "description";

const createData = (
  name: string,
  type: string,
  slots: number,
  amount: number | string | undefined,
  damage: string | undefined,
  armorPoints: number | undefined,
  description: string | undefined
) => {
  return { name, type, slots, amount, damage, armorPoints, description };
};

// Determine if rows possess any of a specific column
const has = (rows: RowsType, column: RowKeys) => {
  return rows.some((row) => row[column] !== undefined);
};

const Inventory: React.FC<
  InventoryProps & React.ComponentPropsWithRef<"div">
> = ({ items, setCharacter, className }) => {
  const classNames = [
    "flex flex-col gap-2 bg-darkGray/75 p-2 rounded items-start",
    className,
  ].join(" ");

  const rows: RowsType = items.map((item) =>
    createData(
      item.name,
      item.type,
      item.slots,
      item.amount,
      item.damage ? item.damage + "+" + item.bonus : undefined,
      item.armorPoints,
      item.description
    )
  );

  const hasDamage = has(rows, "damage");
  const hasArmorPoints = has(rows, "armorPoints");
  const hasDescription = has(rows, "description");

  return (
    <Box className={classNames}>
      <Text variant="h3" font className="text-3xl">
        Inventory
      </Text>
      {/* <BorderedBox top={<Text>0</Text>} bottom="Coins" /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Slots</TableCell>
              <TableCell align="right">Amount</TableCell>
              {hasDamage && <TableCell align="right">Damage</TableCell>}
              {hasArmorPoints && <TableCell align="right">AP</TableCell>}
              {hasDescription && (
                <TableCell align="right">Description</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Tooltip title="Wound">
                    <Checkbox />
                  </Tooltip>
                  {capitalize(row.name)}
                </TableCell>
                <TableCell align="right">{capitalize(row.type)}</TableCell>
                <TableCell align="right">{row.slots}</TableCell>
                <TableCell align="right">{row.amount ?? 1}</TableCell>
                {hasDamage && <TableCell align="right">{row.damage}</TableCell>}
                {hasArmorPoints && (
                  <TableCell align="right">{row.armorPoints}</TableCell>
                )}
                {hasDescription && (
                  <TableCell align="right">{row.description}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Inventory;
