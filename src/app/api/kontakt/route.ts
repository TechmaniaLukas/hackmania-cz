import { NextResponse } from "next/server";
import { Resend } from "resend";

const SUBJECTS = {
  general: "Obecný dotaz",
  "add-hackathon": "Přidat hackathon do katalogu",
  partner: "Firemní partnerství",
  school: "Spolupráce se školou",
  press: "Dotaz z médií",
  other: "Jiné",
} as const;
type SubjectKey = keyof typeof SUBJECTS;

type Payload = {
  name?: string;
  email?: string;
  subject?: SubjectKey;
  message?: string;
  website?: string; // honeypot
};

function esc(s: string): string {
  return s.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný formát zprávy." }, { status: 400 });
  }

  // Honeypot — if filled, pretend success (bots fill every field).
  if (body.website && body.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const subjectKey = (body.subject ?? "general") as SubjectKey;
  const message = (body.message ?? "").trim();

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Vyplňte prosím jméno." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Neplatný e-mail." }, { status: 400 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ error: "Zpráva je moc krátká (min. 10 znaků)." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Zpráva je moc dlouhá (max. 5000 znaků)." }, { status: 400 });
  }
  if (!(subjectKey in SUBJECTS)) {
    return NextResponse.json({ error: "Neznámé téma." }, { status: 400 });
  }

  const subjectLabel = SUBJECTS[subjectKey];
  const toAddress =
    subjectKey === "partner"
      ? "partneri@hackmania.cz"
      : subjectKey === "school"
      ? "skoly@hackmania.cz"
      : subjectKey === "press"
      ? "press@hackmania.cz"
      : "ahoj@hackmania.cz";

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev mode without Resend setup — log and pretend success so form UX is testable.
    console.warn("[contact] RESEND_API_KEY not set. Would send:", {
      to: toAddress,
      from: email,
      subject: subjectLabel,
      message,
    });
    return NextResponse.json({ ok: true, dev: true }, { status: 200 });
  }

  const resend = new Resend(apiKey);
  const fromAddress = process.env.CONTACT_FROM ?? "Hackmania web <web@hackmania.cz>";

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `[${subjectLabel}] ${name}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#05060a;border-bottom:2px solid #b4ff39;padding-bottom:8px">
            Nová zpráva z hackmania.cz
          </h2>
          <p><strong>Téma:</strong> ${esc(subjectLabel)}</p>
          <p><strong>Jméno:</strong> ${esc(name)}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
          <hr>
          <div style="white-space:pre-wrap">${esc(message)}</div>
        </div>
      `,
      text: `Téma: ${subjectLabel}\nJméno: ${name}\nE-mail: ${email}\n\n${message}`,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Odeslání selhalo. Zkus to prosím znovu." }, { status: 502 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Send failed:", err);
    return NextResponse.json({ error: "Odeslání selhalo. Zkus to prosím znovu." }, { status: 500 });
  }
}
