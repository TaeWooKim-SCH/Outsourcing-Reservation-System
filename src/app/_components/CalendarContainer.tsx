'use client'

import { useState } from "react";
import Calendar from "react-calendar";

import '../_styles/CalendarContainer.css';
import moment from "moment";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarContainer() {
  const [value, setValue] = useState<Value>(new Date());

  const dayClickHandler = () => {
    return alert(value);
  }

  const dayChangeHandler = (date: Value) => {
    const parseDate = moment(date as Date).format('YYYYMMDD');
    alert(parseDate);
    setValue(date);
  }

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