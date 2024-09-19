import { useState, useEffect } from "react";
import Careers from "./Careers";
import { useCharacter } from "@/context/CharacterContext";
import { Typography } from "@mui/material";
import Coins from "./Coins";
import GenericItems from "./GenericItems";
import ArmorPieces from "./ArmorPieces";
import Weapons from "./Weapons";
import SpellBooks from "./SpellBooks";

type StepInventoryProps = {};

// const structureCareers = (careers: string[]) => {
//   return {
//     one: {
//       name: careers[0],
//       inventory:
//         careersData.find((c) => c.name === careers[0])?.equipment || [],
//     },
//     two: {
//       name: careers[1],
//       inventory:
//         careersData.find((c) => c.name === careers[1])?.equipment || [],
//     },
//   };
// };

const StepInventory: React.FC<StepInventoryProps> = ({}) => {
  const { character, setCharacter, inventory, setInventory } = useCharacter();

  useEffect(() => {
    console.log("inventory ahs changed, setCharacter?");
  }, [inventory]);
  // const [careers, setCareers] = useState<CareersType>(
  //   structureCareers(character.careers)
  // );
  // const [inventory, setInventory] = useState<any[]>(character.items);

  // Update character's careers and items in state when selections change
  // useEffect(() => {
  //   const selectedCareers = [career1, career2].filter(Boolean); // Filter out empty strings
  //   const selectedEquipment = selectedCareers.flatMap((careerName) => {
  //     const career = careersData.find((c) => c.name === careerName);
  //     return career ? career.equipment : [];
  //   });

  //   setCharacter((prevCharacter) => ({
  //     ...prevCharacter,
  //     careers: selectedCareers,
  //     items: [
  //       ...selectedEquipment.map((item) => ({
  //         name: item,
  //       })),
  //     ],
  //   }));
  // }, [career1, career2, setCharacter]);

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h2" className="font-jaini-purva">
        Careers & Inventory
      </Typography>
      <Careers
        title="Careers"
        subtitle="Roll or select two careers to build your PC's background."
      />
      <Coins title="Coins" subtitle="Roll or input your starting coins." />
      <GenericItems
        title="Generic Items"
        subtitle="Every PC may start with any of these items."
      />
      <ArmorPieces title="Armor Pieces" subtitle="Select your armor pieces." />
      <Weapons title="Weapons" subtitle="Select your weapons." />
      {!!character.abilities.int.value && (
        <SpellBooks
          title="Spell Books"
          subtitle="Your PC may have one spell book per INT."
        />
      )}
    </div>
  );
};

export default StepInventory;
