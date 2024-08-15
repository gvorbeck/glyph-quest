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
import { Cancel } from "@mui/icons-material";
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
  const [newFormOpen, setNewFormOpen] = useState<boolean>(false);
  console.log(error);

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

  return (
    <Grid xs={xs}>
      <Paper className="p-4">
        <Typography variant="h3">Inventory</Typography>
        <InventoryErrors items={inventory} setError={setError} />
        <List>
          {inventory.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.name} />
              <InventoryLocationSelect
                id={item.name.toLowerCase()}
                value={item.location}
                onChange={(e) => handleItemLocationChange(e, item)}
              />
              <IconButton aria-label="delete item" color="primary">
                <Cancel />
              </IconButton>
            </ListItem>
          ))}
        </List>
        {!newFormOpen ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setNewFormOpen(true)}
          >
            Add Item
          </Button>
        ) : (
          <NewInventoryItem
            onClose={() => console.log("foo")}
            setCharacter={setCharacter}
          />
        )}
      </Paper>
    </Grid>
  );
};

export default Inventory;
