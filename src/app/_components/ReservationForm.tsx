'use client'

import TimeCheck from "./TimeCheck";

export default function ReservationForm() {
  const timeList = [
    '09:00~10:00',
    '10:00~11:00',
    '11:00~12:00',
    '13:00~14:00',
    '14:00~15:00',
    '15:00~16:00',
    '16:00~17:00',
    '17:00~18:00'
  ]

  const timeClickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }
  
  return (
    <section className="mt-10 mb-20">
      <div className="bg-gray-300 py-5 px-5">
        <div className="grid grid-cols-6 grid-rows-2 border-b-[1px] border-black py-5">
          <div className="text-center py-5">시간 선택</div>
          <div className="grid grid-cols-5 gap-3 col-start-2 col-end-7">
            {timeList.map((time) => (
              <TimeCheck value={time} onChange={timeClickHandler} key={time} />
            ))}
          </div>
          <div className="row-start-2 col-start-2 col-end-7 mt-3 grid grid-cols-1 lg:grid-cols-2">
            <div>- 09~18시까지 1시간 단위로 예약 가능</div>
            <div>- 최대 1인 2시간 예약 가능</div>
            <div>- 수업 있는 강의실은 해당 시간대 대여 불가</div>
            <div>- 2시간 이상 대여 필요시, 과사무실 연락 요망</div>
          </div>
        </div>
        <div className="grid grid-cols-6 border-b-[1px] border-black py-5">
          <div className="text-center py-5">소속 및 학번</div>
          <div className="col-start-2 col-end-6 py-3">
            <input />
            <div>Ex. 산업시스템공학부 20200111</div>
          </div>
        </div>
        <div className="grid grid-cols-6 border-b-[1px] border-black py-5">
          <div className="text-center py-5">이름</div>
          <div className="py-3">
            <input />
            <div>Ex. 산시인</div>
          </div>
        </div>
        <div className="grid grid-cols-6 border-b-[1px] border-black py-5">
          <div className="text-center py-5">연락처</div>
          <div className="py-3">
            <input />
            <div>Ex. 010-0000-0000</div>
          </div>
        </div>
        <div className="grid grid-cols-6 py-5">
          <div className="text-center py-5">대여 사유</div>
          <div className="col-start-2 col-end-7 flex space-x-3">
            <label className="flex items-center">
              <input type="radio" name="reason" value="meeting" />
              회의
            </label>
            <label className="flex items-center">
              <input type="radio" name="reason" value="interview" />
              면담
            </label>
            <label className="flex items-center">
              <input type="radio" name="reason" value="seminar" />
              세미나
            </label>
            <label className="flex items-center">
              <input className="" type="radio" name="reason" value="seminar" />
              <div>기타:</div>
              <input className="h-5 ml-2" type="text" value="" />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}