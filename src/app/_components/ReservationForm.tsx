'use client'

export default function ReservationForm() {
  const timeClickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }
  
  return (
    <section className="w-full grid grid-cols-2">
        <div>
          <div>시간 선택</div>
          <div>소속 및 학번</div>
          <div>이름</div>
          <div>연락처</div>
          <div>대여 사유</div>
        </div>
        <div>
          <div>
            <input type="checkbox" value="09:00~10:00" onChange={timeClickHandler} />
            <input type="checkbox" value="10:00~11:00" onChange={timeClickHandler} />
            <input type="checkbox" value="11:00~12:00" onChange={timeClickHandler} />
            <input type="checkbox" value="12:00~13:00" onChange={timeClickHandler} />
            <input type="checkbox" value="13:00~14:00" onChange={timeClickHandler} />
            <input type="checkbox" value="15:00~16:00" onChange={timeClickHandler} />
            <input type="checkbox" value="16:00~17:00" onChange={timeClickHandler} />
            <input type="checkbox" value="17:00~18:00" onChange={timeClickHandler} />
          </div>
        </div>
      </section>
  );
}