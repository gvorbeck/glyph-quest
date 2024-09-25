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
        defaultValue={"1"}
      />
      <div className="flex gap-2">
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Add Item
        </Button>
        <Button variant="text" color="primary" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
  {
    /*

  // const itemRef = useRef<HTMLFormElement>(null);

 

  // const handleSubmit = () => {
  //   setCharacter((prevCharacter) => {
  //     let charItems = prevCharacter.items;
  //     if (editItem) {
  //       // remove original item from character.items
  //       charItems = charItems.filter((i) => i.name !== editItem.name);
  //     }
  //     // Determine if the item is a two-handed weapon
  //     if (newItem.type === "heavy-weapon" || newItem.type === "ranged-weapon") {
  //       newItem.hands = 2;
  //     } else {
  //       newItem.hands = 1;
  //     }
  //     return {
  //       ...prevCharacter,
  //       items: [...charItems, newItem],
  //     };
  //   });
  //   setNewItem(defaultNewItem as Item);
  //   onClose(); // Close the form
  // };

  // const handleClose = () => {
  //   setNewItem(defaultNewItem as Item);
  //   onClose(); // Close the form
  // };

  // useEffect(() => {
  //   console.log("newItem", newItem);
  // }, [newItem]);

  // useEffect(() => {
  //   if (itemRef.current) {
  //     itemRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, []);
  // return (
  //   <form noValidate autoComplete="off" id={id} ref={itemRef}>
  //     <Typography variant="h4" className="font-jaini-purva">
  //       Add Item
  //     </Typography>
  //     <TextField
  //       label="Name"
  //       name="name"
  //       value={newItem.name}
  //       onChange={handleChange}
  //       fullWidth
  //       margin="normal"
  //     />
  //     <TextField
  //       label="Type"
  //       name="type"
  //       select
  //       value={newItem.type}
  //       onChange={handleChange}
  //       fullWidth
  //       margin="normal"
  //     >
  //       <MenuItem value="light-weapon">Light Weapon</MenuItem>
  //       <MenuItem value="heavy-weapon">Heavy Weapon</MenuItem>
  //       <MenuItem value="ranged-weapon">Ranged Weapon</MenuItem>
  //       <MenuItem value="armor">Armor</MenuItem>
  //       <MenuItem value="shield">Shield</MenuItem>
  //       <MenuItem value="item">Item</MenuItem>
  //       <MenuItem value="animal">Animal</MenuItem>
  //       <MenuItem value="transport">Transport</MenuItem>
  //       <MenuItem value="property">Property</MenuItem>
  //       <MenuItem value="hireling">Hireling</MenuItem>
  //     </TextField>
  //     <TextField
  //       label="Location"
  //       name="location"
  //       select
  //       value={newItem.location || ""}
  //       onChange={handleChange}
  //       fullWidth
  //       margin="normal"
  //       defaultValue={"backpack"}
  //     >
  //       <MenuItem value="hands">Hands</MenuItem>
  //       <MenuItem value="belt">Belt</MenuItem>
  //       <MenuItem value="worn">Worn</MenuItem>
  //       <MenuItem value="backpack">Backpack</MenuItem>
  //     </TextField>
  //     {newItem.type === "armor" && (
  //       <TextField
  //         label="Armor"
  //         name="armor"
  //         type="number"
  //         value={newItem.armor ?? ""}
  //         onChange={handleChange}
  //         fullWidth
  //         margin="normal"
  //       />
  //     )}
  //     {newItem.type.includes("weapon") && (
  //       <TextField
  //         label="Damage"
  //         name="damage"
  //         type="number"
  //         value={newItem.damage ?? ""}
  //         onChange={handleChange}
  //         fullWidth
  //         margin="normal"
  //         helperText="Light/Ranged weapons: 0, Heavy weapons: 1"
  //       />
  //     )}
  //     <TextField
  //       label="Amount"
  //       name="amount"
  //       value={newItem.amount ?? "1"}
  //       onChange={handleChange}
  //       InputProps={{ inputProps: { min: 1 } }}
  //       fullWidth
  //       margin="normal"
  //     />
  //     <TextField
  //       label="Detail"
  //       name="detail"
  //       value={newItem.detail ?? ""}
  //       onChange={handleChange}
  //       multiline
  //       rows={4}
  //       fullWidth
  //       margin="normal"
  //     />
  //     <div className="flex gap-2">
  //       <Button variant="contained" color="primary" onClick={handleSubmit}>
  //         Add Item (NOTE: NEEDS VALIDATION!)
  //       </Button>
  //       <Button variant="contained" color="primary" onClick={handleClose}>
  //         Cancel
  //       </Button>
  //     </div>
  //   </form>
// );*/
  }
};

export default AddItemForm;
