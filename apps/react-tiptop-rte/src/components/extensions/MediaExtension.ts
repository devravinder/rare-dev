import { Node, mergeAttributes } from '@tiptap/core';
import { DATA_TAG_NAME, ResizableComponent, resizeAttribues } from './resize/ResizableComponent';
import { ReactNodeViewRenderer } from '@tiptap/react';

export type MediaType = 'audio' | 'video';

export interface MediaAttributes {
  src: string;
  type: MediaType;
  controls?: boolean
}


declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    media: {
      setMedia: (options: MediaAttributes) => ReturnType;
    };
  }
}

export type MediaExtensionOptions = {

}
const MediaExtension = Node.create<MediaExtensionOptions>({
  name: 'media',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      ...resizeAttribues('audio'),
      src: {
        default: null,
      },
      type: {
        default: 'video',
        parseHTML: element => element.tagName.toLowerCase() === 'audio' ? 'audio' : 'video',
      },
      controls:{
        default: true
      },
      autoPlay: {
        default: false
      }
    };
  },

  // to parse raw HTML into the editor's internal representation (called the ProseMirror document structure)
  // It is an array of objects defining how the editor recognizes specific HTML tags and their attributes
  parseHTML() {
    return [
      {
        tag: 'video',
        rendered: false,
      },
      {
        tag: 'audio',
        rendered: false,
      },
    ];
  },

  // rendered back into HTML
  renderHTML({ HTMLAttributes }) {

    const { type,controls, ...rest } = HTMLAttributes;
    const element = type as MediaType;

    return [element, mergeAttributes(rest, {
      style: 'max-width: 100%',
    })];
  },

  addCommands() {
    return {
      setMedia: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          // pass dynamiccaly DATA_TAG_NAME attribute... this is used in ResizableComponent
          attrs: ({[DATA_TAG_NAME]:options.type, ...options}),
        });
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableComponent);
},

});

export default MediaExtension;