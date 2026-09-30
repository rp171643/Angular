export interface NavBadge {
  text: string;
  class: string;
}

export interface NavItem {
  title: string;
  icon?: string;
  route?: string;
  badge?: NavBadge;
  children?: NavItem[];
  isHeader?: boolean;
  isOpen?: boolean;
}
