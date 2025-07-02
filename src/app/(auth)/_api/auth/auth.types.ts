export type LoginRequest = {
  code: string;
  origin: string;
};

export type LoginResponse = {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  information: {
    id: number;
    isSignUp: boolean;
  };
};

export type ReissueRequest = {
  refreshToken: string;
};

export type ReissueResponse = {
  accessToken: string;
  refreshToken: string;
};
