"use client";

import { useClerk } from "@clerk/nextjs";
import {
  EmailLinkErrorCodeStatus,
  isEmailLinkError,
} from "@clerk/nextjs/errors";
import React, { useEffect, useState } from "react";

const Verification = () => {
  const [verificationStatus, setVerificationStatus] = useState("loading");

  const { handleEmailLinkVerification, loaded } = useClerk();

  useEffect(() => {
    if (!loaded) return;

    handleEmailLinkVerification({
      redirectUrl: "http://localhost:3000/protected",
      redirectUrlComplete: "http://localhost:3000/protected",
    })
      .then(() => {
        setVerificationStatus("verified");
      })
      .catch((err) => {
        let status = "failed";
        if (
          isEmailLinkError(err) &&
          err.code === EmailLinkErrorCodeStatus.Expired
        ) {
          status = "expired";
        }
        setVerificationStatus(status);
      });
  }, [handleEmailLinkVerification, loaded]);

  if (verificationStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (verificationStatus === "failed") {
    return <div>Magic link verification failed</div>;
  }

  if (verificationStatus === "expired") {
    return <div>Magic link expired</div>;
  }

  return (
    <div>Successfully signed up. Return to the original tab to continue.</div>
  );
};

export default Verification;
