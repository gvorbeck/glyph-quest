"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Character } from "@/types/character";
import { useAuth } from "@/context/AuthContext";
import { db, addDoc, collection } from "@/lib/firebase";
import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import StepAbilities from "./StepAbilities";
import StepInventory from "./StepInventory";
import { INVENTORYLOCATIONS, ITEMTYPES } from "@/utils/constants";
import StepDetails from "./StepDetails";
import StepName from "./StepName";
import { Location, TypeOption } from "@/types/items";
import useSnackbar from "@/hooks/useSnackbar";
import StepHitPoints from "./StepHitPoints";

const characterBlank: Character = {
  abilities: {
    str: {
      long: "Strength",
      short: "STR",
      value: null,
    },
    dex: {
      long: "Dexterity",
      short: "DEX",
      value: null,
    },
    con: {
      long: "Constitution",
      short: "CON",
      value: null,
    },
    int: {
      long: "Intelligence",
      short: "INT",
      value: null,
    },
    wis: {
      long: "Wisdom",
      short: "WIS",
      value: null,
    },
    cha: {
      long: "Charisma",
      short: "CHA",
      value: null,
    },
  },
  health: 0,
  healthMax: 0,
  careers: [],
  items: [
    // {
    //   name: "Light Armor",
    //   hands: 1,
    //   location: INVENTORYLOCATIONS.worn.value,
    //   type: ITEMTYPES.armor.value as TypeOption,
    //   armor: 1,
    // },
    // {
    //   hands: 1,
    //   location: INVENTORYLOCATIONS.hands.value,
    //   name: "Shield",
    //   type: ITEMTYPES.shield.value as TypeOption,
    //   armor: 1,
    // },
  ],
  details: {
    appearance: null,
    background: null,
    clothing: null,
    mannerism: null,
    personality: null,
    physical: null,
  },
  name: "",
  level: 1,
  xp: 0,
  spells: [],
  gold: 0,
  settings: {
    wallpaper: "sheet-hero",
  },
  notes: "",
};

export default function CharacterForm() {
  const [character, setCharacter] = useState<Character>(characterBlank);
  const [activeStep, setActiveStep] = useState(0);
  const [remainingPoints, setRemainingPoints] = useState(3); // Tracks remaining points
  // const [error, setError] = useState<number>(0);
  const { user } = useAuth();
  const router = useRouter();
  const { snackbar, showSnackbar } = useSnackbar();

  const steps = [
    {
      label: "Abilities",
      description:
        "Assign 3 points to your PC’s ability scores. You can place more than 1 point in a single score. Alternatively, you can leave it to chance by rolling 3d6, with each die contributing 1 point to the ability score that matches its number. Example: rolling 3-5-5 results in CON (the 3rd score) having 1 point and WIS (the 5th score) having 2 points. All other scores start at 0.",
      content: (
        <StepAbilities
          character={character}
          setCharacter={setCharacter}
          remainingPoints={remainingPoints}
          setRemainingPoints={setRemainingPoints}
        />
      ),
    },
    {
      label: "Secondary Stats",
      description:
        "Your PC begins at level 1 with 0 XP. They will also have 10 + CON item slots. Your PC's Hit Points are determined by rolling a d6.",
      content: (
        <StepHitPoints character={character} setCharacter={setCharacter} />
      ),
    },
    {
      label: "Careers Inventory",
      description: "foo",
      content: (
        <StepInventory
          character={character}
          setCharacter={setCharacter}
          // setError={setError}
        />
      ),
    },
    {
      label: "Details",
      description: "Create your character's details.",
      content: (
        <StepDetails character={character} setCharacter={setCharacter} />
      ),
    },
    {
      label: "Name",
      description: "Name your character.",
      content: <StepName character={character} setCharacter={setCharacter} />,
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isDisabled = () => {
    // Abilities
    if (activeStep === 0) {
      return remainingPoints > 0; // Ensure it's a boolean
    }
    // Hit Points
    if (activeStep === 1) {
      return !character.health;
    }
    // Inventory
    if (activeStep === 2) {
      // return (
      //   character.items.find((item) => item.location === ("" as Location)) !==
      //     undefined || error > 0
      // );
    }
    // Name
    if (activeStep === 4) {
      return character.name === "";
    }
    return false; // Ensure it's a boolean
  };

  const handleCreateCharacter = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      console.error("You must be logged in to create a character.");
      return;
    }

    try {
      const userCharactersCollection = collection(
        db,
        "users",
        user.uid,
        "characters"
      );
      const docRef = await addDoc(userCharactersCollection, {
        ...character,
      });
      showSnackbar("Character created successfully.", "success");
      router.push(`/characters/${user.uid}-${docRef.id}`);
    } catch (err) {
      showSnackbar("Failed to create character.", "error");
      console.error("Failed to create character.", err);
    }
  };

  useEffect(() => {
    console.log(character);
  }, [character]);

  return (
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <div className="flex flex-col gap-4">
                <Typography>{step.description}</Typography>
                <Box>{step.content}</Box>
                <Box>
                  {index === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleCreateCharacter}
                      disabled={isDisabled()}
                    >
                      Finish
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disabled={isDisabled()}
                    >
                      Continue
                    </Button>
                  )}
                  <Button disabled={index === 0} onClick={handleBack}>
                    Back
                  </Button>
                </Box>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {snackbar}
    </>
  );
}
