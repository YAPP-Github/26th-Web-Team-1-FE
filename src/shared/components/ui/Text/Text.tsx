import { assignInlineVars } from "@vanilla-extract/dynamic";
import { type ElementType } from "react";

import { colors, semantic, typography } from "@/shared/styles";
import { type PolymorphicComponentPropsWithRef } from "@/types/polymorphic.types";

import * as styles from "./Text.css";

type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: T[K] extends object
          ? `${K}.${DotNestedKeys<T[K]>}`
          : `${K}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;

type ColorToken = DotNestedKeys<typeof colors> | DotNestedKeys<typeof semantic>;

const resolveColor = (
  color: ColorToken | (string & {})
): string | undefined => {
  if (!color || typeof color !== "string") {
    return undefined;
  }

  if (color.startsWith("#") || color.startsWith("rgb")) {
    return color;
  }

  const colorValue = color
    .split(".")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .reduce((acc: any, key) => acc?.[key], { ...colors, ...semantic });

  if (typeof colorValue === "string") {
    return colorValue;
  }

  return undefined;
};

export type TextProps<T extends ElementType> = PolymorphicComponentPropsWithRef<
  T,
  {
    /**
     * 텍스트 타입
     * @default "body1"
     */
    typo?: keyof typeof typography;
    /**
     * 텍스트 색상
     * @default "neutral.10"
     */
    color?: ColorToken | (string & {});
  }
>;

/**
 * 텍스트 컴포넌트
 * @description 미리 정의된 typography 타입과 color 토큰을 사용할 수 있습니다.
 *
 * @example
 * ```tsx
 * <Text typo="body1" color="neutral.10">Hello</Text>
 * <Text typo="title1" color="neutral.20">Hello</Text>
 * <Text typo="title2" color="neutral.99">Hello</Text>
 * <Text typo="body2" color="text.primary">Hello</Text>
 * <Text typo="body2" color="text.neutral">Hello</Text>
 * <Text typo="label1" color="text.alternative">Hello</Text>
 * ```
 */
export const Text = <T extends ElementType = "p">({
  as,
  className,
  typo = "body1Sb",
  color = "neutral.10",
  style: styleFromProps,
  ref,
  ...rest
}: TextProps<T>) => {
  const Component = as || "p";

  const style = {
    ...styleFromProps,
    ...assignInlineVars({
      [styles.fontSizeVar]: typography[typo]?.fontSize,
      [styles.lineHeightVar]: typography[typo]?.lineHeight,
      [styles.letterSpacingVar]: typography[typo]?.letterSpacing,
      [styles.fontWeightVar]: typography[typo]?.fontWeight,
      [styles.colorVar]: color ? resolveColor(color) : undefined,
    }),
  };

  return (
    <Component
      className={`${styles.container} ${className ?? ""}`.trim()}
      style={style}
      ref={ref}
      {...rest}
    />
  );
};
