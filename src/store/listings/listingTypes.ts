export interface Listing {
  id: number;
  user_id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  images: string[];
  priceType: string;
  start_date: string;
  end_date: string;
  status: string;
  hiredTradie_id?: number;
  location: string;
  completed: boolean;
}

export interface Service {
  user_id: number;
  title: string;
  category: string;
  description?: string;
  price: number;
  images?: string[];
  price_type?: string;
  price_description: string;
  location: string;
  completed?: boolean;
  hired_household_id?: number;
  keywords?: string[];
}
