import { useEffect, useState } from "react";
import UserSchedule from "../UserSchedule";


export default function IndexPage() {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/schedule').then(response => {
            response.json().then(schedules => {
                setSchedules(schedules);
            });
        });
    }, []);

    return (
        <>
            
            <div className="text-center font-fraunces">
                <h1 className="font-bold text-3xl mt-8 sm:mt-5">Schedules</h1>
                <p className="text-lg mt-4 mb-8 sm:mb-5">Browse the list of user-created schedules!</p>
            </div>
            <hr className="w-4/5 m-auto mb-8 sm:mb-5"/>
            <div className="grid justify-items-center gap-4 grid-cols-1 md:grid-cols-2">
                {schedules.length > 0 && schedules.map(schedule => (
                    <UserSchedule {...schedule} />    
                ))}
            </div>
        </>
    );
}