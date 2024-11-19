import { Facebook, Instagram, Twitter } from "lucide-react";
import { TopbarItem } from "./types";

export const SocialsLinks: TopbarItem[] = [
  {
    title: "Facebook",
    path: "/",
    icon: <Facebook size={22} />,
  },

  {
    title: "Instagram",
    path: "/",
    icon: <Instagram size={22} />,
  },

  {
    title: "Twitter",
    path: "/",
    icon: <Twitter size={22} />,
  },
];
