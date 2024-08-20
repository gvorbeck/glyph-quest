"use client";

import CharacterForm from "@/components/CharacterForm/CharacterForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { auth } from "@/lib/firebase";
import { Typography } from "@mui/material";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function CharacterFormPage() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <SiteHeader user={user} />
      <main className="container mx-auto p-4">
        <Typography variant="h1" className="font-jaini-purva">
          Create a New Character
        </Typography>
        <CharacterForm />
      </main>
      <SiteFooter />
    </>
  );
}
