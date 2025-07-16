import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getMember,
  getNicknameCheck,
  getPhoneNumberCheck,
  putMember,
} from "./member.api";

export const memberQueryKeys = {
  all: ["member"] as const,
  me: () => [...memberQueryKeys.all, "me"] as const,
};

export const useUpdateMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.me(),
      });
    },
  });
};

export const useNicknameCheckMutation = () => {
  return useMutation({
    mutationFn: getNicknameCheck,
  });
};

export const usePhoneNumberCheckMutation = () => {
  return useMutation({
    mutationFn: getPhoneNumberCheck,
  });
};

export const memberQueryOptions = queryOptions({
  queryKey: memberQueryKeys.me(),
  queryFn: getMember,
  staleTime: 1000 * 60 * 60,
  gcTime: 1000 * 60 * 60 * 24,
});
