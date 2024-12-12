import { useAppDispatch } from '@/hooks';
import { createNote } from '@/store/features/note';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { TbGrain, TbSend2 } from 'react-icons/tb';
import { BtnIcon } from '@/components/ui';

export default function CreationArea() {
  const hideApp = () => window.api.hideWindows();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [isDisableSendbtn, setDisableSendBtn] = useState<boolean>(true);

  const handleKeyUp = (ev: KeyboardEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    if (ev.currentTarget.value.trim().length === 0) setDisableSendBtn(true);
    else if (ev.currentTarget.value.trim().length !== 0 && isDisableSendbtn) setDisableSendBtn(false);

    if (ev.key == 'Escape') {
      ev.currentTarget.value = '';
      ev.currentTarget.blur();
      hideApp();
    } else if (ev.key === 'Enter') {
      const value = ev.currentTarget.value;
      if (value.trim().length === 0) return;

      ev.currentTarget.value = '';

      dispatch(
        createNote({
          title: value,
          content: value,
        }),
      );
    }
  };

  useEffect(() => {
    inputRef?.current?.focus();
    window.api.onShowWindow(() => inputRef?.current?.focus());
  }, []);

  return (
    <div className="flex flex-none gap-2 rounded-xl bg-white shadow-lg">
      <BtnIcon icon={TbGrain} className="draggable pl-4" />

      <div className="flex flex-grow gap-2 p-4 pl-0">
        <input
          ref={inputRef}
          id="input_note_title"
          placeholder="Insert task"
          className="no-draggable flex-grow bg-transparent font-semibold outline-none placeholder:font-normal placeholder:text-gray-500"
          onKeyUp={handleKeyUp}
        />
        <BtnIcon icon={TbSend2} disable={isDisableSendbtn} />
      </div>
    </div>
  );
}
