import React, { useState } from "react";
import { TextField, Button, MenuItem, Typography } from "@mui/material";
import { Item, Location, TypeOption } from "@/types/items";
import { Character } from "@/types/character";

type AddItemFormProps = {
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  onClose: () => void;
};

const AddItemForm: React.FC<AddItemFormProps> = ({ setCharacter, onClose }) => {
  const [newItem, setNewItem] = useState<Item>({
    hands: null,
    location: undefined,
    name: "",
    type: "item",
    amount: "",
    armor: undefined,
    damage: undefined,
    detail: "",
    starter: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items: [...prevCharacter.items, newItem],
    }));
    onClose(); // Close the form
  };

  return (
    <form noValidate autoComplete="off">
      <Typography variant="h4" className="font-jaini-purva">
        Add Item
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={newItem.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Type"
        name="type"
        select
        value={newItem.type}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="light-weapon">Light Weapon</MenuItem>
        <MenuItem value="heavy-weapon">Heavy Weapon</MenuItem>
        <MenuItem value="ranged-weapon">Ranged Weapon</MenuItem>
        <MenuItem value="armor">Armor</MenuItem>
        <MenuItem value="shield">Shield</MenuItem>
        <MenuItem value="item">Item</MenuItem>
        <MenuItem value="animal">Animal</MenuItem>
        <MenuItem value="transport">Transport</MenuItem>
        <MenuItem value="property">Property</MenuItem>
        <MenuItem value="hireling">Hireling</MenuItem>
      </TextField>
      <TextField
        label="Location"
        name="location"
        select
        value={newItem.location || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        defaultValue={"backpack"}
      >
        <MenuItem value="hands">Hands</MenuItem>
        <MenuItem value="belt">Belt</MenuItem>
        <MenuItem value="worn">Worn</MenuItem>
        <MenuItem value="backpack">Backpack</MenuItem>
      </TextField>
      {newItem.type === "armor" && (
        <TextField
          label="Armor"
          name="armor"
          type="number"
          value={newItem.armor ?? ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      )}
      <TextField
        label="Damage"
        name="damage"
        type="number"
        value={newItem.damage ?? ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Amount"
        name="amount"
        value={newItem.amount ?? ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Detail"
        name="detail"
        value={newItem.detail ?? ""}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Item
      </Button>
    </form>
  );
};

export default AddItemForm;
