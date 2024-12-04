import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { ElementType, useCallback, useRef, useState } from 'react';
import Alignment from './Alignment';
import { ResizeHandle } from './ResizeHandle';

export const DATA_TAG = 'data-tag'

export const ALIGN = {
  start:'justify-start',
  center:'justify-center',
  end:'justify-end'
}


export const SizeAndPosition = ({ node, updateAttributes, editor }: NodeViewProps) => {
  const ref = useRef<HTMLElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const onResize = useCallback((width: number, height: number) => {
    updateAttributes({
      width,
      height,
    });
  }, [updateAttributes]);

  const onAlignment=(align:string)=>{
      updateAttributes({
        align
      })
  }

  const tag = (node.attrs[DATA_TAG] || 'img') as ElementType

  return (
    <NodeViewWrapper className={`relative w-full flex flex-row ${node.attrs.align}`}>
    <NodeViewWrapper ref={ref} className="relative inline-block group">
      <Alignment onAlignment={onAlignment} active={node.attrs.align}/>
      <NodeViewContent as={tag} {...node.attrs} />
      <ResizeHandle
        elementRef={ref}
        onResize={onResize}
        onResizeStart={() => {
          setIsResizing(true)
          editor.chain().focus().run();
        }}
        onResizeEnd={() => setIsResizing(false)}
      />
      
      {isResizing && (
        <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
      )}
    </NodeViewWrapper>
    </NodeViewWrapper>
  );
};


export const resizeAttribues = (tagName: ElementType = 'img') => ({
  // this is required to render NodeViewContent  ( for as prop )
  [DATA_TAG]: {
    default: tagName
  },
  width: {
    default: null,
  },
  height: {
    default: null,
  },
  align:{
    default: 'justify-start'
  }
})

export default SizeAndPosition;