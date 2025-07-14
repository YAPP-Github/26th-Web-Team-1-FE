import { useMutation, useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants";

import {
  type NicknameCheckRequest,
  type PhoneNumberCheckRequest,
  type UpdateMemberRequest,
} from "../_types/member.types";
import {
  getMember,
  getNicknameCheck,
  getPhoneNumberCheck,
  putMember,
} from "./member.api";

export const useUpdateMemberMutation = () => {
  return useMutation({
    mutationFn: (updateMember: UpdateMemberRequest) => putMember(updateMember),
  });
};

export const useNicknameCheckMutation = () => {
  return useMutation({
    mutationFn: (nickname: NicknameCheckRequest) => getNicknameCheck(nickname),
  });
};

export const usePhoneNumberCheckMutation = () => {
  return useMutation({
    mutationFn: (phoneNumber: PhoneNumberCheckRequest) =>
      getPhoneNumberCheck(phoneNumber),
  });
};

export const useMemberQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.member,
    queryFn: getMember,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
