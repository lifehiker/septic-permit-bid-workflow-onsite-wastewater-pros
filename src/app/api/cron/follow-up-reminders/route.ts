import { NextRequest, NextResponse } from "next/server";
import { followUpReminderHtml } from "@/emails/follow-up-reminder";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret") || request.headers.get("x-cron-secret");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ ok: true, skipped: "RESEND_API_KEY not set" });
  const today = new Date(new Date().toDateString());
  const jobs = await prisma.job.findMany({ where: { nextFollowUpDate: { lte: today } }, include: { organization: { include: { memberships: { include: { user: true } } } } } });
  const grouped = new Map<string, typeof jobs>();
  for (const job of jobs) grouped.set(job.organizationId, [...(grouped.get(job.organizationId) || []), job]);
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  let sent = 0;
  for (const orgJobs of grouped.values()) {
    const owner = orgJobs[0].organization.memberships.find((member) => member.role === "OWNER")?.user;
    if (!owner?.email) continue;
    await resend.emails.send({ from: process.env.EMAIL_FROM || "noreply@example.com", to: owner.email, subject: "Septic follow-ups due today", html: followUpReminderHtml(orgJobs) });
    sent++;
  }
  return NextResponse.json({ ok: true, sent });
}
