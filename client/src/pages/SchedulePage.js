import { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import confetti from "canvas-confetti";
import Header from "../Header";
import DesktopSchedulePage from "./DesktopSchedulePage";

export default function SchedulePage() {
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

  useEffect(() => {
    fetch(`http://localhost:4000/schedule/${url}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((scheduleInfo) => {
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
  }, [url, navigate]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [scheduleInfo]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:4000/schedule/${url}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ text: newMessage }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send message");
        }
        return response.json();
      })
      .then((newMsg) => {
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateCurrentPeriod(scheduleInfo);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [scheduleInfo]);

  const updateCurrentPeriod = (ScheduleInfo) => {
    const now = new Date();
    const currentSeconds =
      now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    let currentPeriod = null;
    let timeLeft = 0;

    for (const period of ScheduleInfo.periods) {
      const [startHour, startMinute] = period.startTime.split(":").map(Number);
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
  };

  function firework() {
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
  }

  function startFireworks() {
    const duration = 2500;
    const interval = 300;
    const end = Date.now() + duration;

    const intervalId = setInterval(() => {
      firework();
      if (Date.now() > end) {
        clearInterval(intervalId);
      }
    }, interval);
  }

  function useScreenWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  }

  if (!scheduleInfo) return "";

  return (
    <>
      <Header />
      {width <= 768 ? (
        <p>mobile layout</p>
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
        />
      )}
    </>
  );
}
