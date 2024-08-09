// components/CharacterList.tsx
import { User } from "firebase/auth";

interface CharacterListProps {
  user: User;
}

export default function CharacterList({ user }: CharacterListProps) {
  return (
    <div>
      {/* Placeholder for character list */}
      <p>Loading characters for {user.email}...</p>
    </div>
  );
}
