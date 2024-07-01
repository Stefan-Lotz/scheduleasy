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
  return (
    <Link
      to={"/schedule/" + url}
      className="w-full max-w-lg xl:max-w-2xl font-syne"
    >
      <div className="schedule h-36 grid gap-3 bg-neutral-100 dark:bg-neutral-600 rounded-3xl border-solid border-4 border-neutral-200 dark:border-neutral-500 overflow-hidden">
        <img
          className="object-center object-cover h-full max-w-32"
          src={"http://localhost:4000/" + cover}
          alt=""
        />
        <div className="flex flex-col justify-around truncate dark:text-neutral-200">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p>{about}</p>
          <p>Created By: {author.username}</p>
          <p>Periods: {numPeriods}</p>
          <p>
            Last updated: <ReactTimeAgo date={updatedAt} locale="en-US" />
          </p>
        </div>
      </div>
    </Link>
  );
}
