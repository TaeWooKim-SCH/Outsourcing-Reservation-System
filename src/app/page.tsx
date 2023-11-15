import Image from 'next/image'
import Title from './_components/Title'
import CalendarContainer from './_components/CalendarContainer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Title className="mb-5">산업시스템공학부 예약 시스템</Title>
      <CalendarContainer />
    </main>
  )
}
