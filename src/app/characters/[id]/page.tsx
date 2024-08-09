// app/characters/[id]/page.tsx
import CharacterSheet from "../../../components/CharacterSheet";

export default function CharacterSheetPage({
  params,
}: {
  params: { id: string };
}) {
  const characterId = params.id;

  return (
    <main className="container mx-auto p-4">
      <CharacterSheet characterId={characterId} />
    </main>
  );
}
