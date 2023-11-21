import { Db } from "mongodb";

import { connectDB } from "@/app/_utill/database";

export async function POST(request: Request) {
  const body = await request.json();
  const db = await connectDB();
  const result = await db.collection("reservation-list").insertOne(body);
  return Response.json(request.body);
}