import { Db } from "mongodb";

import { connectDB } from "@/app/_utill/database";

export async function GET(request:Request) {
  const db: Db = await connectDB();
  const result = await db.collection("reservation-list").find().toArray();

  return Response.json(result);
}

export async function POST(request: Request) {
  const db: Db = await connectDB();
  const body = await request.json();
  const timeList = [];
  const timeObj = {...body.time};
  const findNotPossible = await db.collection("not-possible-list").findOne({ // 데이터가 없으면 null로 반환
    date: body.date,
    roomNumber: body.roomNumber
  })

  if (!findNotPossible) {
    await db.collection("not-possible-list").insertOne({
      date: body.date,
      roomNumber: body.roomNumber,
      '09:00~10:00': false,
      '10:00~11:00': false,
      '11:00~12:00': false,
      '13:00~14:00': false,
      '14:00~15:00': false,
      '15:00~16:00': false,
      '16:00~17:00': false,
      '17:00~18:00': false
    })
  }

  for (let time in body.time) {
    if (findNotPossible && findNotPossible[time] && body.time[time]) {
      return Response.json("예약 불가", { status: 401 })
    }
    timeList.push(time);
  }

  body.time = timeList;
  body.reservationState = "대기";

  const insertReservation = await db.collection("reservation-list").insertOne(body);

  db.collection("not-possible-list").updateOne({
    date: body.date,
    roomNumber: body.roomNumber
  }, {
    $set: timeObj
  });

  if (insertReservation.acknowledged) {
    return Response.json("예약 성공", {status: 200});
  }
  else {
    return Response.json("예약 실패", {status: 401});
  }
}