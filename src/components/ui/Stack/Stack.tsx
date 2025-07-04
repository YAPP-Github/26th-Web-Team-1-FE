import { type CSSProperties, type ElementType } from "react";

import { coerceCssRemValue } from "@/lib/utils/coerceCssRemValue";
import { type PolymorphicComponentPropsWithRef } from "@/types/polymorphic";

import { stackGapVar, stackStyles, type StackVariants } from "./Stack.css";

export type StackProps<T extends ElementType> =
  PolymorphicComponentPropsWithRef<
    T,
    StackVariants & {
      gap?: number | string;
      direction?: "row" | "column";
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
const Stack = <T extends ElementType = "div">({
  as,
  className,
  direction,
  justify,
  align,
  wrap,
  gap,
  style: styleFromProps,
  ref,
  ...rest
}: StackProps<T>) => {
  const Component = as || "div";

  const style = {
    [stackGapVar]: gap ? coerceCssRemValue(gap) : undefined,
    ...styleFromProps,
  } as CSSProperties;

  return (
    <Component
      ref={ref}
      className={`${stackStyles({
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
