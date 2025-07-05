"use server";

import { Roles } from "@/types/globals";
import { clerkClient } from "@clerk/nextjs/server";

export const addRole = async (userId: string, role: Roles) => {
  const client = await clerkClient();

  try {
    const res = await client.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
};

export async function removeRole(userId: string) {
  const client = await clerkClient();

  try {
    const res = await client.users.updateUserMetadata(userId, {
      publicMetadata: { role: null },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}
