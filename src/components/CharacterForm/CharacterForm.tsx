"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
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
import StepName from "./StepName";
import StepHitPoints from "./StepHitPoints";
import useSnackbar from "@/hooks/useSnackbar";
import { useCharacter, CharacterProvider } from "@/context/CharacterContext";
import { getRemainingPoints } from "@/utils/utils";

const CharacterFormSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { character } = useCharacter();
  const { user } = useAuth();
  const router = useRouter();
  const { snackbar, showSnackbar } = useSnackbar();

  // Memoize steps for better performance
  const steps = useMemo(
    () => [
      {
        label: "Abilities",
        description: "Assign 3 points to your PC's ability scores...",
        content: <StepAbilities />,
      },
      {
        label: "Hit Points",
        description: "Your PC's Hit Points are determined by rolling a d6.",
        content: <StepHitPoints />,
      },
      {
        label: "Careers & Inventory",
        description: "Select careers and manage your inventory.",
        content: <StepInventory />,
      },
      {
        label: "Finishing Touches",
        description:
          "Name your character and optionally give them some detail.",
        content: <StepName />,
      },
    ],
    []
  );

  // Helper to determine if the current step should be disabled
  const isDisabled = () => {
    switch (activeStep) {
      case 0:
        return !getRemainingPoints(character);
      case 1:
        return !character.health;
      case 2:
        return (
          character.items.length > (character.abilities.con.value || 0) + 10
        );
      case 3:
        return character.name === "";
      default:
        return false;
    }
  };

  // Generic button rendering function
  const renderButtons = (index: number) => (
    <Box>
      <Button
        variant="contained"
        onClick={
          index === steps.length - 1 ? handleCreateCharacter : handleNext
        }
        disabled={isDisabled()}
      >
        {index === steps.length - 1 ? "Finish" : "Continue"}
      </Button>
      <Button disabled={index === 0} onClick={handleBack}>
        Back
      </Button>
    </Box>
  );

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Async function to create a character in Firestore
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
        user?.uid,
        "characters"
      );
      const docRef = await addDoc(userCharactersCollection, { ...character });
      showSnackbar("Character created successfully.", "success");
      router.push(`/characters/${user?.uid}-${docRef.id}`);
    } catch (err) {
      showSnackbar("Failed to create character.", "error");
      console.error("Failed to create character.", err);
    }
  };

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
                {renderButtons(index)}
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {snackbar}
    </>
  );
};

// Wrap the form in the CharacterProvider
export default function CharacterForm() {
  return (
    <CharacterProvider>
      <CharacterFormSteps />
    </CharacterProvider>
  );
}
