import { Box, Divider } from "@mui/material";

type GQDividerProps = {};

const GQDivider: React.FC<
  GQDividerProps & React.ComponentPropsWithRef<"div">
> = ({ className }) => {
  return (
    <Box className={className}>
      <Divider />
    </Box>
  );
};

export default GQDivider;
