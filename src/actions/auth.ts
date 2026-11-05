"use server";

import { signOut } from "@/auth";

export async function signOutForLocale() {
  await signOut({ redirectTo: "/" });
}
