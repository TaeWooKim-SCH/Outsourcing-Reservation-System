'use client'

import Image from 'next/image'
import Title from './_components/Title'
import CalendarContainer from './_components/CalendarContainer'
import LinkButton from './_components/LinkButton'
import RoomCard from './_components/RoomCard'
import { roomData } from './_modules/data'
import ReservationForm from './_components/ReservationForm'
import { useState } from 'react'

export default function Home() {
  const [isReserv, setIsReserv] = useState(false);
  const [selectReason, setSelectReason] = useState(true);
  const [form, setForm] = useState<FormType>({
    date: "",
    roomNumber: 0,
    time: {
      '09:00~10:00': false,
      '10:00~11:00': false,
      '11:00~12:00': false,
      '13:00~14:00': false,
      '14:00~15:00': false,
      '15:00~16:00': false,
      '16:00~17:00': false,
      '17:00~18:00': false
    },
    studentId: "",
    studentName: "",
    phoneNumber: "",
    reason: ""
  });

  const reservStateHandler = (value: number) => {
    const result = {...form};
    result.roomNumber = value;
    setForm(result);
    setIsReserv(true);
  }

  const timeClickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    const result = {...form};
    result.time[value] = isChecked;
    setForm(result);
  }

  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = {...form};
    switch(e.target.name) {
      case "studentId":
        result.studentId = e.target.value;
        break;
      case "studentName":
        result.studentName = e.target.value;
        break;
      case "phoneNumber":
        result.phoneNumber = e.target.value;
        break;
      case "reason":
        result.reason = e.target.value;
        if (e.target.value === "other") {
          setSelectReason(false);
        }
        else {
          setSelectReason(true);
        }
        break;
      case "reason-text":
        result.reason = `other ${e.target.value}`;
        break;
    }
    console.log(form);
    setForm(result);
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 px-32 lg:px-30">
      <Title className="mb-5">산업시스템공학부 예약 시스템</Title>
      <section className="flex justify-end w-full mr-14 mb-5">
        <LinkButton href="/admin" className="mr-2">관리자</LinkButton>
        <LinkButton href="/reservation" className="">예약확인</LinkButton>
      </section>
      <CalendarContainer />
      <section className="w-full flex items-center space-x-5 mt-10 overflow-auto scrollbar-hide">
        {roomData.map((data) => (
          <RoomCard
            key={data.roomNumber}
            roomNumber={data.roomNumber}
            description={data.description}
            capacity={data.capacity}
            facility={data.facility}
            reservStateHandler={reservStateHandler}
          />
        ))}
      </section>
      {isReserv && (
        <ReservationForm
          timeClickHandler={timeClickHandler}
          formChangeHandler={formChangeHandler}
          selectReason={selectReason}
          setSelectReason={setSelectReason}
        />
      )}
    </main>
  )
}

interface FormType {
  date: string;
  roomNumber: number;
  time: {
    [key: string]: boolean;
  },
  studentId: string;
  studentName: string;
  phoneNumber: string;
  reason: string;
}