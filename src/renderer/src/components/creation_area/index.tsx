import { KeyboardEvent, useEffect, useRef } from 'react';
import { TbGrain, TbSend2 } from 'react-icons/tb';
import { BtnIcon } from '../ui';

export default function CreationArea() {
  const hideApp = () => window.api.hideWindows();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyUp = (ev: KeyboardEvent<HTMLInputElement>) => {
    ev.stopPropagation();

    if (ev.key == 'Escape') {
      // @ts-ignore
      ev.target.value = '';
      // @ts-ignore
      ev.target.blur();
      hideApp();
    }
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <div className="flex flex-none gap-2 rounded-xl bg-white shadow-lg">
      <BtnIcon icon={TbGrain} className="draggable pl-4" />

      <div className="flex flex-grow gap-2 p-4 pl-0">
        <input
          ref={inputRef}
          placeholder="Insert task"
          className="no-draggable flex-grow bg-transparent font-semibold outline-none placeholder:font-normal placeholder:text-gray-500"
          onKeyUp={handleKeyUp}
        />
        <BtnIcon icon={TbSend2} />
      </div>
    </div>
  );
}
