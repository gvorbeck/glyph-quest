import { useCharacter } from "@/context/CharacterContext";
import InventorySection from "./InventorySection";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

type WeaponsProps = {
  title: string;
  subtitle: string;
};

const Weapons: React.FC<WeaponsProps> = ({ title, subtitle }) => {
  const [meleeWeaponOneHanded, setMeleeWeaponOneHanded] = useState<string>("");
  const [meleeWeaponTwoHanded, setMeleeWeaponTwoHanded] = useState<string>("");
  const [missileWeapon, setMissileWeapon] = useState<string>("");
  const { inventory, setInventory } = useCharacter();

  // Handle input change for one-handed or two-handed weapons
  const handleChangeMelee = (e: any, hands: 1 | 2) => {
    if (hands === 1) setMeleeWeaponOneHanded(e.target.value);
    else setMeleeWeaponTwoHanded(e.target.value);
  };

  // Handle adding a one-handed or two-handed melee weapon
  const handleClickMelee = (hands: 1 | 2) => {
    const key = hands === 1 ? "oneHanded" : "twoHanded";
    const weaponToAdd =
      hands === 1 ? meleeWeaponOneHanded : meleeWeaponTwoHanded;

    setInventory((prevInventory) => ({
      ...prevInventory,
      weapons: {
        ...prevInventory.weapons,
        [key]: [...prevInventory.weapons[key], weaponToAdd], // Add to correct array (oneHanded or twoHanded)
      },
    }));

    // Reset input field after adding weapon
    hands === 1 ? setMeleeWeaponOneHanded("") : setMeleeWeaponTwoHanded("");
  };

  const handleChangeMissile = (e: any) => {
    setMissileWeapon(e.target.value);
  };

  const handleClickMissile = () => {
    setInventory((prevInventory) => ({
      ...prevInventory,
      weapons: {
        ...prevInventory.weapons,
        missile: [...prevInventory.weapons.missile, missileWeapon],
      },
    }));

    // Reset input field after adding weapon
    setMissileWeapon("");
  };

  return (
    <InventorySection title={title} subtitle={subtitle}>
      <div className="flex gap-4 flex-col">
        {/* Melee Weapons Section */}
        <div className="flex flex-col gap-4">
          <Typography variant="h4" className="font-jaini-purva">
            Melee Weapons
          </Typography>
          {/* One-handed weapon input */}
          <div className="flex gap-4 items-center">
            <TextField
              variant="filled"
              label="One-handed weapon"
              value={meleeWeaponOneHanded}
              onChange={(e) => handleChangeMelee(e, 1)}
            />
            <Button
              variant="outlined"
              disabled={meleeWeaponOneHanded === ""}
              onClick={() => handleClickMelee(1)}
            >
              Add One-handed Weapon
            </Button>
          </div>
          {/* Two-handed weapon input */}
          <div className="flex gap-4 items-center">
            <TextField
              variant="filled"
              label="Two-handed weapon"
              value={meleeWeaponTwoHanded}
              onChange={(e) => handleChangeMelee(e, 2)}
            />
            <Button
              variant="outlined"
              disabled={meleeWeaponTwoHanded === ""}
              onClick={() => handleClickMelee(2)}
            >
              Add Two-handed Weapon
            </Button>
          </div>
        </div>

        {/* Missile Weapons Section */}
        <div className="flex flex-col gap-4">
          <Typography variant="h4" className="font-jaini-purva">
            Missile Weapons
          </Typography>
          <div className="flex gap-4 items-center">
            <TextField
              variant="filled"
              label="Missile weapon"
              value={missileWeapon}
              onChange={handleChangeMissile}
            />
            <Button
              variant="outlined"
              disabled={missileWeapon === ""}
              onClick={handleClickMissile}
            >
              Add Missile Weapon
            </Button>
          </div>
        </div>
      </div>
    </InventorySection>
  );
};

export default Weapons;
