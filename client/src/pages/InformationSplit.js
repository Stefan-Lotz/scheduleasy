import { LinkIcon } from "@heroicons/react/24/outline";
import { React, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { PencilSquareIcon as EditOutline } from "@heroicons/react/24/outline";
import { PencilSquareIcon as EditSolid } from "@heroicons/react/24/solid";
import { TrashIcon as TrashOutline } from "@heroicons/react/24/outline";
import { TrashIcon as TrashSolid } from "@heroicons/react/24/solid";

const InformationSplit = ({ scheduleInfo, userInfo }) => {
  const [editIsHovered, setEditIsHovered] = useState(false);
  const [trashIsHovered, setTrashIsHovered] = useState(false);

  if (!scheduleInfo) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col text-left ml-5 mr-5 gap-1 font-syne dark:text-white">
        <p>Created by: {scheduleInfo.author.username}</p>
        <p>{scheduleInfo.about}</p>
        <p>
          Last updated:{" "}
          <ReactTimeAgo date={scheduleInfo.updatedAt} locale="en-US" />
        </p>

        {userInfo.id === scheduleInfo.author._id && (
          <div>
            <hr className="my-2" />
            <div className="flex justify-around">
              <div
                className="group cursor-pointer relative"
                onMouseEnter={() => setEditIsHovered(true)}
                onMouseLeave={() => setEditIsHovered(false)}
              >
                {editIsHovered ? (
                  <EditSolid className="size-6" />
                ) : (
                  <EditOutline className="size-6" />
                )}
                <div className="opacity-0  z-10 -mt-16 -ml-[11px] bg-gray-800 text-white text-center text-xs rounded-lg py-2 absolute group-hover:opacity-100 px-3 pointer-events-none">
                  Edit
                  <svg
                    className="absolute text-gray-800 h-2 w-full left-0 top-full"
                    x="0px"
                    y="0px"
                    viewBox="0 0 255 255"
                  >
                    <polygon
                      className="fill-current"
                      points="0,0 127.5,127.5 255,0"
                    />
                  </svg>
                </div>
              </div>
              <div
                className="group cursor-pointer relative"
                onMouseEnter={() => setTrashIsHovered(true)}
                onMouseLeave={() => setTrashIsHovered(false)}
              >
                {trashIsHovered ? (
                  <TrashSolid className="size-6" />
                ) : (
                  <TrashOutline className="size-6" />
                )}
                <div className="opacity-0  z-10 -mt-16 -ml-[18px] bg-gray-800 text-white text-center text-xs rounded-lg py-2 absolute group-hover:opacity-100 px-3 pointer-events-none">
                  Delete
                  <svg
                    className="absolute text-gray-800 h-2 w-full left-0 top-full"
                    x="0px"
                    y="0px"
                    viewBox="0 0 255 255"
                  >
                    <polygon
                      className="fill-current"
                      points="0,0 127.5,127.5 255,0"
                    />
                  </svg>
                </div>
              </div>
              <div className="group cursor-pointer relative">
                <LinkIcon className="size-6" />
                <div className="opacity-0  z-10 -mt-16 -ml-[12px] bg-gray-800 text-white text-center text-xs rounded-lg py-2 absolute group-hover:opacity-100 px-3 pointer-events-none">
                  Link
                  <svg
                    className="absolute text-gray-800 h-2 w-full left-0 top-full"
                    x="0px"
                    y="0px"
                    viewBox="0 0 255 255"
                  >
                    <polygon
                      className="fill-current"
                      points="0,0 127.5,127.5 255,0"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InformationSplit;
