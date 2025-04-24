import React from "react";
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import ShinyText from "@/components/ShinyText";
import Link from "next/link";
import Image from "next/image";
const Page = async () => {
  const user = await getCurrentUser();
  return (
    <div className="relative ">
      <div className="fixed inset-0 bg-black -z-10" />
      <div className="flex items-center gap-5 mb-20 pl-4 pt-4">
        <Link href="/">
          <Image
            src="/back.svg"
            alt="Back"
            width={40}
            height={40}
            className="cursor-pointer filter invert"
          />
        </Link>
        <ShinyText
          text="Interview Generation"
          disabled={false}
          speed={3}
          className="text-2xl font-bold" // Removed mb-10 from here
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center  text-white p-4">
        <Agent userName={user?.name} userId={user?.id} type="generate" />
      </div>
    </div>
  );
};
export default Page;
