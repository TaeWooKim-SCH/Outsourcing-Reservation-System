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
      <div className="mr-7 space-y-10">
        <div className="grid grid-cols-2">
          <div className="">시간 선택</div>
          <div className="grid grid-cols-4 gap-3">
            {timeList.map((time) => (
              <TimeCheck value={time} onChange={timeClickHandler} key={time} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>소속 및 학번</div>
          <div>
            <input />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>이름</div>
          <div>
            <input />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <div>연락처</div>
            <input />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>대여 사유</div>
          <div>
            <input />
          </div>
        </div>
      </div>
    </section>
  );
}