import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { company } from "@/lib/company";

export const metadata: Metadata = { title: "Terms", description: "Terms of use for Driftig." };

export default function Terms() {
  return (
    <TextPage title="Terms of use" updated="10 November 2026">
      <p>Driftig is run by {company.name} (CVR {company.cvr}), Denmark. Danish law applies.</p>
      <h2>Information, not advice</h2>
      <p>Our guides are general information. They do not replace legal, tax or data-protection advice about your own situation.</p>
      <h2>Prices and plans</h2>
      <p>Prices, features and terms come from the vendors and change often. The vendor&apos;s information when you sign up is what counts, and your contract is with the vendor, not with us.</p>
      <h2>Copyright</h2>
      <p>Text and our own screenshots belong to Driftig. You are welcome to quote short passages with a credit and a link.</p>
    </TextPage>
  );
}
