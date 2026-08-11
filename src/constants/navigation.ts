import { FilePlus2, Inbox, type LucideIcon } from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Ana səhifə" },
  { href: "/services", label: "Xidmətlər" },
  { href: "/how-it-works", label: "Necə işləyir" },
  { href: "/about", label: "Haqqımızda" },
];

export interface PortalNavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const PORTAL_NAV_LINKS: PortalNavLink[] = [
  { href: "/dashboard", label: "Müraciətlərim", icon: Inbox },
  { href: "/tickets/new", label: "Yeni Müraciət", icon: FilePlus2 },
];
