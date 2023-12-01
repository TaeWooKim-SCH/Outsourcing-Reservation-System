'use client'

import Image from 'next/image'
import Title from './_components/Title'
import CalendarContainer from './_components/CalendarContainer'
import LinkButton from './_components/LinkButton'
import RoomCard from './_components/RoomCard'
import { roomData } from './_modules/data'
import ReservationForm from './_components/ReservationForm'
import { useState } from 'react'
import moment from 'moment'

export default function Home() {
  const [value, setValue] = useState<Value>(new Date());
  const [isReserv, setIsReserv] = useState(false);
  const [selectReason, setSelectReason] = useState(true);
  const [form, setForm] = useState<FormType>({
    date: new Date().toISOString().substring(0, 10),
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

  const dayChangeHandler = (date: Value) => {
    if (date && date.toLocaleString("ko-KR") < new Date().toLocaleDateString("ko-KR")) {
      return alert("지난 날짜는 선택할 수 없습니다.");
    }
    else if (moment(date as Date).weekday() === 0 || moment(date as Date).weekday() === 6) {
      return alert("주말은 대여할 수 없습니다.");
    }
    const parseDate = moment(date as Date).format('YYYY-MM-DD');
    const result = {...form};
    result.date = parseDate;
    setForm(result);
    setValue(date);
    alert("날짜가 선택되었습니다.");
  }

  const reservStateHandler = (value: number) => {
    if (!form.date) return alert("날짜를 먼저 선택해주세요.");
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
        if (e.target.value === "기타") {
          setSelectReason(false);
        }
        else {
          setSelectReason(true);
        }
        break;
      case "reason-text":
        result.reason = `기타 - ${e.target.value}`;
        break;
    }
    setForm(result);
  }

  return (
    <>
      <Image className="w-[130px] h-[90px]" src="/logo-img.jpg" width="500" height="500" alt="로고" />
      <main className="w-[100vw] max-w-[1100px] flex flex-col items-center pt-5 px-10 md:px-28 mx-auto lg:px-30">
        <Title className="mb-5">산업시스템공학부 대여 시스템</Title>
        <section className="flex justify-end w-full mr-14 mb-5">
          <LinkButton href="/admin" className="mr-2">관리자</LinkButton>
          <LinkButton href="/user" className="">대여확인</LinkButton>
        </section>
        <CalendarContainer value={value} dayChangeHandler={dayChangeHandler} />
        <section className="w-full pb-2 my-10">
          <section className="mb-10">
            <div className="text-lg font-bold border-b border-black pb-2 mb-5">회의실</div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {roomData.map((data) => (data.roomType === "meeting" &&
                <RoomCard
                  key={data.roomNumber}
                  roomNumber={data.roomNumber}
                  description={data.description}
                  capacity={data.capacity}
                  facility={data.facility}
                  reservStateHandler={reservStateHandler}
                />
              ))}
            </div>
          </section>
          <section className="mb-10">
            <div className="text-lg font-bold border-b border-black pb-2 mb-5">전산실</div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {roomData.map((data) => (data.roomType === "computer" &&
                <RoomCard
                  key={data.roomNumber}
                  roomNumber={data.roomNumber}
                  description={data.description}
                  capacity={data.capacity}
                  facility={data.facility}
                  reservStateHandler={reservStateHandler}
                />
              ))}
            </div>
          </section>
          <section>
            <div className="text-lg font-bold border-b border-black pb-2 mb-5">강의실</div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {roomData.map((data) => (data.roomType === "lecture" &&
                <RoomCard
                  key={data.roomNumber}
                  roomNumber={data.roomNumber}
                  description={data.description}
                  capacity={data.capacity}
                  facility={data.facility}
                  reservStateHandler={reservStateHandler}
                />
              ))}
            </div>
          </section>
        </section>
        {isReserv && (
          <section className="absolute top-0 left-0 bg-neutral-600 bg-opacity-40 w-[100vw] h-[100vh] flex justify-center items-center">
            <ReservationForm
              form={form}
              timeClickHandler={timeClickHandler}
              formChangeHandler={formChangeHandler}
              selectReason={selectReason}
              setIsReserv={setIsReserv}
            />
            <div className="z-10 absolute w-[100vw] h-[100vh]" onClick={() => setIsReserv(false)}></div>
          </section>
        )}
      </main>
    </>
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

interface ActiveType {
  [key: string]: boolean;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];