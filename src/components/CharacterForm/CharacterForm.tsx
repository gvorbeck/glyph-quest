"use client";

import { useEffect, useState } from "react";
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
import StepDetails from "./StepDetails";
import StepName from "./StepName";
import StepHitPoints from "./StepHitPoints";
import useSnackbar from "@/hooks/useSnackbar";
import { useCharacter, CharacterProvider } from "@/context/CharacterContext";

const CharacterFormSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [remainingPoints, setRemainingPoints] = useState(3); // Put this in StepAbilities. It can determine this on component mount by looking at character.abilities
  const { character, inventory } = useCharacter();
  const { user } = useAuth();
  const router = useRouter();
  const { snackbar, showSnackbar } = useSnackbar();

  const steps = [
    {
      label: "Abilities",
      description: "Assign 3 points to your PC's ability scores...",
      content: (
        <StepAbilities
          remainingPoints={remainingPoints}
          setRemainingPoints={setRemainingPoints}
        />
      ),
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
      label: "Details",
      description: "Create your character's details.",
      content: <StepDetails />,
    },
    {
      label: "Name",
      description: "Name your character.",
      content: <StepName />,
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
      return remainingPoints > 0;
    }
    // Hit Points
    if (activeStep === 1) {
      return !character.health;
    }
    // Name
    if (activeStep === 4) {
      return character.name === "";
    }
    return false;
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

  useEffect(
    () => console.log("character:", character, "inteventory:", inventory),
    [character, inventory]
  );

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
};

// Wrap the form in the CharacterProvider
export default function CharacterForm() {
  return (
    <CharacterProvider>
      <CharacterFormSteps />
    </CharacterProvider>
  );
}
