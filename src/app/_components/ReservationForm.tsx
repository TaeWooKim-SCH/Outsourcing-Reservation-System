'use client'

import moment from "moment";
import { IoClose } from "react-icons/io5";
import { roomSchedule } from "../_modules/data";
import TimeCheck from "./TimeCheck";

interface PropsType {
  form: FormType;
  timeClickHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectReason: boolean;
  setIsReserv: React.Dispatch<boolean>;
}

export default function ReservationForm({ form, timeClickHandler, formChangeHandler, selectReason, setIsReserv }: PropsType) {
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
  
  return (
    <section className="mt-10 mb-5 shadow-lg">
      <div className="bg-gray-200 rounded-md py-5 relative">
        <IoClose onClick={() => setIsReserv(false)} className="absolute top-2 right-2 cursor-pointer" size="25" fill="gray" />
        <div className="grid grid-cols-6 grid-rows-2 border-b-2 border-white py-5">
          <div className="text-center py-5">시간 선택</div>
          <div className="grid grid-cols-1 gap-3 col-start-2 col-end-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
            <input onChange={formChangeHandler} name="studentId" />
            <div>Ex. 산업시스템공학부 20200111</div>
          </div>
        </div>
        <div className="grid grid-cols-6 border-b-2 border-white py-5">
          <div className="text-center py-5">이름</div>
          <div className="py-3">
            <input onChange={formChangeHandler} name="studentName" />
            <div>Ex. 산시인</div>
          </div>
        </div>
        <div className="grid grid-cols-6 border-b-2 border-white py-5">
          <div className="text-center py-5">연락처</div>
          <div className="py-3">
            <input onChange={formChangeHandler} name="phoneNumber" />
            <div>Ex. 010-0000-0000</div>
          </div>
        </div>
        <div className="grid grid-cols-6 py-5">
          <div className="text-center py-5">대여 사유</div>
          <div className="col-start-2 col-end-7 flex space-x-3">
            <label className="flex items-center">
              <input className="mr-1" onChange={formChangeHandler} type="radio" name="reason" value="회의" />
              회의
            </label>
            <label className="flex items-center">
              <input className="mr-1" onChange={formChangeHandler} type="radio" name="reason" value="면담" />
              면담
            </label>
            <label className="flex items-center">
              <input className="mr-1" onChange={formChangeHandler} type="radio" name="reason" value="세미나" />
              세미나
            </label>
            <label className="flex items-center">
              <input className="mr-1" onChange={formChangeHandler} type="radio" name="reason" value="기타" />
              <div>기타:</div>
              <input
                className="h-5 ml-2"
                onChange={formChangeHandler}
                type="text"
                name="reason-text"
                disabled={selectReason}
              />
            </label>
          </div>
        </div>
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
