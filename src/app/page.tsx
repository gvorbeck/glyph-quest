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
    <main className="lg:max-w-[1000px] container mx-auto p-4 flex flex-col gap-4">
      <Text variant="h1" font className="text-3xl text-amber">
        Welcome to Glyph.Quest!
      </Text>
      <Text>
        A free resource to create and manage your{" "}
        <strong>Knave: Second Edition</strong> characters effortlessly.
      </Text>
      <div className="flex flex-col gap-4">
        <AuthForm />
      </div>
    </main>
  );
}
