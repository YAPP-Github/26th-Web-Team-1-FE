import * as RadixTabs from "@radix-ui/react-tabs";
import { type ComponentRef, forwardRef } from "react";

import { Text } from "../Text";
import { TabsProvider, useTabs } from "./context";
import * as styles from "./Tabs.css";

type TabsRootProps = {
  triggerLayout?: "content" | "equal";
} & RadixTabs.TabsProps;

const TabsRoot = forwardRef<ComponentRef<typeof RadixTabs.Root>, TabsRootProps>(
  ({ triggerLayout = "content", ...props }, ref) => {
    return (
      <TabsProvider triggerLayout={triggerLayout}>
        <RadixTabs.Root {...props} ref={ref} />
      </TabsProvider>
    );
  }
);
TabsRoot.displayName = "TabsRoot";

const TabsList = forwardRef<
  ComponentRef<typeof RadixTabs.List>,
  RadixTabs.TabsListProps
>((props, ref) => {
  const { triggerLayout } = useTabs();

  return (
    <RadixTabs.List
      {...props}
      ref={ref}
      className={styles.tabsList({ layout: triggerLayout })}
    />
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = forwardRef<
  ComponentRef<typeof RadixTabs.Trigger>,
  RadixTabs.TabsTriggerProps
>((props, ref) => {
  const { triggerLayout } = useTabs();

  return (
    <RadixTabs.Trigger
      {...props}
      asChild
      ref={ref}
      className={styles.tabsTrigger({ layout: triggerLayout })}
    >
      <Text as='button' typo='body1Sb'>
        {props.children}
      </Text>
    </RadixTabs.Trigger>
  );
});

TabsTrigger.displayName = "TabsTrigger";

const TabsContent = RadixTabs.Content;

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
