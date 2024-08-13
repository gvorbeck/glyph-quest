"use client";

import { useEffect, useState } from "react";
import { db, doc, getDoc } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)
import { Character } from "@/types/character";
import { getArmorRating, getAttackBonus, getFeatureTitle } from "@/utils/utils";

interface CharacterSheetProps {
  characterId: string;
}

export default function CharacterSheet({ characterId }: CharacterSheetProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid, "characters", characterId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCharacter(docSnap.data() as Character);
      } else {
        console.error("No such document!");
      }
    };

    fetchCharacter();
  }, [user, characterId]);

  const GridItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  if (!character) return <p>Loading character...</p>;

  return (
    <Grid container spacing={2}>
      <Grid xs={8}>
        <Typography variant="h2">{character.name}</Typography>
      </Grid>
      <Grid xs={4}>
        <List>
          <ListItem>
            <ListItemText primary="Level" secondary={character.level} />
          </ListItem>
          <ListItem>
            <ListItemText primary="XP" secondary={character.xp} />
          </ListItem>
        </List>
      </Grid>
      <Grid xs={12}>
        <Divider />
      </Grid>
      <Grid xs={6}>
        <List>
          <ListItem>
            <ListItemText
              primary={character.abilities.str.short}
              secondary={character.abilities.str.value}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={character.abilities.dex.short}
              secondary={character.abilities.dex.value}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={character.abilities.wil.short}
              secondary={character.abilities.wil.value}
            />
          </ListItem>
        </List>
      </Grid>
      <Grid xs={6}>
        <List>
          <ListItem>
            <ListItemText
              primary="Attack"
              secondary={`+${getAttackBonus(character)}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Armor"
              secondary={getArmorRating(character)}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Health" secondary={character.health} />
          </ListItem>
        </List>
      </Grid>
      <Grid xs={12}>
        <Divider />
      </Grid>
      <Grid xs={12}>
        <Typography variant="h3">Features</Typography>
        <List>
          {character.feature?.map((feature) => (
            <ListItem>
              <ListItemText primary={getFeatureTitle(feature)} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
