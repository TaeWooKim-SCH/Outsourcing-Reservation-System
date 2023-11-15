'use client'

import { useState } from "react";
import Calendar from "react-calendar";

import 'react-calendar/dist/Calendar.css';

export default function CalendarContainer() {
  const [value, setValue] = useState(new Date());

  return (
    <main>
      <Calendar value={value} />
    </main>
  );
}