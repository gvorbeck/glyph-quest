import React, { useState } from "react";
import { TextField, Button, MenuItem, capitalize } from "@mui/material";
import { Item } from "@/types/items";
import { Character } from "@/types/character";
import spellData from "@/data/spells.json";

type AddItemFormProps = {
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  onClose: () => void;
  editItem?: Item;
};

const defaultNewItem: Item = {
  name: "",
  type: "generic",
  slots: 1,
};

const AddItemForm: React.FC<
  AddItemFormProps & React.ComponentPropsWithRef<"div">
> = ({ editItem, setCharacter, onClose }) => {
  const [newItem, setNewItem] = useState<Item>(
    editItem ?? (defaultNewItem as Item)
  );
  const [spell, setSpell] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setNewItem(defaultNewItem as Item);
    onClose();
  };

  const handleAddItem = () => {
    setCharacter((prevCharacter) => {
      let charItems = prevCharacter.items;
      if (editItem) {
        // remove original item from character.items
        charItems = charItems.filter((i) => i.name !== editItem.name);
      }
      return {
        ...prevCharacter,
        items: [...charItems, newItem],
      };
    });
    setNewItem(defaultNewItem as Item);
    onClose();
  };

  const handleChangeSpell = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const spell = spellData.find((spell) => spell.name === value);
    setSpell(value);
    setNewItem(spell as Item);
  };

  const disableAddButton = () => {
    if (!newItem.name) {
      return true;
    }
    if (newItem.slots < 1) {
      return true;
    }
    if (newItem.type === "armor" && !newItem.armorPoints) {
      return true;
    }
    if (newItem.type === "weapon" && !newItem.damage) {
      return true;
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full">
      {/* Name */}
      <TextField
        label="Name"
        name="name"
        value={newItem.name}
        onChange={handleChange}
        variant="filled"
      />
      {/* Type */}
      <TextField
        label="Type"
        name="type"
        select
        value={newItem.type}
        onChange={handleChange}
        variant="filled"
      >
        {["armor", "career", "generic", "spell", "weapon"].map((type) => (
          <MenuItem key={type} value={type}>
            {capitalize(type)}
          </MenuItem>
        ))}
      </TextField>
      {/* Spells */}
      {newItem.type === "spell" && (
        <div className="flex flex-col border border-solid border-white rounded p-4 gap-4">
          <TextField
            label="Spell books"
            name="spellbooks"
            select
            value={spell}
            onChange={handleChangeSpell}
            variant="filled"
          >
            {spellData.map((spell) => (
              <MenuItem key={spell.name} value={spell.name}>
                {capitalize(spell.name)}
              </MenuItem>
            ))}
          </TextField>
          <span>OR</span>
          <TextField
            label="Name"
            name="name"
            value={newItem.name}
            onChange={handleChange}
            variant="filled"
          />
        </div>
      )}
      {/* Slots */}
      <TextField
        label="Slots"
        name="slots"
        type="number"
        inputProps={{ min: 1 }}
        value={newItem.slots}
        onChange={handleChange}
        variant="filled"
      />
      {/* Armor Points */}
      {newItem.type === "armor" && (
        <TextField
          label="Armor Points"
          name="armorPoints"
          type="number"
          inputProps={{ min: 0 }}
          value={newItem.armorPoints ?? ""}
          onChange={handleChange}
          variant="filled"
        />
      )}
      {/* Damage */}
      {newItem.type === "weapon" && (
        <TextField
          label="Damage"
          name="damage"
          value={newItem.damage ?? ""}
          onChange={handleChange}
          variant="filled"
        />
      )}
      {/* Description */}
      <TextField
        label="Description"
        name="description"
        value={newItem.description ?? ""}
        onChange={handleChange}
        multiline
        rows={4}
        variant="filled"
      />
      {/* Amount (last) */}
      <TextField
        label="Amount"
        name="amount"
        value={newItem.amount ?? "1"}
        onChange={handleChange}
        inputProps={{ min: 1 }}
        variant="filled"
      />
      <div className="flex gap-2">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddItem}
          disabled={disableAddButton()}
        >
          Add Item
        </Button>
        <Button variant="text" color="primary" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddItemForm;
