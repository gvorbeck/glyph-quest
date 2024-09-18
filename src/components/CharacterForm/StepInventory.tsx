import { Character } from "@/types/character";
import { useState, useEffect } from "react";
import careersData from "@/data/careers.json";
import Careers from "./Careers";
import Inventory from "./Inventory";
import { useCharacter } from "@/context/CharacterContext";

type StepInventoryProps = {};

const StepInventory: React.FC<StepInventoryProps> = ({}) => {
  const { character, setCharacter } = useCharacter();
  // State to store the selected careers, initialized with existing character data
  const [career1, setCareer1] = useState<string>(character.careers[0] || "");
  const [career2, setCareer2] = useState<string>(character.careers[1] || "");

  // Update character's careers and items in state when selections change
  useEffect(() => {
    const selectedCareers = [career1, career2].filter(Boolean); // Filter out empty strings
    const selectedEquipment = selectedCareers.flatMap((careerName) => {
      const career = careersData.find((c) => c.name === careerName);
      return career ? career.equipment : [];
    });

    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      careers: selectedCareers,
      items: [
        ...selectedEquipment.map((item) => ({
          name: item,
        })),
      ],
    }));
  }, [career1, career2, setCharacter]);

  return (
    <div className="flex flex-col gap-6">
      <Careers
        career1={career1}
        career2={career2}
        setCareer1={setCareer1}
        setCareer2={setCareer2}
      />
      <Inventory character={character} />
    </div>
  );
};

export default StepInventory;
