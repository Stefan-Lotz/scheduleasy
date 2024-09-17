import { useState } from "react";
import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Slider from "../components/Slider";
import axios from "axios";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [numPeriods, setNumPeriods] = useState(0);
  const [files, setFiles] = useState("");
  const [url, setURL] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [periods, setPeriods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [alternatePeriods, setAlternatePeriods] = useState([]);
  const [activeDays, setActiveDays] = useState([]);

  function handlePeriodsChange(ev, index, field, isAlternate = false) {
    const newPeriods = (isAlternate ? alternatePeriods : periods).map(
      (period, i) =>
        i === index ? { ...period, [field]: ev.target.value } : period
    );
    isAlternate ? setAlternatePeriods(newPeriods) : setPeriods(newPeriods);
  }

  function handleNumPeriodsChange(value, isAlternate = false) {
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

  async function createNewSchedule(ev) {
    ev.preventDefault();

    if (!title) {
      setError("Please enter a title for your schedule.");
      return;
    } else if (!about) {
      setError("Please enter a short description for your schedule.");
      return;
    } else if (!numPeriods || numPeriods <= 0) {
      setError("Please add at least one period to your schedule.");
      return;
    } else if (
      periods.some(
        (period) => !period.name || !period.startTime || !period.endTime
      )
    ) {
      setError("Please enter a name and time for each period.");
      return;
    } else if (!url) {
      setError("Please enter a valid URL.");
      return;
    } else if (!files) {
      setError("Please upload a file for your schedule's cover.");
      return;
    }

    setIsLoading(true);

    const data = new FormData();
    data.set("title", title);
    data.set("about", about);
    data.set("file", files[0]);
    data.set("numPeriods", numPeriods);
    data.set("url", url);
    data.set("periods", JSON.stringify(periods));
    data.set(
      "alternateSchedule",
      JSON.stringify({
        periods: alternatePeriods,
        activeDays: activeDays,
      })
    );

    try {
      const response = await axios.post("/schedule", data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "URL is already taken"
      ) {
        setError("That URL is already taken.");
      } else if (
        error.response &&
        error.response.data.message === "Title is already taken"
      ) {
        setError("That title is already taken.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/schedule/" + url} />;
  }

  return (
    <div className="font-syne dark:text-white">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center bg-neutral-800 bg-opacity-85 justify-center">
          <div>
            <ArrowPathIcon className="size-20 animate-spin text-white mx-auto"></ArrowPathIcon>
            <p className="font-syne text-xl text-white">
              Creating your schedule...
            </p>
          </div>
        </div>
      )}
      <Helmet>
        <title>Create | Scheduleasy</title>
      </Helmet>
      <h1 className="text-center py-5 text-3xl font-semibold">
        Create a schedule!
      </h1>
      {error && (
        <div className="bg-salmon rounded-md text-center font-syne border-2 border-amber-700 text-white mb-5 max-w-xl mx-auto text-wrap">
          {error}
        </div>
      )}
      <form
        onSubmit={createNewSchedule}
        className="flex flex-col gap-7 max-w-xl w-full px-5 sm:px-0 mx-auto"
      >
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-222 dark:text-white"
          >
            Choose a title.
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
            Write a short decription of your schedule.
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
            Choose how many periods your schedule has.
          </label>
          <p className="mt-2 text-sm text-gray-500 dark:text-neutral-400">
            Periods such as "lunch" or "break" should also be accounted for.
          </p>
          <Slider
            min={0}
            max={20}
            value={numPeriods}
            onChange={handleNumPeriodsChange}
            id="numPeriods"
          />
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
            htmlFor="url"
            className="block mb-2 text-sm font-medium text-222 dark:text-white"
          >
            Choose a custom URL for easy sharing.
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none text-gray-500 dark:text-neutral-400 text-sm">
              <p>scheduleasy.org/schedule/</p>
            </div>
            <input
              type="text"
              placeholder={"MyAwesomeSchedule"}
              id="url"
              pattern="[A-Za-z]*"
              value={url}
              className="bg-gray-50 border border-gray-300 text-222 dark:bg-transparent dark:text-white text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full ps-[176px] p-2.5"
              onChange={(ev) => setURL(ev.target.value)}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-neutral-400">
            Letters only. This cannot be changed.
          </p>
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-222 dark:text-white"
            htmlFor="file"
          >
            Choose a cover image.
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="file"
            className="block w-full text-sm text-222 dark:bg-transparent dark:text-white border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:border-0 file:bg-gray-600 file:py-[7px] file:text-white file:px-3 hover:file:bg-gray-700 file:mr-3"
            onChange={(ev) => setFiles(ev.target.files)}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
            PNG or JPG (Suggested size: 150 x 150px).
          </p>
        </div>
        <div className="border rounded-lg">
          <div className="flex flex-col gap-7 sm:px-0 m-2">
            <label className="block items-center cursor-pointer">
              <label
                className="block text-sm font-medium text-222 dark:text-white"
                htmlFor="altCheckbox"
              >
                Add alternate schedule (optional)
              </label>
            </label>
            <p className="text-sm text-gray-500 dark:text-neutral-400">
              Give your schedule different periods on certain days of the week
              automatically.
            </p>
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
                <Slider
                  min={0}
                  max={20}
                  value={alternatePeriods.length}
                  onChange={(ev) => handleNumPeriodsChange(ev, true)}
                  id="numAltPeriods"
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
          </div>
        </div>
        <div className="grid m-auto">
          <button className="justify-center transition absolute ease-in-out hover:-translate-x-2 hover:-translate-y-2 bg-mint border-white dark:border-222 border-2 text-white text-center p-3 font-shrikhand rounded-2xl text-xl">
            <div>Create Schedule!</div>
          </button>
          <div className="justify-center bg-slate text-slate select-none text-center p-3 font-shrikhand border-white dark:border-222 border-2 rounded-2xl text-xl">
            Create Schedule!
          </div>
        </div>
      </form>
    </div>
  );
}
