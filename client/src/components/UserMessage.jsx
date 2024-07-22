import React from "react";
import ReactTimeAgo from "react-time-ago";

export default function UserMessage({ message }) {
  const createdAtTimestamp =
    typeof message.createdAt === "string" || message.createdAt instanceof Date
      ? new Date(message.createdAt).getTime()
      : message.createdAt;

  return (
    <div className="bg-white dark:bg-222 dark:text-white px-2 py-0.5 mb-3 rounded-md border border-gray-300 flex flex-col space-between">
      <p className="mt-2">{message.text}</p>
      <ReactTimeAgo
        date={createdAtTimestamp}
        locale="en-US"
        className="text-right text-neutral-400"
      />
    </div>
  );
}
