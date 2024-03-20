export interface UserDetails {
  username: string;
  password: string;
  api_key: string;
}

export interface SuccessResponse {
  expires_at: string;
  request_token: string;
  success: boolean;
}

export interface SessionResponse {
  session_id: string;
  success: boolean;
}

export interface ErrorResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}
