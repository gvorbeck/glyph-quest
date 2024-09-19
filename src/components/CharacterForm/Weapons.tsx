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
  const [missileWeaponOneHanded, setMissileWeaponOneHanded] =
    useState<string>("");
  const [missileWeaponTwoHanded, setMissileWeaponTwoHanded] =
    useState<string>("");

  const { inventory, setInventory } = useCharacter();

  const handleChangeWeapon = (
    e: any,
    hands: 1 | 2,
    weaponType: "melee" | "missile"
  ) => {
    if (weaponType === "melee") {
      hands === 1
        ? setMeleeWeaponOneHanded(e.target.value)
        : setMeleeWeaponTwoHanded(e.target.value);
    } else {
      hands === 1
        ? setMissileWeaponOneHanded(e.target.value)
        : setMissileWeaponTwoHanded(e.target.value);
    }
  };

  const handleClickWeapon = (hands: 1 | 2, weaponType: "melee" | "missile") => {
    const key = hands === 1 ? "oneHanded" : "twoHanded";
    const weaponToAdd =
      weaponType === "melee"
        ? hands === 1
          ? meleeWeaponOneHanded
          : meleeWeaponTwoHanded
        : hands === 1
        ? missileWeaponOneHanded
        : missileWeaponTwoHanded;

    setInventory((prevInventory) => ({
      ...prevInventory,
      weapons: {
        ...prevInventory.weapons,
        [key]: [...prevInventory.weapons[key], weaponToAdd],
      },
    }));

    // Reset the input field after adding the weapon
    if (weaponType === "melee") {
      hands === 1 ? setMeleeWeaponOneHanded("") : setMeleeWeaponTwoHanded("");
    } else {
      hands === 1
        ? setMissileWeaponOneHanded("")
        : setMissileWeaponTwoHanded("");
    }
  };

  return (
    <InventorySection title={title} subtitle={subtitle}>
      <div className="flex gap-4 flex-col">
        {/* Melee Weapons Section */}
        <div className="flex flex-col gap-4">
          <Typography variant="h4" className="font-jaini-purva">
            Melee Weapons
          </Typography>
          {/* One-handed melee weapon input */}
          <div className="flex gap-4 items-center">
            <TextField
              variant="filled"
              label="One-handed melee weapon"
              value={meleeWeaponOneHanded}
              onChange={(e) => handleChangeWeapon(e, 1, "melee")}
            />
            <Button
              variant="outlined"
              disabled={meleeWeaponOneHanded === ""}
              onClick={() => handleClickWeapon(1, "melee")}
            >
              Add One-handed Melee Weapon
            </Button>
          </div>
          {/* Two-handed melee weapon input */}
          <div className="flex gap-4 items-center">
            <TextField
              variant="filled"
              label="Two-handed melee weapon"
              value={meleeWeaponTwoHanded}
              onChange={(e) => handleChangeWeapon(e, 2, "melee")}
            />
            <Button
              variant="outlined"
              disabled={meleeWeaponTwoHanded === ""}
              onClick={() => handleClickWeapon(2, "melee")}
            >
              Add Two-handed Melee Weapon
            </Button>
          </div>
        </div>

        {/* Missile Weapons Section */}
        <div className="flex flex-col gap-4">
          <Typography variant="h4" className="font-jaini-purva">
            Missile Weapons
          </Typography>
          {/* One-handed missile weapon input */}
          <div className="flex gap-4 items-center">
            <TextField
              variant="filled"
              label="One-handed missile weapon"
              value={missileWeaponOneHanded}
              onChange={(e) => handleChangeWeapon(e, 1, "missile")}
            />
            <Button
              variant="outlined"
              disabled={missileWeaponOneHanded === ""}
              onClick={() => handleClickWeapon(1, "missile")}
            >
              Add One-handed Missile Weapon
            </Button>
          </div>
          {/* Two-handed missile weapon input */}
          <div className="flex gap-4 items-center">
            <TextField
              variant="filled"
              label="Two-handed missile weapon"
              value={missileWeaponTwoHanded}
              onChange={(e) => handleChangeWeapon(e, 2, "missile")}
            />
            <Button
              variant="outlined"
              disabled={missileWeaponTwoHanded === ""}
              onClick={() => handleClickWeapon(2, "missile")}
            >
              Add Two-handed Missile Weapon
            </Button>
          </div>
        </div>
      </div>
    </InventorySection>
  );
};

export default Weapons;
