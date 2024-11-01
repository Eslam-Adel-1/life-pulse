import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const middleware2 = async (request) => {
  const cookiesStore = await cookies();
  const doctorCookie = cookiesStore.get("doctorToken");
  const userCookie = cookiesStore.get("userToken");

  //--------------------------

  const doctorToken = doctorCookie?.value;
  const userToken = userCookie?.value;
  //--------------------------

  const protectedRoutesUser = [
    "/doctors",
    "/appointment",
    "/user-appointments",
    "/appointment-payment",
    "/successful-payment",
  ];

  //--------------------------

  if (doctorToken && !userToken) {
    if (
      protectedRoutesUser.some((route) =>
        request.nextUrl.pathname.includes(route)
      )
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
};
