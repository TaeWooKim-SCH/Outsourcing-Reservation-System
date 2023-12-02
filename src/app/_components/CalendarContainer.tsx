'use client'

import Calendar from "react-calendar";

import '../_styles/CalendarContainer.css';
import moment from "moment";
import { holidayFetch } from "../_modules/handler";

export default function CalendarContainer({ dayChangeHandler, value }: PropsType) {
  
  const holidayMarker = async (startDate: Date, date: Date, view: View) => {
    const year = moment(startDate).format("YYYY");
    const month = moment(startDate).format("MM")
    console.log(view);
    if (view === "month") {
      // const holidate = await holidayFetch(year, month);
      // console.log(holidate);
      
    }

    return <div></div>
  }
  
  return (
    <main>
      <Calendar
        value={value}
        calendarType="gregory"
        locale="ko-KO"
        formatDay={(locale, date) => moment(date).format('DD')}
        onChange={dayChangeHandler}
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
type View = 'century' | 'decade' | 'year' | 'month';