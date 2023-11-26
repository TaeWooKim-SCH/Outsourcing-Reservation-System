'use client'

import { useEffect, useState } from "react";
import UserLoginForm from "../_components/UserLoginForm";

export default function Page() {
  const [isLogin, setIsLogin] = useState(false);
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

  useEffect(() => {
    if (sessionStorage.getItem("user") === "yes") {
      setIsLogin(true);
    }
    else {
      setIsLogin(false);
    }
  }, [isLogin])

  if (!isLogin) {
    return (
      <UserLoginForm form={form} loginFormChangeHandler={loginFormChangeHandler} setIsLogin={setIsLogin} />
    );
  }
  else {
    return (
      <main>
        예약목록
      </main>
    );
  }
}