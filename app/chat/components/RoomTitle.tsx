'use client'

import React, { useState, useEffect } from 'react';
import { PARTYKIT_URL } from "@/app/env";

interface RoomTitleProps {
    roomId: string;
    className?: string;
}

const RoomTitle: React.FC<RoomTitleProps> = ({ roomId, className }) => {
    const [title, setTitle] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        async function fetchTitle() {
            try {
                const url = `${PARTYKIT_URL}/parties/editor/${roomId}`;
                const response = await fetch(url);
                const data = await response.json();
                setTitle(data.title);
            } catch (error) {
                console.error("Error fetching title:", error);
            }
        }
        fetchTitle();
    }, [roomId]);

    const handleTitleChange = (newTitle: string) => {
        setTitle(newTitle);
        console.log(newTitle);
        // Send the updated title to the server
        const updateTitle = async () => {
            try {
                const url = `${PARTYKIT_URL}/parties/editor/${roomId}`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: newTitle }),
                });
                if (!response.ok) {
                    throw new Error('Failed to update title');
                }
            } catch (error) {
                console.error("Error updating title:", error);
            }
        };
        updateTitle();
    };

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (title !== null) {
            handleTitleChange(title);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    const sharedStyles = {
        width: '100%',
    };

    if (title === null) {
        return null; // or a loading indicator
    }

    return (
        <>
            {isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className={className}
                    style={{
                        ...sharedStyles,
                        border: 'none',
                        background: 'transparent',
                    }}
                />
            ) : (
                <h1
                    onClick={handleClick}
                    className={className}
                    style={{ ...sharedStyles, cursor: 'pointer' }}
                >
                    {title}
                </h1>
            )}
        </>
    );
};

export default RoomTitle;