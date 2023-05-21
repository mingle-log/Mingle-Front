import { motion } from "framer-motion"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // interaction 패키지 추가설치 필요
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { callAcScheduleByDateAPI, callAcScheduleListAPI } from "../../apis/ScheduleAPICalls";

function AcademicCalendar ({setDateInAcCal}) {

    const dispatch = useDispatch();
    const { allAcSchedule } = useSelector(state => state.ScheduleReducer);

    /* 학사 일정 전체 조회 API 호출 */
    useEffect(
      () => {
        dispatch(callAcScheduleListAPI());
      },[]
    );
    
    /* 클릭한 날짜의 학사일정을 조회하기 위한 함수 */
    const dateSelectHanlder = (selectInfo) => {
      const clickedDate = selectInfo.startStr;
      console.log(`클릭한 날짜 ? ${clickedDate}`)
      setDateInAcCal(clickedDate);
        
      // 클릭한 날짜의 학사 일정 조회 API 호출
      dispatch(callAcScheduleByDateAPI(clickedDate));
    };

    /* 조회한 학사 일정 전체 캘린더 event로 넣기 */
    const acEvents = () => {

      if(allAcSchedule) {
        return allAcSchedule.map(schedule => ({
          id: schedule.scheCode,
          title: schedule.scheName,
          start: schedule.scheStartDate,
          end: schedule.scheEndDate,
        }))
      }
    }

    const FullCalendarContainer = styled.div`
      display: flex;
      justify-content: center;
      
      // 캘린더 전체 사이즈 조정
      .fc {
        width: 98%;
        height: 720px;
      }

      // 캘린더 Header
      .fc .fc-toolbar.fc-header-toolbar {
        margin: -5px 0px 15px;
        padding: 20px;
        height: 70px;
        font-size: 18px;
        line-height: 29px;
        color: #343434;
      }

      // toolbar 버튼
      .fc .fc-button {
        background-color: #ffd7d7;
        border: none;
        outline: none; /* 버튼 클릭 시 외곽선 제거 */

        span {
          font-weight: 600;
          font-size: 28px;
        }

        :hover {
          background-color: #ff9797;
        }
      }

      .fc-button-group {
        border: none;
      }

      .fc thead {
        border-bottom: none;
      }

      // 요일 container
      .fc-theme-standard th {
        height: 32px;
        padding-top: 3.5px;
        padding: 6px;
        border: none;
        border-radius: 10px;
        background: #FFD7D7;
        font-weight: 600;
        font-size: 23px;
        line-height: 19px;
        color: #ffffff;
      }

      // 달력 내부의 스크롤바 숨기기
      .fc-scroller {
        &::-webkit-scrollbar {
          display: none; // Chrome, Safari, Opera 등의 웹킷 기반 브라우저에서 스크롤바 숨기기
        }
        -ms-overflow-style: none; // Internet Explorer 및 Edge에서 스크롤바 숨기기
        scrollbar-width: none; // Firefox에서 스크롤바 숨기기
      }

      // 내부 테두리
      .fc-daygrid-day {
        border: 5px solid white;
      }

      // 오늘 날짜 색
      .fc .fc-daygrid-day.fc-day-today {
        background-color: #FF9797;
      }

      // 날짜별 그리드
      .fc-daygrid-day-frame {
        padding: 2px;
        height: 90px;
        border-radius: 15px;
        background-color: #FDFDFD;
      }

      // 날짜
      .fc .fc-daygrid-day-top {
        color: #666666;
      }

      // 각 이벤트 요소
      .fc-event {
        background: white;
        border: 1px solid #FF9797;
        border-radius: 8px;
        margin-bottom: 2px;
        height: 25px;
        padding: 2px;
        font-size: 12px;
      }
    `;


    return (

        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <FullCalendarContainer>
            <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            weekends={true}
            select={dateSelectHanlder}
            selectMirror={true}
            dayMaxEvents={2}
            eventTextColor={'#666666'}
            events={allAcSchedule && acEvents()}
            displayEventTime={false}
            />
          </FullCalendarContainer>
        </motion.div>
    );
}

export default AcademicCalendar;