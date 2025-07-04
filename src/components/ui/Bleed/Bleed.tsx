import { type CSSProperties, type ElementType } from "react";

import { coerceCssRemValue } from "@/lib/utils/coerceCssRemValue";
import { type PolymorphicComponentPropsWithRef } from "@/types/polymorphic";

import {
  bleedBlockEndVar,
  bleedBlockStartVar,
  bleedInlineEndVar,
  bleedInlineStartVar,
  bleedStyles,
} from "./Bleed.css";

export type BleedProps<T extends ElementType> =
  PolymorphicComponentPropsWithRef<
    T,
    {
      inline?: number | string;
      block?: number | string;
      inlineStart?: number | string;
      inlineEnd?: number | string;
      blockStart?: number | string;
      blockEnd?: number | string;
    }
  >;

export const Bleed = <T extends ElementType = "div">({
  as,
  className,
  inline,
  block,
  inlineStart,
  inlineEnd,
  blockStart,
  blockEnd,
  style: styleFromProps,
  ...props
}: BleedProps<T>) => {
  const Component = as || "div";

  const style = {
    ...(inline
      ? {
          [bleedInlineStartVar]: coerceCssRemValue(inline),
          [bleedInlineEndVar]: coerceCssRemValue(inline),
        }
      : {}),
    ...(block
      ? {
          [bleedBlockStartVar]: coerceCssRemValue(block),
          [bleedBlockEndVar]: coerceCssRemValue(block),
        }
      : {}),
    ...(inlineStart
      ? {
          [bleedInlineStartVar]: coerceCssRemValue(inlineStart),
        }
      : {}),
    ...(inlineEnd ? { [bleedInlineEndVar]: coerceCssRemValue(inlineEnd) } : {}),
    ...(blockStart
      ? { [bleedBlockStartVar]: coerceCssRemValue(blockStart) }
      : {}),
    ...(blockEnd ? { [bleedBlockEndVar]: coerceCssRemValue(blockEnd) } : {}),
    ...styleFromProps,
  } as CSSProperties;

  return (
    <Component
      className={`${bleedStyles} ${className ?? ""}`.trim()}
      style={style}
      {...props}
    />
  );
};
