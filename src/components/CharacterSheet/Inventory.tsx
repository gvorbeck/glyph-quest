import { Character } from "@/types/character";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  capitalize,
} from "@mui/material";
import { Item, TypeOption } from "@/types/items";
import NewInventoryItem from "./NewInventoryItem";
import useSnackbar from "@/hooks/useSnackbar";
import Text from "../Text";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

type InventoryProps = {
  items: Item[];
  coins: Character["coins"];
  con: Character["abilities"]["con"]["value"];
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
> = ({ items, setCharacter, className, con }) => {
  const sortedItems = [...items].sort((a, b) => {
    if (a.type < b.type) return -1;
    if (a.type > b.type) return 1;
    return 0;
  });
  const slots = sortedItems.reduce((acc, item) => acc + +item.slots, 0);
  const maxItems = 10 + (con ?? 0);
  const showAddButton = slots < maxItems;

  const classNames = [
    "grid grid-cols-12 items-top gap-4 bg-darkGray/75 p-2 rounded items-start",
    className,
  ].join(" ");

  // Create a ref for the new equipment form
  const formRef = useRef<HTMLDivElement>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Scroll to form after it appears in the DOM
  useEffect(() => {
    if (showAddForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showAddForm]);

  const rows: RowsType = sortedItems.map((item) =>
    createData(
      item.name,
      item.type,
      item.slots,
      item.amount,
      item.damage ? item.damage : undefined,
      item.armorPoints,
      item.description
    )
  );

  const addWound = (index: number, checked: boolean) => {
    if (checked) {
      const wound = {
        name: "WOUND",
        type: "wound" as TypeOption,
        slots: 1,
      };
      sortedItems.splice(index, 1, wound);
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        items: sortedItems,
      }));
    } else {
      sortedItems.splice(index, 1);
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        items: sortedItems,
      }));
    }
  };

  const hasAmount = has(rows, "amount");
  const hasDamage = has(rows, "damage");
  const hasArmorPoints = has(rows, "armorPoints");
  const hasDescription = has(rows, "description");

  const handleFormClose = () => {
    setShowAddForm(false);
  };

  const copyDescription = (description: string) => {
    navigator.clipboard.writeText(description);
    // useSnackbar();
  };

  console.error(
    "change to show a row for every possible item. each row will either have a item, be a wound, or be empty. this is so that users can correctly identify when their character is dead."
  );

  return (
    <Box className={classNames}>
      <div className="flex gap-2 row-span-1 col-span-12">
        <Text variant="h3" font className="text-3xl">
          Inventory ({slots}/{maxItems})
        </Text>
        {showAddButton && (
          <Button variant="outlined" onClick={() => setShowAddForm(true)}>
            Add Equipment
          </Button>
        )}
      </div>
      <TableContainer component={Paper} className="row-span-1 col-span-12">
        <Table className="min-w-[650px]" aria-label="simple table" size="small">
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
            {Array.from({ length: maxItems - slots + sortedItems.length }).map(
              (_, index) => {
                const row = sortedItems[index] || {
                  type: "",
                  name: "Empty",
                  slots: 0,
                }; // Fallback to empty row if no item

                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Tooltip title="Wound">
                        <Checkbox
                          checked={row.type === "wound"}
                          onClick={(e) =>
                            addWound(
                              index,
                              (e.target as HTMLInputElement).checked
                            )
                          }
                        />
                      </Tooltip>
                      <Tooltip title="Edit item">
                        <IconButton color="primary"></IconButton>
                      </Tooltip>
                      {capitalize(row.name)}
                    </TableCell>
                    <TableCell align="right">{capitalize(row.type)}</TableCell>
                    <TableCell align="right">{row.slots}</TableCell>
                    {hasAmount && (
                      <TableCell align="right">{row.amount}</TableCell>
                    )}
                    {hasDamage && (
                      <TableCell align="right">
                        {row.damage && (
                          <Button variant="outlined">{row.damage}</Button>
                        )}
                      </TableCell>
                    )}
                    {hasArmorPoints && (
                      <TableCell align="right">{row.armorPoints}</TableCell>
                    )}
                    {hasDescription && (
                      <TableCell align="right">
                        {!!row.description && (
                          <Tooltip title={row.description}>
                            <IconButton
                              color="primary"
                              onClick={() => copyDescription(row.description!)}
                            >
                              <SearchIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* New Equipment Form with the ref */}
      {showAddForm && (
        <div ref={formRef} className="xs:col-span-12 md:col-span-6">
          <NewInventoryItem
            setCharacter={setCharacter}
            onClose={handleFormClose}
          />
        </div>
      )}
    </Box>
  );
};

export default Inventory;
