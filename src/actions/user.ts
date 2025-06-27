"use server";

import { UserJSON } from "@clerk/nextjs/server";

export type LocalUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  imageUrl: string | null;
  //   campos personalizados
};

export const createUser = async (user: UserJSON) => {
  const res = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parseUser(user)),
  });

  return res.json();
};

export const updateUser = async (user: UserJSON) => {
  const res = await fetch(`http://localhost:3001/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parseUser(user)),
  });

  return res.json();
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`http://localhost:3001/users/${id}`, {
    method: "DELETE",
  });

  return res.ok;
};

export const getUser = async (id: string) => {
  const res = await fetch(`http://localhost:3001/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

const parseUser = (user: UserJSON): LocalUser => {
  return {
    id: user.id,
    email: user.email_addresses[0].email_address,
    firstName: user.first_name,
    lastName: user.last_name,
    imageUrl: user.image_url,
    username: user.username,
  };
};
