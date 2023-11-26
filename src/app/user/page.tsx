'use client'

import { useState } from "react";
import UserLoginForm from "../_components/UserLoginForm";
import UserMainSection from "../_components/UserMainSection";
import Title from "../_components/Title";

export default function Page() {
  const [isLogin, setIsLogin] = useState(false);
  const [reservationList, setReservationList] = useState<ReservationType[]>([]);
  const [form, setForm] = useState({
    name: "",
    phoneNumber: ""
  });

  const loginFormChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const result = {...form};
    switch(name) {
      case "name":
        result.name = value;
        break;
      case "phoneNumber":
        result.phoneNumber = value;
        break;
    }
    setForm(result);
  };

  const loginPost = async () => {
    const res = await fetch('/api/user/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
    const json: ReservationType[] = await res.json();
    json.sort((a: ReservationType, b: ReservationType) => {
      if (new Date(a.date) > new Date(b.date)) {
        return -1;
      }
      else {
        return 1;
      }
    })
    if (!res.ok) alert("대여 목록이 존재하지 않습니다. 이름 또는 전화번호를 확인하세요.");
    else {
      setReservationList(json);
      setIsLogin(true);
    };
  }

  if (!isLogin) {
    return (
      <UserLoginForm
        form={form}
        loginFormChangeHandler={loginFormChangeHandler}
        loginPost={loginPost}
      />
    );
  }
  else {
    return (
      <main className="py-20 px-20 flex flex-col items-center">
        <Title>대여 목록 확인</Title>
        <UserMainSection reservationList={reservationList} />
      </main>
    );
  }
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