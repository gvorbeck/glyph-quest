import { Button } from "@mui/material";
import GQSelect from "../GQSelect";
import careersData from "@/data/careers.json";
import InventorySection from "./InventorySection";
import { useCharacter } from "@/context/CharacterContext";
import { Item, TypeOption } from "@/types/items";

type CareersProps = {
  title: string;
  subtitle: string;
};

const Careers: React.FC<CareersProps> = ({ title, subtitle }) => {
  const { setCharacter, character } = useCharacter();

  // Select two unique and random careers from careersData
  const handleClick = () => {
    const careers = careersData.map((c) => c.name);
    const [career1, career2] = (() => {
      let [first, second] = [
        careers[Math.floor(Math.random() * careers.length)],
        careers[Math.floor(Math.random() * careers.length)],
      ];
      while (second === first) {
        second = careers[Math.floor(Math.random() * careers.length)];
      }
      return [first, second];
    })();

    const existingItems = [...character.items].filter(
      (item) => item.type !== "career"
    );
    // Get equipment from career1 and career2 as Item[]
    const newCareerItems = [career1, career2].reduce((acc, career) => {
      const careerData = careersData.find((c) => c.name === career);
      if (careerData) {
        acc.push(
          ...careerData.equipment.map((item) => ({
            name: item,
            slots: 1,
            type: "career" as TypeOption,
          }))
        );
      }
      return acc;
    }, [] as Item[]);

    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      careers: [career1, career2],
      items: [...existingItems, ...newCareerItems],
    }));
  };

  const getCareerOptions = (careerKey: "one" | "two") => {
    const otherCareer =
      careerKey === "one"
        ? character.careers[1] || ""
        : character.careers[0] || "";
    return careersData
      .filter((career) => career.name !== otherCareer)
      .map((career) => ({
        value: career.name,
        label: career.name,
      }));
  };

  const handleChangeCareer = (event: any, careerKey: 0 | 1) => {
    const newCareer = event.target.value as string;
    const newCareerEquipment = careersData.find(
      (c) => c.name === newCareer
    )?.equipment;

    // Create a copy of the current careers
    const newCareers = [...character.careers];
    const oldCareer = newCareers[careerKey]; // Get the old career
    newCareers[careerKey] = newCareer; // Replace with the new career

    // Filter out the equipment of the old career only
    const newItems = [...character.items].filter((item) => {
      const otherCareerKey = careerKey === 0 ? 1 : 0;
      const otherCareer = newCareers[otherCareerKey]; // Get the other career
      return (
        item.type !== "career" ||
        (item.type === "career" && item.source === otherCareer)
      );
    });

    // Add the new career's equipment
    if (newCareerEquipment) {
      newItems.push(
        ...newCareerEquipment.map((item) => ({
          name: item,
          slots: 1,
          type: "career" as TypeOption,
          source: newCareer, // Add source for filtering later
        }))
      );
    }

    // Update character state
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      careers: newCareers,
      items: newItems,
    }));
  };

  return (
    <InventorySection title={title} subtitle={subtitle}>
      <Button variant="outlined" className="self-start" onClick={handleClick}>
        Roll two careers
      </Button>
      <div className="self-start min-w-[150px]">
        <GQSelect
          label="Select Career 1"
          labelId="select-career-one"
          value={character.careers[0] || ""}
          options={getCareerOptions("one")}
          onChange={(e) => handleChangeCareer(e, 0)}
          className="self-start"
        />
      </div>
      <div className="self-start min-w-[150px]">
        <GQSelect
          label="Select Career 2"
          labelId="select-career-two"
          value={character.careers[1] || ""}
          options={getCareerOptions("two")}
          onChange={(e) => handleChangeCareer(e, 1)}
          className="self-start"
          disabled={!character.careers[0]}
        />
      </div>
    </InventorySection>
  );
};

export default Careers;
