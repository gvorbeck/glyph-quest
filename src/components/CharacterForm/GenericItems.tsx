import { useCharacter } from "@/context/CharacterContext";
import { FormControlLabel, Switch } from "@mui/material";
import InventorySection from "./InventorySection";
import { ChangeEvent } from "react";

type GenericItemsProps = {
  title: string;
  subtitle: string;
  process: () => void;
};

type GenericNames = "rations" | "rope" | "torches" | "arrows";
type GenericItemsType = {
  name: GenericNames;
  amount: number | string;
};

const equipmentOptions = [
  { name: "Rations", amount: 2, label: "2 Rations" },
  { name: "Rope", amount: "50'", label: "50' Rope" },
  { name: "Torches", amount: 2, label: "2 Torches" },
  { name: "Quiver", amount: "20 arrows", label: "Quiver of 20 arrows" },
];

const GenericItems: React.FC<GenericItemsProps> = ({
  title,
  subtitle,
  process,
}) => {
  const { character, setCharacter } = useCharacter();

  const toggleEquipment = (
    e: ChangeEvent<HTMLInputElement>,
    item: GenericItemsType
  ) => {
    console.log("e", e.target.checked);
    console.log("item", item);
    if (e.target.checked) {
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        items: [
          ...prevCharacter.items,
          {
            name: item.name,
            slots: 1,
            amount: item.amount,
            type: "generic",
          },
        ],
      }));
    } else {
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        items: prevCharacter.items.filter((i) => i.name !== item.name),
      }));
    }
  };

  return (
    <InventorySection title={title} subtitle={subtitle}>
      <div className="flex gap-1 flex-col">
        {equipmentOptions.map((item) => (
          <FormControlLabel
            key={item.name}
            control={
              <Switch
                onChange={(e) => toggleEquipment(e, item as GenericItemsType)}
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
