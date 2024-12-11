import { IconType } from 'react-icons';

interface IBtnIconProps {
  icon: IconType;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
}

export function BtnIcon({ icon: Icon, className = '', iconClassName = '', onClick }: IBtnIconProps) {
  return (
    <button className={'flex-none rounded-md p-1 transition-all hover:bg-gray-400/20 ' + className} onClick={onClick}>
      <Icon className={'text-gray-600 ' + iconClassName} size={24} />
    </button>
  );
}
