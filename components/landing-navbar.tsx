"use client";

import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="bg-transparent flex items-center justify-between p-4">
      <Link href="/" className="flex items-center">
        <div className="relative w-8 h-8 mr-4">
          <Image fill alt="logo" src="/logo.png" />
        </div>
        <h1 className={cn("text-white text-2xl font-bold", font.className)}>
          Kora AI
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full">
            Get started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
