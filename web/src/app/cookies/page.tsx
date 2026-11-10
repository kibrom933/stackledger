import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";

export const metadata: Metadata = { title: "Cookies", description: "Stackledger sets no cookies. Here is why, and what happens when you click through to a vendor." };

export default function Cookies() {
  return (
    <TextPage title="Cookies" updated="10 November 2026">
      <p><strong>Stackledger sets no cookies</strong> and stores nothing else on your device, so we show no cookie banner.</p>
      <p>Our statistics (Plausible) work without cookies and without storing your IP address.</p>
      <h2>When you click through to a vendor</h2>
      <p>When you click an affiliate link we send you to the vendor. The vendor or its affiliate platform (for example PartnerStack) then sets its own cookie on its own domain to record that a sign-up came from us. That cookie is covered by their cookie policy and consent.</p>
      <p>If we ever add something that sets cookies, such as an embedded YouTube video, we will ask first, and you will be able to withdraw consent here.</p>
    </TextPage>
  );
}
