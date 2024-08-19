import { Character } from "@/types/character";
import SettingsBackground from "./SettingsBackground";

type ModalSettingsProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const ModalSettings: React.FC<ModalSettingsProps> = ({
  character,
  setCharacter,
}) => {
  return (
    <div>
      <SettingsBackground character={character} setCharacter={setCharacter} />
    </div>
  );
};

export default ModalSettings;
