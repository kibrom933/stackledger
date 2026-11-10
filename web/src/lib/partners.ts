import partnersFile from "../../../data/partners.json";
import productsFile from "../../../data/products.json";

export type Partner = {
  id: string;
  name: string;
  website: string;
  network: string;
  networkProgramId: string | null;
  applicationStatus: "not_applied" | "applied" | "approved" | "rejected" | "paused";
  commission: { text: string; verified: boolean; source: string | null; checkedAt: string };
  cookieDays: { value: number | null; verified: boolean; source: string | null };
  approvedChannels: string[];
  restrictions?: string[];
  /** e.g. "https://www.awin1.com/cread.php?awinmid=X&awinaffid=Y&ued={url}" — filled only after approval */
  trackingTemplate: string | null;
  paymentStatus: string;
  notes: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  partnerId: string;
  merchantUrl: string;
  priceDkk?: number;
  priceCheckedAt?: string;
  /** e.g. "/md." */
  priceUnit?: string;
  currency?: "USD" | "EUR" | "DKK";
  facts: { text: string; source: string; checkedAt: string }[];
  imageUrl?: string;
  imageLicense?: string;
};

export const partners = partnersFile.partners as unknown as Partner[];
export const products = (productsFile as { products: Product[] }).products;

export const partnerById = (id: string) => partners.find((p) => p.id === id);
export const productById = (id: string) => products.find((p) => p.id === id);

/**
 * A link is only an affiliate link when the partner has approved us AND a tracking
 * template exists. Otherwise we link to the plain merchant page (no commission, no label).
 */
export function isAffiliateActive(p: Partner | undefined): boolean {
  return !!p && p.applicationStatus === "approved" && !!p.trackingTemplate;
}

export function buildOutboundUrl(product: Product): { url: string; affiliate: boolean } {
  const partner = partnerById(product.partnerId);
  if (isAffiliateActive(partner)) {
    const url = partner!.trackingTemplate!.replace("{url}", encodeURIComponent(product.merchantUrl));
    return { url, affiliate: true };
  }
  return { url: product.merchantUrl, affiliate: false };
}

const PRICE_MAX_AGE_DAYS = 14;
export function freshPrice(product: Product): number | null {
  if (!product.priceDkk || !product.priceCheckedAt) return null;
  const age = (Date.now() - new Date(product.priceCheckedAt).getTime()) / 86_400_000;
  return age <= PRICE_MAX_AGE_DAYS ? product.priceDkk : null;
}
