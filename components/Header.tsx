import Image from 'next/image'
import {
    MagnifyingGlassIcon,
    HomeIcon,
    FlagIcon,
    PlayIcon,
    UserGroupIcon,
    ShoppingCartIcon,
    ChatBubbleOvalLeftIcon,
    BellIcon,
    ArrowLeftOnRectangleIcon,
    FireIcon
} from '@heroicons/react/20/solid'
import {HeaderMenuIcon} from "./HeaderMenuIcon";
import {signOut, useSession} from "next-auth/react";


export const Header = () => {
    const {data} = useSession()
    return (
        <header className={'bg-white p-3 shadow-md sticky top-0 flex justify-between h-14'}>
            <div className={'flex items-center space-x-3'}>
                <Image src={'https://links.papareact.com/5me'}
                       layout={'fixed'}
                       height={35}
                       width={35}
                />
                <div className={'hidden md:flex bg-gray-100 items-center rounded-2xl'}>
                    <MagnifyingGlassIcon width={18} height={18} className={'text-gray-500 ml-2'}/>
                    <input type="text" placeholder={'Search Facebook'}
                           className={'outline-none bg-transparent pl-2 text-sm p-1'}/>
                </div>
            </div>

            <div className={'flex items-center space-x-4'}>
                <HeaderMenuIcon active Icon={HomeIcon}/>
                <HeaderMenuIcon Icon={FlagIcon}/>
                <HeaderMenuIcon Icon={PlayIcon}/>
                <HeaderMenuIcon Icon={ShoppingCartIcon}/>
                <HeaderMenuIcon Icon={UserGroupIcon}/>
            </div>

            <div className={'flex items-center space-x-3'}>
                <Image className={'rounded-full'} src={data?.user?.image as string} width={30} height={30}
                       layout={'fixed'}/>
                <span className={'font-bold text-sm'}>{data?.user?.name}</span>
                <FireIcon className={'iconHeader'}/>
                <ChatBubbleOvalLeftIcon className={'iconHeader'}/>
                <BellIcon className={'iconHeader'}/>
                <ArrowLeftOnRectangleIcon onClick={() => signOut()} className={'iconHeader'}/>
            </div>
        </header>
    )
}