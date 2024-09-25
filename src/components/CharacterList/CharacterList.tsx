"use client";

import { MouseEvent, useEffect, useState } from "react";
import { db, collection, getDocs } from "../../lib/firebase";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { Box, Button, Paper, Popover, Typography } from "@mui/material";
import { deleteDocument } from "@/utils/utils";
import { Character } from "@/types/character";
import useSnackbar from "@/hooks/useSnackbar";
import CharacterListSkeleton from "./CharacterListSkeleton";
import Text from "../Text";
import usePopover from "@/hooks/usePopover";

export default function CharacterList() {
  const { user } = useAuth();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  ); // Track the character to delete
  const { snackbar, showSnackbar } = useSnackbar();
  const { openPopover, closePopover, popoverProps } = usePopover();

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
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters();
  }, [user]);

  if (!user) return null;

  const handleDelete = async () => {
    if (selectedCharacterId) {
      try {
        await deleteDocument({
          collection: "characters",
          docId: selectedCharacterId,
          uid: user.uid,
        });
        fetchCharacters();
        showSnackbar("Character deleted successfully.", "success");
      } catch (error) {
        showSnackbar("Failed to delete character.", "error");
      }
    }
    closePopover();
  };

  const handleDeletePopover = (
    e: MouseEvent<HTMLButtonElement>,
    characterId: string
  ) => {
    setSelectedCharacterId(characterId);
    openPopover(e);
  };

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

  if (loading) return <CharacterListSkeleton />;

  return (
    <Box className="flex flex-col gap-4 mt-8">
      {characters.length === 0 && (
        <Text>
          You have no characters yet.{" "}
          <Link href="/characters/new" className="text-amber underline">
            Create one
          </Link>{" "}
          to get started.
        </Text>
      )}
      {characters.map((character: Character, index) => (
        <Box key={index}>
          <Paper>
            <div
              className={`${
                backgroundClasses[
                  character.settings.wallpaper ?? "bg-sheet-hero"
                ]
              } bg-darkGray relative overflow-hidden p-4 flex flex-col gap-4 bg-no-repeat xs:bg-cover md:bg-[length:50%] md:bg-right-top md:before:absolute md:before:bg-darkGray md:before:rotate-[135deg] md:before:border-solid md:before:border-l-[20px] md:before:h-[400px] md:before:w-[200px] md:before:z-10 md:before:block md:before:left-[42%] md:before:top-[-5%]`}
            >
              <Text
                font
                className="text-2xl text-amber [text-shadow:2px_2px_black] z-20 truncate bg-darkGray/75 sm:bg-darkGray/0 p-1 sm:p-0 rounded"
              >
                {character.name}
              </Text>
              <div className="flex justify-between">
                <Link href={`/characters/${user.uid}-${character.id}`}>
                  <Button variant="contained">Character Sheet</Button>
                </Link>
                <Button
                  variant="contained"
                  onClick={(e) => handleDeletePopover(e, character.id!)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Paper>
        </Box>
      ))}
      {/* Confirmation Popover */}
      <Popover {...popoverProps}>
        <Box className="p-4">
          <Typography variant="h6">Confirm Deletion</Typography>
          <Typography className="mb-4">
            Are you sure you want to delete this character? This action cannot
            be undone.
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" onClick={closePopover}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Box>
      </Popover>
      {snackbar}
    </Box>
  );
}
