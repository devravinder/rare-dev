import { Node, mergeAttributes } from '@tiptap/core';
import { DATA_TAG, SizeAndPosition, resizeAttribues } from './size-position/SizeAndPosition';
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

    const { type,controls,autoPlay, ...rest } = HTMLAttributes;
    const element = type as MediaType;
  
    return [
      'div',
      { class: `flex items-center ${HTMLAttributes.align}` },
      [element, mergeAttributes(rest, {...controls&&({controls: true}),...autoPlay&&({autoPlay: true})})]
    ];
  },

  addCommands() {
    return {
      setMedia: (options) => ({ commands }) => {
        // inserts node (of given type) to editorDOM with (the given) attributes 
        return commands.insertContent({
          type: this.name,
          attrs: ({[DATA_TAG]:options.type, ...options}),
        });
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(SizeAndPosition);
},

});

export default MediaExtension;