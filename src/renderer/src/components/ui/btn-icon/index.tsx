import { IconType } from 'react-icons'

interface IBtnIconProps {
  icon: IconType
  className?: string
  iconClassName?: string
}

export function BtnIcon({ icon: Icon, className = '', iconClassName = '' }: IBtnIconProps) {
  return (
    <button className={'p-1 rounded-md hover:bg-gray-400/20 transition-all flex-none ' + className}>
      <Icon className={'text-gray-600 ' + iconClassName} size={24} />
    </button>
  )
}
