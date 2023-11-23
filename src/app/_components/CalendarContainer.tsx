'use client'

import Calendar from "react-calendar";

import '../_styles/CalendarContainer.css';
import moment from "moment";

export default function CalendarContainer({ dayChangeHandler, value }: PropsType) {
  return (
    <main>
      <Calendar
        value={value}
        calendarType="gregory"
        locale="ko-KO"
        formatDay={(locale, date) => moment(date).format('DD')}
        // formatMonth={(locale, date) => moment(date).format('MM월')}
        // formatYear={(locale, date) => moment(date).format('YYYY년')}
        // formatMonthYear={(locale, date) => moment(date).format('YYYY년 MM월')}
        onChange={dayChangeHandler}
        // onClickDay={dayClickHandler}
      />
    </main>
  );
}

interface PropsType {
  value: Value;
  dayChangeHandler: (date: Value) => void
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];