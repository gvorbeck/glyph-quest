"use client";

import { useEffect, useState } from "react";
import { db, doc, getDoc } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)
import { Character } from "@/types/character";
import Features from "./Features";
import SecondaryStats from "./SecondaryStats";
import PrimaryStats from "./PrimaryStats";
import Hero from "./Hero";
import GQDivider from "./GQDivider";

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

  if (!character) return <p>Loading character...</p>;

  return (
    <Grid container spacing={2}>
      <Hero character={character} />
      <GQDivider />
      <PrimaryStats character={character} xs={6} />
      <SecondaryStats character={character} xs={6} />
      <GQDivider />
      <Features features={character.feature!} xs={6} />
    </Grid>
  );
}
