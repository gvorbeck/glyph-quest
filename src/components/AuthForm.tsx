"use client";

import { useState } from "react";
import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { TextField, Button } from "@mui/material";
import Text from "./Text";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleAuth} className="flex flex-col gap-4 items-start">
      <TextField
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full"
        variant="filled"
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full"
        variant="filled"
      />
      {error && <Text className="text-red-500">{error}</Text>}
      <Button variant="contained" type="submit">
        {isSignUp ? "Sign Up" : "Sign In"}
      </Button>
      <div className="flex items-baseline">
        {isSignUp ? (
          <>
            <Text>Already have an account?</Text>
            <Button variant="text" onClick={() => setIsSignUp(false)}>
              Sign in here
            </Button>
          </>
        ) : (
          <>
            <Text>Don't have an account?</Text>
            <Button variant="text" onClick={() => setIsSignUp(true)}>
              Sign up here
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
