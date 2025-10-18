import { http } from "@/shared/lib/api";

import { type ArticlesResponse } from "./articles.types";

/**
 * 가게에 담긴 이야기 게시글 목록 조회 API
 * @params page 조회할 아티클 개수
 * @returns 가게에 담긴 이야기 게시글 목록
 */
export const getArticles = async (size: number): Promise<ArticlesResponse> => {
  return await http
    .get("api/articles", {
      searchParams: {
        size,
      },
    })
    .json<ArticlesResponse>();
};
