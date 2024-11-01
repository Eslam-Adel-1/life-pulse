import { NextResponse } from "next/server";

export function chainMiddleware(functions = [], index = 0) {
  const current = functions[index];
  if (current) {
    const next = chainMiddleware(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}
