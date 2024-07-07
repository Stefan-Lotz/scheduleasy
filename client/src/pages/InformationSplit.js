import { LinkIcon } from "@heroicons/react/24/outline";
import { React, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { PencilSquareIcon as EditOutline } from "@heroicons/react/24/outline";
import { PencilSquareIcon as EditSolid } from "@heroicons/react/24/solid";
import { TrashIcon as TrashOutline } from "@heroicons/react/24/outline";
import { TrashIcon as TrashSolid } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

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
              <Link
                to={`/schedule/${scheduleInfo.url}/edit`}
                className="group cursor-pointer relative"
                onMouseEnter={() => setEditIsHovered(true)}
                onMouseLeave={() => setEditIsHovered(false)}
                title="Edit"
              >
                {editIsHovered ? (
                  <EditSolid className="size-6" />
                ) : (
                  <EditOutline className="size-6" />
                )}
              </Link>
              <Link
                to=""
                className="group cursor-pointer relative"
                onMouseEnter={() => setTrashIsHovered(true)}
                onMouseLeave={() => setTrashIsHovered(false)}
                title="Delete"
              >
                {trashIsHovered ? (
                  <TrashSolid className="size-6" />
                ) : (
                  <TrashOutline className="size-6" />
                )}
              </Link>
              <Link
                to=""
                className="group cursor-pointer relative"
                title="Link"
              >
                <LinkIcon className="size-6" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InformationSplit;
