import React from "react";
import Split from "react-split";
import AnnouncementsSplit from "./AnnouncementsSplit";
import BellScheduleSplit from "./BellScheduleSplit";
import InformationSplit from "./InformationSplit";
import {
  EllipsisHorizontalCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const DesktopSchedulePage = ({
  scheduleInfo,
  currentPeriodInfo,
  updateCurrentPeriod,
  userInfo,
  handleMessageSubmit,
  newMessage,
  setNewMessage,
  messageContainerRef,
  sendIsHovered,
  setSendIsHovered,
}) => {
  if (!scheduleInfo) {
    return null;
  }

  return (
    <Split
      className="rounded-md border-solid border-8 border-neutral-200 overflow-hidden"
      direction="vertical"
      sizes={[75, 25]}
      style={{ height: "calc(100vh - 56px)" }}
      minSize={[100, 0]}
    >
      <div className="overflow-hidden text-center flex flex-col justify-center font-monda text-2xl">
        <h1 className="my-2.5 mx-auto py-3 px-3 justify-center text-3xl rounded-full border-solid border-2 border-neutral-300 bg-white">
          {scheduleInfo.title}
        </h1>
        <h2 className="my-2.5">Current period: {currentPeriodInfo.status}</h2>
        {currentPeriodInfo.timeLeft && (
          <h2 className="my-2.5">{currentPeriodInfo.timeLeft}</h2>
        )}
        {userInfo.id === scheduleInfo.author._id && (
          <p>This is your schedule!</p>
        )}
      </div>
      <Split className="flex" minSize={0}>
        <div>
          <div className="flex justify-center">
            <ExclamationCircleIcon className="w-6 h-6 my-2 hover:animate-spin" />
          </div>
          <AnnouncementsSplit
            scheduleInfo={scheduleInfo}
            handleMessageSubmit={handleMessageSubmit}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            messageContainerRef={messageContainerRef}
            sendIsHovered={sendIsHovered}
            setSendIsHovered={setSendIsHovered}
            updateCurrentPeriod={updateCurrentPeriod}
          />
        </div>
        <div>
          <div className="flex justify-center">
            <InformationCircleIcon className="w-6 h-6 my-2 hover:animate-spin" />
          </div>
          <BellScheduleSplit scheduleInfo={scheduleInfo} />
        </div>
        <div>
          <div className="flex justify-center">
            <EllipsisHorizontalCircleIcon className="w-6 h-6 my-2 hover:animate-spin" />
          </div>
          <InformationSplit scheduleInfo={scheduleInfo} userInfo={userInfo} />
        </div>
      </Split>
    </Split>
  );
};

export default DesktopSchedulePage;
