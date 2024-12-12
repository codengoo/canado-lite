import { IconType } from 'react-icons';

interface IBtnIconProps {
  icon: IconType;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
  disable?: boolean;
  size?: number;
  tooltip?: string;
  title?: string;
}

export function BtnIcon({
  icon: Icon,
  className = '',
  iconClassName = '',
  onClick,
  disable,
  size = 24,
  tooltip = '',
}: IBtnIconProps) {
  return (
    <button
      title={tooltip}
      disabled={disable}
      className={
        'flex-none cursor-pointer rounded-md p-1 transition-all hover:bg-gray-400/20 ' +
        (disable ? 'opacity-50' : 'opacity-100') +
        ' ' +
        className
      }
      onClick={onClick}
    >
      <Icon className={'text-gray-600 ' + iconClassName} size={size} />
    </button>
  );
}
