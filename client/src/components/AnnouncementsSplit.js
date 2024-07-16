import { React, useContext, useEffect, useState, useRef } from "react";
import { PaperAirplaneIcon as PaperAirplaneOutline } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon as PaperAirplaneSolid } from "@heroicons/react/24/solid";
import UserMessage from "../components/UserMessage";
import { UserContext } from "../UserContext";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const AnnouncementsSplit = ({
  scheduleInfo,
  handleMessageSubmit,
  newMessage,
  setNewMessage,
  sendIsHovered,
  setSendIsHovered,
}) => {
  const { userInfo } = useContext(UserContext);
  const [messages, setMessages] = useState(scheduleInfo.messages || []);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    socket.on("newMessage", ({ url, message }) => {
      if (scheduleInfo.url === url) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [scheduleInfo.url]);

  useEffect(() => {
    setMessages(scheduleInfo.messages || []);
  }, [scheduleInfo.messages]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative h-full flex flex-col">
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden mb-2 scrollbar scrollbar-track-transparent scrollbar-thumb-neutral-400"
        ref={messageContainerRef}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="grid px-2">
            {messages.map((message) => (
              <UserMessage key={message._id} message={message} />
            ))}
          </div>
          {userInfo.id === scheduleInfo.author._id && (
            <form
              onSubmit={handleMessageSubmit}
              className="px-2 flex gap-2 items-center"
            >
              <input
                value={newMessage}
                type="text"
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Send an announcement..."
                className="w-full rounded-3xl border-2 p-2 border-gray-300 dark:border-neutral-500 dark:bg-transparent dark:text-white resize-y overflow-y-auto md:mb-10"
              />
              <button
                type="button"
                onClick={handleMessageSubmit}
                className="bg-mint p-1 text-white rounded-full flex hover:bg-slate md:mb-10"
                onMouseEnter={() => setSendIsHovered(true)}
                onMouseLeave={() => setSendIsHovered(false)}
              >
                {sendIsHovered ? (
                  <PaperAirplaneSolid className="size-6 -rotate-90 m-auto" />
                ) : (
                  <PaperAirplaneOutline className="size-6 -rotate-90 m-auto" />
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsSplit;
