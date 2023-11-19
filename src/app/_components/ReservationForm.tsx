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
      <div className="space-y-10 bg-gray-300 py-5 px-5">
        <div className="grid grid-cols-6 grid-rows-2">
          <div className="text-center py-5">시간 선택</div>
          <div className="grid grid-cols-5 gap-3 col-start-2 col-end-7">
            {timeList.map((time) => (
              <TimeCheck value={time} onChange={timeClickHandler} key={time} />
            ))}
          </div>
          <div className="row-start-2 col-start-2 col-end-7">
            <div>- 09~18시까지 1시간 단위로 예약 가능</div>
            <div>- 09~18시까지 1시간 단위로 예약 가능</div>
            <div>- 09~18시까지 1시간 단위로 예약 가능</div>
            <div>- 09~18시까지 1시간 단위로 예약 가능</div>
          </div>
        </div>
        <div className="grid grid-cols-6">
          <div className="text-center py-5">소속 및 학번</div>
          <div>
            <input />
          </div>
        </div>
        <div className="grid grid-cols-6">
          <div className="text-center py-5">이름</div>
          <div>
            <input />
          </div>
        </div>
        <div className="grid grid-cols-6">
          <div className="text-center py-5">연락처</div>
          <div>
            <input />
          </div>
        </div>
        <div className="grid grid-cols-6">
          <div className="text-center py-5">대여 사유</div>
          <div>
            <input />
          </div>
        </div>
      </div>
    </section>
  );
}