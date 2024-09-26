"use client";

import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import CharacterList from "../components/CharacterList/CharacterList";
import AuthForm from "@/components/AuthForm";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CharacterListPageSkeleton from "@/components/CharacterList/CharacterListPageSkeleton";
import Text from "@/components/Text";
import { Box } from "@mui/material";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
        <main className="container lg:max-w-[1000px] mx-auto p-4">
          <Text font variant="h2" className="text-5xl">
            Your Characters
          </Text>
          <CharacterList />
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <main className="lg:max-w-[1000px] container mx-auto p-4 grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Text variant="h1" font className="text-3xl text-amber">
            Welcome to Glyph.Quest!
          </Text>
          <Text>
            A free resource to create and manage your{" "}
            <strong>Knave: Second Edition</strong> characters effortlessly.
          </Text>
        </div>
        <img
          src="/images/mfk.png"
          alt="Made for Knave"
          className="xs:row-start-3 sm:row-start-2 sm:col-span-6 xs:col-span-12"
        />
        <AuthForm className="xs:col-span-12 sm:col-span-6" />
        <Box className="xs:col-span-12 sm:col-span-4">
          <ul className="list-disc pl-4">
            <li>Create characters according to the Knave 2e ruleset.</li>
            <li>Share your characters with their unique URLs.</li>
            <li>
              Level-up your characters as they journey through your adventures.
            </li>
          </ul>
        </Box>
        <img
          src="/images/character_sheet.png"
          alt="Sample character sheet"
          className="xs:col-span-12 sm:col-span-8"
        />
      </main>
      <SiteFooter />
      {/* <main className="lg:max-w-[1000px] container mx-auto p-4 flex flex-col gap-4">
        <Text variant="h1" font className="text-3xl text-amber">
          Welcome to Glyph.Quest!
        </Text>
        <Text>
          A free resource to create and manage your{" "}
          <strong>Knave: Second Edition</strong> characters effortlessly.
        </Text>
        <div className="flex flex-col gap-4">
          <AuthForm />
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4">
            <img src="/images/mfk.png" alt="Made for Knave" />
            <img
              src="/images/character_sheet.png"
              alt="Sample character sheet"
            />
          </div>
        </div>
      </main>
      <SiteFooter /> */}
    </>
  );
}
