import { queryOptions } from "@tanstack/react-query";

import { getSession } from "./session.api";

const sessionQueryKeys = {
  session: ["session"],
};

export const sessionQueries = {
  session: queryOptions({
    queryKey: sessionQueryKeys.session,
    queryFn: getSession,
  }),
};
