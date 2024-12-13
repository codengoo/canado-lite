import { autoPlacement, offset, shift, useFloating } from '@floating-ui/react-dom';
import { useRef, useState } from 'react';
import { TbArchiveFilled } from 'react-icons/tb';

export default function FolderSelector() {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, update } = useFloating({
    middleware: [offset(8), shift(), autoPlacement()],
  });

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
    update();
  };

  return (
    <>
      <button
        className="flex h-[26px] items-center gap-2 rounded-md bg-white p-1 pr-2"
        ref={refs.setReference}
        onClick={togglePopup}
      >
        <TbArchiveFilled className="text-gray-600" size={18} />
        <h1 className="text-xs font-semibold">Default</h1>
      </button>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p>I am a popup! I am a popup! I am a popup! I am a popup! I am a popup!</p>
          <p>I am a popup! I am a popup! I am a popup! I am a popup! I am a popup!</p>
          <p>I am a popup! I am a popup! I am a popup! I am a popup! I am a popup!</p>
          <p>I am a popup! I am a popup! I am a popup! I am a popup! I am a popup!</p>
          <p>I am a popup! I am a popup! I am a popup! I am a popup! I am a popup!</p>
          <p>I am a popup! I am a popup! I am a popup! I am a popup! I am a popup!</p>
          <p>I am a popup! I am a popup! I am a popup! I am a popup! I am a popup!</p>
          <p>I am a popup! I am a popup! I am a popup! I am a popup! I am a popup!</p>
          <p>I am a popup! I am a popup! I am a popup! I am a popup! I am a popup!</p>
          <p>I am a popup! I am a popup! I am a popup! I am a popup! I am a popup!</p>
          <p>I am a popup! I am a popup! I am a popup! I am a popup! I am a popup!</p>
        </div>
      )}
    </>
  );
}
