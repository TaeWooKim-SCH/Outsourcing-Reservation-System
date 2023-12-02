import Image from "next/image";

export default function AdminLoginForm({ form, loginFormChangeHandler }: PropsType) {
  const loginPost = async () => {
    if (!form.adminId) {
      return alert("아이디를 입력해주세요.");
    }
    else if (!form.adminPw) {
      return alert("비밀번호를 입력해주세요.");
    }
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
    if (!res.ok) alert("아이디 또는 비밀번호가 잘못되었습니다.");
    else {
      sessionStorage.setItem("login", "yes");
      alert("로그인에 성공했습니다.");
      window.location.reload();
    };
  }
  
  return (
    <section className="flex justify-center items-center w-full h-full">
      <section className="border-2 border-[#1891C3] rounded-md w-[400px] h-[500px] flex flex-col items-center">
        <Image className="w-100px h-auto mt-10" src="/logo-img.jpg" width={300} height={100} alt="로고" />
        <div className="text-lg font-bold">관리자용 로그인</div>
        <div className="mt-10">
          <div className="flex justify-end items-center mb-5">
            <div>아이디</div>
            <input
              className="border border-neutral-300 h-7 px-2 ml-3 bg-gray-100 rounded-md outline-none"
              type="text"
              name="id"
              value={form.adminId}
              onChange={loginFormChangeHandler}
              onKeyDown={(e) => e.key === 'Enter' && loginPost()}
            />
          </div>
          <div className="flex justify-end items-center">
            <div>비밀번호</div>
            <input
              className="border border-neutral-300 h-7 px-2 ml-3 bg-gray-100 rounded-md outline-none"
              type="password"
              name="pw"
              value={form.adminPw}
              onChange={loginFormChangeHandler}
              onKeyDown={(e) => e.key === 'Enter' && loginPost()}
            />
          </div>
        </div>
        <button
          className="mt-5 bg-[#1891C3] text-white py-1 px-4 rounded-md"
          type="button"
          onClick={loginPost}
        >로그인</button>
      </section>
    </section>
  );
}

interface PropsType {
  form: {
    adminId: string;
    adminPw: string;
  }
  loginFormChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}