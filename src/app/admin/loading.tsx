import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center bg-white">
      <AiOutlineLoading3Quarters className="animate-spin" size="50" fill="gray" />
    </div>
  );
}