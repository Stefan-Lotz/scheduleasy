import { useEffect, useState, useCallback } from "react";
import UserSchedule from "../UserSchedule";
import { Helmet } from "react-helmet";
import debounce from "lodash.debounce";
import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function IndexPage() {
  const [schedules, setSchedules] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  const handleSearch = useCallback(
    debounce((value) => {
      const lowerCaseInput = value.toLowerCase();
      const filtered = schedules.filter((schedule) => {
        return (
          schedule.title.toLowerCase().includes(lowerCaseInput) ||
          schedule.about.toLowerCase().includes(lowerCaseInput) ||
          (schedule.author?.username.toLowerCase().includes(lowerCaseInput) ??
            false)
        );
      });
      setFilteredSchedules(filtered);
    }, 300),
    [schedules]
  );

  useEffect(() => {
    fetch("http://localhost:4000/schedule").then((response) => {
      response.json().then((schedules) => {
        setSchedules(schedules);
        setFilteredSchedules(schedules);
      });
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Browse | Scheduleasy</title>
      </Helmet>
      <div className="text-center font-syne">
        <h1 className="font-bold text-3xl mt-8 sm:mt-5">Schedules</h1>
        <p className="text-lg mt-4 mb-8 sm:mb-5">
          Browse the list of user-created schedules!
        </p>

        <div className="relative w-1/2 max-w-screen-sm mx-auto text-gray-400 focus-within:text-222">
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 size-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Or search for a schedule..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              handleSearch(e.target.value);
            }}
            className="pl-8 pr-2 py-1 border-2 border-gray-400 rounded-lg w-full"
          />
        </div>
        <div className="max-w-screen-xl px-4 mx-auto">
          <hr className="my-5" />
        </div>
      </div>
      {filteredSchedules.length > 0 ? (
        <div className="grid justify-items-center gap-4 max-w-screen-xl grid-cols-1 md:grid-cols-2 mx-auto px-4">
          {filteredSchedules.map((schedule) => (
            <UserSchedule key={schedule._id} {...schedule} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-gray-400 animate-pulse" />
          <h1 className="mt-4 text-xl font-syne">No schedules found.</h1>
        </div>
      )}
    </>
  );
}
