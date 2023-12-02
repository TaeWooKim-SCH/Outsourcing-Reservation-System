'use client'

import { useEffect, useState } from "react";
import TableHeaderElement from "./TableHeaderElement";
import ChangeReservationState from "./ChangeReservationState";
import { reservationDataFetching } from "../_modules/api";

export default function AdminMainSection() {
  const [reserv, setReserv] = useState<DataType[] | undefined>([]);
  const headerElList = ["No.", "이름", "날짜", "시간", "장소", "대여사유", "소속/학번", "휴대폰 번호", "비고"];

  const dataFetch = async () => {
    try {
      const data = await reservationDataFetching();
      setReserv(data);
    }
    catch(error) {
      console.error(error);
    } 
  }

  useEffect(() => {
    dataFetch();
  }, [])
  
  return (
    <section className="mt-14">
      <table className="border-separate border-spacing-x-6 border-spacing-y-2">
        <thead>
          <tr>
            {headerElList.map((el) => <TableHeaderElement key={el}>{el}</TableHeaderElement>)}
          </tr>
        </thead>
        <tbody>
          {reserv ? reserv.map((el: DataType, idx: number) => {
            return (
            <tr className="text-center text-sm" key={el._id}>
              <td>{idx + 1}</td>
              <td>{el.studentName}</td>
              <td>{el.date}</td>
              <td>{el.time.join(', ')}</td>
              <td>{el.roomNumber}</td>
              <td>{el.reason}</td>
              <td>{el.studentId}</td>
              <td>{el.phoneNumber}</td>
              <td>{el.reservationState === "대기" ? <ChangeReservationState reservId={el._id} /> : el.reservationState}</td>
            </tr>
          )}) : <td></td>}
        </tbody>
      </table>
    </section>
  );
}

interface DataType {
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