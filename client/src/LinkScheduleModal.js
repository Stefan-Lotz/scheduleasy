import React from "react";

const LinkScheduleModal = ({
  userSchedules,
  selectedSchedule,
  setSelectedSchedule,
  hasLink,
  onLink,
  onUnlink,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-neutral-900 bg-opacity-85 flex justify-center items-center font-syne z-20">
      <div className="bg-white text-222 dark:bg-neutral-700 dark:text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Link two schedules</h2>
        <p className="mb-4">
          You can add a link to another schedule you own to this page.
        </p>
        <div>
          {userSchedules.map((schedule) => (
            <div
              key={schedule.url}
              onClick={() => setSelectedSchedule(schedule)}
              className={`cursor-pointer p-2 rounded mb-2 ${
                selectedSchedule && selectedSchedule.url === schedule.url
                  ? "bg-mint text-white hover:bg-[#1f756a] dark:hover:bg-[#35c5b4]"
                  : "bg-gray-200 dark:bg-neutral-600 dark:text-white hover:bg-gray-300 dark:hover:bg-neutral-500"
              }`}
            >
              {schedule.title}
            </div>
          ))}
        </div>

        {hasLink ? (
          <div className="flex mt-4 justify-between">
            <div className="justify-start">
              <button
                onClick={onUnlink}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Unlink
              </button>
            </div>
            <div className="justify-end">
              <button
                onClick={onCancel}
                className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={onLink}
                className="bg-mint text-white py-2 px-4 rounded hover:bg-[#1f756a]"
              >
                Link
              </button>
            </div>
          </div>
        ) : (
          <div className="flex mt-4 justify-end">
            <button
              onClick={onCancel}
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={onLink}
              className="bg-mint text-white py-2 px-4 rounded hover:bg-[#1f756a]"
            >
              Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkScheduleModal;
