'use client'

export default function ReservationForm() {
  const timeClickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }
  
  return (
    <section className="mt-10 mb-20">
      <div className="mr-7 space-y-10">
        <div className="grid grid-cols-2">
          <div className="">시간 선택</div>
          <div className="grid grid-cols-4">
            <label>
              <input type="checkbox" value="09:00~10:00" onChange={timeClickHandler} />
              09:00~10:00
            </label>
            <label>
              <input type="checkbox" value="10:00~11:00" onChange={timeClickHandler} />
              10:00~11:00
            </label>
            <label>
              <input type="checkbox" value="11:00~12:00" onChange={timeClickHandler} />
              11:00~12:00
            </label>
            <label>
              <input type="checkbox" value="13:00~14:00" onChange={timeClickHandler} />
              13:00~14:00
            </label>
            <label>
              <input type="checkbox" value="15:00~16:00" onChange={timeClickHandler} />
              15:00~16:00
            </label>
            <label>
              <input type="checkbox" value="16:00~17:00" onChange={timeClickHandler} />
              16:00~17:00
            </label>
            <label>
              <input type="checkbox" value="17:00~18:00" onChange={timeClickHandler} />
              17:00~18:00
            </label>
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