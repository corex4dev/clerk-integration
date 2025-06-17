"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";
import Icon from "./Icon";
import { useTheme } from "next-themes";

const UserButtonClient = () => {
  const { theme, setTheme } = useTheme();

  return (
    <UserButton userProfileMode="navigation" userProfileUrl="/user-profile">
      <UserButton.MenuItems>
        <UserButton.Link
          label="Homepage"
          href="/"
          labelIcon={<Icon name="home" />}
        />
        <UserButton.Action label="manageAccount" />
        <UserButton.Action
          label="Theme"
          labelIcon={<Icon name="theme" />}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserButtonClient;
