export interface LineItem {
  id: string;
  description: string;
  notes?: string;
  amount: number;
}

export interface Quote {
  id?: string;
  ref: string;
  created_at?: string;
  updated_at?: string;
  client_name: string;
  client_mobile: string;
  client_email: string;
  property_address: string;
  scope_summary: string;
  line_items: LineItem[];
  subtotal: number;
  vat_enabled: boolean;
  vat_rate: number;
  vat_amount: number;
  grand_total: number;
  terms: string;
  before_image_path?: string;
  design_board_path?: string;
  design_data?: DesignConcept;
  pdf_path?: string;
  quote_date?: string;
}

export interface DesignConcept {
  design_title: string;
  design_summary: string;
  key_changes: string[];
  materials: Material[];
  colour_palette: string[];
  estimated_scope: string;
  suggested_trades: string[];
  complexity: "low" | "medium" | "high";
  room_type: string;
}

export interface Material {
  name: string;
  colour: string;
  category: "wall" | "floor" | "ceiling" | "fixture" | "furniture";
}

export interface GenerateQuoteRequest {
  description: string;
  totalCost: number;
  lineItemCount: number;
}

export interface GenerateQuoteResponse {
  lineItems: LineItem[];
  error?: string;
}

export interface GenerateDesignRequest {
  imageBase64: string;
  description: string;
  style?: string;
  budget?: string;
}

export interface GenerateDesignResponse {
  design: DesignConcept;
  error?: string;
}

export interface AppSettings {
  vatRate: number;
  defaultTerms: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  anthropicApiKey?: string;
  replicateApiKey?: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
  vatRate: 20,
  defaultTerms: `1. QUOTATION VALIDITY: This quotation is valid for 30 days from the date of issue.

2. PAYMENT TERMS: A deposit of 25% is required to confirm the works. Interim payments will be agreed on commencement. Final balance due on practical completion.

3. VARIATIONS: Any variations to the agreed works will be priced and agreed in writing before commencement.

4. MATERIALS: All materials supplied will be of appropriate specification and quality. We reserve the right to substitute equivalent materials where specified items are unavailable.

5. PROGRAMME: A start date and programme will be agreed on acceptance. Delays caused by factors outside our control will be communicated promptly.

6. INSURANCES: WV Construction holds full public liability insurance. Evidence available on request.

7. DISPUTES: Any disputes should be raised in writing within 14 days of practical completion.

8. GUARANTEE: All works are guaranteed for 12 months against defective workmanship.

ACOR Building and Property Solutions Ltd · Registered in England & Wales · Company No. 9287377`,
  companyName: "WV Construction",
  companyAddress: "20 Ripon Road, Wallasey, Merseyside CH45 6TR",
  companyPhone: "07966 978824",
  companyEmail: "info@wvconstruction.co.uk",
};
