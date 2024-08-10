import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default async function Header() {
  return (
    <header className="z-10 p-4 sm:p-6 w-full border-b border-stone-300 absolute sticky top-0 bg-white/80 backdrop-blur">
      <nav className="max-w-7xl m-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="font-medium my-2">🌱 ✨overse </h1>
        </Link>

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
