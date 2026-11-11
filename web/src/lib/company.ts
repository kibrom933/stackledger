/** Set in the hosting environment. Pages leave out any detail that is not set yet. */
export const company = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || "Stackledger",
  cvr: process.env.NEXT_PUBLIC_COMPANY_CVR || "",
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "",
};
