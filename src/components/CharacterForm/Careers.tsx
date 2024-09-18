import { Button, Typography } from "@mui/material";
import GQSelect from "../GQSelect";
import careersData from "@/data/careers.json";

type CareersProps = {
  career1: string;
  career2: string;
  setCareer1: (value: string) => void;
  setCareer2: (value: string) => void;
};

const Careers: React.FC<CareersProps> = ({
  career1,
  career2,
  setCareer1,
  setCareer2,
}) => {
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
    <div className="flex flex-col gap-4 items-start">
      <Typography variant="h2" className="font-jaini-purva">
        Careers
      </Typography>
      <Typography>
        Select or roll for two careers that will help form your PC's background.
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
        minWidthClassName="min-w-[150px]"
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
        minWidthClassName="min-w-[150px]"
      />

      <div>
        <Typography variant="h6">Selected Careers:</Typography>
        {career1 && (
          <Typography>
            <strong>{career1}</strong>:{" "}
            {careersData.find((c) => c.name === career1)?.equipment.join(", ")}
          </Typography>
        )}
        {career2 && (
          <Typography>
            <strong>{career2}</strong>:{" "}
            {careersData.find((c) => c.name === career2)?.equipment.join(", ")}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Careers;
