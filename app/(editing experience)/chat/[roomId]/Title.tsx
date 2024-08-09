'use client'

import React, { useState } from 'react';

interface TitleProps {
    initialTitle: string;
    onTitleChanged: (newTitle: string) => void;
    className?: string;
}

const Title: React.FC<TitleProps> = ({ initialTitle, onTitleChanged, className }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onTitleChanged(title);
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
        fontSize: '2rem',
        fontWeight: 'bold',
        width: '100%',
    };

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

export default Title;