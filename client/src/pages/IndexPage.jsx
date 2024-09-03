import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <>
      <Helmet>
        <title>Home | Scheduleasy</title>
      </Helmet>
      <h1 className="font-syne font-bold sm:font-extrabold text-mint dark:text-saffron text-center text-4xl mt-7 mb-1 mx-auto w-4/5">
        Manage your class time efficiently with{" "}
        <span className="font-syne text-slate dark:text-pumpkin italic">
          Scheduleasy
        </span>
        .
      </h1>
      <div className="flex justify-center">
        <svg
          className="bg-saffron fill-[#fff] dark:fill-222"
          width="110%"
          height="70"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path id="wavepath" d="M0,0  L110,0C35,150 35,0 0,100z"></path>
        </svg>
      </div>
      <div className="bg-saffron text-center md:text-left flex justify-center md:items-center md:gap-10 px-6">
        <img
          src="../img/create.svg"
          className="w-1/2 hidden md:block max-w-[700px]"
        ></img>
        <div className="flex flex-col">
          <h1 className="max-w-lg font-syne font-bold wonk soft text-3xl mt-3 md:mt-0">
            ✦ Easily create and share your own schedule.
          </h1>
          <p className="max-w-lg font-syne text-2xl py-6">
            Scheduleasy allows you to create your own custom schedule in just a
            few clicks. With your own personalized URL, sharing your schedule
            couldn’t be simpler.
          </p>
          <div className="grid m-auto">
            <Link
              to="/register"
              className="justify-center transition absolute ease-in-out hover:-translate-x-2 hover:-translate-y-2 bg-salmon hover:bg-[#e45c3b] border-222 border-2 text-white text-center p-3 font-shrikhand rounded-full text-xl"
            >
              <div>Get started</div>
            </Link>
            <div className="justify-center bg-222 text-222 select-none text-center p-3 font-shrikhand border-saffron border-2 rounded-full text-xl">
              Get started
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <svg
          className="bg-pumpkin"
          width="110%"
          height="70"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            id="wavepath"
            d="M0,0  L110,0C35,150 35,0 0,100z"
            fill="#E9C46A"
          ></path>
        </svg>
      </div>
      <div className="bg-pumpkin text-center md:text-left flex justify-center md:items-center md:gap-10 px-6">
        <div className="flex flex-col">
          <h1 className="max-w-lg font-syne font-bold wonk soft text-3xl mt-3 md:mt-0">
            ✦ Browse the collection of user-created schedules.
          </h1>
          <p className="max-w-lg font-syne text-2xl py-6">
            Don’t want to make your own schedule? Find one in the list of
            user-uploaded schedules without needing an account.
          </p>
          <div className="grid m-auto">
            <Link
              to="/schedules"
              className="justify-center transition absolute ease-in-out hover:-translate-x-2 hover:-translate-y-2 bg-salmon hover:bg-[#e45c3b] border-222 border-2 text-white text-center p-3 font-shrikhand rounded-full text-xl"
            >
              <div>Find a schedule</div>
            </Link>
            <div className="justify-center bg-222 text-222 select-none text-center p-3 font-shrikhand border-pumpkin border-2 rounded-full text-xl">
              Find a schedule
            </div>
          </div>
        </div>
        <img
          src="../img/schedules.svg"
          className="w-1/2 hidden md:block max-w-[700px]"
        ></img>
      </div>
      <div className="flex justify-center">
        <svg
          className="bg-mint"
          width="110%"
          height="70"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            id="wavepath"
            d="M0,0  L110,0C35,150 35,0 0,100z"
            fill="#F4A261"
          ></path>
        </svg>
      </div>
      <div className="bg-mint text-center md:text-left flex justify-center md:items-center md:gap-10 px-6">
        <img
          src="../img/example.svg"
          className="w-1/2 hidden md:block max-w-[700px]"
        ></img>
        <div className="flex flex-col">
          <h1 className="max-w-lg font-syne font-bold soft text-3xl mt-3 md:mt-0">
            ✦ Stay organized and informed with the schedule page &
            announcements.
          </h1>
          <p className="max-w-lg font-syne text-2xl py-6">
            Scheduleasy allows you to create your own custom schedule in just a
            few clicks. With your own personalized URL, sharing your schedule
            couldn’t be simpler.
          </p>
          <div className="grid m-auto">
            <Link
              to="/schedule/example"
              className="justify-center transition absolute ease-in-out hover:-translate-x-2 hover:-translate-y-2 bg-slate hover:bg-[#1e3742] border-222 border-2 text-white text-center p-3 font-shrikhand rounded-full text-xl"
            >
              <div>See example</div>
            </Link>
            <div className="justify-center bg-222 text-222 select-none text-center p-3 font-shrikhand border-mint border-2 rounded-full text-xl">
              See example
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <svg
          className="bg-white dark:bg-222"
          width="110%"
          height="70"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            id="wavepath"
            d="M0,0  L110,0C35,150 35,0 0,100z"
            fill="#2A9D8F"
          ></path>
        </svg>
      </div>
    </>
  );
}
