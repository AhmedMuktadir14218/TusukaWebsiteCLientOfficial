export interface Contact {
  id: number;
  full_name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    data: Contact[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }
}