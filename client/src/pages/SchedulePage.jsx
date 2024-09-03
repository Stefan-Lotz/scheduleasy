import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import confetti from "canvas-confetti";
import Header from "../components/Header";
import DesktopSchedulePage from "./DesktopSchedulePage";
import MobileSchedulePage from "./MobileSchedulePage";
import axios from "axios";

const SchedulePage = ({ handleTheme }) => {
  const [scheduleInfo, setScheduleInfo] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [currentPeriodInfo, setCurrentPeriodInfo] = useState({
    status: "transition period",
    timeLeft: "",
  });
  const { userInfo } = useContext(UserContext);
  const { url } = useParams();
  const navigate = useNavigate();
  const messageContainerRef = useRef(null);
  const [sendIsHovered, setSendIsHovered] = useState(false);
  const width = useScreenWidth();

  const handleMessageSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `/schedule/${url}/message`,
        {
          text: newMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        const newMsg = response.data;
        setScheduleInfo((prevState) => ({
          ...prevState,
          messages: [...prevState.messages, newMsg],
        }));
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const startFireworks = useCallback(() => {
    const duration = 2500;
    const interval = 300;
    const end = Date.now() + duration;

    const intervalId = setInterval(() => {
      firework();
      if (Date.now() > end) {
        clearInterval(intervalId);
      }
    }, interval);
  }, []);

  const updateCurrentPeriod = useCallback(
    (scheduleInfo) => {
      const now = new Date();
      const currentSeconds =
        now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

      let currentPeriod = null;
      let timeLeft = 0;

      const today = now.toLocaleString("en-US", { weekday: "long" });
      const isAlternateScheduleActive =
        scheduleInfo.alternateSchedule &&
        scheduleInfo.alternateSchedule.activeDays.includes(today);

      const periods = isAlternateScheduleActive
        ? scheduleInfo.alternateSchedule.periods
        : scheduleInfo.periods;

      for (const period of periods) {
        const [startHour, startMinute] = period.startTime
          .split(":")
          .map(Number);
        const [endHour, endMinute] = period.endTime.split(":").map(Number);

        const startSeconds = startHour * 3600 + startMinute * 60;
        const endSeconds = endHour * 3600 + endMinute * 60;

        if (currentSeconds >= startSeconds && currentSeconds < endSeconds) {
          currentPeriod = period;
          timeLeft = endSeconds - currentSeconds;
          break;
        }
      }

      if (currentPeriod) {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        let timeLeftString;

        if (hours > 0) {
          timeLeftString = `${hours} hour${
            hours > 1 ? "s" : ""
          }, ${minutes} minutes, and ${seconds} seconds left`;
        } else {
          timeLeftString = `${minutes} minutes and ${seconds} seconds left`;
        }

        setCurrentPeriodInfo({
          status: currentPeriod.name,
          timeLeft: timeLeftString,
        });

        document.title = `${timeLeftString}`;

        if (timeLeft === 1) {
          setTimeout(startFireworks, 1000);
        }
      } else {
        setCurrentPeriodInfo({
          status: "Transition",
          timeLeft: "",
        });

        document.title = "Transition period";
      }
    },
    [startFireworks]
  );

  const firework = () => {
    confetti({
      startVelocity: 30,
      ticks: 60,
      spread: 360,
      colors: ["264653", "2A9D8F", "E9C46A", "F4A261", "E76F51"],
      origin: {
        x: Math.random() * (0.1 - 0.3) + 0.3,
        y: Math.random() - 0.1,
      },
    });
    confetti({
      startVelocity: 30,
      ticks: 60,
      spread: 360,
      colors: ["264653", "2A9D8F", "E9C46A", "F4A261", "E76F51"],
      origin: {
        x: Math.random() * (0.7 - 0.9) + 0.9,
        y: Math.random() - 0.1,
      },
    });
  };

  function useScreenWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  }

  useEffect(() => {
    axios
      .get(`/schedule/${url}`, {
        withCredentials: true,
      })
      .then((response) => {
        const scheduleInfo = response.data;
        if (!scheduleInfo) {
          navigate("/not-found");
          return;
        }
        setScheduleInfo(scheduleInfo);
        updateCurrentPeriod(scheduleInfo);
      })
      .catch((error) => {
        console.error("Failed to fetch schedule:", error);
        navigate("/not-found");
      });
  }, [url, navigate, updateCurrentPeriod]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [scheduleInfo]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (scheduleInfo) {
        updateCurrentPeriod(scheduleInfo);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [scheduleInfo, updateCurrentPeriod]);

  const getActiveSchedulePeriods = useCallback(() => {
    const now = new Date();
    const today = now.toLocaleString("en-US", { weekday: "long" });
    const isAlternateScheduleActive =
      scheduleInfo?.alternateSchedule &&
      scheduleInfo.alternateSchedule.activeDays.includes(today);

    return isAlternateScheduleActive
      ? scheduleInfo.alternateSchedule.periods
      : scheduleInfo.periods;
  }, [scheduleInfo]);

  if (!scheduleInfo) return "";

  return (
    <>
      <Header handleTheme={handleTheme} />
      {width <= 768 ? (
        <MobileSchedulePage
          scheduleInfo={scheduleInfo}
          currentPeriodInfo={currentPeriodInfo}
          updateCurrentPeriod={updateCurrentPeriod}
          userInfo={userInfo}
          handleMessageSubmit={handleMessageSubmit}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          messageContainerRef={messageContainerRef}
          sendIsHovered={sendIsHovered}
          setSendIsHovered={setSendIsHovered}
          periods={getActiveSchedulePeriods()}
        />
      ) : (
        <DesktopSchedulePage
          scheduleInfo={scheduleInfo}
          currentPeriodInfo={currentPeriodInfo}
          updateCurrentPeriod={updateCurrentPeriod}
          userInfo={userInfo}
          handleMessageSubmit={handleMessageSubmit}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          messageContainerRef={messageContainerRef}
          sendIsHovered={sendIsHovered}
          setSendIsHovered={setSendIsHovered}
          periods={getActiveSchedulePeriods()}
        />
      )}
    </>
  );
};

export default SchedulePage;