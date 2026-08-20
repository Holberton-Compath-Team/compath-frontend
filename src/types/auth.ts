export interface SignupPayload {
  fullname: string;
  email: string;
  password: string;
}


export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  fullname: string;
  email: string;
  role: "student" | "admin";
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface SignupResponse {
  message: string;
  status: string;
}

