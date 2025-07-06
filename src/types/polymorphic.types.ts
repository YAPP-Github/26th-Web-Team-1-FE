/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ForwardedRef,
  type PropsWithChildren,
} from "react";

export type As<Props = any> = React.ElementType<Props>;

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export type Merge<M, N> =
  N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;

type AsProp<T extends ElementType> = {
  as?: T;
};

type PropsToOmit<T extends ElementType, P> = keyof (AsProp<T> & P);

export type PolymorphicComponentProps<
  T extends ElementType,
  Props = {},
> = PropsWithChildren<Props & AsProp<T>> &
  Omit<ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

export type PolymorphicRef<T extends ElementType> = ForwardedRef<
  ComponentPropsWithoutRef<T>["ref"]
>;

export type PolymorphicComponentPropsWithRef<
  T extends ElementType,
  Props = {},
> = PolymorphicComponentProps<T, Props> & { ref?: PolymorphicRef<T> };
