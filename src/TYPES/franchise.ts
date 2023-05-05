import { CallPayload } from "./call";
import { CustomerPayload } from "./customer";
import { FinancePayload } from "./finance";
import { ProductPayload } from "./product";

export type FranchisePayload = {
  id?: string;
  userId?: string;
  name?: string;
  cnpj?: string;
  plan?: string;
  score?: number;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  field_of_activity?: string;
  created_at?: Date;
  closed_at?: Date;
  customers?: CustomerPayload[];
  products?: ProductPayload[];
  calls?: CallPayload[];
  finances?: FinancePayload[];
};
