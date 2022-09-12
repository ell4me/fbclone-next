import {SidebarItemMenu} from "./SidebarItemMenu";
import {
    ShoppingBagIcon,
    UserGroupIcon,
    UsersIcon,
    ComputerDesktopIcon,
    CalendarDaysIcon, ClockIcon, ChevronDownIcon
} from "@heroicons/react/24/solid";

export const Sidebar = () => {
    return (
        <aside className={'flex flex-col space-y-4 md:space-y-6 p-3'}>
            <SidebarItemMenu Icon={UsersIcon} title={'Friends'}/>
            <SidebarItemMenu Icon={UserGroupIcon} title={'Groups'}/>
            <SidebarItemMenu Icon={ShoppingBagIcon} title={'Marketplace'}/>
            <SidebarItemMenu Icon={ComputerDesktopIcon} title={'Watch'}/>
            <SidebarItemMenu Icon={CalendarDaysIcon} title={'Events'}/>
            <SidebarItemMenu Icon={ClockIcon} title={'Memories'}/>
            <SidebarItemMenu Icon={ChevronDownIcon} title={'See More'}/>
        </aside>
    )
}