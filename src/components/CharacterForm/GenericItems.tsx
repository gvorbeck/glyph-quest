import { useCharacter } from "@/context/CharacterContext";
import { FormControlLabel, Switch, Typography } from "@mui/material";
import InventorySection from "./InventorySection";

type GenericItemsProps = {};

const GenericItems: React.FC<GenericItemsProps> = () => {
  const { character, setCharacter } = useCharacter();

  const toggleEquipment = (item: { name: string; amount: number | string }) => {
    setCharacter((prevCharacter) => {
      const items = [...prevCharacter.items];
      const index = items.findIndex((i) => i.name === item.name);
      if (index === -1) {
        items.push(item);
      } else {
        items.splice(index, 1);
      }
      return {
        ...prevCharacter,
        items,
      };
    });
  };

  const equipmentOptions = [
    { name: "Rations", amount: 2, label: "2 Rations" },
    { name: "Rope", amount: "50'", label: "50' Rope" },
    { name: "Torches", amount: 2, label: "2 Torches" },
    { name: "Quiver", amount: "20 arrows", label: "Quiver of 20 arrows" },
  ];

  return (
    <InventorySection
      title="Generic Items"
      subtitle="Every new character may start with these items."
    >
      <div className="flex gap-4 flex-col">
        {equipmentOptions.map((item) => (
          <FormControlLabel
            key={item.name}
            control={<Switch onChange={() => toggleEquipment(item)} />}
            label={item.label}
          />
        ))}
      </div>
    </InventorySection>
  );
};

export default GenericItems;
