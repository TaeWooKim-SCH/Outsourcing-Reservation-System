import { connectDB } from "@/app/_utill/database";
import { Db } from "mongodb";

export async function POST(request: Request) {
  const body: BodyType = await request.json();
  const db: Db = await connectDB();
  const reservationList = await db.collection("reservation-list").find({
    studentName: body.name,
    phoneNumber: body.phoneNumber
  }).toArray();

  if (reservationList.length) {
    return Response.json(reservationList);
  }
  else {
    return new Response('Not found user!', { status: 404 });
  }
}

interface BodyType {
  name: string;
  phoneNumber: string;
}