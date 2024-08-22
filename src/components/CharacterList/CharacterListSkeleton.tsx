import { Box, Skeleton } from "@mui/material";

type CharacterListSkeletonProps = {};

const CharacterListSkeleton: React.FC<CharacterListSkeletonProps> = () => {
  return (
    <Box className="flex flex-col gap-4 mt-8">
      <Skeleton variant="rectangular" height={88.02} />
      <Skeleton variant="rectangular" height={88.02} />
      <Skeleton variant="rectangular" height={88.02} />
    </Box>
  );
};

export default CharacterListSkeleton;
