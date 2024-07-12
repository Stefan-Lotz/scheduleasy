import { React, useState } from "react";
import Helmet from "react-helmet";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const [displayText, setDisplayText] = useState(
    "Simply open a schedule's page to view a constantly-running countdown to the end of each period. Stay on task as the page's title displays the countdown as well, allowing for you to see the countdown at a glance!"
  );
  const [activeDisplay, setActiveDisplay] = useState(1);

  return (
    <>
      <Helmet>
        <title>About | Scheduleasy</title>
      </Helmet>
      <div className="text-center text-lg font-syne mx-4 dark:text-white flex flex-col gap-2">
        <h1 className="font-bold text-3xl mt-8">About</h1>
        <p className="max-w-xl lg:max-w-screen-sm mx-auto">
          Scheduleasy was created to be an intuitive and simple solution to
          common issues among bell schedules. Check out some of the ways it can
          benefit you!
        </p>

        <div className="flex justify-center gap-10 my-4">
          <div className="flex flex-col gap-10 dark:text-222">
            <button
              onMouseOver={(e) => {
                setDisplayText(
                  "Simply open a schedule's page to view a constantly-running countdown to the end of each period. Stay on task as the page's title displays the countdown as well, allowing for you to see the countdown at a glance!"
                );
                setActiveDisplay(1);
              }}
              onClick={(e) => {
                setDisplayText(
                  "Simply open a schedule's page to view a constantly-running countdown to the end of each period. Stay on task as the page's title displays the countdown as well, allowing for you to see the countdown at a glance!"
                );
                setActiveDisplay(1);
              }}
              className={
                "bg-saffron px-3 py-3 rounded-md " +
                (activeDisplay === 1
                  ? "shadow-md shadow-yellow-600"
                  : "shadow-none")
              }
            >
              Always know how much time is left in the period
            </button>
            <button
              onMouseOver={(e) => {
                setDisplayText(
                  "With easy edits, schedule owners can quickly adjust every detail, enabling users to see schedule changes the moment they happen."
                );
                setActiveDisplay(2);
              }}
              onClick={(e) => {
                setDisplayText(
                  "With easy edits, schedule owners can quickly adjust every detail, enabling users to see schedule changes the moment they happen."
                );
                setActiveDisplay(2);
              }}
              className={
                "bg-pumpkin px-3 py-3 rounded-md " +
                (activeDisplay === 2
                  ? "shadow-md shadow-amber-600"
                  : "shadow-none")
              }
            >
              Make last minute changes a thing of the past
            </button>
            <button
              onMouseOver={(e) => {
                setDisplayText(
                  "Announcements let schedule owners send a message their schedule's page, ensuring everyone stays in the loop and any new information."
                );
                setActiveDisplay(3);
              }}
              onClick={(e) => {
                setDisplayText(
                  "Announcements let schedule owners send a message their schedule's page, ensuring everyone stays in the loop and any new information."
                );
                setActiveDisplay(3);
              }}
              className={
                "bg-salmon px-3 py-3 rounded-md " +
                (activeDisplay === 3
                  ? "shadow-md shadow-[#e45c3b]"
                  : "shadow-none")
              }
            >
              Keep your users informed at all times
            </button>
          </div>
          <div className="border-2 border-mint px-4 py-2 rounded-lg place-content-center w-96">
            {displayText}
          </div>
        </div>

        <h2 className="text-2xl">History</h2>
        <p className="max-w-xl lg:max-w-screen-sm mx-auto">
          Scheduleasy was created in 2024 by Stefan Lotz as the successor to
          EHSchedule. Originally created as a side project, EHSchedule displayed
          the time left in each period at Edgewater High School. After entering
          it into the Congressional App Challenge, Stefan knew that he wanted to
          expand the website but lacked the knowledge to do so.
        </p>
        <p className="max-w-xl lg:max-w-screen-sm mx-auto">
          At the start of 2024, Stefan started learning as much as he could
          about web development. He sought to add and improve every feature he
          originally desired to have on EHSchedule, but soon found that it would
          be easier to build a new website from the ground up.
        </p>

        <Link
          to="https://github.com/Stefan-Lotz/scheduleasy"
          target="_blank"
          className="bg-saffron mt-4 mx-auto py-2 px-3 rounded-md text-xl font-medium text-222 hover:bg-[#d1b05f] flex gap-3 items-center"
        >
          View Scheduleasy on GitHub!
          <ArrowRightIcon className="size-6" />
        </Link>
      </div>
    </>
  );
}
