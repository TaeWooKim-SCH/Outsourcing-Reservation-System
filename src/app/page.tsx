'use client'

import Image from 'next/image'
import Title from './_components/Title'
import CalendarContainer from './_components/CalendarContainer'
import LinkButton from './_components/LinkButton'
import RoomCard from './_components/RoomCard'
import { roomData } from './_modules/data'
import ReservationForm from './_components/ReservationForm'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams();
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
    setForm(result);
  }

  const formPost = async (form: FormType) => {
    const res = await fetch("/api/reservation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
    if (!res) alert("예약에 실패했습니다.");
    else alert("예약에 성공했습니다.");
  }

  useEffect(() => {
    const result = {...form};
    result.date = searchParams.get("date");
    setForm(result);
  }, [searchParams.get("date")])

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
        <section>
          <ReservationForm
            timeClickHandler={timeClickHandler}
            formChangeHandler={formChangeHandler}
            selectReason={selectReason}
            setSelectReason={setSelectReason}
          />
          <div>- 회의실에는 음식물을 반입하실 수 없습니다.</div>
          <div>- 회의실 이용시 예약 인원을 지켜주세요.</div>
          <button
            className="block py-2 px-5 mx-auto mb-20 text-white bg-yellow-700"
            onClick={() => formPost(form)}
            type="button"
          >예약하기</button>
        </section>
      )}
    </main>
  )
}

interface FormType {
  date: string | null;
  roomNumber: number;
  time: {
    [key: string]: boolean;
  },
  studentId: string;
  studentName: string;
  phoneNumber: string;
  reason: string;
}