export type UserPayload = {
  id?: string;
  name?: string;
  email?: string;
  cpf?: string;
  password?: string;
  user_type?: string;
  franchiseId?: string;
  created_at?: Date;
  closed_at?: Date;
};

export type LoginResponse = {
  token: string;
  user: UserPayload;
  user_type: string;
};

export type SignIn = {
  email: string;
  password: string;
};
