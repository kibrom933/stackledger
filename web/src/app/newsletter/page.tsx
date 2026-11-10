import type { Metadata } from "next";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = { title: "Newsletter", description: "One email a month: AI tool price changes, new tests and the rule changes that matter for small teams." };

const messages: Record<string, string> = {
  confirmed: "Thanks! Your subscription is confirmed.",
  unsubscribed: "You are unsubscribed, and we have deleted your email address.",
  error: "That link no longer works. Please subscribe again.",
};

export default async function NewsletterPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const status = (await searchParams).status;
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Monthly · free · unsubscribe anytime</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">The newsletter</h1>
      {status && messages[status] && <p role="status" className="mt-6 border-l-4 border-brand bg-brand-soft p-4 font-medium">{messages[status]}</p>}
      <p className="mt-6 text-lg text-muted">One email a month: price changes on the AI tools we cover, new hands-on tests, and the EU rule changes that affect how you can use them. Some emails contain affiliate links, and they are always labelled.</p>
      <div className="mt-8"><NewsletterForm /></div>
    </div>
  );
}
