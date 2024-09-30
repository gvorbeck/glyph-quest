import { Box, Skeleton } from "@mui/material";

type SkeletonSheetProps = {};

const SkeletonSheet: React.FC<SkeletonSheetProps> = () => {
  return (
    <Box className="[&_span]:lg:max-w-[1000px] flex flex-col gap-4">
      <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
      <Skeleton variant="rectangular" height={250} />
      <Skeleton variant="rectangular" height={250} />
    </Box>
  );
};

export default SkeletonSheet;
