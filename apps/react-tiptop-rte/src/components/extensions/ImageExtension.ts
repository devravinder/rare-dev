import Image from '@tiptap/extension-image'
import { resizeAttribues, SizeAndPosition } from './size-position/SizeAndPosition';
import { mergeAttributes, ReactNodeViewRenderer } from '@tiptap/react';

const ImageExtension = Image.extend({
    addAttributes() {
        return {
            ...resizeAttribues('img'),
            ...this.parent?.()
        }
    },
    addNodeView() {
        return ReactNodeViewRenderer(SizeAndPosition);
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            { class: `flex items-center ${HTMLAttributes.align}` },
            ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
        ]
    },
})

export default ImageExtension;