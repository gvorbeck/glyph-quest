"use client";

import { useEffect, useState } from "react";
import { db, collection, getDocs } from "../lib/firebase";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Button } from "@mui/material";
import { deleteDocument } from "@/utils/utils";

interface Character {
  id: string;
  name: string;
  // Add other character fields as needed
}

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

  return (
    <div className="grid gap-4">
      {characters.map((character) => (
        <div className="p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-bold">{character.name}</h2>
          {/* Add other character details here */}
          <Link key={character.id} href={`/characters/${character.id}`}>
            <Button variant="contained">View Character</Button>
          </Link>
          <Button
            variant="contained"
            onClick={() =>
              deleteDocument({
                collection: "characters",
                docId: character.id,
                uid: user.uid,
              })
            }
          >
            Delete Character
          </Button>
        </div>
      ))}
    </div>
  );
}
