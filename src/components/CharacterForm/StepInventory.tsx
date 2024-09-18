import { Character } from "@/types/character";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import careersData from "@/data/careers.json";
import GQSelect from "../GQSelect";

type StepInventoryProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const StepInventory: React.FC<StepInventoryProps> = ({
  character,
  setCharacter,
}) => {
  // State to store the selected careers
  const [career1, setCareer1] = useState<string>(character.careers[0] || "");
  const [career2, setCareer2] = useState<string>(character.careers[1] || "");

  // Handle selecting careers
  const handleChangeCareer1 = (event: any) => {
    setCareer1(event.target.value);
  };

  const handleChangeCareer2 = (event: any) => {
    setCareer2(event.target.value);
  };

  // Get filtered options for each select to prevent duplicate selections
  const careerOptions1 = careersData.filter(
    (career) => career.name !== career2
  );
  const careerOptions2 = careersData.filter(
    (career) => career.name !== career1
  );

  // Roll two random careers
  const handleRollCareers = () => {
    const randomCareers = [...careersData]
      .sort(() => 0.5 - Math.random()) // Shuffle the array
      .slice(0, 2); // Take first 2 items
    setCareer1(randomCareers[0].name);
    setCareer2(randomCareers[1].name);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 items-start">
        <Typography variant="h2" className="font-jaini-purva">
          Careers
        </Typography>
        <Typography>
          Select or roll for two careers that will help form your PC's
          background.
        </Typography>

        <Button variant="outlined" onClick={handleRollCareers}>
          Roll Two Careers
        </Button>

        {/* Select for Career 1 */}
        <GQSelect
          label="Select Career 1"
          labelId="select-career-one"
          onChange={handleChangeCareer1}
          options={careerOptions1.map((career) => ({
            value: career.name,
            label: career.name,
          }))}
          value={career1}
          className="w-max"
        />

        {/* Select for Career 2 */}
        <GQSelect
          label="Select Career 2"
          labelId="select-career-two"
          onChange={handleChangeCareer2}
          options={careerOptions2.map((career) => ({
            value: career.name,
            label: career.name,
          }))}
          value={career2}
        />

        <div>
          <Typography variant="h6">Selected Careers:</Typography>
          {career1 && (
            <Typography>
              <strong>{career1}</strong>:{" "}
              {careersData
                .find((c) => c.name === career1)
                ?.equipment.join(", ")}
            </Typography>
          )}
          {career2 && (
            <Typography>
              <strong>{career2}</strong>:{" "}
              {careersData
                .find((c) => c.name === career2)
                ?.equipment.join(", ")}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepInventory;
