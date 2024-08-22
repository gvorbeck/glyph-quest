"use client";

import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import CharacterList from "../components/CharacterList/CharacterList";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import SiteHeader from "@/components/SiteHeader";
import { Typography } from "@mui/material";
import SiteFooter from "@/components/SiteFooter";
import CharacterListPageSkeleton from "@/components/CharacterList/CharacterListPageSkeleton";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <CharacterListPageSkeleton />;

  if (user) {
    return (
      <>
        <SiteHeader user={user} />
        <main className="container mx-auto">
          <Typography variant="h2" className="font-jaini-purva">
            Your Characters
          </Typography>
          <CharacterList />
        </main>
        <SiteFooter />
      </>
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
