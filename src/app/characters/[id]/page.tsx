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
  const idString = params.id.split("-");
  const userId = idString[0];
  const characterId = idString[1];

  return (
    <>
      <SiteHeader user={user} />
      <main className="lg:max-w-[1000px] w-full mx-auto p-4">
        <CharacterSheet characterId={characterId} userId={userId} />
      </main>
      <SiteFooter />
    </>
  );
}
