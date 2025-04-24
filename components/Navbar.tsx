"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function RootNavbar() {
  const pathname = usePathname();

  if (pathname === "/interview" || pathname.startsWith("/interview/")) {
    return null;
  }

  return (
    <nav className="">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.webp" alt="Logo" width={38} height={32} />
        <h2 className="text-white">AI Interviews</h2>
      </Link>
    </nav>
  );
}
