"use client";

import { useEffect, useState } from "react";
import { db, doc, getDoc } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2 (unstable)
import { Character } from "@/types/character";
import Features from "./Features";
import Hero from "./Hero";
import GQDivider from "../GQDivider";
import Description from "./Description";
import Stats from "./Stats";
import {
  DirectionsRun,
  Favorite,
  FitnessCenter,
  MilitaryTech,
  Psychology,
  Shield,
} from "@mui/icons-material";
import { getArmorRating, getAttackBonus, updateDocument } from "@/utils/utils";
import { TextField } from "@mui/material";
import Inventory from "./Inventory";

interface CharacterSheetProps {
  characterId: string;
}

export default function CharacterSheet({ characterId }: CharacterSheetProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const { user } = useAuth();

  /**
   * * Get character data from Firestore
   */
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

  /**
   * * Update Firestore document when character state changes
   */
  useEffect(() => {
    console.log(character);
    if (!user || !character) return;
    // update Firestore document
    updateDocument({
      collection: "users",
      docId: user.uid,
      subCollection: "characters",
      subDocId: characterId,
      data: { ...character },
    });
  }, [character]);

  if (!character) return <p>Loading character...</p>;

  const primaryStats = [
    {
      icon: <FitnessCenter />,
      primary: character.abilities.str.short,
      secondary: character.abilities.str.value,
    },
    {
      icon: <DirectionsRun />,
      primary: character.abilities.dex.short,
      secondary: character.abilities.dex.value,
    },
    {
      icon: <Psychology />,
      primary: character.abilities.wil.short,
      secondary: character.abilities.wil.value,
    },
  ];

  const secondaryStats = [
    {
      icon: <MilitaryTech />,
      primary: "Attack",
      secondary: `+${getAttackBonus(character)}`,
    },
    {
      icon: <Shield />,
      primary: "Armor",
      secondary: getArmorRating(character),
    },
    {
      icon: <Favorite />,
      primary: "Health",
      secondary: (
        <TextField
          size="small"
          type="number"
          className="[&_input]:!text-sm [&_input]:py-1"
          value={character.health}
        />
      ),
    },
  ];

  return (
    <Grid
      container
      spacing={2}
      className="bg-sheet-dwarf bg-contain bg-no-repeat bg-darkGray"
    >
      <Hero
        character={character}
        setCharacter={
          setCharacter as React.Dispatch<React.SetStateAction<Character>>
        }
      />
      <GQDivider />
      <Stats stats={primaryStats} xs={6} />
      <Stats stats={secondaryStats} xs={6} />
      <GQDivider />
      <Features
        character={character}
        setCharacter={
          setCharacter as React.Dispatch<React.SetStateAction<Character>>
        }
        xs={6}
      />
      <Inventory
        xs={6}
        character={character}
        setCharacter={
          setCharacter as React.Dispatch<React.SetStateAction<Character>>
        }
      />
      <GQDivider />
      <Description details={character.details} xs={6} />
    </Grid>
  );
}
