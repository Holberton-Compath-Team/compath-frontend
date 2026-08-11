export interface SignupPayload {
  fullname: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface SignupResponse {
  message: string;
  status: string;
}
