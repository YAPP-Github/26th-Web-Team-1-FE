import { assignInlineVars } from "@vanilla-extract/dynamic";
import { type ElementType } from "react";

import { coerceCssRemValue } from "@/shared/lib/utils/style";
import { type PolymorphicComponentPropsWithRef } from "@/types/polymorphic.types";

import * as styles from "./Stack.css";

export type StackProps<T extends ElementType> =
  PolymorphicComponentPropsWithRef<
    T,
    styles.StackVariants & {
      gap?: number | string;
    }
  >;

/**
 * 스택 컴포넌트
 * @description 스택 컴포넌트는 여러 자식 요소를 배치, 레이아웃에 사용됩니다.
 * @example
 * ```tsx
 * <Stack direction='row' justify='start' align='start' wrap='nowrap' gap={10}>
 *  <span>Hello</span>
 *  <span>World</span>
 * </Stack>
 * ```
 */
export const Stack = <T extends ElementType = "div">({
  as,
  className,
  direction,
  justify,
  align,
  wrap,
  gap = 0,
  style: styleFromProps,
  ref,
  ...rest
}: StackProps<T>) => {
  const Component = as || "div";

  const style = {
    ...styleFromProps,
    ...assignInlineVars({
      [styles.stackGapVar]: coerceCssRemValue(gap),
    }),
  };

  return (
    <Component
      ref={ref}
      className={`${styles.container({
        direction,
        justify,
        align,
        wrap,
      })} ${className ?? ""}`.trim()}
      style={style}
      {...rest}
    />
  );
};

/**
 * 수평 스택 컴포넌트
 * @description 수평 스택 컴포넌트는 여러 자식 요소를 수평으로 배치, 레이아웃에 사용됩니다.
 *
 * @example
 * ```tsx
 * <HStack justify='start' align='start' wrap='nowrap' gap={10}>
 *  <span>Hello</span>
 *  <span>World</span>
 * </HStack>
 * ```
 */
export const HStack = <T extends ElementType = "div">({
  ...props
}: StackProps<T>) => {
  return <Stack direction='row' {...props} />;
};

/**
 * 수직 스택 컴포넌트
 * @description 수직 스택 컴포넌트는 여러 자식 요소를 수직으로 배치, 레이아웃에 사용됩니다.
 *
 * @example
 * ```tsx
 * <VStack justify='start' align='start' wrap='nowrap' gap={10}>
 *  <span>Hello</span>
 *  <span>World</span>
 * </VStack>
 * ```
 */
export const VStack = <T extends ElementType = "div">({
  ...props
}: StackProps<T>) => {
  return <Stack direction='column' {...props} />;
};
