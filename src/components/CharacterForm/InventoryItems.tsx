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
} from "@mui/material";
import InventoryLocationSelect from "../InventoryLocationSelect";
import { Item, Location } from "@/types/items";
import { Character } from "@/types/character";
import { useState } from "react";
import items from "@/data/items.json";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type InventoryItemsProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
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

const getStartItems = items.filter((item) => item.starter) as Item[];

const InventoryItems: React.FC<InventoryItemsProps> = ({
  character,
  setCharacter,
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

  const addToBackpack = (items: Item[]) =>
    items.map((item) => ({
      ...item,
      location: "backpack",
    }));

  const handleCheckedAdd = () => {
    const backpack = addToBackpack(right.concat(leftChecked)) as Item[];
    setRight(backpack);
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    const nonItems = character.items.filter((item) => item.type !== "item");
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items: [...backpack, ...nonItems],
    }));
  };

  const handleCheckedRemove = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    const nonItems = character.items.filter((item) => item.type !== "item");
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items: [...not(right, rightChecked), ...nonItems],
    }));
  };

  const handleLocationChange = (
    event: SelectChangeEvent<Location>,
    item: Item
  ) => {
    const location = event.target.value as Location;
    const charItem = character.items.find((i) => i.name === item.name);
    const otherItems = character.items.filter((i) => i.name !== item.name);
    if (charItem) {
      charItem.location = location;
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        items: [...otherItems, charItem],
      }));
    }
  };

  const handleRandomItemsClick = () => {
    // Get six random items
    const randomItems = getStartItems
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    const backpack = addToBackpack(randomItems) as Item[];
    setLeft(not(left, randomItems));
    setRight(backpack);
    const nonItems = character.items.filter((item) => item.type !== "item");
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items: [...backpack, ...nonItems],
    }));
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
        className={`${isChosen ? "h-[374px]" : "h-[230px]"} overflow-auto`}
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
    <div className="flex flex-col gap-4">
      <Button
        variant="contained"
        onClick={handleRandomItemsClick}
        className="self-start"
      >
        Generate Random Items
      </Button>
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
    </div>
  );
};

export default InventoryItems;
