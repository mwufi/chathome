import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function FloatingHeader() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <SignedOut>
        <SignInButton>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-10 h-10"
            }
          }}
        />
      </SignedIn>
    </div>
  );
}
