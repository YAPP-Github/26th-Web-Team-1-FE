import { buildContext } from "react-simplikit";

export const [TabsProvider, useTabs] = buildContext<{
  triggerLayout: "content" | "equal";
}>("Tabs");
