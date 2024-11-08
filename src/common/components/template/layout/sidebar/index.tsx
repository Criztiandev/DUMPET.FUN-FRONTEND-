import { PropsWithChildren, ReactNode, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup as SchadCnSidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem as ScadCbSidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuBadge,
} from "@/common/components/atoms/ui/sidebar";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/common/components/atoms/ui/collapsible";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { cn } from "@/common/lib/utils";

interface Props extends PropsWithChildren {}
const SideBar = ({ children }: Props) => {
  return (
    <Sidebar>
      <SidebarContent>{children}</SidebarContent>
    </Sidebar>
  );
};

interface SidebarItemProps {
  title: string;
  dir?: "left" | "right";
  href: string;
  icon: ReactNode;
  badge?: string;
  isActive?: boolean;
}

export const SidebarMenuItem = ({
  title,
  dir = "left",
  icon,
  href,
  badge,
  isActive,
}: SidebarItemProps) => {
  return (
    <ScadCbSidebarMenuItem>
      <SidebarMenuButton
        asChild
        variant="default"
        size="default"
        className={cn(`${isActive && "bg-primary text-primary-foreground"}`)}
      >
        <div className="flex cursor-pointer">
          {dir === "left" && icon}
          <Link to={href}>{title}</Link>
          {dir === "right" && icon}
        </div>
      </SidebarMenuButton>
      {badge && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
    </ScadCbSidebarMenuItem>
  );
};

interface SidebarCollapsableMenuItemProps extends PropsWithChildren {
  title: string;
  icon?: ReactNode;
  dir?: "left" | "right";
}

export const SidebarCollapsableMenuItem = ({
  title,
  icon,
  dir = "left",
  children,
}: SidebarCollapsableMenuItemProps) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <SidebarMenu>
      <Collapsible className="group/collapsible">
        <ScadCbSidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              asChild
              isActive={toggleMenu}
              onClick={() => setToggleMenu((prev) => !prev)}
            >
              <div className="flex justify-between items-center cursor-pointer">
                <div className="flex space-x-2">
                  {dir === "left" && icon}
                  <div>{title}</div>
                  {dir === "right" && icon}
                </div>

                {toggleMenu ? <ChevronUp /> : <ChevronDown />}
              </div>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>{children}</SidebarMenuSub>
          </CollapsibleContent>
        </ScadCbSidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
};

export const SidebarSubMenuItem = () => {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <div className="flex">
          <User />
          <div className="flex">Title</div>
        </div>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};

/**
 * Groups
 */

interface SidebarGroupProps extends PropsWithChildren {
  label: string;
}

export const SidebarGroup = ({ children, label }: SidebarGroupProps) => {
  return (
    <SchadCnSidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>{children}</SidebarGroupContent>
    </SchadCnSidebarGroup>
  );
};

export const SidebarCollapsableGroup = ({
  children,
  label,
}: SidebarGroupProps) => {
  return (
    <Collapsible>
      <SchadCnSidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            <span>{label}</span>
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>{children}</SidebarGroupContent>
        </CollapsibleContent>
      </SchadCnSidebarGroup>
    </Collapsible>
  );
};

export default SideBar;
