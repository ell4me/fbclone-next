import {GetServerSideProps, NextPage} from "next";
import Image from "next/image";
import Head from "next/head";
import {getProviders, getSession, signIn} from "next-auth/react";
import {Provider} from "next-auth/providers";
import {useMemo} from "react";

type Props = {
    providers: Provider[]
}
const Login: NextPage<Props> = ({providers}) => {

    const providerItems = useMemo(() => {
        return Object.values(providers).map((provider) => (
                <div key={provider.id} onClick={() => signIn(provider.id)}
                     className={'text-white bg-blue-600 hover:opacity-60 ' +
                         'transition-all duration-150 ease-in p-2 rounded-3xl cursor-pointer mt-5 w-[200px] text-center'}
                >
                    Sign in with {provider.name}
                </div>
            ))
    }, [providers])

    return (
        <div className={'w-[100%] h-[100%] flex flex-col items-center pt-20'}>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Image src={'https://links.papareact.com/5me'} width={250} height={250} layout={'fixed'}/>
            {providerItems}
        </div>
    )
}

export default Login


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx)
    const providers = await getProviders()

    if(session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {props: {providers}}
}