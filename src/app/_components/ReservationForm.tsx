'use client'

import moment from "moment";
import { IoClose } from "react-icons/io5";
import { roomSchedule } from "../_modules/data";
import TimeCheck from "./TimeCheck";
import { useState } from "react";
import Loading from "../admin/loading";

interface PropsType {
  form: FormType;
  timeClickHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectReason: boolean;
  setIsReserv: React.Dispatch<boolean>;
}

export default function ReservationForm({ form, timeClickHandler, formChangeHandler, selectReason, setIsReserv }: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const timeList = [
    '09:00~10:00',
    '10:00~11:00',
    '11:00~12:00',
    '13:00~14:00',
    '14:00~15:00',
    '15:00~16:00',
    '16:00~17:00',
    '17:00~18:00'
  ];

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
      setIsLoading(true);
      const res = await fetch("/api/reservation", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (res.status === 401) {
        alert("이미 대여자가 존재합니다.");
        window.location.reload();
      }
      else {
        alert("대여에 성공했습니다.");
        window.location.reload();
      };
    }
  }

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <section className="w-[80%] max-w-3xl shadow-lg text-xs md:text-sm lg:text-md z-40">
      <div className="bg-neutral-200 rounded-md py-5 relative">
        <IoClose onClick={() => setIsReserv(false)} className="absolute top-2 right-2 cursor-pointer" size="25" fill="gray" />
        <div className="grid grid-cols-6 grid-rows-2 border-b-2 border-white py-5">
          <div className="text-center py-5">시간 선택</div>
          <div className="grid grid-cols-1 md:gap-3 col-start-2 col-end-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {timeList.map((time) => {
              if (roomSchedule[String(form.roomNumber)] && form.date) {
                const weekDay = moment(new Date(form.date)).weekday();
                if (roomSchedule[String(form.roomNumber)][String(weekDay)]) {
                  const disabled = roomSchedule[String(form.roomNumber)][String(weekDay)];
                  return <TimeCheck value={time} onChange={timeClickHandler} key={time} disabled={disabled.includes(time)} />;
                }
              }
              return <TimeCheck value={time} onChange={timeClickHandler} key={time} />;
            })}
          </div>
          <div className="row-start-2 col-start-2 col-end-7 mt-3 grid grid-cols-1 lg:grid-cols-2">
            <div>- 09~18시까지 1시간 단위로 대여 가능</div>
            <div>- 최대 1인 2시간 대여 가능</div>
            <div>- 수업 있는 강의실은 해당 시간대 대여 불가</div>
            <div>- 2시간 이상 대여 필요시, 과사무실 연락 요망</div>
          </div>
        </div>
        <div className="grid grid-cols-6 border-b-2 border-white py-5">
          <div className="text-center py-5">소속 및 학번</div>
          <div className="col-start-2 col-end-6 py-3">
            <input className="border border-neutral-300 w-64 h-6 rounded-md px-2 mb-3 outline-none" onChange={formChangeHandler} name="studentId" />
            <div>Ex. 산업시스템공학부 20200111</div>
          </div>
        </div>
        <div className="grid grid-cols-6 border-b-2 border-white py-5">
          <div className="text-center py-5">이름</div>
          <div className="py-3">
            <input className="border border-neutral-300 h-6 rounded-md px-2 mb-3 outline-none" onChange={formChangeHandler} name="studentName" />
            <div>Ex. 산시인</div>
          </div>
        </div>
        <div className="grid grid-cols-6 border-b-2 border-white py-5">
          <div className="text-center py-5">연락처</div>
          <div className="py-3 col-start-2 col-end-7">
            <input className="border border-neutral-300 h-6 rounded-md px-2 mb-3 outline-none" onChange={formChangeHandler} name="phoneNumber" />
            <div>Ex. 010-0000-0000</div>
          </div>
        </div>
        <div className="grid grid-cols-6 py-5">
          <div className="text-center py-5">대여 사유</div>
          <div className="col-start-2 col-end-7 flex space-x-3">
            <label className="flex items-center cursor-pointer">
              <input className="mr-1" onChange={formChangeHandler} type="radio" name="reason" value="회의" />
              회의
            </label>
            <label className="flex items-center cursor-pointer">
              <input className="mr-1" onChange={formChangeHandler} type="radio" name="reason" value="면담" />
              면담
            </label>
            <label className="flex items-center cursor-pointer">
              <input className="mr-1" onChange={formChangeHandler} type="radio" name="reason" value="세미나" />
              세미나
            </label>
            <label className="flex items-center cursor-pointer">
              <input className="mr-1" onChange={formChangeHandler} type="radio" name="reason" value="기타" />
              <div>기타:</div>
              <input
                className="border border-neutral-300 h-6 ml-2 outline-none px-2 rounded-md disabled:bg-gray-200"
                onChange={formChangeHandler}
                type="text"
                name="reason-text"
                disabled={selectReason}
              />
            </label>
          </div>
          <div className="col-start-2 col-end-7">
            <div>- 회의실에는 음식물을 반입하실 수 없습니다.</div>
            <div>- 회의실 이용시 대여 인원을 지켜주세요.</div>
          </div>
        </div>
        <button
          className="block py-2 px-5 mx-auto text-white bg-[#1891C3] rounded-md"
          onClick={() => formPost(form)}
          type="button"
        >대여하기</button>
      </div>
    </section>
  );
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
