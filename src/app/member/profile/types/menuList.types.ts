type LinkMenu = {
  type: "link";
  id: string;
  label: string;
  link: string;
};

type ActionMenu = {
  type: "action";
  id: string;
  label: string;
};

export type MenuListItem = LinkMenu | ActionMenu;
