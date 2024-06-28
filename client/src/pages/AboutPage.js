import React from "react";
import Helmet from "react-helmet";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About | Scheduleasy</title>
      </Helmet>
      <div className="text-center font-syne">
        <h1 className="font-bold text-3xl mt-8">About</h1>
        <p>Scheduleasy was created in 2024 by Stefan Lotz as the successor to EHSchedule. </p>
        <p>insert more stuff here</p>
      </div>
    </>
  );
}
