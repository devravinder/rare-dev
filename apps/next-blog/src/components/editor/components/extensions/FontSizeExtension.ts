//import '@tiptap/extension-text-style'
import { Extension } from '@tiptap/core'

export type FontSizeOptions = {
  /**
   * The types where the font size can be applied
   * @default ['textStyle']
   * @example ['heading', 'paragraph']
  */
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType,
      unsetFontSize: () => ReturnType,
    }
  }
}
export const FontSizeExtension = Extension.create<FontSizeOptions>({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => {
              const fontSize = element.style.fontSize
              return fontSize ? fontSize : null
            },
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {}
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize: (fontSize) => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize })
          .run()
      },
      unsetFontSize: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})