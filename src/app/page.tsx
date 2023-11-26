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
  const [cardActive, setCardActive] = useState<ActiveType>({
    "111": false,
    "215": false,
    "216": false,
    "220": false,
    "311": false,
    "315": false,
    "320": false,
    "407": false
  });
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
    const activeResult: ActiveType = {
      "111": false,
      "215": false,
      "216": false,
      "220": false,
      "311": false,
      "315": false,
      "320": false,
      "407": false
    };

    activeResult[String(value)] = true;
    setCardActive(activeResult);

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

  const formPost = async (form: FormType) => {
    let timeCount = 0;

    for (let time in form.time) {
      if (form.time[time]) timeCount++;
    }

    if (!timeCount) return alert("대여 시간을 선택해주세요.");
    else if (!form.studentId) return alert("학번 및 학과를 입력해주세요.");
    else if (!form.studentName) return alert("이름을 입력해주세요.");
    else if (!form.phoneNumber) return alert("전화번호를 입력해주세요.");
    else if (!form.reason) return alert("대여 사유를 선택해주세요.");

    for (let time in form.time) {
      if (!form.time[time]) {
        delete form.time[time];
      }
    }

    const confirmForm = confirm(`
      소속 및 학번: ${form.studentId}
      이름: ${form.studentName}
      연락처: ${form.phoneNumber}
      대여 사유: ${form.reason}
      위 정보가 맞습니까?
    `)

    if (confirmForm) {
      const res = await fetch("/api/reservation", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (res.status === 401) alert("이미 대여자가 존재합니다.");
      else {
        alert("대여에 성공했습니다.");
        window.location.reload();
      };
    }
  }

  return (
    <main className="w-[100vw] max-w-[1100px] flex flex-col items-center pt-24 px-10 md:px-28 mx-auto lg:px-30">
      <Title className="mb-5">산업시스템공학부 대여 시스템</Title>
      <section className="flex justify-end w-full mr-14 mb-5">
        <LinkButton href="/admin" className="mr-2">관리자</LinkButton>
        <LinkButton href="/user" className="">대여확인</LinkButton>
      </section>
      <CalendarContainer value={value} dayChangeHandler={dayChangeHandler} />
      <section className="w-full flex items-center space-x-5 pb-2 mt-10 overflow-auto room-card-section">
        {roomData.map((data) => (
          <RoomCard
            key={data.roomNumber}
            cardActive={cardActive[String(data.roomNumber)]}
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
          <div>- 회의실 이용시 대여 인원을 지켜주세요.</div>
          <button
            className="block py-2 px-5 mx-auto mb-20 text-white bg-yellow-700"
            onClick={() => formPost(form)}
            type="button"
          >대여하기</button>
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

interface ActiveType {
  [key: string]: boolean;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];