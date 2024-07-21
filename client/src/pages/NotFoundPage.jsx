import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const location = useLocation();
  const isSchedulePath = location.pathname.includes("/not-found");

  return (
    <div
      className="bg-repeat-y vh bg-right"
      style={{
        backgroundImage: "url(/img/background.png)",
        backgroundSize: "100% auto",
      }}
    >
      <Helmet>
        <title>404 | Scheduleasy</title>
      </Helmet>
      <div className="flex flex-col w-1/2 vh mx-5 place-content-center">
        <Link
          to="/"
          className="text-5xl text-center font-shrikhand text-slate "
        >
          Scheduleasy
        </Link>
        <div className="m-10 text-center">
          <h1 className="my-10 font-syne font-bold text-3xl text-222">
            {isSchedulePath
              ? "Sorry, the schedule you are looking for does not exist."
              : "Sorry, the page you are looking for does not exist."}
          </h1>
          <h2 className="font-syne text-xl px-16 text-222">
            Make sure the address was typed correctly. If you used a link, it
            may be broken or outdated.
          </h2>
          <Link to="/">
            <button className="bg-salmon mt-10 px-10 py-3 rounded-2xl font-shrikhand text-white text-xl hover:bg-[#e45c3b]">
              Scheduleasy Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
