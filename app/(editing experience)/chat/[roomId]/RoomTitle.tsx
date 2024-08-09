'use client'

import { useEffect, useState } from "react"
import { PARTYKIT_URL } from "@/app/env";
import Title from "./Title";

interface RoomTitleProps { roomId: string, className: string }

export default function RoomTitle({ roomId, className }: RoomTitleProps) {
    const [title, setTitle] = useState('something something')
    useEffect(() => {
        async function foo() {
            const url = `${PARTYKIT_URL}/parties/editor/${roomId}`;
            const { title } = await fetch(url).then(x => x.json());
            console.log("title", title)
            setTitle(title)
        }
        try {
            void foo()
        } finally {
            // do nothing!!
        }
    }, [])

    return (
        <Title initialTitle={title} onTitleChanged={(e) => {
            console.log(e)
        }} className={className} />
    )
}