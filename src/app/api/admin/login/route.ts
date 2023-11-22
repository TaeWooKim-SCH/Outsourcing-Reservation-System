export async function POST(request: Request) {
  const body: BodyType = await request.json();
  if (body.adminId === "admin" && body.adminPw === "123456789") {
    return new Response('login success!', { status: 200 });
  }
  else {
    return new Response('Not found user!', { status: 404 });
  }
}

interface BodyType {
  adminId: string;
  adminPw: string;
}