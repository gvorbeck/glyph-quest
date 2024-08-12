import { Character } from "@/types/character";

type StepNameProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const StepName: React.FC<StepNameProps> = () => {
  return <div>StepName</div>;
};

export default StepName;
