export type NicknameFunnel = {
  nickname?: string;
  phoneNumber?: string;
  agree?: boolean;
};

export type PhoneNumberFunnel = {
  nickname: string;
  phoneNumber?: string;
  agree?: boolean;
};

export type AgreeFunnel = {
  nickname: string;
  phoneNumber: string;
  agree?: boolean;
};

export type AgreementConstants = {
  id: string;
  label: string;
  required: boolean;
};
