import { assignInlineVars } from "@vanilla-extract/dynamic";
import { type ElementType } from "react";

import { coerceCssRemValue } from "@/shared/lib/utils/style";
import { type PolymorphicComponentPropsWithRef } from "@/types/polymorphic.types";

import * as styles from "./Bleed.css";

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
    ...styleFromProps,
    ...assignInlineVars({
      ...(inline && {
        [styles.bleedInlineStartVar]: coerceCssRemValue(inline),
        [styles.bleedInlineEndVar]: coerceCssRemValue(inline),
      }),
      ...(block && {
        [styles.bleedBlockStartVar]: coerceCssRemValue(block),
        [styles.bleedBlockEndVar]: coerceCssRemValue(block),
      }),
      ...(inlineStart && {
        [styles.bleedInlineStartVar]: coerceCssRemValue(inlineStart),
      }),
      ...(inlineEnd && {
        [styles.bleedInlineEndVar]: coerceCssRemValue(inlineEnd),
      }),
      ...(blockStart && {
        [styles.bleedBlockStartVar]: coerceCssRemValue(blockStart),
      }),
      ...(blockEnd && {
        [styles.bleedBlockEndVar]: coerceCssRemValue(blockEnd),
      }),
    }),
  };

  return (
    <Component
      className={`${styles.container} ${className ?? ""}`.trim()}
      style={style}
      {...props}
    />
  );
};
