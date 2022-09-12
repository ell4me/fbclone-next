import * as React from "react";

type Props = {
    Icon: (props: React.ComponentProps<'svg'>) => JSX.Element,
    active?: boolean
}
export const HeaderMenuIcon = ({Icon, active}: Props) => {
    return (
        <div className={`p-2 hover:bg-gray-100 px-2 sm:px-4 lg:px-7 rounded-xl text-gray-500 ${active && 'text-blue-600'} hover:border-b-2 
        hover:border-b-blue-600 transition-all duration-150 ease-in cursor-pointer`}>
            <Icon className={'h-4 w-4 lg:h-5 lg:w-5'}/>
        </div>
    )
}