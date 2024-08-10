import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-4 px-4 sm:px-6 w-full">
      <div className="pt-4 max-w-7xl m-auto text-sm text-stone-400 flex flex-row justify-between">
        <div className="flex flex-col gap-1 justify-start">
          <h2>2024 Eoverse Inc.</h2>
          <p>
            Made with {" "}
            <Link href="https://nextjs.org" className="underline">
             💖
            </Link>{" "}
            and{" "}
            <Link href="https://partykit.io" className="underline">
             ☕
            </Link>
          </p>
        </div>
        <div className="flex flex-col justify-end">
          <Link
            href="https://github.com/partykit/partykit-nextjs-chat-template"
            className="bg-stone-200 hover:bg-stone-300 p-2 rounded text-stone-600 whitespace-nowrap"
          >
            Follow us on Twitter!
          </Link>
        </div>
      </div>
    </footer>
  );
}
