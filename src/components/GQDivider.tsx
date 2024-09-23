import { Box, Divider } from "@mui/material";

type GQDividerProps = {};

const GQDivider: React.FC<GQDividerProps> = () => {
  return (
    <Box className="col-span-full">
      <Divider />
    </Box>
  );
};

export default GQDivider;
