import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";

export const metadata: Metadata = { title: "How we test", description: "Stackledger's editorial rules: how we test AI tools, which sources we use, how we use AI, and how we make money." };

export default function About() {
  return (
    <TextPage title="How we test" updated="10 November 2026">
      <p>Stackledger reviews AI tools for freelancers and small teams. We are based in Copenhagen, so we look at every tool through a European lens: what it really costs, where your data goes, and whether it fits GDPR and the EU AI Act. Our promise is simple: we only write what we can back up.</p>
      <h2>Our rules</h2>
      <ul>
        <li><strong>Real accounts, real tasks.</strong> When we say &quot;we tested&quot;, we signed up, ran the tasks we describe, and the screenshots come from our own account.</li>
        <li><strong>No invented experience.</strong> If we have not used a tool ourselves, we say so and rely only on the vendor&apos;s documentation and other named sources.</li>
        <li><strong>Prices with dates.</strong> AI pricing changes constantly. We only show prices we checked in the last 14 days, with the date next to them.</li>
        <li><strong>Privacy is part of the verdict.</strong> We read the terms on data retention, model training and where data is processed. That is information, not legal advice.</li>
        <li><strong>Corrections.</strong> If you find a mistake, we fix it and note what changed.</li>
      </ul>
      <h2>How we use AI</h2>
      <p>We use AI for research, structure and first drafts. Every article is fact-checked against its sources and approved by a person before it is published. AI never writes &quot;personal experience&quot; on our behalf.</p>
      <h2>How we make money</h2>
      <p>Some links are affiliate links: if you sign up or buy through them, the vendor pays us a commission at no extra cost to you. Vendors cannot pay for a better position or a better verdict, and we recommend tools that pay us nothing when they are the better choice. See our <a href="/affiliate-disclosure">affiliate disclosure</a>.</p>
    </TextPage>
  );
}
