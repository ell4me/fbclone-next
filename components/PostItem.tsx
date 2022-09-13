import {Post} from "../types";
import Image from 'next/image'
import Moment from "react-moment";

type Props = {
    post: Post
}
export const PostItem = ({post}: Props) => {
    return (
        <div className={'rounded-2xl bg-white shadow-md'}>
            <div className={'flex items-center pb-3 p-4'}>
                <Image className={'rounded-full'} src={post.avatar} width={40} height={40} layout={'fixed'}/>
                <div className={'ml-3 flex flex-col'}>
                    <span className={'text-sm font-bold'}>{post.name}</span>
                    <Moment className={'text-sm text-gray-500'} date={post.timestamp} format={'DD/MM/YYYY, hh:mm'} />
                </div>
            </div>
            <span className={'p-4 block'}>{post.text}</span>
            {post.image &&
                <div className={'relative h-56 md:h-96'}>
                    <Image src={post.image} layout={'fill'} objectFit={'contain'} className={'rounded-b-2xl'}/>
                </div>
            }
        </div>
    )
}