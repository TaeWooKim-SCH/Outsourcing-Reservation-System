import { connectDB } from "@/app/_utill/database";
import { Db, ObjectId } from "mongodb";

export async function POST(request: Request) {
  const body = await request.json();
  const db: Db = await connectDB();
  const updateReserv = await db.collection('reservation-list').updateOne({
    _id: new ObjectId(body._id)
  }, {
    $set: {reservationState: body.reservationState}
  });

  if (updateReserv.acknowledged) {
    return Response.json("성공", { status: 200 });
  }
  else {
    Response.json("실패", { status: 401 })
  }
}