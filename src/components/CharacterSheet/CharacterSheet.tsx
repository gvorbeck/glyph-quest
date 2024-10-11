"use client";

import { useEffect, useState } from "react";
import { db, doc, getDoc } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import { Character } from "@/types/character";
import Hero from "./Hero";
import Description from "./Description";
import Stats from "./Stats";
import { updateDocument } from "@/utils/utils";
import { Alert, Box } from "@mui/material";
import Inventory from "./Inventory";
import Notes from "./Notes";
import SkeletonSheet from "./SkeletonSheet";
import Metrics from "./Metrics";

interface CharacterSheetProps {
  characterId: string;
  userId: string;
}

export default function CharacterSheet({
  characterId,
  userId,
}: CharacterSheetProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
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
    // eslint-disable-next-line
  }, [character]);

  if (!character) return <SkeletonSheet />;

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
    <Box
      className={`${
        backgroundClasses[character.settings.wallpaper] || ""
      } bg-[length:100%] bg-no-repeat bg-darkGray grid grid-cols-12 gap-4 p-4`}
    >
      {!user && (
        <Box className="col-span-full">
          <Alert severity="error">
            You are not logged in. No changes will be saved.
          </Alert>
        </Box>
      )}
      {user && user.uid !== userId && (
        <Box className="col-span-full">
          <Alert severity="info">
            You are viewing another user's character. No changes will be saved.
          </Alert>
        </Box>
      )}
      <Hero
        character={character}
        setCharacter={
          setCharacter as React.Dispatch<React.SetStateAction<Character>>
        }
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        className="col-span-full"
      />
      <Stats
        abilities={character.abilities}
        setCharacter={
          setCharacter as React.Dispatch<React.SetStateAction<Character>>
        }
        className="col-span-full"
      />
      <Description
        className="xs:col-span-12 sm:col-span-6"
        details={character.details}
        careers={character.careers}
      />
      <Metrics
        className="xs:col-span-12 sm:col-span-6"
        level={character.level}
        health={character.health}
        healthMax={character.healthMax}
        xp={character.xp}
        items={character.items}
        setCharacter={
          setCharacter as React.Dispatch<React.SetStateAction<Character>>
        }
      />
      <Inventory
        className="col-span-12"
        items={character.items}
        coins={character.coins}
        con={character.abilities.con.value}
        setCharacter={
          setCharacter as React.Dispatch<React.SetStateAction<Character>>
        }
      />
      <Notes
        className="col-span-12"
        character={character}
        setCharacter={
          setCharacter as React.Dispatch<React.SetStateAction<Character>>
        }
      />
    </Box>
  );
}
