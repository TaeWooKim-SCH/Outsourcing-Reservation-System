import TableHeaderElement from "./TableHeaderElement";

export default function UserMainSection({ reservationList }: PropType) {
  const headerElList = ["No.", "이름", "날짜", "시간", "장소", "대여사유", "소속/학번", "휴대폰 번호", "비고"];
  
  return (
    <section className="mt-14">
      <table className="border-separate border-spacing-x-6 border-spacing-y-2">
        <thead>
          <tr>
            {headerElList.map((el) => <TableHeaderElement key={el}>{el}</TableHeaderElement>)}
          </tr>
        </thead>
        <tbody>
          {reservationList.length ? reservationList.map((el: ReservationType, idx: number) => (
              <tr className="text-center text-sm" key={el._id}>
                <td>{idx + 1}</td>
                <td>{el.studentName}</td>
                <td>{el.date}</td>
                <td>{el.time.join(', ')}</td>
                <td>{el.roomNumber}</td>
                <td>{el.reason}</td>
                <td>{el.studentId}</td>
                <td>{el.phoneNumber}</td>
                <td>{el.reservationState}</td>
              </tr>
          )) : <td></td>}
        </tbody>
      </table>
    </section>
  );
}

interface PropType {
  reservationList: ReservationType[]; 
}

interface ReservationType {
  _id: string;
  date: string;
  phoneNumber: string;
  reason: string;
  reservationState: string;
  roomNumber: number;
  studentId: string;
  studentName: string;
  time: string[];
}