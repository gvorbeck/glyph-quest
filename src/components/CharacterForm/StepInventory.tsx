import { Character } from "@/types/character";
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import items from "@/data/items.json";
import { Item, Location } from "@/types/items";
import InventoryErrors from "./InventoryErrors";
import InventoryWeapons from "./InventoryWeapons";
import InventoryLocationSelect from "./InventoryLocationSelect";
import InventoryArmor from "./InventoryArmor";
import InventoryShield from "./InventoryShield";

type StepInventoryProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
  setError: React.Dispatch<React.SetStateAction<number>>;
};

function not(a: readonly Item[], b: readonly Item[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly Item[], b: readonly Item[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly Item[], b: readonly Item[]) {
  return [...a, ...not(b, a)];
}

const getStartItems = () => {
  return items.filter((item: Item) => item.starter);
};

const StepInventory: React.FC<StepInventoryProps> = ({
  character,
  setCharacter,
  setError,
}) => {
  const [checked, setChecked] = useState<readonly Item[]>([]);
  const [left, setLeft] = useState<readonly Item[]>(getStartItems);
  const [right, setRight] = useState<readonly Item[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (item: Item) => () => {
    const currentIndex = checked.findIndex(
      (checkedItem) => checkedItem.name === item.name
    );
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly Item[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly Item[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedAdd = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items: right.concat(leftChecked),
    }));
  };

  const handleCheckedRemove = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items: not(right, rightChecked),
    }));
  };

  const handleLocationChange = (
    event: SelectChangeEvent<Location>,
    item: Item
  ) => {
    const { value } = event.target;
    const charItem = character.items.find((i) => i.name === item.name);
    const otherItems = character.items.filter((i) => i.name !== item.name);
    if (charItem) {
      charItem.location = value;
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        items: [...otherItems, charItem],
      }));
    }
    console.log(value);
  };

  const customList = (
    title: React.ReactNode,
    items: readonly Item[],
    hideCheckAll?: boolean,
    isChosen?: boolean
  ) => (
    <Card>
      <CardHeader
        className="[&_span]:text-sm py-2 px-4"
        avatar={
          !hideCheckAll && (
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={
                numberOfChecked(items) === items.length && items.length !== 0
              }
              indeterminate={
                numberOfChecked(items) !== items.length &&
                numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{
                "aria-label": "all items selected",
              }}
            />
          )
        }
        title={title}
        subheader={`${numberOfChecked(items)} selected`}
      />
      <Divider />
      <List
        className="h-[230px] overflow-auto"
        dense
        component="div"
        role="list"
      >
        {items.map((item: Item) => {
          const labelId = `transfer-list-all-item-${item.name}-label`;

          return (
            <ListItem key={item.name}>
              <ListItemButton role="listitem" onClick={handleToggle(item)}>
                <Checkbox
                  checked={checked.indexOf(item) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
                <ListItemText
                  id={labelId}
                  primary={item.name}
                  secondary={item.amount ? item.amount : null}
                />
              </ListItemButton>
              {isChosen && (
                <InventoryLocationSelect
                  id="items"
                  value={item.location}
                  onChange={(e) => handleLocationChange(e, item)}
                />
              )}
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <>
      <Typography variant="h3">Items</Typography>
      <div className="flex flex-col gap-4">
        <div>{customList("Choices", left, true)}</div>
        <div>
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleCheckedAdd}
              disabled={
                leftChecked.length === 0 ||
                right.length >= 6 ||
                leftChecked.length > 6 ||
                leftChecked.length + right.length > 6
              }
              variant="contained"
              aria-label="move selected down"
              startIcon={<KeyboardArrowDownIcon />}
            >
              Add
            </Button>
            <Button
              onClick={handleCheckedRemove}
              disabled={rightChecked.length === 0}
              aria-label="move selected up"
              variant="contained"
              startIcon={<KeyboardArrowUpIcon />}
            >
              Remove
            </Button>
          </div>
        </div>
        <div>{customList("Chosen", right, false, true)}</div>
        <InventoryWeapons character={character} setCharacter={setCharacter} />
        <InventoryArmor character={character} setCharacter={setCharacter} />
        <InventoryShield character={character} setCharacter={setCharacter} />
        <InventoryErrors items={character.items} setError={setError} />
      </div>
    </>
  );
};

export default StepInventory;
