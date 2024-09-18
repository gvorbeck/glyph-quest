import { Character } from "@/types/character";
import { List, ListItem, Typography } from "@mui/material";
import Coins from "./Coins";
import GenericItems from "./GenericItems";
import SpellBooks from "./SpellBooks";

type InventoryProps = {
  character: Character;
};

const Inventory: React.FC<InventoryProps> = ({ character }) => {
  return (
    <div className="flex flex-col gap-4 items-start">
      <Typography variant="h2" className="font-jaini-purva">
        Inventory
      </Typography>
      <Typography>Select your PC's starting equipment.</Typography>
      <Typography className="text-lg">
        Item slots remaining: {10 + (character.abilities.con.value ?? 0)}
      </Typography>
      <Coins />
      <GenericItems />
      {!!character.abilities.int.value && <SpellBooks />}
      <List>
        {character.items.map((item, index) => (
          <ListItem key={index}>{item.name}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default Inventory;
