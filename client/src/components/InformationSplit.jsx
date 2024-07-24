import { LinkIcon } from "@heroicons/react/24/outline";
import { React, useState, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import { PencilSquareIcon as EditOutline } from "@heroicons/react/24/outline";
import { PencilSquareIcon as EditSolid } from "@heroicons/react/24/solid";
import { TrashIcon as TrashOutline } from "@heroicons/react/24/outline";
import { TrashIcon as TrashSolid } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import LinkScheduleModal from "../components/LinkScheduleModal";
import axios from "axios";

const InformationSplit = ({ scheduleInfo, userInfo }) => {
  const [editIsHovered, setEditIsHovered] = useState(false);
  const [trashIsHovered, setTrashIsHovered] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [userSchedules, setUserSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [linkedScheduleTitle, setLinkedScheduleTitle] = useState("");

  useEffect(() => {
    async function fetchUserSchedules() {
      if (userInfo) {
        try {
          const response = await axios.get("/user-schedules", {
            withCredentials: true,
          });
          const schedules = response.data;
          const filteredSchedules = schedules.filter(
            (schedule) => schedule.url !== scheduleInfo.url
          );
          setUserSchedules(filteredSchedules);
        } catch (error) {
          console.error("Failed to fetch user schedules:", error);
        }
      }
    }

    async function fetchLinkedSchedule() {
      try {
        const allSchedulesResponse = await axios.get("/schedule", {
          withCredentials: true,
        });

        if (allSchedulesResponse.status === 200) {
          const allSchedules = allSchedulesResponse.data;

          const linked = allSchedules.find(
            (schedule) => schedule.url === scheduleInfo.linkedSchedule
          );

          if (linked) {
            setSelectedSchedule(linked);
            setLinkedScheduleTitle(linked.title);
          } else {
            const linkedResponse = await axios.get(
              `/${scheduleInfo.linkedSchedule}`,
              { withCredentials: true }
            );

            if (linkedResponse.status === 200) {
              const linkedSchedule = linkedResponse.data;
              setLinkedScheduleTitle(linkedSchedule.title);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    }

    fetchUserSchedules();
    fetchLinkedSchedule();
  }, [scheduleInfo.linkedSchedule, scheduleInfo.url, userInfo]);

  function deleteSchedule() {
    setIsDeleteModalOpen(true);
  }

  function linkSchedule() {
    setIsLinkModalOpen(true);
  }

  async function confirmDelete() {
    try {
      const response = await axios.delete(`/schedule/${scheduleInfo.url}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        window.location.href = "/schedules";
      } else {
        console.error("Failed to delete schedule");
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  }

  async function confirmLink() {
    if (!selectedSchedule) return;

    try {
      const response = await axios.put(
        `/schedule/${scheduleInfo.url}/link`,
        { linkedSchedule: selectedSchedule.url },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsLinkModalOpen(false);
        window.location.reload();
      } else {
        window.alert("Failed to link schedule");
      }
    } catch (error) {
      console.error("Error linking schedule:", error);
    }
  }

  async function confirmUnlink() {
    try {
      const response = await axios.put(
        `/schedule/${scheduleInfo.url}/link`,
        { linkedSchedule: null },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsLinkModalOpen(false);
        window.location.reload();
      } else {
        console.error("Failed to unlink schedule");
      }
    } catch (error) {
      console.error("Error unlinking schedule:", error);
    }
  }

  const updatedAtTimestamp =
    typeof scheduleInfo.updatedAt === "string" ||
    scheduleInfo.updatedAt instanceof Date
      ? new Date(scheduleInfo.updatedAt).getTime()
      : scheduleInfo.updatedAt;

  return (
    <div>
      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          scheduleTitle={scheduleInfo.title}
          onDelete={confirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
      {isLinkModalOpen && (
        <LinkScheduleModal
          userSchedules={userSchedules}
          selectedSchedule={selectedSchedule}
          setSelectedSchedule={setSelectedSchedule}
          hasLink={linkedScheduleTitle}
          onLink={confirmLink}
          onUnlink={confirmUnlink}
          onCancel={() => setIsLinkModalOpen(false)}
        />
      )}
      <div className="flex flex-col text-left ml-5 mr-5 gap-1 font-syne dark:text-white">
        <p>Created by: {scheduleInfo.author.username}</p>
        <p>{scheduleInfo.about}</p>
        <p>
          Last updated:{" "}
          <ReactTimeAgo date={updatedAtTimestamp} locale="en-US" />
        </p>
        {scheduleInfo.linkedSchedule && (
          <Link
            to={"/schedule/" + scheduleInfo.linkedSchedule}
            className="border border-222 dark:border-white rounded-md py-1 px-3 mx-auto flex items-center gap-3 hover:text-mint hover:border-mint"
          >
            {linkedScheduleTitle}
            <ArrowRightIcon className="size-5" />
          </Link>
        )}

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
              <button
                onClick={deleteSchedule}
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
              </button>
              <button
                onClick={linkSchedule}
                className="group cursor-pointer relative"
                title="Link"
              >
                <LinkIcon className="size-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InformationSplit;
