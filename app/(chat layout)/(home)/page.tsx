"use client";

import Link from "next/link";
import { useCursors } from "./cursors-provider";

export default function Home() {
  const { getCount } = useCursors();
  const count = getCount();

  return (
    <div className="w-full flex flex-col gap-8">
      <section className="bg-yellow-100 w-full p-2 rounded flex justify-center items-center text-xl">
        <p>
          <strong>{count}</strong> people here{count != 1 ? "s" : ""} 🎈
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-medium pb-6">✨overse presents Blank Space</h1>
        <p>Ever thought about...</p>
        <ul className="list-disc list-inside">
          <li>Keeping a journal and writing to the world?</li>
          <li>Finding people who vibe with you?</li>
          <li>A place to get started writing? </li>
        </ul>
        <p>
          Our mission is to <code>Connect</code> through long-form text.
        </p>
      </section>

      <Link href="/chat" className="underline">
        <button className="flex items-center justify-center px-10 py-6 border border-stone-200 rounded-lg shadow hover:shadow-md">
          type smthing -&gt;
        </button>
      </Link>
    </div>
  );
}
