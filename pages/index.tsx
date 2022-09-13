import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import {Header} from "../components/Header";
import {getSession} from "next-auth/react";
import {Session} from "next-auth";
import {Sidebar} from "../components/Sidebar";
import {Feed} from "../components/Feed";
import {Contacts} from "../components/Contacts";
import {collection, getDocs, orderBy, query} from "@firebase/firestore";
import {db} from "../firebase";
import {Post} from "../types";

type Props = {
    session: Session
    posts: string
}
const Home: NextPage<Props> = ({session, posts}) => {
    return (
        <div className={'bg-gray-100 h-screen overflow-hidden'}>
            <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <div className={'flex pt-5'}>
                <Sidebar />
                <Feed posts={JSON.parse(posts)}/>
                <Contacts />
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx)
    if(!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }
    const postsRef = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
    const snapshots = await getDocs(postsRef)
    let posts = [] as Post[]


    if(!snapshots.empty) {
        snapshots.forEach(doc => {
            posts.push({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : ''
            } as Post)
        })
    }

    return {
        props: {session, posts: JSON.stringify(posts)}
    }
}

export default Home

