import { NodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { ElementType, useCallback, useRef, useState } from 'react';
import { ResizeHandle } from './ResizeHandle';

export const DATA_TAG_NAME = 'data-tag-name'


/* 
  This resize component will work based on height, width & data-tag-name attributes
  make sure to pass these attributes in 'addAttributes' & 'addCommands' methods of the extension 
*/

export const ResizableComponent = ({ node, updateAttributes }: NodeViewProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const onResize = useCallback((width: number, height: number) => {
    updateAttributes({
      width,
      height,
    });
  }, [updateAttributes]);

  const tag = (node.attrs[DATA_TAG_NAME] || 'img') as ElementType
  return (
    <NodeViewWrapper ref={ref} className="relative inline-block group">
      <NodeViewContent as={tag} {...node.attrs} />
      <ResizeHandle
        imageRef={ref}
        onResize={onResize}
        onResizeStart={() => setIsResizing(true)}
        onResizeEnd={() => setIsResizing(false)}
      />
      {isResizing && (
        <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
      )}
    </NodeViewWrapper>
  );
};


export const resizeAttribues = (tagName: ElementType='img') => ({
  // this is required to render NodeViewContent  ( for as prop )
  [DATA_TAG_NAME]: {
    default: tagName
  },
  // height and width...sometimes they are missing in parent()
  width: {
    default: null,
  },
  height: {
    default: null,
  }
})