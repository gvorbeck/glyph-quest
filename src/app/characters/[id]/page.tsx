"use client";

import SiteHeader from "@/components/SiteHeader";
import CharacterSheet from "../../../components/CharacterSheet/CharacterSheet";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import SiteFooter from "@/components/SiteFooter";

export default function CharacterSheetPage({
  params,
}: {
  params: { id: string };
}) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const characterId = params.id;

  return (
    <>
      <SiteHeader user={user} />
      <main className="max-w-[1000px] mx-auto p-4">
        <CharacterSheet characterId={characterId} />
      </main>
      <SiteFooter />
    </>
  );
}
