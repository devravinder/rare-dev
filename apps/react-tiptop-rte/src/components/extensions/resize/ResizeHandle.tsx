import { Maximize2 } from 'lucide-react';
import { useCallback } from 'react';

interface ResizeHandleProps {
  imageRef: React.RefObject<HTMLImageElement>;
  onResize: (width: number, height: number) => void;
  onResizeStart: () => void;
  onResizeEnd: () => void;
}

export const ResizeHandle = ({
  imageRef,
  onResize,
  onResizeStart,
  onResizeEnd,
}: ResizeHandleProps) => {
  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      onResizeStart();

      const startX = event.clientX;
      const startWidth = imageRef.current?.offsetWidth || 0;
      const startHeight = imageRef.current?.offsetHeight || 0;
      const aspectRatio = startWidth / startHeight;

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX;
        const newWidth = startWidth + deltaX;
        const newHeight = newWidth / aspectRatio;

        if (newWidth >= 100) {
          onResize(newWidth, newHeight);
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        onResizeEnd();
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [imageRef, onResize, onResizeStart, onResizeEnd]
  );

  return (
    <Maximize2
      className="invisible group-hover:visible absolute cursor-se-resize rotate-90 rounded-md bottom-0 right-0 p-1 w-6 h-6 bg-gray-50 border border-gray-300  hover:border-blue-500"
      onMouseDown={handleMouseDown}/>
  );
};