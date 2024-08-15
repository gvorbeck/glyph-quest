import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

type LevelUpAbilityProps = {};

const LevelUpAbility: React.FC<LevelUpAbilityProps> = () => {
  const [ability, setAbility] = useState<string>("");
  const handleAbilityChoice = () => {
    setAbility(ability);
  };
  return (
    <ToggleButtonGroup
      value={ability}
      exclusive
      onChange={handleAbilityChoice}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned">
        STR
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        DEX
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        WIL
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LevelUpAbility;
