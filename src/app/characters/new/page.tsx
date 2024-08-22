"use client";

import CharacterForm from "@/components/CharacterForm/CharacterForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { auth } from "@/lib/firebase";
import { Typography } from "@mui/material";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CharacterFormPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Mark loading as false once auth state is determined
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // Only redirect if not loading and user is null
    }
  }, [user, loading, router]);

  // Show a loading state while checking auth
  if (loading) return <p>Loading...</p>;

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
