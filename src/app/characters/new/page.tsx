"use client";

import CharacterForm from "@/components/CharacterForm/CharacterForm";
import SkeletonSheet from "@/components/CharacterSheet/SkeletonSheet";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Text from "@/components/Text";
import { auth } from "@/lib/firebase";
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
  if (loading)
    return (
      <main className="container mx-auto p-4">
        <SkeletonSheet />
      </main>
    );

  return (
    <>
      <SiteHeader user={user} />
      <main className="container mx-auto p-4">
        <Text font variant="h1" className="text-5xl mb-4">
          Create a New Character
        </Text>
        <CharacterForm />
      </main>
      <SiteFooter />
    </>
  );
}
