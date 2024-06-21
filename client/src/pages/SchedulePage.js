import { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Split from 'react-split';
import ReactTimeAgo from 'react-time-ago';
import Header from "../Header";
import { InformationCircleIcon, EllipsisHorizontalCircleIcon, ExclamationCircleIcon, LinkIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon as PaperAirplaneOutline } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon as PaperAirplaneSolid } from "@heroicons/react/24/solid";
import { PencilSquareIcon as EditOutline } from "@heroicons/react/24/outline";
import { PencilSquareIcon as EditSolid } from "@heroicons/react/24/solid";
import { TrashIcon as TrashOutline } from "@heroicons/react/24/outline";
import { TrashIcon as TrashSolid } from "@heroicons/react/24/solid";
import UserMessage from "../UserMessage";

export default function SchedulePage() {
    const [scheduleInfo, setScheduleInfo] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [currentPeriodInfo, setCurrentPeriodInfo] = useState({ status: 'transition period', timeLeft: '' });
    const { userInfo } = useContext(UserContext);
    const { url } = useParams();
    const navigate = useNavigate();
    const messageContainerRef = useRef(null);
    const [sendIsHovered, setSendIsHovered] = useState(false);
    const [editIsHovered, setEditIsHovered] = useState(false);
    const [trashIsHovered, setTrashIsHovered] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/schedule/${url}`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(scheduleInfo => {
            if (!scheduleInfo) {
                navigate("/not-found");
                return;
            }
            setScheduleInfo(scheduleInfo);
            updateCurrentPeriod(scheduleInfo);
        })
        .catch(error => {
            console.error('Failed to fetch schedule:', error);
            navigate("/not-found");
        });
    }, [url, navigate]);

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [scheduleInfo]);

    const handleMessageSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:4000/schedule/${url}/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ text: newMessage }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            return response.json();
        })
        .then(newMsg => {
            setScheduleInfo(prevState => ({
                ...prevState,
                messages: [...prevState.messages, newMsg],
            }));
            setNewMessage('');
        })
        .catch(error => {
            console.error('Error:', error);
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
        const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

        let currentPeriod = null;
        let timeLeft = 0;

        for (const period of ScheduleInfo.periods) {
            const [startHour, startMinute] = period.startTime.split(':').map(Number);
            const [endHour, endMinute] = period.endTime.split(':').map(Number);

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
                timeLeftString = `${hours} hour${hours > 1 ? 's' : ''}, ${minutes} minutes, and ${seconds} seconds left`;
            } else {
                timeLeftString = `${minutes} minutes and ${seconds} seconds left`;
            }

            setCurrentPeriodInfo({
                status: currentPeriod.name,
                timeLeft: timeLeftString,
            });

            document.title = `${timeLeftString}`;
        } else {
            setCurrentPeriodInfo({
                status: 'Transition',
                timeLeft: '',
            });

            document.title = 'Transition period';
        }
    };

    const formatTime = (time) => {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);
        minutes = parseInt(minutes);

        if (hours >= 12) {
            if (hours > 12) hours -= 12;
        } else if (hours === 0) {
            hours = 12;
        }

        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    if (!scheduleInfo) return '';

    return (
        <>
            <Header />
            <Split
                className="rounded-md border-solid border-8 border-neutral-200 overflow-hidden"
                direction="vertical"
                sizes={[75, 25]}
                style={{ height: 'calc(100vh - 56px)' }}
                minSize={[100, 0]}>
                <div className="overflow-hidden text-center flex flex-col justify-center font-monda text-2xl">
                    <h1 className="my-2.5 mx-auto py-3 px-3 justify-center text-3xl rounded-full border-solid border-2 border-neutral-300 bg-white">
                        {scheduleInfo.title}
                    </h1>
                    <h2 className="my-2.5">Current period: {currentPeriodInfo.status}</h2>
                    {currentPeriodInfo.timeLeft && <h2 className="my-2.5">{currentPeriodInfo.timeLeft}</h2>}
                    {userInfo.id === scheduleInfo.author._id && (
                        <p>This is your schedule!</p>
                    )}
                </div>
                <Split className="flex" minSize={0}>
                    <div className="relative h-full flex flex-col">
                        {/* Announcements Split */}
                        <div className="flex justify-center">
                            <ExclamationCircleIcon className="w-6 h-6 my-2 hover:animate-spin" />
                        </div>
                        <div className="flex-1 overflow-y-auto overflow-x-hidden mb-2" ref={messageContainerRef}>
                            <div className="flex flex-col h-full justify-between">
                                <div className="grid px-2">
                                    {scheduleInfo.messages && scheduleInfo.messages.map(message => (
                                        <UserMessage key={message._id} message={message} />
                                    ))}
                                </div>
                                {userInfo.id === scheduleInfo.author._id && (
                                    <form onSubmit={handleMessageSubmit} className="px-2 flex gap-2 items-center">
                                        <input
                                            value={newMessage}
                                            type="text"
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Send an announcement..."
                                            className="w-full rounded-3xl border-gray-300 resize-y overflow-y-auto mb-0.5"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleMessageSubmit}
                                            className="bg-mint p-1 text-white rounded-full flex hover:bg-slate"
                                            onMouseEnter={() => setSendIsHovered(true)}
                                            onMouseLeave={() => setSendIsHovered(false)}
                                        >
                                            {sendIsHovered ? (
                                                <PaperAirplaneSolid className="size-6 -rotate-90 m-auto" />
                                            ) : (
                                                <PaperAirplaneOutline className="size-6 -rotate-90 m-auto" />
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="truncate">
                        {/* Bell Schedule Split */}
                        <div className="flex justify-center">
                            <EllipsisHorizontalCircleIcon className="w-6 h-6 my-2 hover:animate-spin" />
                        </div>
                        <table className="w-full max-w-sm m-auto">
                            <tbody>
                                {scheduleInfo.periods.map((period, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                        <td className="px-4 py-1.5">{period.name}</td>
                                        <td className="px-4 py-1.5 text-right">
                                            {formatTime(period.startTime)} - {formatTime(period.endTime)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        {/* Info Split */}
                        <div className="flex justify-center">
                            <InformationCircleIcon className="w-6 h-6 my-2 hover:animate-spin" />
                        </div>
                        <div className="flex flex-col text-left ml-5 mr-5 gap-1">
                            <p>Created by: {scheduleInfo.author.username}</p>
                            <p>{scheduleInfo.about}</p>
                            <p>Last updated: <ReactTimeAgo date={scheduleInfo.updatedAt} locale="en-US" /></p>

                            {userInfo.id === scheduleInfo.author._id && (
                                <div>
                                    <hr className="my-2"/>
                                    <div className="flex justify-around">
                                        <div className="group cursor-pointer relative" onMouseEnter={() => setEditIsHovered(true)} onMouseLeave={() => setEditIsHovered(false)}>
                                            {editIsHovered ? (
                                                <EditSolid className="size-6" />
                                            ) : (
                                                <EditOutline className="size-6" />
                                            )}
                                            <div className="opacity-0  z-10 -mt-16 -ml-[11px] bg-gray-800 text-white text-center text-xs rounded-lg py-2 absolute group-hover:opacity-100 px-3 pointer-events-none">
                                                Edit
                                                <svg className="absolute text-gray-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                                            </div>
                                        </div>
                                        <div className="group cursor-pointer relative" onMouseEnter={() => setTrashIsHovered(true)} onMouseLeave={() => setTrashIsHovered(false)}>
                                            {trashIsHovered ? (
                                                <TrashSolid className="size-6" />
                                            ) : (
                                                <TrashOutline className="size-6" />
                                            )}
                                            <div className="opacity-0  z-10 -mt-16 -ml-[18px] bg-gray-800 text-white text-center text-xs rounded-lg py-2 absolute group-hover:opacity-100 px-3 pointer-events-none">
                                                Delete
                                                <svg className="absolute text-gray-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                                            </div>
                                        </div>
                                        <div className="group cursor-pointer relative">
                                            <LinkIcon className="size-6"/>
                                            <div className="opacity-0  z-10 -mt-16 -ml-[12px] bg-gray-800 text-white text-center text-xs rounded-lg py-2 absolute group-hover:opacity-100 px-3 pointer-events-none">
                                                Link
                                                <svg className="absolute text-gray-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Split>
            </Split>
        </>
    );
}