import { Box, Skeleton } from "@mui/material";

type CharacterListPageSkeletonProps = {};

const CharacterListPageSkeleton: React.FC<
  CharacterListPageSkeletonProps
> = () => {
  return (
    <>
      <Skeleton variant="rectangular" height={68.5} />
      <Box className="container mx-auto flex flex-col gap-4">
        <Skeleton variant="text" sx={{ fontSize: "4rem" }} className="mb-3" />
      </Box>
    </>
  );
};

export default CharacterListPageSkeleton;
