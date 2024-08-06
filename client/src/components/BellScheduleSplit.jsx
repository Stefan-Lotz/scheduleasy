import { React, useState } from "react";

const BellScheduleSplit = ({ scheduleInfo }) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

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

  const handleMouseEnter = (index) => {
    setHoveredRowIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  return (
    <div className="truncate">
      <table className="w-full max-w-sm m-auto dark:text-neutral-200">
        <tbody>
          {scheduleInfo.periods?.map((period, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                  : "bg-transparent hover:bg-gray-200 dark:hover:bg-neutral-700"
              }
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <td className="px-4 py-1.5">{period.name}</td>
              <td className="px-4 py-1.5 text-right">
                {hoveredRowIndex === index
                  ? `${period.startTime} - ${period.endTime}`
                  : `${formatTime(period.startTime)} - ${formatTime(
                      period.endTime
                    )}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BellScheduleSplit;
