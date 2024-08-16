import { Character } from "@/types/character";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

type LevelUpAbilityProps = {
  lvlUpContent: {
    payload: Character | null;
    ability: keyof Character["abilities"] | null;
  };
  setLvlUpContent: React.Dispatch<
    React.SetStateAction<{
      payload: Character | null;
      ability: keyof Character["abilities"] | null;
    }>
  >;
  character: Character;
};

const LevelUpAbility: React.FC<LevelUpAbilityProps> = ({
  lvlUpContent,
  setLvlUpContent,
  character,
}) => {
  const handleAbilityChoice = (
    _: any,
    value: keyof Character["abilities"] | null
  ) => {
    if (!value) return;
    setLvlUpContent({
      ...lvlUpContent,
      ability: value,
      payload: {
        ...character,
        level: character.level + 1,
        healthMax: character.healthMax + 2,
        abilities: {
          ...character.abilities,
          [value]: {
            ...character.abilities[value],
            value: (character.abilities[value].value ?? 0) + 1,
          },
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body1">Choose an ability to increase:</Typography>
      <ToggleButtonGroup
        value={lvlUpContent.ability}
        exclusive
        onChange={handleAbilityChoice}
        aria-label="ability choices"
      >
        <ToggleButton value="str" aria-label="strength">
          STR
        </ToggleButton>
        <ToggleButton value="dex" aria-label="dexterity">
          DEX
        </ToggleButton>
        <ToggleButton value="wil" aria-label="willpower">
          WIL
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default LevelUpAbility;
