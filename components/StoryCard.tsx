import Image from "next/image";

type Props = {
    item: {
        name: string
        src: string
        profile: string
    }
}
export const StoryCard = ({item}: Props) => {
  return (
      <div className={'relative cursor-pointer bg-transparent w-14 h-14 md:w-32 md:h-56 p-2 overflow-hidden rounded-full md:rounded-xl group'}>
          <Image src={item.profile}
                 className={'opacity-0 md:opacity-100 rounded-full absolute top-10 left-10 z-40 object-cover'}
                 width={40}
                 height={40}
                 layout={'fixed'}
          />
          <Image src={item.src}
                 className={'object-cover filter transition duration-200 transform ease-in brightness-50 group-hover:scale-105 group-hover:animate-pulse'}
                 layout={'fill'}
          />
          <div className={'hidden md:block text-white text-xs font-medium z-40 absolute bottom-2'}>
              {item.name}
          </div>
      </div>
  )
}