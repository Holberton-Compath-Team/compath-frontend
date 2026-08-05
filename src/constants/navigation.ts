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
