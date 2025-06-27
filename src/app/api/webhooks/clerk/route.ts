import { createUser, deleteUser, updateUser } from "@/actions/user";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const evt = await verifyWebhook(req, {
      signingSecret: process.env.CLERK_WEBHOOK_SECRET,
    });

    switch (evt.type) {
      case "user.created":
        await createUser(evt.data);
        break;
      case "user.updated":
        await updateUser(evt.data);
        break;
      case "user.deleted":
        if (evt.data.deleted) {
          await deleteUser(evt.data.id!);
        }
        break;
    }
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new NextResponse("Error verifying webhook", { status: 400 });
  }

  return new NextResponse("OK", { status: 200 });
};
