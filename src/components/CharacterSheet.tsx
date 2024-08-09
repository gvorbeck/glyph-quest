"use client";

import { useEffect, useState } from "react";
import { db, doc, getDoc } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

interface CharacterSheetProps {
  characterId: string;
}

export default function CharacterSheet({ characterId }: CharacterSheetProps) {
  const [character, setCharacter] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid, "characters", characterId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCharacter(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchCharacter();
  }, [user, characterId]);

  if (!character) return <p>Loading character...</p>;

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-2xl font-bold">{character.name}</h2>
      {/* Display other character details here */}
    </div>
  );
}
