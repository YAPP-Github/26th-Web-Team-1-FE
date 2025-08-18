import { type Tag } from "@/types/tag.types";

export const ATMOSPHERE_TAGS: Tag[] = [
  {
    iconUrl: "/images/tags/OLD_STORE_MOOD.png",
    name: "OLD_STORE_MOOD",
    label: "노포 감성",
  },
  {
    iconUrl: "/images/tags/ENERGETIC.png",
    name: "ENERGETIC",
    label: "활기찬",
  },
  {
    iconUrl: "/images/tags/INSTAGRAMMABLE.png",
    name: "INSTAGRAMMABLE",
    label: "인스타 감성",
  },
  {
    iconUrl: "/images/tags/QUIET.png",
    name: "QUIET",
    label: "조용한",
  },
  {
    iconUrl: "/images/tags/GOOD_FOR_DRINKING.png",
    name: "GOOD_FOR_DRINKING",
    label: "술 땡기는",
  },
  {
    iconUrl: "/images/tags/GOOD_FOR_DATING.png",
    name: "GOOD_FOR_DATING",
    label: "데이트하기 좋은",
  },
  {
    iconUrl: "/images/tags/GOOD_FOR_FAMILY.png",
    name: "GOOD_FOR_FAMILY",
    label: "부모님과 가기 좋은",
  },
  {
    iconUrl: "/images/tags/YOUTUBE_FAMOUS.png",
    name: "YOUTUBE_FAMOUS",
    label: "유튜버 맛집",
  },
];

export const UTILITY_TAGS: Tag[] = [
  {
    iconUrl: "/images/tags/GROUP_RESERVATION.png",
    name: "GROUP_RESERVATION",
    label: "단체 예약",
  },
  {
    iconUrl: "/images/tags/LARGE_PARKING.png",
    name: "LARGE_PARKING",
    label: "넓은 주차장",
  },
  {
    iconUrl: "/images/tags/CLEAN_RESTROOM.png",
    name: "CLEAN_RESTROOM",
    label: "깔끔한 화장실",
  },
  {
    iconUrl: "/images/tags/PET_FRIENDLY.png",
    name: "PET_FRIENDLY",
    label: "반려동물 동반 가능",
  },
  {
    iconUrl: "/images/tags/LATE_NIGHT.png",
    name: "LATE_NIGHT",
    label: "늦게까지 영업",
  },
  {
    iconUrl: "/images/tags/NEAR_SUBWAY.png",
    name: "NEAR_SUBWAY",
    label: "지하철과 가까운",
  },
  {
    iconUrl: "/images/tags/MANY_NEARBY_ATTRACTIONS.png",
    name: "MANY_NEARBY_ATTRACTIONS",
    label: "주변에 놀거리가 많은",
  },
];

export const ALL_TAGS = [...ATMOSPHERE_TAGS, ...UTILITY_TAGS];
