'use client'

import { useEffect, useState } from "react";
import AdminLoginForm from "../_components/AdminLoginForm";
import Title from "../_components/Title";
import AdminMainSection from "../_components/AdminMainSection";


export default function Page() {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    adminId: "",
    adminPw: ""
  });

  const loginFormChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const result = {...form};
    switch(name) {
      case "id":
        result.adminId = value;
        break;
      case "pw":
        result.adminPw = value;
        break;
    }
    setForm(result);
  };

  useEffect(() => {
    if (sessionStorage.getItem("login") === "yes") {
      setIsLogin(true);
    }
    else {
      setIsLogin(false);
    }
  }, [isLogin])

  if (!isLogin) {
    return (
      <AdminLoginForm
        loginFormChangeHandler={loginFormChangeHandler}
        form={form}
        setIsLogin={setIsLogin}
      />
    );
  }
  else {
    return (
      <main className="py-20 px-20 flex flex-col items-center">
        <Title>산업시스템공학부 대여 시스템 관리자</Title>
        <AdminMainSection />
      </main>
    );
  }
}