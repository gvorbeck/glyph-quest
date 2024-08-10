import { Character } from "@/types/character";

type StepInventoryProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const StepInventory: React.FC<StepInventoryProps> = ({
  character,
  setCharacter,
}) => {
  return (
    <div>
      <h1>StepInventory</h1>
    </div>
  );
};

export default StepInventory;
