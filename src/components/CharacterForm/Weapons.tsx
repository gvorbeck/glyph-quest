import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useCharacter } from "@/context/CharacterContext";
import InventorySection from "./InventorySection";
import { InventoryType } from "@/types/character";
import GQSelect from "../GQSelect";

type WeaponsProps = {
  title: string;
  subtitle: string;
};

const Weapons: React.FC<WeaponsProps> = ({ title, subtitle }) => {
  const { character, setCharacter } = useCharacter();
  const [weaponName, setWeaponName] = useState<string>("");
  const [weaponHands, setWeaponHands] = useState<1 | 2>(1);

  const handleChangeWeaponName = (e: any) => setWeaponName(e.target.value);
  const handleChangeWeaponHands = (e: any) =>
    setWeaponHands(e.target.value as 1 | 2);

  const handleClickAddWeapon = () => {
    const weapon = {
      name: weaponName,
      type: "weapon" as InventoryType["weapons"][0]["type"],
      slots: weaponHands,
    };

    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      items: [...prevCharacter.items, weapon],
    }));
    setWeaponName("");
    setWeaponHands(1); // Default to one-handed
  };

  return (
    <InventorySection title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-4 items-start">
        <TextField
          variant="filled"
          label="Weapon Name"
          value={weaponName}
          onChange={handleChangeWeaponName}
        />
        <GQSelect
          label="Hands"
          labelId="weapon-hands-select-label"
          value={weaponHands}
          options={[
            { label: "One-handed", value: 1 },
            { label: "Two-handed", value: 2 },
          ]}
          onChange={handleChangeWeaponHands}
          className="self-start"
          variant="filled"
        />
        <Button
          variant="outlined"
          disabled={weaponName === ""}
          onClick={handleClickAddWeapon}
        >
          Add Weapon
        </Button>
      </div>
    </InventorySection>
  );
};

export default Weapons;
