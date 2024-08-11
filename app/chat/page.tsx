import { generateSlug, RandomWordOptions } from "random-word-slugs";
import { RoomInfo, SINGLETON_ROOM_ID } from "@/party/chatRooms";
import { RoomList } from "./RoomList";
import { PARTYKIT_URL } from "@/app/env";

import NewRoom from "./components/NewRoom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const randomWords: RandomWordOptions<3> = {
    format: "kebab",
    categories: { noun: ["animals"] },
    partsOfSpeech: ["adjective", "adjective", "noun"],
};

const partyUrl = `${PARTYKIT_URL}/parties/chatrooms/${SINGLETON_ROOM_ID}`;

export const revalidate = 0;

export default async function RoomListPage() {
    // fetch rooms for server rendering with a GET request to the server
    console.log("fetching rooms", partyUrl)
    const res = await fetch(partyUrl, { next: { revalidate: 0 } });
    const rooms = ((await res.json()) ?? []) as RoomInfo[];

    console.log("found rooms", rooms)

    return (
        <div className="bg-teal-50 h-screen flex flex-col">
            <Header />
            <div className="mt-10 w-full flex-1 flex flex-col gap-6 max-w-screen-lg mx-auto">
                <h1 className="text-4xl font-medium">Docs</h1>
                <RoomList initialRooms={rooms} />
                <NewRoom slug={generateSlug(3, randomWords)} />
            </div>
            <Footer />
        </div>
    );
}
