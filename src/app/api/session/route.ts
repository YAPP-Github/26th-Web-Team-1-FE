import { NextResponse } from "next/server";

import { getSessionFromServer } from "@/shared/lib/session";

export const GET = async () => {
  const session = await getSessionFromServer();
  return NextResponse.json(session);
};
