import ChangeSchedule from "../components/main/ChangeSchedule";
import BoardPreview from "../components/main/BoardPreview";
import RecordMyAttendance from "../components/main/RecordMyAttendance";
import { motion } from "framer-motion"
import MainCSS from "../css/Main.module.css"
import MyCalendar from "../components/main/MyCalendar";
import AcademicCalendar from "../components/main/AcademicCalendar";
import AcademicCalendarInfo from "../components/main/AcademicCalendarInfo";
import MyCalendarInfo from "../components/main/MyCalendarInfo";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { callMyScheduleListAPI } from "../apis/ScheduleAPICalls";


function MainPageLayout () {

    const [isMyCalendar, setIsMyCalendar] = useState(true);             // 사용자가 선택한 캘린더를 관리하는 state
    const [dateInMyCal, setDateInMyCal] = useState(new Date());         // 나의 일정에서 선택된 날짜를 관리하는 state
    const [dateInAcCal, setDateInAcCal] = useState(new Date());         // 학사 일정에서 선택된 날짜를 관리하는 state
    const [filteredMySchedule, setFilteredMySchedule] = useState([]);   // 선택된 나의 일정을 노출하기 위한 state
    const [filteredAcSchedule, setFilteredAcSchedule] = useState([]);    // 선택된 학사 일정을 노출하기 위한 state

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            
            <div className={ MainCSS.flex }>
                <div>
                    <div className={ MainCSS.changeSchedule }>
                        <ChangeSchedule isMyCalendar={isMyCalendar} setIsMyCalendar={setIsMyCalendar}/>
                    </div>
                    <div className={ MainCSS.calendarBox }>
                        { isMyCalendar ? 
                            <MyCalendar setDateInMyCal={setDateInMyCal} setFilteredMySchedule={setFilteredMySchedule}/> 
                            : <AcademicCalendar setDateInAcCal={setDateInAcCal} setFilteredAcSchedule={setFilteredAcSchedule}/>
                        }
                    </div>
                </div>
                <div>
                    <div className={ MainCSS.calendarInfoBox }>
                        { isMyCalendar ? 
                            <MyCalendarInfo dateInMyCal={dateInMyCal} filteredMySchedule={filteredMySchedule}/> 
                            : <AcademicCalendarInfo dateInAcCal={dateInAcCal} filteredAcSchedule={filteredAcSchedule}/>
                        }
                    </div>
                    <div className={ MainCSS.boardPreview }>
                        <BoardPreview/>
                    </div>
                    <div className={ MainCSS.recordMyAttendance }>
                        <RecordMyAttendance/>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default MainPageLayout;