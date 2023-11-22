'use client'

import { useEffect, useState } from "react";
import AdminLoginForm from "../_components/AdminLoginForm";


export default function Page() {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    adminId: "",
    adminPw: ""
  });
  // const isLogin = sessionStorage.getItem("login");

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
      <div>로그인상태입니다.</div>
    );
  }
}