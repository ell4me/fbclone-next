import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import {Header} from "../components/Header";
import {getSession} from "next-auth/react";
import {Session} from "next-auth";
import {Sidebar} from "../components/Sidebar";
import {Feed} from "../components/Feed";

type Props = {
    session: Session
}
const Home: NextPage<Props> = ({session}) => {
    return (
        <div className={'bg-gray-100 h-screen overflow-hidden'}>
            <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <div className={'flex pt-5'}>
                <Sidebar />
                <Feed />
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
    return {
        props: {session}
    }
}

export default Home

