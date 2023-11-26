import { connectDB } from "@/app/_utill/database";
import { Db, ObjectId } from "mongodb";

export async function POST(request: Request) {
  const body = await request.json();
  const db: Db = await connectDB();
  const getReserv = await db.collection("reservation-list").findOne(new ObjectId(body._id));
  const updateReserv = await db.collection("reservation-list").updateOne({
    _id: new ObjectId(body._id)
  }, {
    $set: {reservationState: body.reservationState}
  });

  if (body.reservationState === "거절" && getReserv) {
    const timeObj: {[key: string]: boolean} = {};
    for (let time of getReserv.time) {
      timeObj[time] = false;
    }
    const updateNotPossible = await db.collection("not-possible-list").updateOne({
      date: getReserv.date,
      roomNumber: getReserv.roomNumber
    }, {
      $set: timeObj
    })
  }

  if (updateReserv.acknowledged) {
    return Response.json("성공", { status: 200 });
  }
  else {
    Response.json("실패", { status: 401 })
  }
}

// 예약 거절을 하면 데이터베이스에 not-possible-list도 수정되어야 함