import { Character } from "@/types/character";
import { Box, Chip, Tooltip, capitalize } from "@mui/material";
import Text from "../Text";

type DescriptionProps = {
  details: Character["details"];
  careers: Character["careers"];
};

const Description: React.FC<
  DescriptionProps & React.ComponentPropsWithRef<"div">
> = ({ details, careers, className }) => {
  const classNames = [
    "flex flex-col gap-2 bg-darkGray/75 p-2 rounded",
    className,
  ].join(" ");

  // Filter out empty or undefined values from details
  const detailsArr = Object.entries(details)
    .filter(([key, value]) => value && value.trim() !== "")
    .sort();

  return (
    <Box className={classNames}>
      {/* Careers Section */}
      <Text variant="h3" font className="text-3xl">
        Careers
      </Text>
      <div className="flex gap-2">
        {careers.map((career: string) => (
          <Chip label={capitalize(career)} key={career} />
        ))}
      </div>

      {/* Only show details section if there are valid details */}
      {detailsArr.length > 0 && (
        <>
          <Text variant="h3" font className="text-3xl">
            Details
          </Text>
          <div className="flex gap-2 flex-wrap">
            {detailsArr.map(([key, value]) => (
              <Tooltip title={capitalize(key)} key={key}>
                <Chip label={capitalize(value || "")} />
              </Tooltip>
            ))}
          </div>
        </>
      )}
    </Box>
  );
};

export default Description;
