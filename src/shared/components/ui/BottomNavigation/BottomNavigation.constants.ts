import CheerIcon from "@/assets/cheer.svg";
import HomeIcon from "@/assets/home.svg";
import PersonIcon from "@/assets/person-fill.svg";
import SearchIcon from "@/assets/search.svg";

import { type BottomNavigationItem } from "./BottomNavigation.types";

export const BOTTOM_NAVIGATION_ITEMS: BottomNavigationItem[] = [
  {
    id: "home",
    label: "홈",
    path: "/",
    icon: HomeIcon,
  },
  {
    id: "support",
    label: "응원",
    path: "/cheer",
    icon: CheerIcon,
  },
  {
    id: "search",
    label: "검색",
    path: "/stores",
    icon: SearchIcon,
  },
  {
    id: "mypage",
    label: "마이",
    path: "/member/profile",
    icon: PersonIcon,
  },
];
