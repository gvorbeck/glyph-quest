"use client";

import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import CharacterList from "../components/CharacterList";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (user) {
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Your Characters</h1>
        <CharacterList user={user} />
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Welcome to Glyph Quest!</h1>
      <p className="mt-4">
        Create and manage your Maze Rats characters effortlessly.
      </p>
      {/* Add sign-up/sign-in buttons or components here */}
    </main>
  );
}
