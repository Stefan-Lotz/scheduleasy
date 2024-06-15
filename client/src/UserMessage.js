import React from 'react';
import ReactTimeAgo from 'react-time-ago';

export default function UserMessage({ message }) {
    return (
        <div className="bg-white px-2 py-0.5 mb-3 rounded-md border border-gray-300 flex flex-col space-between">
            <p className="mt-2">{message.text}</p>
            <ReactTimeAgo date={message.createdAt} locale="en-US" className="text-right text-neutral-400" />
        </div>
    );
}