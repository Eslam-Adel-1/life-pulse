import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const middleware1 = async (request) => {
  const cookiesStore = await cookies();
  const doctorCookie = cookiesStore.get("doctorToken");
  const userCookie = cookiesStore.get("userToken");

  //--------------------
  const doctorToken = doctorCookie?.value;
  const userToken = userCookie?.value;

  const protectedRoutes = [
    "/login",
    "/register",
    "/doctor/login",
    "/doctor/register",
    "/forgetPassword",
    "/forgetPassword/doctor",
  ];

  //--------------------

  // IMPORTANT INFORMATION:

  if (request.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  /* This snippet of code isolates the client paths from the cached data making the css files load ... without this the middleware would still work but the css files would not load */

  //--------------------

  try {
    if (!doctorToken && !userToken) {
      if (
        protectedRoutes.some((route) =>
          request.nextUrl.pathname.includes(route)
        )
      ) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    //------------------------------------------------

    if (doctorToken && !userToken) {
      if (
        protectedRoutes.some((route) =>
          request.nextUrl.pathname.includes(route)
        )
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    //------------------------------------------------
    if (!doctorToken && userToken) {
      if (
        protectedRoutes.some((route) =>
          request.nextUrl.pathname.includes(route)
        )
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //-------------------------
};
