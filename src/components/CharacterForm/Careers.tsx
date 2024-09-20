import { Button, SelectChangeEvent, Typography } from "@mui/material";
import GQSelect from "../GQSelect";
import careersData from "@/data/careers.json";
import { CareersType } from "@/types/character";
import InventorySection from "./InventorySection";
import { useCharacter } from "@/context/CharacterContext";
import { FormEvent, useEffect } from "react";

type CareersProps = {
  title: string;
  subtitle: string;
  process: () => void;
};

const Careers: React.FC<CareersProps> = ({ title, subtitle, process }) => {
  const { inventory, setInventory } = useCharacter();

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

    const careerObjs = [career1, career2].map((career) => ({
      name: career,
      inventory: careersData.find((c) => c.name === career)?.equipment || [],
    }));

    setInventory((prevInventory) => ({
      ...prevInventory,
      careers: {
        one: {
          name: careerObjs[0].name,
          inventory: careerObjs[0].inventory,
        },
        two: {
          name: careerObjs[1].name,
          inventory: careerObjs[1].inventory,
        },
      },
    }));
  };

  const getCareerOptions = (careerKey: "one" | "two") => {
    const otherCareer =
      careerKey === "one"
        ? inventory.careers.two.name
        : inventory.careers.one.name;
    return careersData
      .filter((career) => career.name !== otherCareer)
      .map((career) => ({
        value: career.name,
        label: career.name,
      }));
  };

  const handleChangeCareer = (event: any, careerKey: "one" | "two") => {
    const newCareer = event.target.value as string;
    const careerData = careersData.find((c) => c.name === newCareer);

    setInventory((prevInventory) => ({
      ...prevInventory,
      careers: {
        ...prevInventory.careers,
        [careerKey]: {
          name: newCareer,
          inventory: careerData?.equipment || [],
        },
      },
    }));
  };

  useEffect(() => {
    console.log("process careers");
    process();
  }, [inventory.careers]);

  return (
    <InventorySection title={title} subtitle={subtitle}>
      <Button variant="outlined" className="self-start" onClick={handleClick}>
        Roll two careers
      </Button>
      <div className="self-start min-w-[150px]">
        <GQSelect
          label="Select Career 1"
          labelId="select-career-one"
          value={inventory.careers.one.name}
          options={getCareerOptions("one")}
          onChange={(e) => handleChangeCareer(e, "one")}
          className="self-start"
        />
      </div>
      <div className="self-start min-w-[150px]">
        <GQSelect
          label="Select Career 2"
          labelId="select-career-two"
          value={inventory.careers.two.name}
          options={getCareerOptions("two")}
          onChange={(e) => handleChangeCareer(e, "two")}
          className="self-start"
        />
      </div>
    </InventorySection>
  );
};

export default Careers;
