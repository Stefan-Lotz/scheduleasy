import React from "react";

const BellScheduleSplit = ({ scheduleInfo }) => {
  function formatTime(time) {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (hours >= 12) {
      if (hours > 12) hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  }

  return (
    <div className="truncate">
      <table className="w-full max-w-sm m-auto">
        <tbody>
          {scheduleInfo.periods?.map((period, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="px-4 py-1.5">{period.name}</td>
              <td className="px-4 py-1.5 text-right">
                {formatTime(period.startTime)} - {formatTime(period.endTime)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BellScheduleSplit;
