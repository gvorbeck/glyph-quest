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
import { Alert, InputAdornment, TextField } from "@mui/material";
import Inventory from "./Inventory";
import Notes from "./Notes";

interface CharacterSheetProps {
  characterId: string;
  userId: string;
}

export default function CharacterSheet({
  characterId,
  userId,
}: CharacterSheetProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const { user } = useAuth();

  /**
   * * Get character data from Firestore
   */
  useEffect(() => {
    const fetchCharacter = async () => {
      // if (!user) return;
      const docRef = doc(db, "users", userId, "characters", characterId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCharacter(docSnap.data() as Character);
      } else {
        console.error("No such document!");
      }
    };

    fetchCharacter();
  }, [userId, characterId]);

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
          InputProps={{
            inputProps: { min: 0 },
            endAdornment: (
              <InputAdornment position="end" className="opacity-70">
                /{character.healthMax}
              </InputAdornment>
            ),
          }}
        />
      ),
    },
  ];

  const backgroundClasses: Record<Character["settings"]["wallpaper"], string> =
    {
      "sheet-hero": "bg-sheet-hero",
      "sheet-wizard": "bg-sheet-wizard",
      "sheet-dwarf": "bg-sheet-dwarf",
      "sheet-cleric": "bg-sheet-cleric",
      "sheet-ranger": "bg-sheet-ranger",
      "sheet-thief": "bg-sheet-thief",
    };

  return (
    <>
      <Grid
        container
        spacing={2}
        className={`${
          backgroundClasses[character.settings.wallpaper] || ""
        } bg-contain bg-no-repeat bg-darkGray`}
      >
        {!user && (
          <Grid xs={12}>
            <Alert severity="error">
              You are not logged in. No changes will be saved.
            </Alert>
          </Grid>
        )}
        {user && user.uid !== userId && (
          <Grid xs={12}>
            <Alert severity="info">
              You are viewing another user's character. No changes will be
              saved.
            </Alert>
          </Grid>
        )}
        <Hero
          character={character}
          setCharacter={
            setCharacter as React.Dispatch<React.SetStateAction<Character>>
          }
        />
        <GQDivider />
        <Stats stats={primaryStats} xs={6} className="[&>div]:h-full" />
        <Stats stats={secondaryStats} xs={6} className="[&>div]:h-full" />
        <GQDivider />
        <Grid xs={6} className="p-0">
          <Features
            character={character}
            setCharacter={
              setCharacter as React.Dispatch<React.SetStateAction<Character>>
            }
            xs={12}
          />
          <Description details={character.details} xs={12} />
        </Grid>
        <Inventory
          xs={6}
          character={character}
          setCharacter={
            setCharacter as React.Dispatch<React.SetStateAction<Character>>
          }
        />
        <GQDivider />
        <Notes
          xs={12}
          character={character}
          setCharacter={
            setCharacter as React.Dispatch<React.SetStateAction<Character>>
          }
        />
      </Grid>
    </>
  );
}
