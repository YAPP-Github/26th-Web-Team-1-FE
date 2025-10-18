import { type ElementType } from "react";

import { coerceCssRemValue } from "@/shared/lib/utils/style";
import { type PolymorphicComponentPropsWithRef } from "@/types/polymorphic.types";

export type SpacerProps<T extends ElementType> =
  PolymorphicComponentPropsWithRef<
    T,
    {
      size?: number | string;
      direction?: "vertical" | "horizontal";
    }
  >;

/**
 * 여백을 추가하는 컴포넌트
 * @example
 * ```tsx
 * import { Spacer } from "@/components/ui/Spacer";
 *
 * <Stack>
 *  <Text>Hello</Text>
 *  <Spacer size={10} />
 *  <Text>World</Text>
 * </Stack>
 * ```
 */
export const Spacer = <T extends ElementType = "span">({
  as,
  size = 0,
  direction = "vertical",
  style,
  ref,
  ...rest
}: SpacerProps<T>) => {
  const Component = as || "span";

  return (
    <Component
      ref={ref}
      aria-hidden='true'
      {...rest}
      style={{
        ...style,
        display: "block",
        height: direction === "vertical" ? coerceCssRemValue(size) : undefined,
        width: direction === "horizontal" ? coerceCssRemValue(size) : undefined,
      }}
    />
  );
};
