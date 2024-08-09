import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { User } from "@/party/utils/auth";
import Link from "next/link";
import { Room } from "./Room";
import PresenceBar from "./components/PresenceBar";
import ClearRoomButton from "./components/ClearRoomButton";
import { PARTYKIT_HOST, PARTYKIT_URL } from "@/app/env";
import Editor from "./Editor";
import CollapsibleChat from "./CollapsibleChat";

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
  const url = `${PARTYKIT_URL}/parties/${party}/${params.roomId}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  const room = res.status === 404 ? null : await res.json();

  // fetch user session for server rendering
  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;

  return (
    <div className="w-full flex flex-col gap-4 justify-between items-start">
      <div className="flex flex-wrap justify-start items-center gap-x-4 gap-y-2">
        <Link href="/chat" className="text-stone-400 whitespace-nowrap">
          &lt;- All Docs
        </Link>
      </div>
      {room ? (
        <>
          <div className="w-full shadow rounded-xl max-w-prose mx-auto text-lg font-serif">
            <Editor
              host={PARTYKIT_HOST}
              party={'editor'}
              userColor={getRandomColor()}
              room={params.roomId}
            />
          </div>

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
          </CollapsibleChat>

        </>
      ) : (
        <h1 className="text-4xl font-medium">Room not found</h1>
      )}
    </div>
  );
}
