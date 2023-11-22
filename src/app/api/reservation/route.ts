import { Db } from "mongodb";

import { connectDB } from "@/app/_utill/database";

export async function POST(request: Request) {
  const body = await request.json();
  const db:Db = await connectDB();
  const result = await db.collection("reservation-list").insertOne(body);

  if (result) {
    return Response.json("예약 성공");
  }
  else {
    return Response.json("예약 실패");
  }
}