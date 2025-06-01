"use client";

import React from "react";
import { useSignIn } from "@clerk/nextjs";
import { SignInFirstFactor, EmailLinkFactor } from "@clerk/types";

const SignInClient = () => {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [verifying, setVerifying] = React.useState(false);
  const [error, setError] = React.useState("");
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const { startEmailLinkFlow } = signIn.createEmailLinkFlow();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setVerified(false);
    setError("");

    if (!isLoaded && !signIn) return null;

    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: emailAddress,
      });

      setVerifying(true);

      const isEmailLinkFactor = (
        factor: SignInFirstFactor
      ): factor is EmailLinkFactor => {
        return factor.strategy === "email_link";
      };
      const emailLinkFactor = supportedFirstFactors?.find(isEmailLinkFactor);

      if (!emailLinkFactor) {
        setError("Email link factor not found");
        return;
      }

      const { emailAddressId } = emailLinkFactor;

      const signInAttempt = await startEmailLinkFlow({
        emailAddressId,
        redirectUrl: "http://localhost:3000/verification",
      });

      const verification = signInAttempt.firstFactorVerification;

      if (verification.status === "expired") {
        setError("The email link has expired.");
      }

      if (verification.verifiedFromTheSameClient()) {
        setVerifying(false);
        setVerified(true);
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError("An error occurred.");
    }
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => setError("")}>Try again</button>
      </div>
    );
  }

  if (verifying) {
    return (
      <div>
        <p>Check your email and visit the link that was sent to you.</p>
      </div>
    );
  }

  if (verified) {
    return <div>Signed in successfully!</div>;
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-6 bg-white rounded-2xl p-4 text-black w-1/3"
    >
      <h1 className="text-2xl font-bold text-center mb-4">
        Sign in with magic link
      </h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="emailAddress">Email address</label>
        <input
          id="emailAddress"
          className="border border-gray-400 rounded-md p-2"
          type="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
      </div>
      <div id="clerk-captcha"></div>
      <button
        type="submit"
        className="bg-black text-white rounded-md p-2 hover:bg-gray-800 cursor-pointer"
      >
        Continue
      </button>
    </form>
  );
};

export default SignInClient;
