import { useCharacter } from "@/context/CharacterContext";
import InventorySection from "./InventorySection";
import { FormControlLabel, Switch } from "@mui/material";
import { InventoryType } from "@/types/character";
import { camelCase } from "@/utils/utils";
import { ChangeEvent, useEffect } from "react";
import { Item } from "@/types/items";

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
  const { setCharacter } = useCharacter();

  const toggleArmor = (e: ChangeEvent<HTMLInputElement>, item: Item) => {
    if (e.target.checked) {
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        items: [...prevCharacter.items, item],
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
            key={item}
            control={
              <Switch
                onChange={(e) =>
                  toggleArmor(e, {
                    name: item,
                    slots: 1,
                    amount: 1,
                    type: "armor",
                    armorPoints: 1,
                  })
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
