import { useMutation, useQueryClient } from "@tanstack/react-query";

import { memberQueryKeys } from "@/app/member/_api";
import { clearClientSessionCache } from "@/lib/session";

import {
  deleteClientSession,
  postClientLogin,
  postClientReissue,
} from "./auth.api";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postClientLogin,
    onSuccess: response => {
      clearClientSessionCache();
      queryClient.setQueryData(memberQueryKeys.me(), response);
    },
  });
};

export const useReissueMutation = () => {
  return useMutation({
    mutationFn: postClientReissue,
  });
};

export const useDeleteSessionMutation = () => {
  return useMutation({
    mutationFn: deleteClientSession,
    onSuccess: () => {
      clearClientSessionCache();
    },
  });
};
