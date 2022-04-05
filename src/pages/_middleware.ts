import { NextRequest, NextResponse } from "next/server";

const signedinPages = ["/account"];
const authPages = ["/auth"];
export default function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const token = req.cookies?.EDA_ACCESS_TOKEN || "";

  if (signedinPages.find((p) => p === pathname)) {
    if (!token) {
      return NextResponse.redirect(`${origin}/auth`);
    }
  }

  if (token && authPages.find((p) => p === pathname)) {
    return NextResponse.redirect(origin);
  }
}
