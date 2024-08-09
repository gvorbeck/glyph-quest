"use client";

import { useState } from "react";
import { db, collection, addDoc } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function CharacterForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  const handleCreateCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("You must be logged in to create a character.");
      return;
    }

    try {
      const userCharactersCollection = collection(
        db,
        "users",
        user.uid,
        "characters"
      );
      const docRef = await addDoc(userCharactersCollection, {
        name,
        // Add other character fields here
      });

      router.push(`/characters/${docRef.id}`);
    } catch (err) {
      setError("Failed to create character.");
    }
  };

  return (
    <form onSubmit={handleCreateCharacter} className="space-y-4">
      <input
        type="text"
        placeholder="Character Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Create Character
      </button>
    </form>
  );
}
