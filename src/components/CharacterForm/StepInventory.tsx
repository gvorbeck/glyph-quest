import { Character } from "@/types/character";
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import items from "@/data/items.json";
import { Item } from "@/types/items";

type StepInventoryProps = {
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

const getStartItems = () => {
  return items.filter((item: Item) => item.starter);
};

const StepInventory: React.FC<StepInventoryProps> = ({
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
            <ListItemButton
              key={item.name}
              role="listitem"
              onClick={handleToggle(item)}
            >
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
              {isChosen && <div>chosen dropdown</div>}
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <div className="flex flex-col gap-4">
      <div>{customList("Choices", left, true)}</div>
      <div>
        <div className="flex justify-center gap-4">
          <IconButton
            onClick={handleCheckedAdd}
            disabled={
              leftChecked.length === 0 ||
              right.length >= 6 ||
              leftChecked.length > 6 ||
              leftChecked.length + right.length > 6
            }
            color="primary"
            aria-label="move selected down"
          >
            <KeyboardArrowDownIcon />
          </IconButton>
          <Button
            onClick={handleCheckedRemove}
            disabled={rightChecked.length === 0}
            aria-label="move selected up"
          >
            <KeyboardArrowUpIcon />
          </Button>
        </div>
      </div>
      <div>{customList("Chosen", right, false, true)}</div>
    </div>
  );
};

export default StepInventory;
