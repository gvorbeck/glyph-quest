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
import StepFeature from "./StepFeature";
import StepInventory from "./StepInventory";
import { INVENTORYLOCATIONS, ITEMTYPES } from "@/utils/constants";
import StepDetails from "./StepDetails";
import StepName from "./StepName";

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
    wil: {
      long: "Will",
      short: "WIL",
      value: null,
    },
  },
  health: 4,
  feature: null,
  items: [
    {
      name: "Light Armor",
      hands: 1,
      location: INVENTORYLOCATIONS.worn.value,
      type: ITEMTYPES.armor.value,
      value: null,
      armor: 1,
    },
    {
      hands: 1,
      location: INVENTORYLOCATIONS.hands.value,
      name: "Shield",
      type: ITEMTYPES.shield.value,
      value: null,
      armor: 1,
    },
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
};

export default function CharacterForm() {
  // const [name, setName] = useState("");
  const [character, setCharacter] = useState<Character>(characterBlank);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<number>(0);
  const { user } = useAuth();
  const router = useRouter();

  const steps = [
    {
      label: "Abilities",
      description:
        "Your PC has 3 abilities: Strength, Dexterity, and Will. Roll 1d to find their starting values, or simply choose a row (with GM permission). You may raise one of your PC's abilities by one point at levels 2, 4, and 6. A PC's abilities may never be raised higher than +4.",
      content: (
        <StepAbilities character={character} setCharacter={setCharacter} />
      ),
    },
    {
      label: "Feature",
      description: "Your PC begins with one of the following features",
      content: (
        <StepFeature character={character} setCharacter={setCharacter} />
      ),
    },
    {
      label: "Inventory",
      description:
        "Choose six items. Record the location of all items, armor, and weapons on your character. Items can be stored in the following locations: hands, worn, belt, or in a backpack. Belts can hold up to two items, while backpacks can carry whatever a typical backpack could reasonably fit. PCs start with the following equipment: light armor (+1 armor), a shield (+1 armor, 1 hand), and two weapons.",
      content: (
        <StepInventory
          character={character}
          setCharacter={setCharacter}
          setError={setError}
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
    if (activeStep === 0) {
      return (
        character.abilities.str.value === null ||
        character.abilities.dex.value === null ||
        character.abilities.wil.value === null
      );
    }
    if (activeStep === 1) {
      return character.feature === null || character.feature[0] === "path";
    }
    if (activeStep === 2) {
      return (
        character.items.find((item) => item.location === undefined) !==
          undefined || error > 0
      );
    }
    if (activeStep === 4) {
      return character.name === "";
    }
    return false;
  };

  const handleCreateCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError("");

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
        // Add other character fields here
      });

      router.push(`/characters/${docRef.id}`);
    } catch (err) {
      console.error("Failed to create character.");
    }
  };

  useEffect(() => {
    console.log(character);
  }, [character]);

  return (
    <>
      <p>make better components. standardize coomponent jsx</p>
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
    </>
    // <form onSubmit={handleCreateCharacter}>
    //   {/* <input
    //     type="text"
    //     placeholder="Character Name"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //     className="w-full p-2 border border-gray-300 rounded"
    //   /> */}
    //   {error && <p className="text-red-500">{error}</p>}
    //   <button
    //     type="submit"
    //     className="w-full p-2 bg-blue-500 text-white rounded"
    //   >
    //     Create Character
    //   </button>
    // </form>
  );
}
