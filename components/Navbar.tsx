"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth.action";
import { toast } from "sonner";

export default function RootNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/interview" || pathname.startsWith("/interview/")) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/sign-in");
      toast.success("Sign Out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.webp" alt="Logo" width={38} height={32} />
        <h2 className="text-white">AI Interviews</h2>
      </Link>

      <button onClick={handleLogout} className="btn-primary">
        Logout
      </button>
    </nav>
  );
}
