import { List, ListItem, ListItemText, Typography } from "@mui/material";
import Weapon from "./Weapon";

type InventoryWeaponsProps = {};

const InventoryWeapons: React.FC<InventoryWeaponsProps> = () => {
  return (
    <>
      <Typography variant="h3">Weapons</Typography>
      <Typography variant="body1">PCs start with two weapons</Typography>
      <List>
        <ListItem>
          <ListItemText>
            <strong>Light weapons (1 hand):</strong> Axes, daggers, maces, short
            swords, flails, one-handed spears, etc.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <strong>Heavy weapons (+1 damage, 2 hands):</strong> Spears,
            halberds, long swords, warhammers, etc.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <strong>Ranged weapons (2 hands):</strong> Bows, crossbows, slings
            etc.
          </ListItemText>
        </ListItem>
      </List>
      <Weapon id={1} />
      <Weapon id={2} />
    </>
  );
};

export default InventoryWeapons;
