export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);
  return Response.json(request.body);
}