import Image from "next/image";

import { FaRegCircleCheck } from "react-icons/fa6";

interface PropsType {
  cardActive: boolean;
  roomNumber: number;
  description: string;
  capacity: number;
  facility: string;
  reservStateHandler: (value: number) => void
}

export default function RoomCard({
  cardActive,
  roomNumber,
  description,
  capacity,
  facility,
  reservStateHandler
}: PropsType) {
  
  return (
    <main className="border-[1px] border-black">
      <section className="w-full">
        <Image
          className="w-full h-48 object-cover"
          src={`/roomImg/${roomNumber}/${roomNumber}-1.jpg`}
          width="300"
          height="300"
          alt="강의실 이미지"
        />
      </section>
      <section className="p-5">
        <div className="text-lg">{roomNumber}</div>
        <div className="text-sm">{description}</div>
        <div className="text-sm">수용인원 {capacity}명</div>
        <div className="text-sm">{facility}</div>
      </section>
      <button
        className="w-full flex justify-center items-center py-3 px-10 bg-gray-200"
        onClick={() => reservStateHandler(roomNumber)}
      >
        <FaRegCircleCheck className={cardActive ? "fill-[#1891C3]" : ""} size="30" fill="gray" />
        <div className="ml-2 text-lg">대여</div>
      </button>
    </main>
  );
}