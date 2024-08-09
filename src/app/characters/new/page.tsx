import CharacterForm from "@/components/CharacterForm/CharacterForm";

export default function CharacterFormPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Create a New Character</h1>
      <CharacterForm />
    </main>
  );
}
