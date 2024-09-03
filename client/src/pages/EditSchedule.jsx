import { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { Navigate, useParams, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import {
  ExclamationTriangleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

export default function EditSchedule() {
  const { url } = useParams();
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [numPeriods, setNumPeriods] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [periods, setPeriods] = useState([]);
  const [cover, setCover] = useState("");
  const [owner, setOwner] = useState("");
  const { userInfo } = useContext(UserContext);
  const [hasAlternateSchedule, setHasAlternateSchedule] = useState("");
  const [alternatePeriods, setAlternatePeriods] = useState([]);
  const [activeDays, setActiveDays] = useState([]);

  useEffect(() => {
    axios
      .get(`/schedule/${url}`, {
        withCredentials: true,
      })
      .then((response) => {
        const data = response.data;
        setTitle(data.title);
        setAbout(data.about);
        setNumPeriods(data.numPeriods);
        setPeriods(data.periods);
        setCover(data.cover);
        setOwner(data.author._id);
        setHasAlternateSchedule(data.alternateSchedule);
        setAlternatePeriods(data.alternateSchedule.periods);
        setActiveDays(data.alternateSchedule.activeDays);
      })
      .catch((error) => console.error("Error fetching schedule:", error));
  }, [url]);

  function handlePeriodsChange(ev, index, field, isAlternate = false) {
    const newPeriods = (isAlternate ? alternatePeriods : periods).map(
      (period, i) =>
        i === index ? { ...period, [field]: ev.target.value } : period
    );
    isAlternate ? setAlternatePeriods(newPeriods) : setPeriods(newPeriods);
  }

  function handleNumPeriodsChange(ev, isAlternate = false) {
    const value = parseInt(ev.target.value, 10);
    if (isAlternate) {
      const newPeriods = Array(value)
        .fill()
        .map(
          (_, i) =>
            alternatePeriods[i] || { name: "", startTime: "", endTime: "" }
        );
      setAlternatePeriods(newPeriods);
    } else {
      setNumPeriods(value);
      const newPeriods = Array(value)
        .fill()
        .map((_, i) => periods[i] || { name: "", startTime: "", endTime: "" });
      setPeriods(newPeriods);
    }
  }

  function toggleAlternateSchedule() {
    setHasAlternateSchedule(!hasAlternateSchedule);
  }

  async function updateSchedule(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("about", about);
    if (files[0]) {
      data.set("file", files[0]);
    }
    data.set("numPeriods", numPeriods);
    data.set("periods", JSON.stringify(periods));

    if (hasAlternateSchedule) {
      data.set(
        "alternateSchedule",
        JSON.stringify({
          periods: alternatePeriods,
          activeDays: activeDays,
        })
      );
    }

    try {
      const response = await axios.put(`/schedule/${url}`, data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  }

  if (redirect) {
    return <Navigate to={`/schedule/${url}`} />;
  }

  if (userInfo.id !== owner) {
    return (
      <div className="flex flex-col items-center text-222 dark:text-white">
        <ExclamationTriangleIcon className="h-12 w-12 animate-pulse" />
        <h1 className="mt-4 text-xl font-syne">
          You do not have authorization to edit this schedule.
        </h1>
        <Link
          to="/schedules"
          className="py-1 px-3 mt-2 bg-mint rounded-xl flex text-lg items-center hover:bg-slate text-white font-syne"
        >
          <ArrowLeftIcon className="size-5 mr-2" />
          Back to schedules
        </Link>
      </div>
    );
  }

  return (
    <div className="font-syne dark:text-white">
      <Helmet>
        <title>Edit | Scheduleasy</title>
      </Helmet>
      <h1 className="text-center py-5 text-3xl font-semibold">
        Edit your schedule!
      </h1>
      <form
        onSubmit={updateSchedule}
        className="flex flex-col gap-7 max-w-xl w-full px-5 sm:px-0 mx-auto"
      >
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-222 dark:text-white"
          >
            Edit the title.
          </label>
          <input
            type="text"
            placeholder={"My Awesome Schedule"}
            id="title"
            className="bg-gray-50 border border-gray-300 text-222 dark:bg-transparent dark:text-white text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-neutral-400">
            Your schedule's title will be publicly displayed.
          </p>
        </div>
        <div>
          <label
            htmlFor="about"
            className="block mb-2 text-sm font-medium text-222 dark:text-white"
          >
            Edit the description.
          </label>
          <input
            type="text"
            placeholder={"This is the coolest schedule ever created."}
            id="about"
            className="bg-gray-50 border border-gray-300 text-222 dark:bg-transparent dark:text-white text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
            value={about}
            maxLength="100"
            onChange={(ev) => setAbout(ev.target.value)}
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-neutral-400">
            (Maximum 100 characters.)
          </p>
        </div>
        <div>
          <label
            htmlFor="numPeriods"
            className="block mb-2 text-sm font-medium text-222 dark:text-white"
          >
            Edit the number of periods.
          </label>
          <input
            type="number"
            placeholder={"Number of periods"}
            id="numPeriods"
            value={numPeriods}
            className="bg-gray-50 border font-sans border-gray-300 text-222 dark:bg-transparent dark:text-white text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
            onChange={handleNumPeriodsChange}
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-neutral-400">
            Periods such as "lunch" or "break" should also be accounted for.
          </p>
        </div>
        <div className="max-h-[560px] overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-gray-500">
          {periods.map((period, index) => (
            <div
              key={index}
              className="grid gap-4 bg-gray-50 border border-gray-300 dark:bg-transparent dark:text-white rounded-lg p-3 font-sans mb-4"
            >
              <div>
                <label
                  htmlFor={`name${index}`}
                  className="block mb-2 text-sm font-medium text-222 dark:text-white"
                >
                  Period {index + 1} Name
                </label>
                <input
                  type="text"
                  id={`name${index}`}
                  placeholder={`Period ${index + 1}`}
                  className="bg-gray-50 border border-gray-300 text-222 dark:bg-transparent dark:text-white text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
                  value={period.name}
                  onChange={(ev) => handlePeriodsChange(ev, index, "name")}
                />
              </div>
              <div>
                <label
                  htmlFor={`startTime${index}`}
                  className="block mb-2 text-sm font-medium text-222 dark:text-white"
                >
                  Start Time {index + 1}
                </label>
                <input
                  type="time"
                  id={`startTime${index}`}
                  className="bg-gray-50 border border-gray-300 text-222 dark:bg-transparent dark:text-white text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
                  value={period.startTime}
                  onChange={(ev) => handlePeriodsChange(ev, index, "startTime")}
                />
              </div>
              <div>
                <label
                  htmlFor={`endTime${index}`}
                  className="block mb-2 text-sm font-medium text-222 dark:text-white"
                >
                  End Time {index + 1}
                </label>
                <input
                  type="time"
                  id={`endTime${index}`}
                  className="bg-gray-50 border border-gray-300 text-222 dark:bg-transparent dark:text-white text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
                  value={period.endTime}
                  onChange={(ev) => handlePeriodsChange(ev, index, "endTime")}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-222 dark:text-white"
            htmlFor="file"
          >
            Change the cover image.
          </label>
          <input
            type="file"
            id="file"
            className="block w-full text-sm text-222 dark:bg-transparent dark:text-white border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:border-0 file:bg-gray-600 file:py-[7px] file:text-white file:px-3 hover:file:bg-gray-700 file:mr-3"
            onChange={(ev) => setFiles(ev.target.files)}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
            PNG or JPG (Suggested size: 150 x 150px).
          </p>
          <p className="hidden">Current cover: {cover}</p>
        </div>

        <label className="block items-center cursor-pointer">
          <label
            className="block mb-2 text-sm font-medium text-222 dark:text-white"
            htmlFor="altCheckbox"
          >
            Add alternate schedule?
          </label>
          <input
            type="checkbox"
            id="altCheckbox"
            checked={hasAlternateSchedule}
            onChange={toggleAlternateSchedule}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1f756a] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-mint"></div>
        </label>
        <p className="-mt-5 text-sm text-gray-500 dark:text-neutral-400">
          Give your schedule different periods on certain days of the week
          automatically.
        </p>
        {hasAlternateSchedule && (
          <div>
            <label className="block mb-2 text-sm font-medium text-222 dark:text-white">
              Choose which day(s) the alternate schedule should activate.
            </label>
            <ul className="items-center w-full text-sm font-medium text-222 border border-gray-200 rounded-lg sm:flex bg-transparent select-none mb-7">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day, index) => (
                <li
                  key={day}
                  className={`w-full 
                    ${
                      index !== 6
                        ? "border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                        : ""
                    }`}
                >
                  <div className="flex items-center text-center">
                    <input
                      id={`${day.toLowerCase()}CheckboxList`}
                      type="checkbox"
                      className="hidden peer"
                      checked={activeDays.includes(day)}
                      onChange={() => {
                        const newDays = activeDays.includes(day)
                          ? activeDays.filter((d) => d !== day)
                          : [...activeDays, day];
                        setActiveDays(newDays);
                      }}
                    />
                    <label
                      htmlFor={`${day.toLowerCase()}CheckboxList`}
                      className={`w-full py-3 text-sm font-medium text-222 dark:text-white peer-checked:bg-mint peer-checked:text-white hover:cursor-pointer hover:text-white hover:bg-[#2eac9d] hover:peer-checked:bg-[#268e81] 
                        ${
                          index === 0
                            ? "rounded-tl-[.44rem] rounded-tr-[.44rem] sm:rounded-bl-[.44rem] sm:rounded-tr-none"
                            : ""
                        } ${
                        index === 6
                          ? "rounded-bl-[.44rem] rounded-br-[.44rem] sm:rounded-tr-[.44rem] sm:rounded-bl-none "
                          : ""
                      }`}
                    >
                      {day}
                    </label>
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <label
                htmlFor="numAltPeriods"
                className="block mb-2 text-sm font-medium text-222 dark:text-white"
              >
                Choose how many periods your alternate schedule has.
              </label>
              <input
                type="number"
                placeholder={"Number of periods"}
                id="numAltPeriods"
                value={alternatePeriods.length}
                className="bg-gray-50 border mb-7 font-sans border-gray-300 text-222 dark:bg-transparent dark:text-white text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
                onChange={(ev) => handleNumPeriodsChange(ev, true)}
              />
            </div>

            <div className="max-h-[560px] overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-gray-500">
              {alternatePeriods.map((period, index) => (
                <div
                  key={index}
                  className="grid gap-4 bg-gray-50 border border-gray-300 dark:bg-transparent dark:text-white rounded-lg p-3 font-sans mb-4"
                >
                  <div>
                    <label
                      htmlFor={`name${index}`}
                      className="block mb-2 text-sm font-medium text-222 dark:text-white"
                    >
                      Period {index + 1} Name
                    </label>
                    <input
                      type="text"
                      id={`name${index}`}
                      placeholder={`Period ${index + 1}`}
                      className="bg-gray-50 border border-gray-300 text-222 dark:bg-transparent dark:text-white text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
                      value={period.name}
                      onChange={(ev) =>
                        handlePeriodsChange(ev, index, "name", true)
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`startTime${index}`}
                      className="block mb-2 text-sm font-medium text-222 dark:text-white"
                    >
                      Start Time {index + 1}
                    </label>
                    <input
                      type="time"
                      id={`startTime${index}`}
                      className="bg-gray-50 border border-gray-300 text-222 dark:bg-transparent dark:text-white text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
                      value={period.startTime}
                      onChange={(ev) =>
                        handlePeriodsChange(ev, index, "startTime", true)
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`endTime${index}`}
                      className="block mb-2 text-sm font-medium text-222 dark:text-white"
                    >
                      End Time {index + 1}
                    </label>
                    <input
                      type="time"
                      id={`endTime${index}`}
                      className="bg-gray-50 border border-gray-300 text-222 dark:bg-transparent dark:text-white text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
                      value={period.endTime}
                      onChange={(ev) =>
                        handlePeriodsChange(ev, index, "endTime", true)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <button className="mx-auto rounded-2xl py-2 px-4 bg-mint hover:bg-[#1f756a] text-white font-shrikhand text-xl">
          Update Schedule
        </button>
      </form>
    </div>
  );
}
