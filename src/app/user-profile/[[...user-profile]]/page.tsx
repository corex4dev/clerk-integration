"use client";

import Icon from "@/components/Icon";
import { UserProfile } from "@clerk/nextjs";
import React from "react";

const UserProfilePage = () => {
  return (
    <div className="flex w-full h-full min-h-[80dvh] items-center justify-center">
      <UserProfile path="/user-profile" routing="path">
        <UserProfile.Page label="account" />

        <UserProfile.Link
          url="/"
          label="Home"
          labelIcon={<Icon name="home" />}
        />
        <UserProfile.Link
          url="/protected"
          label="Protected"
          labelIcon={<Icon name="lock" />}
        />

        <UserProfile.Page label="security" />

        <UserProfile.Page
          label="Terms"
          labelIcon={<Icon name="dot" />}
          url="terms"
        >
          <div>
            <h1>Custom Terms Page</h1>
            <p>This is the content of the custom terms page.</p>
          </div>
        </UserProfile.Page>
      </UserProfile>
    </div>
  );
};

export default UserProfilePage;
