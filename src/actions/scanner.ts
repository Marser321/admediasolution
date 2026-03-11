"use server";

import { cookies } from "next/headers";

const SCANNER_COOKIE_NAME = "scanner_completed";

export async function getScanStatus(): Promise<boolean> {
  const cookieStore = await cookies();
  const scanStatus = cookieStore.get(SCANNER_COOKIE_NAME);
  return scanStatus?.value === "true";
}

export async function setScanStatus(completed: boolean): Promise<void> {
  const cookieStore = await cookies();

  if (completed) {
    cookieStore.set(SCANNER_COOKIE_NAME, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });
  } else {
    cookieStore.delete(SCANNER_COOKIE_NAME);
  }
}
