import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [numPeriods, setNumPeriods] = useState("");
  const [files, setFiles] = useState("");
  const [url, setURL] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [periods, setPeriods] = useState([]);

  function handlePeriodsChange(ev, index, field) {
    const newPeriods = periods.map((period, i) =>
      i === index ? { ...period, [field]: ev.target.value } : period
    );
    setPeriods(newPeriods);
  }

  function handleNumPeriodsChange(ev) {
    const value = parseInt(ev.target.value, 10);
    setNumPeriods(value);
    const newPeriods = Array(value)
      .fill()
      .map((_, i) => periods[i] || { name: "", startTime: "", endTime: "" });
    setPeriods(newPeriods);
  }

  async function createNewSchedule(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("about", about);
    data.set("file", files[0]);
    data.set("numPeriods", numPeriods);
    data.set("url", url);
    data.set("periods", JSON.stringify(periods));

    const response = await fetch("http://localhost:4000/schedule", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/schedule/" + url} />;
  }

  return (
    <div className="font-syne">
      <h1 className="text-center py-5 text-3xl font-semibold">
        Create a schedule!
      </h1>
      <form
        onSubmit={createNewSchedule}
        className="flex flex-col gap-7 max-w-xl w-full px-5 sm:px-0 mx-auto"
      >
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-222"
          >
            Choose a title.
          </label>
          <input
            type="text"
            placeholder={"My Awesome Schedule"}
            id="title"
            className="bg-gray-50 border border-gray-300 text-222 text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <p className="mt-2 text-sm text-gray-500">
            Your schedule's title will be publicly displayed.
          </p>
        </div>
        <div>
          <label
            htmlFor="about"
            className="block mb-2 text-sm font-medium text-222"
          >
            Write a short decription of your schedule.
          </label>
          <input
            type="text"
            placeholder={"This is the coolest schedule ever created."}
            id="about"
            className="bg-gray-50 border border-gray-300 text-222 text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
            value={about}
            maxLength="100"
            onChange={(ev) => setAbout(ev.target.value)}
          />
          <p className="mt-2 text-sm text-gray-500">
            (Maximum 100 characters.)
          </p>
        </div>
        <div>
          <label
            htmlFor="numPeriods"
            className="block mb-2 text-sm font-medium text-222"
          >
            Choose how many periods your schedule has.
          </label>
          <input
            type="number"
            placeholder={"Number of periods"}
            id="numPeriods"
            value={numPeriods}
            className="bg-gray-50 border font-sans border-gray-300 text-222 text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
            onChange={handleNumPeriodsChange}
          />
          <p className="mt-2 text-sm text-gray-500">
            Periods such as "lunch" or "break" should also be accounted for.
          </p>
        </div>
        {periods.map((period, index) => (
          <div
            key={index}
            className="grid gap-4 bg-gray-50 border border-gray-300 rounded-lg p-3 font-sans"
          >
            <div>
              <label
                htmlFor={`name${index}`}
                className="block mb-2 text-sm font-medium text-222"
              >
                Period {index + 1} Name
              </label>
              <input
                type="text"
                id={`name${index}`}
                placeholder={`Period ${index + 1}`}
                className="bg-gray-50 border border-gray-300 text-222 text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
                value={period.name}
                onChange={(ev) => handlePeriodsChange(ev, index, "name")}
              />
            </div>
            <div className="">
              <label
                htmlFor={`startTime${index}`}
                className="block mb-2 text-sm font-medium text-222"
              >
                Start Time {index + 1}
              </label>
              <input
                type="time"
                id={`startTime${index}`}
                className="bg-gray-50 border border-gray-300 text-222 text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
                value={period.startTime}
                onChange={(ev) => handlePeriodsChange(ev, index, "startTime")}
              />
            </div>
            <div className="">
              <label
                htmlFor={`endTime${index}`}
                className="block mb-2 text-sm font-medium text-222"
              >
                End Time {index + 1}
              </label>
              <input
                type="time"
                id={`endTime${index}`}
                className="bg-gray-50 border border-gray-300 text-222 text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full p-2.5"
                value={period.endTime}
                onChange={(ev) => handlePeriodsChange(ev, index, "endTime")}
              />
            </div>
          </div>
        ))}
        <div>
          <label
            htmlFor="url"
            className="block mb-2 text-sm font-medium text-222"
          >
            Choose a custom URL for easy sharing.
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-500 text-sm">
              <p>scheduleasy.org/schedule/</p>
            </div>
            <input
              type="text"
              placeholder={"MyAwesomeSchedule"}
              id="url"
              pattern="[A-Za-z]*"
              value={url}
              className="bg-gray-50 border border-gray-300 text-222 text-sm rounded-lg focus:border-mint focus:outline-none focus:ring-0 block w-full ps-[180px] p-2.5"
              onChange={(ev) => setURL(ev.target.value)}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Letters only. This cannot be changed.
          </p>
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-222"
            htmlFor="file"
          >
            Choose a cover image.
          </label>
          <input
            type="file"
            id="file"
            className="block w-full text-sm text-222 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:border-0 file:bg-gray-600 file:py-[7px] file:text-white file:px-3 hover:file:bg-gray-700 file:mr-3"
            onChange={(ev) => setFiles(ev.target.files)}
          />
          <p className="mt-1 text-sm text-gray-500">
            PNG or JPG (Suggested size: 150 x 150px).
          </p>
        </div>
        <button className="mx-auto rounded-2xl py-2 px-4 bg-mint text-white font-shrikhand text-xl">
          Create Schedule!
        </button>
      </form>
    </div>
  );
}
