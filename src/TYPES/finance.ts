export type FinancePayload = {
  id?: string;
  tier?: string;
  score_performed?: number;
  MRR?: number;
  MDR?: number;
  commission?: number;
  franchiseId?: string;
  created_at?: Date;
  closed_at?: Date;
};
