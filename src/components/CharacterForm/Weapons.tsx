import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useCharacter } from "@/context/CharacterContext";
import InventorySection from "./InventorySection";
import { Character, InventoryType } from "@/types/character";

type WeaponsProps = {
  title: string;
  subtitle: string;
  process: () => void;
};

const Weapons: React.FC<WeaponsProps> = ({ title, subtitle, process }) => {
  const { inventory, setInventory } = useCharacter();
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
    setInventory((prevInventory) => ({
      ...prevInventory,
      weapons: [...prevInventory.weapons, weapon],
    }));
    setWeaponName("");
    setWeaponHands(1); // Default to one-handed
  };

  useEffect(() => {
    console.log("process weapons");
    process();
  }, [inventory.weapons]);

  return (
    <InventorySection title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-4">
        {/* Weapon Input Section */}
        <div className="flex flex-col gap-4">
          <Typography variant="h4" className="font-jaini-purva">
            Add Weapon
          </Typography>

          <TextField
            variant="filled"
            label="Weapon Name"
            value={weaponName}
            onChange={handleChangeWeaponName}
          />

          {/* Select Weapon Type (Melee or Missile) */}
          {/* <FormControl variant="filled">
            <InputLabel id="weapon-type-select-label">Weapon Type</InputLabel>
            <Select
              labelId="weapon-type-select-label"
              value={weaponType}
              onChange={handleChangeWeaponType}
            >
              <MenuItem value="melee">Melee</MenuItem>
              <MenuItem value="missile">Missile</MenuItem>
            </Select>
          </FormControl> */}

          {/* Select Hands (One-handed or Two-handed) */}
          <FormControl variant="filled">
            <InputLabel id="weapon-hands-select-label">Hands</InputLabel>
            <Select
              labelId="weapon-hands-select-label"
              value={weaponHands}
              onChange={handleChangeWeaponHands}
            >
              <MenuItem value={1}>One-handed</MenuItem>
              <MenuItem value={2}>Two-handed</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            disabled={weaponName === ""}
            onClick={handleClickAddWeapon}
          >
            Add Weapon
          </Button>
        </div>
      </div>
    </InventorySection>
  );
};

export default Weapons;
