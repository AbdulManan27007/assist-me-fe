export enum UserRoles {
  Household = "household",
  Tradie = "tradie",
  Admin = "admin",
}

export interface GetUser {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  password_hash?: string;
  is_verified?: boolean;
  tag: string;
  phone: string;
  experience: string;
  picture: string;
  status: string;
  city: string;
  address: string;
  role: UserRoles;
  type: string;
  categories: string;
  owned: boolean;
  created_at: Date;
  reviews?:number;
  ratings?:number;  
  tradie_completed_jobs?:number;
  household_completed_tasks?:number;
  household_pending_tasks?:number;
  tradie_pending_jobs?:number;
  imageChanged?: boolean;

}