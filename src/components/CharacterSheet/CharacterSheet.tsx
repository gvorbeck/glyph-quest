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
  Grade,
  MilitaryTech,
  Paid,
  Psychology,
  Shield,
  TrendingUp,
} from "@mui/icons-material";
import { getArmorRating, getAttackBonus, updateDocument } from "@/utils/utils";
import { Alert, InputAdornment, TextField } from "@mui/material";
import Inventory from "./Inventory";
import Notes from "./Notes";
import SkeletonSheet from "./SkeletonSheet";
import SwordFiller from "@/svg/SwordFiller";
import LevelUp from "./LevelUp";

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

  if (!character) return <SkeletonSheet />;

  const handleXPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacter(
      (prevCharacter) =>
        ({
          ...prevCharacter,
          xp: parseInt(e.target.value),
        } as Character)
    );
  };

  const handleGoldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacter(
      (prevCharacter) =>
        ({
          ...prevCharacter,
          gold: parseInt(e.target.value),
        } as Character)
    );
  };

  const handleHealthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!setCharacter || !character) return;
    setCharacter(
      (prevCharacter) =>
        ({
          ...prevCharacter,
          health: parseInt(value),
        } as Character)
    );
  };

  const iconSizeClassNames = "w-10 h-10";

  const primaryStats = [
    {
      icon: <FitnessCenter className={iconSizeClassNames} />,
      primary: character.abilities.str.short,
      secondary: character.abilities.str.value,
    },
    {
      icon: <DirectionsRun className={iconSizeClassNames} />,
      primary: character.abilities.dex.short,
      secondary: character.abilities.dex.value,
    },
    {
      icon: <Psychology className={iconSizeClassNames} />,
      primary: character.abilities.wil.short,
      secondary: character.abilities.wil.value,
    },
  ];

  const secondaryStats = [
    {
      icon: <MilitaryTech className={iconSizeClassNames} />,
      primary: "Attack",
      secondary: `+${getAttackBonus(character)}`,
    },
    {
      icon: <Shield className={iconSizeClassNames} />,
      primary: "Armor",
      secondary: getArmorRating(character),
    },
    {
      icon: <Favorite className={iconSizeClassNames} />,
      primary: "Health",
      secondary: (
        <TextField
          size="small"
          type="number"
          className="[&_input]:py-1 [&_input]:w-12 [&_input]:text-xl"
          value={character.health}
          onChange={handleHealthChange}
          InputProps={{
            inputProps: { min: 0 },
            endAdornment: (
              <InputAdornment
                position="end"
                className="opacity-70 text-xl"
                component="span"
              >
                /{character.healthMax}
              </InputAdornment>
            ),
          }}
        />
      ),
    },
  ];

  const tertiaryStats = [
    {
      icon: <Grade className={iconSizeClassNames} />,
      primary: "Level",
      secondary: (
        <LevelUp
          character={character}
          setCharacter={
            setCharacter as React.Dispatch<React.SetStateAction<Character>>
          }
        />
      ),
    },
    {
      icon: <TrendingUp className={iconSizeClassNames} />,
      primary: "XP",
      secondary: (
        <TextField
          size="small"
          type="number"
          className="[&_input]:py-1 [&_input]:w-11 [&_input]:text-xl"
          value={character.xp}
          onChange={handleXPChange}
        />
      ),
    },
    {
      icon: <Paid className={iconSizeClassNames} />,
      primary: "Gold",
      secondary: (
        <TextField
          size="small"
          type="number"
          className="[&_input]:py-1 [&_input]:w-16 [&_input]:text-xl"
          value={character.gold}
          onChange={handleGoldChange}
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

  const statTitleClassNames =
    "[&>div]:h-full [&_p]:font-jaini-purva [&_p]:text-6xl [&_div_div_div]:text-4xl";

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
        <Stats stats={tertiaryStats} xs={4} className={statTitleClassNames} />
        <Stats stats={primaryStats} xs={4} className={statTitleClassNames} />
        <Stats stats={secondaryStats} xs={4} className={statTitleClassNames} />
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
