import { Db } from "mongodb";

import { connectDB } from "@/app/_utill/database";

export async function GET(request:Request) {
  const db: Db = await connectDB();
  const result = await db.collection("reservation-list").find().toArray();

  return Response.json(result);
}

export async function POST(request: Request) {
  const body = await request.json();
  const timeList = [];

  for (let time in body.time) {
    if (body.time[time]) {
      timeList.push(time);
    }
  }

  body.time = timeList;
  body.reservationState = "pending";
  body.isRoomKey = false;

  const db:Db = await connectDB();
  const result = await db.collection("reservation-list").insertOne(body);

  if (result) {
    return Response.json("예약 성공");
  }
  else {
    return Response.json("예약 실패");
  }
}