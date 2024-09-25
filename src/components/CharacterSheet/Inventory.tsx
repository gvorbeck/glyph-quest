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
  TextField,
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
import { getSlots } from "@/utils/utils";

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
> = ({ items, setCharacter, className, con, coins }) => {
  const [editItem, setEditItem] = useState<Item | undefined>();
  const [charCoins, setCharCoins] = useState(coins);
  const [showAddForm, setShowAddForm] = useState(false);
  const { showSnackbar, snackbar } = useSnackbar();
  const formRef = useRef<HTMLDivElement>(null);

  const sortedItems = [...items].sort((a, b) => {
    if (a.type < b.type) return -1;
    if (a.type > b.type) return 1;
    return 0;
  });

  const slots = getSlots(sortedItems);
  const maxItems = 10 + (con ?? 0); // Max number of slots allowed based on Constitution
  const remainingSlots = maxItems - slots; // Remaining slots to fill with empty rows

  const classNames = [
    "grid grid-cols-12 items-top gap-4 bg-darkGray/75 p-2 rounded items-start",
    className,
  ].join(" ");

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
    setEditItem(undefined);
  };

  const copyDescription = (description: string) => {
    navigator.clipboard.writeText(description);
    showSnackbar("Description copied to clipboard", "info");
  };

  const openEditItem = (item: Item) => {
    setShowAddForm(true);
    setEditItem(item);
  };

  const handleCoinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharCoins(parseInt(e.target.value));
  };

  const handleCoinsBlur = () => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      coins: charCoins,
    }));
  };

  return (
    <Box className={classNames}>
      <div className="flex xs:flex-col sm:flex-row xs:items-start gap-2 row-span-1 col-span-12 sm:items-center">
        <Text variant="h3" font className="text-3xl">
          Inventory ({slots}/{maxItems})
        </Text>
        {remainingSlots > 0 && (
          <Button variant="outlined" onClick={() => setShowAddForm(true)}>
            Add Equipment
          </Button>
        )}
        <TextField
          label="Coins"
          value={charCoins}
          variant="filled"
          size="small"
          type="number"
          className="xs:ml-0 sm:ml-auto"
          onChange={handleCoinsChange}
          onBlur={handleCoinsBlur}
        />
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
            {/* Render sorted items first */}
            {sortedItems.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="flex items-center"
                >
                  <Tooltip title="Wound">
                    <Checkbox
                      checked={item.type === "wound"}
                      onClick={(e) =>
                        addWound(index, (e.target as HTMLInputElement).checked)
                      }
                    />
                  </Tooltip>
                  <Tooltip title="Edit item" onClick={() => openEditItem(item)}>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Text variant="body2">{capitalize(item.name)}</Text>
                </TableCell>
                <TableCell align="right">{capitalize(item.type)}</TableCell>
                <TableCell align="right">{item.slots}</TableCell>
                {hasAmount && (
                  <TableCell align="right">{item.amount}</TableCell>
                )}
                {hasDamage && (
                  <TableCell align="right">{item.damage}</TableCell>
                )}
                {hasArmorPoints && (
                  <TableCell align="right">{item.armorPoints}</TableCell>
                )}
                {hasDescription && (
                  <TableCell align="right">
                    {!!item.description && (
                      <Tooltip title={item.description}>
                        <IconButton
                          color="primary"
                          onClick={() => copyDescription(item.description!)}
                        >
                          <SearchIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}

            {/* Fill remaining slots with empty rows */}
            {Array.from({ length: remainingSlots }).map((_, index) => (
              <TableRow key={`empty-${index}`}>
                <TableCell
                  component="th"
                  scope="row"
                  className="flex items-center"
                >
                  <Text variant="body2">Empty</Text>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* New Equipment Form with the ref */}
      {showAddForm && (
        <div ref={formRef} className="xs:col-span-12 md:col-span-6">
          <NewInventoryItem
            setCharacter={setCharacter}
            onClose={handleFormClose}
            editItem={editItem}
          />
        </div>
      )}
      {snackbar}
    </Box>
  );
};

export default Inventory;
