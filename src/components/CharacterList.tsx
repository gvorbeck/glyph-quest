"use client";

import { useEffect, useState } from "react";
import { db, collection, getDocs } from "../lib/firebase";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import { deleteDocument } from "@/utils/utils";
import { Character } from "@/types/character";

export default function CharacterList() {
  const { user } = useAuth();
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (!user) return;

      const userCharactersCollection = collection(
        db,
        "users",
        user.uid,
        "characters"
      );
      const characterSnapshot = await getDocs(userCharactersCollection);
      const characterList = characterSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Character[];
      setCharacters(characterList);
    };

    fetchCharacters();
  }, [user]);

  if (!user) return null;

  const backgroundClasses: Record<Character["settings"]["wallpaper"], string> =
    {
      "sheet-hero": "bg-sheet-hero",
      "sheet-wizard": "bg-sheet-wizard",
      "sheet-dwarf": "bg-sheet-dwarf",
      "sheet-cleric": "bg-sheet-cleric",
      "sheet-ranger": "bg-sheet-ranger",
      "sheet-thief": "bg-sheet-thief",
    };

  const getBgOffset = (bg: string) => {
    switch (bg) {
      case "sheet-hero":
        return "19%";
      case "sheet-dwarf":
        return "10%";
      case "sheet-ranger":
        return "21%";
      case "sheet-wizard":
        return "22%";
      case "sheet-cleric":
        return "20%";
      case "sheet-thief":
        return "25%";
      default:
        return "0%";
    }
  };

  return (
    <Box className="flex flex-col gap-4 mt-8">
      {characters.map((character: Character, index) => {
        return (
          <Box key={index}>
            <Paper>
              <Box
                className={`p-4 ${
                  backgroundClasses[
                    character.settings.wallpaper ?? "bg-sheet-hero"
                  ]
                } bg-darkGray flex gap-4 items-center justify-between overflow-hidden relative before:absolute before:bg-darkGray before:rotate-45 before:border-solid before:border-l-[25px] before:h-[200px] before:w-[200px] before:z-10 before:block before:left-[42%] before:top-[0%]`}
                sx={{
                  backgroundSize: "50%",
                  backgroundRepeat: "no-repeat",
                  backgroundPositionY: getBgOffset(
                    character.settings.wallpaper ?? "bg-sheet-hero"
                  ),
                }}
              >
                <Typography
                  variant="h3"
                  className="font-jaini-purva text-amber [text-shadow:2px_2px_black] z-20"
                >
                  {character.name}
                </Typography>
                <div className="flex gap-4 z-20">
                  <Link href={`/characters/${character.id}`}>
                    <Button variant="contained">Character Sheet</Button>
                  </Link>
                  <Button
                    variant="contained"
                    onClick={() =>
                      deleteDocument({
                        collection: "characters",
                        docId: character.id!,
                        uid: user.uid,
                      })
                    }
                  >
                    Delete
                  </Button>
                </div>
              </Box>
            </Paper>
          </Box>
        );
      })}
    </Box>
    // <div className="grid gap-4">
    //   {characters.map((character, index) => (
    //     <div className="p-4 border border-gray-300 rounded" key={index}>
    //       <h2 className="text-xl font-bold">{character.name}</h2>
    //       {/* Add other character details here */}
    // <Link key={character.id} href={`/characters/${character.id}`}>
    //   <Button variant="contained">View Character</Button>
    // </Link>
    // <Button
    //   variant="contained"
    //   onClick={() =>
    //     deleteDocument({
    //       collection: "characters",
    //       docId: character.id,
    //       uid: user.uid,
    //     })
    //   }
    // >
    //   Delete Character
    // </Button>
    //     </div>
    //   ))}
    // </div>
  );
}
