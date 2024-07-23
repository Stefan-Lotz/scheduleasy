import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

export default function UserSchedule({
  title,
  about,
  cover,
  numPeriods,
  updatedAt,
  author,
  url,
}) {
  const updatedAtTimestamp =
    typeof updatedAt === "string" || updatedAt instanceof Date
      ? new Date(updatedAt).getTime()
      : updatedAt;

  return (
    <Link
      to={"/schedule/" + url}
      className="w-full max-w-lg xl:max-w-2xl font-syne"
    >
      <div className="schedule h-36 sm:grid px-1.5 sm:p-0 sm:gap-3 bg-neutral-100 dark:bg-neutral-700 rounded-3xl border-solid border-4 border-neutral-200 dark:border-neutral-600 overflow-hidden hover:bg-neutral-200 hover:border-neutral-300 dark:hover:bg-neutral-600 dark:hover:border-neutral-500">
        <img
          className="object-center object-cover h-full max-w-32 hidden sm:block"
          src={cover}
          alt=""
        />
        <div className="flex flex-col justify-center gap-0.5 truncate dark:text-neutral-200">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="truncate">{about}</p>
          <p>Created By: {author.username}</p>
          <p>Periods: {numPeriods}</p>
          <p>
            Last updated:{" "}
            <ReactTimeAgo date={updatedAtTimestamp} locale="en-US" />
          </p>
        </div>
      </div>
    </Link>
  );
}
