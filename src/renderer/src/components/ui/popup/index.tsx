import {
  autoPlacement,
  autoUpdate,
  FloatingFocusManager,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { ReactNode, useState } from 'react';

interface IPopupProps {
  children: ReactNode[];
  triggerComponent: ReactNode;
  placement?: Placement;
}

export function Popup({ children, triggerComponent, placement }: IPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    middleware: [offset(8), shift(), !placement ? autoPlacement() : undefined],
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        {triggerComponent}
      </button>

      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="flex flex-col gap-1 rounded-md border border-gray-300 bg-white p-1"
          >
            {children}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
