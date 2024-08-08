'use client'

import { PARTYKIT_URL } from "@/app/env";


const partyUrl = `${PARTYKIT_URL}/parties/basic/single-list`;

export default async function Home() {
    console.log("We are connecting to", partyUrl)
    try {
        const res = await fetch(partyUrl, { next: { revalidate: 0 } });
        console.log("here is. your result", await res.json())
    } catch (e) {
        console.log("error!!")
    }

    return (
        <div>
            <p>Welcome to party! we get 10</p>
            <p>
                {JSON.stringify(1)}
                <button onClick={async () => {
                    try {
                        const res = await fetch(partyUrl, { next: { revalidate: 0 } });
                        console.log("here is. your result from button", await res.json())
                    } catch (e) {
                        console.log("error!!")
                    }
                }}>
                    click me!!
                </button>
            </p>
        </div>
    )
}