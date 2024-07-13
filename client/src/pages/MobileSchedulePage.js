import { React, useState } from "react";
import Split from "react-split";
import AnnouncementsSplit from "../components/AnnouncementsSplit";
import BellScheduleSplit from "../components/BellScheduleSplit";
import InformationSplit from "../components/InformationSplit";

const MobileSchedulePage = ({
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
  const [openTab, setOpenTab] = useState(2);

  if (!scheduleInfo) {
    return null;
  }

  return (
    <Split
      className="rounded-md border-solid border-8 border-neutral-200 dark:border-neutral-700 overflow-hidden"
      direction="vertical"
      sizes={[75, 25]}
      style={{ height: "calc(100vh - 56px)" }}
      minSize={[100, 0]}
      gutter={(index, direction) => {
        const gutter = document.createElement("div");
        gutter.className = `gutter gutter-${direction} bg-[#e5e5e5] dark:bg-[#404040]`;
        return gutter;
      }}
    >
      <div className="overflow-hidden text-center flex flex-col justify-center font-monda text-2xl dark:text-white">
        <h1 className="my-2.5 mx-auto font-syne py-3 px-3 justify-center text-3xl rounded-full border-solid border-2 border-neutral-300 dark:border-neutral-500 bg-white dark:bg-transparent">
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
      <div className="overflow-y-scroll">
        <div className="flex justify-evenly">
          <button
            className={
              "py-3 rounded-b-lg block leading-3 border border-solid w-36 " +
              (openTab === 1
                ? "text-black bg-neutral-200 dark:bg-neutral-700 dark:text-white dark:border-t-neutral-700 dark:border-neutral-500"
                : "text-neutral-600 border-t-white dark:border-t-transparent dark:border-neutral-600 dark:text-white")
            }
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
          >
            Announcements
          </button>
          <button
            className={
              "py-3 rounded-b-lg block leading-3 border border-solid w-36 " +
              (openTab === 2
                ? "text-black bg-neutral-200 dark:bg-neutral-700 dark:text-white dark:border-t-neutral-700 dark:border-neutral-500"
                : "text-neutral-600 border-t-white dark:border-t-transparent dark:border-neutral-600 dark:text-white")
            }
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(2);
            }}
          >
            Bell Schedule
          </button>
          <button
            className={
              "py-3 rounded-b-lg block leading-3 border border-solid w-36 " +
              (openTab === 3
                ? "text-black bg-neutral-200 dark:bg-neutral-700 dark:text-white dark:border-t-neutral-700 dark:border-neutral-500"
                : "text-neutral-600 border-t-white dark:border-t-transparent dark:border-neutral-600 dark:text-white")
            }
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(3);
            }}
          >
            Information
          </button>
        </div>
        <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-transparent w-full mb-6 rounded">
          <div className="px-4 py-5 flex-auto">
            <div className={openTab === 1 ? "block" : "hidden"}>
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
            <div className={openTab === 2 ? "block" : "hidden"}>
              <BellScheduleSplit scheduleInfo={scheduleInfo} />
            </div>
            <div className={openTab === 3 ? "block" : "hidden"}>
              <InformationSplit
                scheduleInfo={scheduleInfo}
                userInfo={userInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </Split>
  );
};

export default MobileSchedulePage;
