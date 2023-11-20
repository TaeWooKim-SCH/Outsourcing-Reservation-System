import Image from 'next/image'
import Title from './_components/Title'
import CalendarContainer from './_components/CalendarContainer'
import LinkButton from './_components/LinkButton'
import RoomCard from './_components/RoomCard'
import { roomData } from './_modules/data'
import ReservationForm from './_components/ReservationForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 px-32 lg:px-72">
      <Title className="mb-5">산업시스템공학부 예약 시스템</Title>
      <section className="flex justify-end w-full mr-14 mb-5">
        <LinkButton href="/admin" className="mr-2">관리자</LinkButton>
        <LinkButton href="/reservation" className="">예약확인</LinkButton>
      </section>
      <CalendarContainer />
      <section className="w-full flex items-center space-x-5 mt-10 overflow-auto scrollbar-hide">
        {roomData.map((data) => (
          <RoomCard
            key={data.roomNumber}
            roomNumber={data.roomNumber}
            description={data.description}
            capacity={data.capacity}
            facility={data.facility}
          />
        ))}
      </section>
      <ReservationForm />
    </main>
  )
}
