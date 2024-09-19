import { useCharacter } from "@/context/CharacterContext";
import { FormControlLabel, Switch } from "@mui/material";
import InventorySection from "./InventorySection";
import { set } from "firebase/database";

type GenericItemsProps = {
  title: string;
  subtitle: string;
};

type GenericNames = "rations" | "rope" | "torches" | "arrows";
type GenericItemsType = {
  name: GenericNames;
  amount: number | string;
};

const equipmentOptions = [
  { name: "rations", amount: 2, label: "2 Rations" },
  { name: "rope", amount: "50'", label: "50' Rope" },
  { name: "torches", amount: 2, label: "2 Torches" },
  { name: "arrows", amount: "20 arrows", label: "Quiver of 20 arrows" },
];

const GenericItems: React.FC<GenericItemsProps> = ({ title, subtitle }) => {
  const { setInventory } = useCharacter();

  const toggleEquipment = (item: GenericItemsType) => {
    setInventory((prevInventory) => {
      const generic = { ...prevInventory.generic };
      generic[item.name] = !generic[item.name];
      return {
        ...prevInventory,
        generic,
      };
    });
  };

  return (
    <InventorySection title={title} subtitle={subtitle}>
      <div className="flex gap-1 flex-col">
        {equipmentOptions.map((item) => (
          <FormControlLabel
            key={item.name}
            control={
              <Switch
                onChange={() => toggleEquipment(item as GenericItemsType)}
              />
            }
            label={item.label}
          />
        ))}
      </div>
    </InventorySection>
  );
};

export default GenericItems;
