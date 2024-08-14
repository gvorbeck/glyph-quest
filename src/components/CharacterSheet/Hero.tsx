import { Character } from "@/types/character";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)
import Stats from "./Stats";
import { Grade, TrendingUp } from "@mui/icons-material";

type HeroProps = {
  character: Character;
};

const Hero: React.FC<HeroProps> = ({ character }) => {
  const stats = [
    {
      icon: <Grade />,
      primary: "Level",
      secondary: character.level,
    },
    {
      icon: <TrendingUp />,
      primary: "XP",
      secondary: character.xp,
    },
  ];

  return (
    <>
      <Grid xs={8} className="flex flex-col gap-4">
        <Typography variant="h2">{character.name}</Typography>
      </Grid>
      <Stats xs={4} stats={stats} />
    </>
  );
};

export default Hero;
