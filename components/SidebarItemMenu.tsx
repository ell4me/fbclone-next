import * as React from "react";

type Props = {
    Icon: (props: React.ComponentProps<'svg'>) => JSX.Element
    title: string
    onClick?: () => void
}
export const SidebarItemMenu = ({Icon, title, onClick}: Props) => {
    return (
        <div onClick={onClick} className={'flex items-center cursor-pointer hover:bg-gray-200 p-2 px-3 rounded-2xl transition duration-150 ease-in'}>
            <Icon width={25} height={25} className={'text-blue-600'}/>
            <span className={'ml-2 hidden md:block text-sm font-medium'}>{title}</span>
        </div>
    )
}