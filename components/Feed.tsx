import {useRecoilValue} from "recoil";
import {storyCards} from "../atom";
import {FormEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {StoryCard} from "./StoryCard";
import {useSession} from "next-auth/react";
import Image from 'next/image'
import {SidebarItemMenu} from "./SidebarItemMenu";
import {FaceSmileIcon, PhotoIcon, VideoCameraIcon} from "@heroicons/react/24/solid";
import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import {db, storage} from "../firebase";
import {addDoc, collection, doc, orderBy, query, serverTimestamp, updateDoc} from "@firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {Post} from "../types";
import {PostItem} from "./PostItem";
import {toast, ToastContainer} from "react-toastify";

export const Feed = ({posts}: {posts: Post[]}) => {
    const cards = useRecoilValue(storyCards)
    const [text, setText] = useState('')
    const refFile = useRef<HTMLInputElement>(null)
    const {data} = useSession()
    const [image, setImage] = useState('')
    const [postsCount, setPostsCount] = useState(posts ? posts.length : 0)
    const [realtimePosts, loading, error] = useCollection(query(collection(db, 'posts'), orderBy('timestamp', 'desc')));

    const cardItems = useMemo(() => {
        return cards.map(item => {
            return <StoryCard key={item.name} item={item}/>
        })
    }, [cards])

    const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (text) {
            setImage('')
            setText('')
            try {
                const docRef = await addDoc(collection(db, 'posts'), {
                    avatar: data?.user?.image,
                    name: data?.user?.name,
                    text,
                    timestamp: serverTimestamp()
                })
                if (image) {
                    const snapshot = await uploadString(ref(storage, `posts/${docRef.id}`), image, 'data_url')
                    const url = await getDownloadURL(ref(storage, snapshot.ref.fullPath))
                    await updateDoc(doc(db, 'posts', docRef.id), {
                        image: url
                    })
                }
            } catch (e) {
                console.error(e)
            }
        }
    }, [text, image, data])

    useEffect(() => {
        if(realtimePosts && postsCount < realtimePosts.docs.length) {
            setPostsCount(c => c + 1)
            toast("New Post added!");
        }
    }, [postsCount, realtimePosts])

    const postItems = useMemo(() => {
        if(realtimePosts) {
            return realtimePosts?.docs.map((item) => {
                const post = {
                    id: item.id,
                    ...item.data(),
                    timestamp: item.data().timestamp ? item.data().timestamp.toDate() : ''
                } as Post
                return <PostItem key={post.id} post={post}/>
            })
        } else if(posts) {
            return posts.map(post => <PostItem key={post.id} post={post}/>)
        }
    }, [realtimePosts, posts, postsCount, setPostsCount])

    return (
        <main className={'flex-grow pb-44 overflow-y-auto h-screen overflow-x-hidden mx-auto max-w-md md:max-w-2xl scrollbar-hide'}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={'space-x-4 mb-4 flex mr-4 justify-center'}>
                {cardItems}
            </div>
            <div className={'rounded-2xl bg-white p-4 flex flex-col shadow-md  mr-4'}>
                <div className={'pb-4 border-b border-gray-300 mb-4 flex items-center justify-center'}>
                    <Image src={data?.user?.image as string} width={30} height={30} className={'rounded-full'}/>
                    <form onSubmit={onSubmit} className={'flex-grow'}>
                        <input type="text"
                               value={text}
                               onChange={({currentTarget}) => setText(currentTarget.value)}
                               className={'ml-3 bg-gray-200 w-[98%] rounded-3xl p-2 text-black outline-none pl-5 text-sm'}
                               placeholder={"What's on ur mind?"}
                        />
                        <button type={'submit'} hidden/>
                    </form>
                    {image &&
                        <div onClick={() => setImage('')}
                             className={'ml-4 cursor-pointer text-center hover:opacity-60 transition duration-150 ease-in'}
                        >
                            <img src={image} alt="#" className={'w-16 h-10'}/>
                            <span className={'text-xs text-red-500'}>Remove</span>
                        </div>
                    }
                </div>
                <div className={'flex space-x-5 lg:space-x-20 items-center justify-center'}>
                    <SidebarItemMenu Icon={(props) => <VideoCameraIcon {...props} className={'text-red-500'}/>}
                                     title={'Live/Video'}/>
                    <SidebarItemMenu Icon={(props) => {
                        return <PhotoIcon {...props} className={'text-green-500'}/>
                    }} title={'Photo/Video'} onClick={() => refFile?.current?.click()}/>
                    <SidebarItemMenu Icon={(props) => <FaceSmileIcon {...props} className={'text-yellow-400'}/>}
                                     title={'Feeling/Activity'}/>
                </div>
                <input ref={refFile} type="file" hidden onChange={(e) => {
                    const files = e?.currentTarget?.files
                    if (files && !!files.length) {
                        const fileReader = new FileReader()
                        fileReader.readAsDataURL(files[0])
                        fileReader.onload = (e) => {
                            setImage(e.target?.result as string)
                        }
                    }
                }}/>
            </div>
            <div className={'mr-4 space-y-5 pt-4'}>
                {postItems}
            </div>
        </main>
    )
}