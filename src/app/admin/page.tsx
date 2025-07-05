import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import React from "react";

const AdminPage = async () => {
  const isAdmin = await checkRole("admin");
  if (!isAdmin) {
    redirect("/");
  }

  return <div>Admin Page</div>;
};

export default AdminPage;
