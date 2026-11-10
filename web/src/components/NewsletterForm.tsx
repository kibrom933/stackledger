"use client";
import { useState } from "react";
import Link from "next/link";

export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), consent: form.get("consent") === "on", website: form.get("website") }),
    });
    const json = await res.json().catch(() => ({}));
    setState(res.ok ? "ok" : "error");
    setMsg(json.message ?? (res.ok ? "" : "Something went wrong. Please try again later."));
  }
  if (state === "ok") return <p role="status" className="self-center font-medium text-forest">{msg || "Check your inbox and confirm your subscription."}</p>;
  return (
    <form onSubmit={submit} className="space-y-3">
      <label className="block text-sm font-medium" htmlFor="nl-email">Email</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-full border border-line bg-paper px-4 py-3 outline-none focus:border-forest" />
        <button disabled={state === "sending"} className="rounded-full bg-forest px-6 py-3 font-medium text-paper disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Subscribe"}
        </button>
      </div>
      {/* Honeypot against bots; hidden from people and screen readers. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <label className="flex items-start gap-2 text-sm text-muted">
        <input name="consent" type="checkbox" required className="mt-1" />
        <span>Yes, send me Stackledger&apos;s monthly newsletter. It may contain affiliate links. I can unsubscribe at any time. <Link href="/privacy" className="underline">Privacy</Link></span>
      </label>
      {state === "error" && <p role="alert" className="text-sm text-red-600">{msg}</p>}
    </form>
  );
}
