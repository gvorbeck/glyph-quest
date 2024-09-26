import { Box } from "@mui/material";
import Text from "../Text";

type StepWrapperProps = {
  title: string;
  description: string;
  content: React.ReactNode;
  buttons: React.ReactNode;
};

const StepWrapper: React.FC<StepWrapperProps> = ({
  title,
  description,
  content,
  buttons,
}) => {
  return (
    <Box className="flex flex-col gap-4">
      <Box>
        <Text font variant="h2">
          {title}
        </Text>
        <Text>{description}</Text>
      </Box>
      <Box>{content}</Box>
      {buttons}
    </Box>
  );
};

export default StepWrapper;
