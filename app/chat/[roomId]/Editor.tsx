'use client'

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import { useState, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import { QuillBinding } from "y-quill";

import useYProvider from "y-partykit/react";
import styles from "./Editor.module.css";
import QuillCursors from "quill-cursors";

Quill.register("modules/cursors", QuillCursors);

export default function Editor({
    host,
    party,
    room,
    userColor,
}: {
    party: string;
    host: string;
    room: string;
    userColor: string;
}) {
    const [text, setText] = useState("<h1>Hello</h1>");
    const quill = useRef<ReactQuill>(null);

    const provider = useYProvider({
        host,
        party,
        room,
        options: {}
    });

    // Create an editor-binding which
    // "binds" the quill editor to a Y.Text type.
    useEffect(() => {
        const ytext = provider.doc.getText("quill");
        const editor = quill.current!.getEditor();
        const binding = new QuillBinding(ytext, editor, provider.awareness);
        provider.awareness.setLocalStateField("user", {
            name: "Typing...",
            color: userColor,
        });
        return () => {
            binding.destroy();
        };
    }, [userColor, provider, quill]);

    return (
        <div className={styles.editor}>
            <ReactQuill
                ref={quill}
                theme="snow"
                className={styles.quill}
                placeholder="Compose an epic..."
                value={text}
                onChange={setText}
                modules={{ cursors: true }}
            />
        </div>
    );
}
