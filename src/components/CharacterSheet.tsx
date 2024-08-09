// components/CharacterSheet.tsx
interface CharacterSheetProps {
  characterId: string;
}

export default function CharacterSheet({ characterId }: CharacterSheetProps) {
  return (
    <div>
      {/* Placeholder for character sheet */}
      <p>Loading character data for {characterId}...</p>
    </div>
  );
}
