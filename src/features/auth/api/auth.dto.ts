export type LoginRequestDto = {
  code: string;
  origin: string;
};

export type LoginResponseDto = {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  information: {
    id: number;
    isSignUp: boolean;
  };
};

export type ReissueRequestDto = {
  refreshToken: string;
};

export type ReissueResponseDto = {
  accessToken: string;
  refreshToken: string;
};
