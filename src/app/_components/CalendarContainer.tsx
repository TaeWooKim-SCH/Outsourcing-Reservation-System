'use client'

import { useState } from "react";
import Calendar from "react-calendar";

import '../_styles/CalendarContainer.css';

export default function CalendarContainer() {
  const [value, setValue] = useState(new Date());

  return (
    <main>
      <Calendar value={value} />
    </main>
  );
}