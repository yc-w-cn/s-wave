import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { NavItem } from "./nav-item";
import { List, ThumbsUpIcon } from "lucide-react";

export function NavBar() {
  return (
    <div className="flex flex-col flex-shrink-0 flex-grow-0 gap-4 text-sm mx-10 my-8 w-[100px]">
      <NavItem icon={<ThumbsUpIcon strokeWidth={2} size={16} />} link="/">
        热门推荐
      </NavItem>
      <NavItem icon={<List strokeWidth={2} size={16} />} link="/subscriptions">
        我的订阅
      </NavItem>
      <NavItem icon={<GitHubLogoIcon strokeWidth={2} />} link="/about">
        关于项目
      </NavItem>
    </div>
  );
}
