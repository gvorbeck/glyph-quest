"use client";

import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import CharacterList from "../components/CharacterList";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (!isMounted) {
    return null; // Avoid rendering on server-side to prevent mismatches
  }

  if (user) {
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Your Characters</h1>
        <CharacterList />
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Welcome to Glyph Quest!</h1>
      <p className="mt-4">
        Create and manage your Maze Rats characters effortlessly.
      </p>

      <div className="mt-8 space-y-6">
        {showSignUp ? (
          <>
            <SignUp />
            <p>
              Already have an account?{" "}
              <button
                className="text-blue-500 underline"
                onClick={() => setShowSignUp(false)}
              >
                Sign in here
              </button>
              .
            </p>
          </>
        ) : (
          <>
            <SignIn />
            <p>
              Don't have an account?{" "}
              <button
                className="text-blue-500 underline"
                onClick={() => setShowSignUp(true)}
              >
                Sign up here
              </button>
              .
            </p>
          </>
        )}
      </div>
    </main>
  );
}
