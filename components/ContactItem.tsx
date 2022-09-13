import Image from "next/image";

type Props = {
    item: {src: string, name: string}
}
export const ContactItem = ({item}: Props) => {
  return (
      <div className={'flex items-center'}>
          <div className={'relative'}>
              <Image className={'rounded-full'} src={item.src} width={40} height={40} layout={'fixed'} objectFit={'cover'}/>
              <div className={'absolute bottom-2 right-1 w-2 h-2 rounded-full bg-green-500'}/>
          </div>
          <div className={'text-sm font-medium pl-3'}>{item.name}</div>
      </div>
  )
}