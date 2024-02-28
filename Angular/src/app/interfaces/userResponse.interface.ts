

export interface userResponse {
  users: [
    {
      user_id: string;
      name: string;
      email: string;
      created_at: string;
      password: string;
    }
  ];
  error: {
    name: string;
    message: string;
  };
}

export interface OneUserResponse {
  user: [
    {
      user_id: string;
      name: string;
      email: string;
      role?: string;
      password: string;
      created_at: string;
      isDelete?: boolean;
      isWelcomed?: boolean;
    }
  ];
  error?: {
    name: string;
    message: string;
  };
}
