import { useMutation } from "@tanstack/react-query";

import {
  deleteClientSession,
  postClientLogin,
  postClientReissue,
} from "./auth.api";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: postClientLogin,
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
  });
};
