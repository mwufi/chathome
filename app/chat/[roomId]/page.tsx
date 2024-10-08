import Link from "next/link";
import { Room } from "./Room";
import PresenceBar from "../components/PresenceBar";
import { PARTYKIT_HOST, PARTYKIT_URL } from "@/app/env";
import Editor from "./Editor";
import CollapsibleChat from "../components/CollapsibleChat";
import RoomTitle from "../components/RoomTitle";

const party = "chatroom";

export const revalidate = 0;

function getRandomColor() {
  const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default async function ChatRoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  // fetch initial data for server rendering
  const url = `${PARTYKIT_URL}/parties/chatroom/${params.roomId}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  const room = res.status === 404 ? null : await res.json();

  // fetch user session for server rendering
  // TODO: replace with Clerk
  const user = null;

  return (
    <div className="w-full flex flex-col gap-4 justify-between items-start">
      <div className="flex flex-wrap justify-start items-center gap-x-4 gap-y-2">
        <Link href="/chat" className="text-stone-400 whitespace-nowrap">
          &lt;- All Docs
        </Link>
      </div>
      {room ? (
        <>
          <div className="w-full rounded-xl max-w-[70ch] mx-auto text-lg font-serif bg-white p-6">
            <RoomTitle roomId={params.roomId} className="text-pink-400 text-6xl mb-10" />
            <Editor
              host={PARTYKIT_HOST}
              party={'editor'}
              userColor={getRandomColor()}
              room={params.roomId}
            />
          </div>
{/* 
          <CollapsibleChat>
            <div className="w-full flex flex-row justify-between items-start pb-6">
              <PresenceBar roomId={params.roomId} />
            </div>
            <Room
              host={PARTYKIT_HOST}
              party={party}
              user={user}
              room={params.roomId}
              messages={room.messages ?? []}
            />
          </CollapsibleChat> */}

        </>
      ) : (
        <h1 className="text-4xl font-medium">Room not found</h1>
      )}
    </div>
  );
}
