"use server";

import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function signupAction(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  if (!email || password.length < 8) redirect("/signup?error=Use%20a%20valid%20email%20and%208%2B%20character%20password");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) redirect("/login?error=Account%20already%20exists");

  const passwordHash = await hash(password, 12);
  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      memberships: {
        create: {
          role: "OWNER",
          organization: {
            create: {
              name: company || `${name || "Septic"} Team`,
              trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
              subscriptions: { create: { tier: "Beta trial", status: "TRIALING" } },
            },
          },
        },
      },
    },
  });

  await signIn("credentials", { email, password, redirectTo: "/dashboard" });
}

export async function loginAction(formData: FormData) {
  await signIn("credentials", {
    email: String(formData.get("email") || "").trim().toLowerCase(),
    password: String(formData.get("password") || ""),
    redirectTo: "/dashboard",
  });
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
