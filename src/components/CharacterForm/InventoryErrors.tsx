import { Item } from "@/types/items";
import { Alert } from "@mui/material";

type InventoryErrorsProps = {
  items: readonly Item[];
  setError: React.Dispatch<React.SetStateAction<number>>;
};

const handsError = (items: readonly Item[]) => {
  const hands = items.reduce((acc, item) => {
    if (item.location === "hands" && item.hands) {
      return acc + item.hands;
    }
    return acc;
  }, 0);
  return hands > 2;
};

const beltError = (items: readonly Item[]) => {
  const belt = items.filter((item) => item.location === "belt");
  return belt.length > 2;
};

const InventoryErrors: React.FC<InventoryErrorsProps> = ({
  items,
  setError,
}) => {
  setError(handsError(items) || beltError(items) ? 1 : 0);
  return (
    <>
      {handsError(items) && (
        <Alert severity="error">
          There are too many items in your character's hands.
        </Alert>
      )}
      {beltError(items) && (
        <Alert severity="error">
          There are too many items on your character's belt.
        </Alert>
      )}
    </>
  );
};

export default InventoryErrors;
