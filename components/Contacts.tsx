import {CameraIcon, EllipsisHorizontalIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {useMemo} from "react";
import {useRecoilValue} from "recoil";
import {contacts} from "../atom";
import {ContactItem} from "./ContactItem";

export const Contacts = () => {
  const contact = useRecoilValue(contacts)

  const contactItems = useMemo(() => {
      return contact.map(item => <ContactItem key={item.name} item={item}/>)
  }, [contact])

  return (
      <div className={'w-[300px] pr-4 hidden md:block'}>
          <div className={'flex justify-between pb-6'}>
              <span className={'text-gray-400'}>Contacts</span>
              <div className={'space-x-4 text-gray-400 flex'}>
                <CameraIcon width={20} height={20} className={'text-gray-400'}/>
                <MagnifyingGlassIcon width={20} height={20} className={'text-gray-400'}/>
                <EllipsisHorizontalIcon width={20} height={20} className={'text-gray-400'}/>
              </div>
          </div>
          <div className={'pr-2 space-y-6'}>
              {contactItems}
          </div>
      </div>
  )
}