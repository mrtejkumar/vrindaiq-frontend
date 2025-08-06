import { api } from "./api";
import { AUTH_ENDPOINTS } from "../config/env";

interface LoginResponse {
  access_token: string;
  token_type: string;
}

// ✅ Match your backend's new UserCreate schema
interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name: string;
  mobile?: string;
  experience_level?: string;
  investment_style?: string;
  preferred_market?: string;
}

// ✅ Login user and get token (form data for FastAPI OAuth2PasswordRequestForm)
export async function loginUser(username: string, password: string): Promise<LoginResponse> {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data;
}

// ✅ Register new user (JSON body)
export async function registerUser(data: RegisterRequest) {
  const response = await api.post(AUTH_ENDPOINTS.REGISTER, data);
  return response.data;
}
