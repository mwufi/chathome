'use client'

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const CollapsibleChat = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-30 right-10">
            {isOpen ? (
                <div className="w-[340px] bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4 bg-gray-100 flex justify-between items-center">
                        <h3 className="font-semibold">Chat</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-4">
                        {children}
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-teal-200 text-white p-4 rounded-full shadow-lg hover:bg-teal-300 transition-colors"
                >
                    <MessageCircle size={24} />
                </button>
            )}
        </div>
    );
};

export default CollapsibleChat;