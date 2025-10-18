import { buildContext } from "react-simplikit";

export const [PopupProvider, usePopup] = buildContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>("Popup");
