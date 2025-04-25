import React from "react";
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
const Page = async () => {
  const user = await getCurrentUser();
  return (
    <div className="relative z-10 flex flex-col justify-center text-white p-4">
      <Agent userName={user?.name ?? ""} userId={user?.id} type="generate" />
    </div>
  );
};
export default Page;
