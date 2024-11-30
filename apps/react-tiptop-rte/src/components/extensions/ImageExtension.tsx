import Image from '@tiptap/extension-image'
import { resizeAttribues, ResizableComponent } from './resize/ResizableComponent';
import { ReactNodeViewRenderer } from '@tiptap/react';

export const ImageExtension = Image.extend({
    addAttributes() {
        return {
            ...resizeAttribues('img'),
            ...this.parent?.()
        }
    },
    addNodeView() {
        return ReactNodeViewRenderer(ResizableComponent);
    },

})

export default ImageExtension;