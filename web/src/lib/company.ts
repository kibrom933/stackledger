/** Filled from env before launch. The legal pages show these values. */
export const company = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "[Virksomhedsnavn]",
  cvr: process.env.NEXT_PUBLIC_COMPANY_CVR ?? "[CVR-nr.]",
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS ?? "[Adresse]",
};
