export type Location = {
  /**
   * 지역 고유 값
   * @example "GANGNAM"
   */
  value: string;
  /**
   * 지역 이름
   * @example "강남/역삼/선릉"
   */
  label: string;
  /**
   * 해당 지역에 속하는 구 목록
   * @example ["강남구", "성동구", "광진구"]
   */
  districts: string[];
};
