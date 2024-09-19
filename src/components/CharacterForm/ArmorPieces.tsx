import { useCharacter } from "@/context/CharacterContext";
import InventorySection from "./InventorySection";
import { FormControlLabel, Switch } from "@mui/material";
import { InventoryType } from "@/types/character";
import { camelCase } from "@/utils/utils";

type ArmorPiecesProps = {
  title: string;
  subtitle: string;
};

const equipmentOptions = [
  "Shield",
  "Helmet",
  "Gambeson",
  "Mail shirt",
  "Breastplate",
  "Arm plate",
  "Leg plate",
];

const ArmorPieces: React.FC<ArmorPiecesProps> = ({ title, subtitle }) => {
  const { setInventory } = useCharacter();

  const toggleArmor = (item: keyof InventoryType["armor"]) => {
    setInventory((prevInventory) => {
      const armor = { ...prevInventory.armor };
      armor[item] = !armor[item];
      return {
        ...prevInventory,
        armor,
      };
    });
  };

  return (
    <InventorySection title={title} subtitle={subtitle}>
      <div className="flex gap-1 flex-col">
        {equipmentOptions.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Switch
                onChange={() =>
                  toggleArmor(camelCase(item) as keyof InventoryType["armor"])
                }
              />
            }
            label={item}
          />
        ))}
      </div>
    </InventorySection>
  );
};

export default ArmorPieces;
