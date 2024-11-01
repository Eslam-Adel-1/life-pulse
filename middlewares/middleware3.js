import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const middleware3 = async (request) => {
  const cookiesStore = await cookies();
  const doctorCookie = cookiesStore.get("doctorToken");
  const userCookie = cookiesStore.get("userToken");

  const doctorToken = doctorCookie?.value;
  const userToken = userCookie?.value;

  const protectedRoutesDoctor = ["/dashboard", "/doctor-settings"];

  //--------------------------

  if (!doctorToken && userToken) {
    if (
      protectedRoutesDoctor.some((route) =>
        request.nextUrl.pathname.includes(route)
      )
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
};
