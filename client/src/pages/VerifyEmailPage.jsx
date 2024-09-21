import { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import confetti from "canvas-confetti";
import axios from "axios";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setMessage("Invalid verification link.");
        setIsError(true);
        return;
      }

      try {
        const response = await axios.get(`/verify-email?token=${token}`);

        if (response.status === 200) {
          setMessage("Email successfully verified. Redirecting...");
          startFireworks();
          setIsError(false);
          setTimeout(() => setRedirect(true), 5000);
        } else {
          setMessage("Email verification failed. Please try again.");
          setIsError(true);
        }
      } catch (error) {
        setMessage("An error occurred during verification. Please try again.");
        setIsError(true);
      }
    };

    verifyEmail();
  }, [searchParams]);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  const startFireworks = () => {
    const duration = 2500;
    const interval = 300;
    const end = Date.now() + duration;

    const intervalId = setInterval(() => {
      firework();
      if (Date.now() > end) {
        clearInterval(intervalId);
      }
    }, interval);
  };

  const firework = () => {
    confetti({
      startVelocity: 30,
      ticks: 60,
      spread: 360,
      colors: ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"],
      origin: { x: Math.random() * (0.1 - 0.3) + 0.3, y: Math.random() - 0.1 },
    });
    confetti({
      startVelocity: 30,
      ticks: 60,
      spread: 360,
      colors: ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"],
      origin: { x: Math.random() * (0.7 - 0.9) + 0.9, y: Math.random() - 0.1 },
    });
  };

  return (
    <div className="vh flex justify-center items-center bg-white dark:bg-222">
      <div className="p-8 border border-gray-300 rounded-lg shadow-lg text-center max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-222 dark:text-white font-syne">
          Email Verification
        </h1>
        <p
          className={`text-lg font-syne ${
            isError ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
