"use client";

import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";

const SignUpClient = () => {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [expired, setExpired] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();

  if (!isLoaded) {
    return null;
  }

  const { startEmailLinkFlow } = signUp.createEmailLinkFlow();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setExpired(false);
    setVerified(false);
    setLoading(true);
    if (signUp) {
      await signUp.create({ emailAddress, password });

      const su = await startEmailLinkFlow({
        redirectUrl: "http://localhost:3000/verification",
      });
      setLoading(false);

      const verification = su.verifications.emailAddress;
      if (verification.verifiedFromTheSameClient()) {
        setVerified(true);
        return;
      } else if (verification.status === "expired") {
        setExpired(true);
      }

      if (su.status === "complete") {
        setActive({ session: su.createdSessionId || "" });
        router.push("/protected");
        return;
      }
    }
  }

  if (expired) {
    return <div>Magic link has expired</div>;
  }

  if (loading) {
    return <div>Magic link sent. Waiting for a response...</div>;
  }

  if (verified) {
    return <div>Signed in on other tab</div>;
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-6 bg-white rounded-2xl p-4 text-black w-1/3"
    >
      <h1 className="text-2xl font-bold text-center mb-4">
        Sign up with magic link
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
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="border border-gray-400 rounded-md p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div id="clerk-captcha"></div>
      <button
        type="submit"
        className="bg-black text-white rounded-md p-2 hover:bg-gray-800 cursor-pointer"
      >
        {loading ? "Loading..." : "Sign up with magic link"}
      </button>
    </form>
  );
};

export default SignUpClient;
