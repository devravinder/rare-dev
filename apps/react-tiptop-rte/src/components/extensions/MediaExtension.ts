import { Node, mergeAttributes } from '@tiptap/core';
import { DATA_TAG, SizeAndPosition, resizeAttribues } from './size-position/SizeAndPosition';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { MediaType } from '../menus/MediaMenu';

export interface MediaAttributes {
  src: string;
  type: Exclude<MediaType, 'image'>;
  controls?: boolean
  allowFullScreen?: boolean
  frameBorder?: number
  allow?: string
  title?: string,
  referrerPolicy?: string
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
      ...resizeAttribues('iframe'),
      src: {
        default: null,
      },
      type: {
        default: 'iframe',
        parseHTML: element => element.tagName.toLowerCase(),
      },
      controls:{
        default: true
      },
      autoPlay: {
        default: false
      },
      // the below are for iframe
      title:{
        default: null
      },
      allow:{
        default: null
      },
      allowFullScreen:{
        default: true
      },
      frameBorder:{
        default: null
      },
      referrerPolicy:{
        default: null
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
      {
        tag: 'iframe',
        rendered: false,
      },
    ];
  },

  // rendered back into HTML
  renderHTML({ HTMLAttributes }) {

    // handle boolean values seperately..if false don't pass
    const { type,controls,autoPlay,allowFullScreen, ...rest } = HTMLAttributes;
    const element = type as MediaType;


    const finalAttributes = mergeAttributes(rest, 
      {
        ...controls&&({controls: true}),
        ...autoPlay&&({autoPlay: true}),
        ...allowFullScreen&&({allowFullScreen: true}),
      }
    )
    return [
      'div',
      { class: `flex items-center ${HTMLAttributes.align}` },
      [element, finalAttributes]
    ];
  },

  addCommands() {
    return {
      setMedia: (options) => ({ commands }) => {
        // inserts 'media' node to editorDOM with the help of insertContent command
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


const attributeMap: Record<string, string> = {
  'allowFullScreen':'allowFullScreen',
  'frameborder':'frameBorder',
  'allowfullscreen':'allowFullScreen',
  'referrerpolicy':'referrerPolicy',
}

type DynamicAttribues = Record<string, string | boolean> & {src:string}

export const parseToMedia=(value:string)=>{
  const range = document.createRange();
  const fragment = range.createContextualFragment(value);
  const ele = fragment.firstChild as HTMLElement
  const tagName = ele?.localName
  const attributes = Array.from(ele?.attributes).reduce((pre, cur) => {
    pre[attributeMap[cur.name]||cur.name] = cur.value || true
    return pre
  },{} as DynamicAttribues);
  return ({tagName, attributes})
}

export default MediaExtension;