import Image from "next/image";

export default function UserLoginForm({ form, loginFormChangeHandler, loginPost }: PropsType) {
  return (
    <main className="flex justify-center items-center w-full h-full">
      <section className="border-2 border-black w-[400px] h-[500px] flex flex-col items-center">
        <Image className="w-100px h-auto mt-10" src="/logo-img.jpg" width={300} height={100} alt="로고" />
        <div className="mt-7">
          <div className="flex justify-end items-center mb-5">
            <div>이름</div>
            <input
              className="h-7 px-2 ml-3 bg-gray-200 rounded-md"
              type="text"
              name="name"
              value={form.name}
              onChange={loginFormChangeHandler}
            />
          </div>
          <div className="flex justify-end items-center">
            <div>전화번호</div>
            <input
              className="h-7 px-2 ml-3 bg-gray-200 rounded-md"
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={loginFormChangeHandler}
            />
          </div>
        </div>
        <button
          className="mt-5 bg-[#1891C3] text-white py-1 px-4 rounded-md"
          type="button"
          onClick={loginPost}
        >대여확인</button>
      </section>
    </main>
  );
}

interface PropsType {
  form: {
    name: string;
    phoneNumber: string;
  }
  loginFormChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loginPost: () => void;
}