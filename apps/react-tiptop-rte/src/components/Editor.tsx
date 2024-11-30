import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder'
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';

import { headerLavels, Toolbar } from './Toolbar';
import { TableBubbleMenu } from './menus/TableBubbleMenu';
import MediaExtension from './extensions/MediaExtension'
import ImageExtension from './extensions/ImageExtension'

// https://random.imagecdn.app/500/150
// http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
// https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav
// https://dl.espressif.com/dl/audio/ff-16b-1c-44100hz.mp3


type EditorProps = {
  content?: string;
  onBlur?: (content: string) => void;
}
export const Editor = ({ content, onBlur }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: headerLavels,
        },
      }),
      Placeholder.configure({
        placeholder: 'Enter something here...'
      }),
      Underline,
      Subscript,
      Superscript,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline cursor-pointer',
        },
      }),
      ImageExtension,
      MediaExtension,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    onBlur: ({ editor }) => {
      onBlur?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <Toolbar editor={editor} />
      <BubbleMenu
        editor={editor} tippyOptions={{ duration: 100, maxWidth: 400 }}
        shouldShow={({ editor }) => {

          if (editor.isActive('image') || editor.isActive('media')) return false
          const { from, to } = editor.state.selection;
          return from !== to; // Show menu only if there is a text selection

        }}
      >
        <div className="bg-white rounded-md shadow-lg border p-2 flex gap-1">
          <Toolbar editor={editor} variant="bubble" />
        </div>
      </BubbleMenu>

      <BubbleMenu
        editor={editor}
        tippyOptions={{
          duration: 100, maxWidth: 400,
          placement: 'bottom-end'
        }}
        shouldShow={({ editor }) => editor.isActive('table')}
      >
        <TableBubbleMenu editor={editor} />
      </BubbleMenu>

      <EditorContent editor={editor} />
    </>
  );
};