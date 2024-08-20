import { Character } from "@/types/character";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)
import InventoryLocationSelect from "../InventoryLocationSelect";
import { Item, Location } from "@/types/items";
import { Cancel, Edit } from "@mui/icons-material";
import { useState } from "react";
import InventoryErrors from "../InventoryErrors";
import NewInventoryItem from "./NewInventoryItem";

type InventoryProps = {
  xs?: number;
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const Inventory: React.FC<InventoryProps> = ({
  xs,
  character,
  setCharacter,
}) => {
  const [error, setError] = useState<number>(0);
  const [newFormOpen, setNewFormOpen] = useState<[boolean, Item | undefined]>([
    false,
    undefined,
  ]);

  const inventory = character.items.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const handleItemLocationChange = (
    event: SelectChangeEvent<Location>,
    item: Item
  ) => {
    const value = event.target.value as Location;
    const newItem = { ...item, location: value };
    const oldItems = character.items.filter((i) => i.name !== item.name);
    const items = [...oldItems, newItem].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items,
    }));
  };

  const handleEditItemClick = (item: Item) => {
    setNewFormOpen([true, item]);
  };

  return (
    <Grid xs={xs}>
      <Paper className="p-4 flex flex-col gap-4">
        <Typography variant="h3" className="font-jaini-purva">
          Inventory
        </Typography>
        <InventoryErrors items={inventory} setError={setError} />
        <List>
          {inventory.map((item, index) => (
            <ListItem
              key={index}
              className={`items-start flex-col ${
                index % 2 === 0 ? "bg-white/5" : ""
              }`}
            >
              <ListItemText
                primary={
                  item.amount !== "1" && item.amount !== undefined
                    ? `(${item.amount}) ${item.name}`
                    : item.name
                }
                className="[&_span]:truncate w-full"
                secondary={item.detail}
                title={item.name}
              />
              <div className="flex gap-2 w-full justify-end">
                <InventoryLocationSelect
                  id={item.name.toLowerCase()}
                  value={item.location}
                  onChange={(e) => handleItemLocationChange(e, item)}
                />
                <IconButton
                  aria-label="edit Item"
                  color="primary"
                  onClick={() => handleEditItemClick(item)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="delete item"
                  color="primary"
                  href="#newItem"
                >
                  <Cancel />
                </IconButton>
              </div>
            </ListItem>
          ))}
        </List>
        {!newFormOpen[0] ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setNewFormOpen([true, undefined])}
          >
            Add Item
          </Button>
        ) : (
          <NewInventoryItem
            id="newItem"
            onClose={() => setNewFormOpen([false, undefined])}
            setCharacter={setCharacter}
            editItem={newFormOpen[1]}
          />
        )}
      </Paper>
    </Grid>
  );
};

export default Inventory;
