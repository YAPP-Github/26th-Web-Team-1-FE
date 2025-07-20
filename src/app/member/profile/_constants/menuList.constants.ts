import { type MenuListItem } from "../types";

// TODO: 노션, 인스타 링크 전달받으면 수정
export const MENU_LIST: readonly MenuListItem[] = [
  { type: "link", id: "notice", label: "공지사항", link: "/" },
  { type: "link", id: "customer_service", label: "고객센터", link: "/" },
  { type: "link", id: "guide", label: "잇다 이용가이드", link: "/" },
  { type: "action", id: "logout", label: "로그아웃" },
] as const;
