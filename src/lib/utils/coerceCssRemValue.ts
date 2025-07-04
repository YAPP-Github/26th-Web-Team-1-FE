export type CSSPixelValue = string | number;

/**
 * css 값의 단위를 rem으로 변환합니다.
 * @example
 * coerceCssRemValue(10) // "10rem"
 * coerceCssRemValue("10rem") // "10rem"
 * coerceCssRemValue("10%") // "10%"
 */
export function coerceCssRemValue(value: CSSPixelValue): string {
  return typeof value === "string" ? value : `${value}rem`;
}
