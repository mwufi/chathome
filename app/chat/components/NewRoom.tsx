"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { PARTYKIT_URL } from "@/app/env";

export default function NewRoom(props: { slug: string }) {
  const { slug } = props;
  const router = useRouter();

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    await fetch(`${PARTYKIT_URL}/parties/chatroom/${slug}`, {
      method: "POST",
    });
    await fetch(`${PARTYKIT_URL}/parties/editor/${slug}`, {
      method: "POST",
    });
    router.push(`/chat/${slug}`);
  };

  return (
    <div className="mt-6 flex flex-row flex-wrap justify-start items-center gap-2">
      <p>
        claim your page:
      </p>
      <form onSubmit={handleClick}>
        <button
          type="submit"
          className="bg-stone-200 hover:bg-stone-300 px-2 py-1 rounded whitespace-nowrap"
        >
          let&apos;s go! -&gt;
        </button>
      </form>
    </div>
  );
}
