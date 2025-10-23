export interface registerDto {
  phoneNumber: string;
  email: string;
  name: string;
  password?: string;
}


export interface loginDto {
  phoneNumber: string;
  password?: string;
}

export type AuthResponse = {
  access_token: string;
  user: {
    _id: string | number;
    email?: string;
    name: string;
    phoneNumber: string;
    role: string;
  };
  message: string;
};

export type User = {
  _id: string | number;
  email?: string;
  phoneNumber: string;
  name: string;
  role?: string;
};