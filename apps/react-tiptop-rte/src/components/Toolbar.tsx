import { Level } from '@tiptap/extension-heading';
import { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  CheckSquare,
  Code,
  Heading,
  Highlighter,
  ImagePlusIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Palette,
  Quote,
  Redo,
  RemoveFormatting,
  Strikethrough,
  Subscript,
  Superscript,
  Table as TableIcon,
  Underline,
  Undo
} from 'lucide-react';
import tw from 'tailwind-styled-components';
import { ColorPicker } from './menus/ColorPicker';
import { MediaMenu } from './menus/MediaMenu';

interface ToolbarProps {
  editor: Editor;
  variant?: 'bubble' | 'fixed';
}

export const headerLavels: Level[] = [1, 2, 3, 4, 5];

const COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
];

const HIGHLIGHTS = [
  '#ffffff',
  '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#f44336',
  '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3',
  '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a',
];





export const Toolbar = ({ editor, variant = 'fixed' }: ToolbarProps) => {
  const isBubble = variant === 'bubble';


  const handleLinkAdd = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleHeadingSelect = (level: Level) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-1 ${!isBubble ? 'p-2 border-b' : ''}`}>
      <div className="relative group">
        <Button $active={editor.isActive('heading')} data-tooltip="Heading" className='flex flex-row items-center'>
          <Heading size={isBubble ? 14 : 18} />
        </Button>
        <div className="invisible group-focus-within:visible absolute mt-1 top-full left-0 flex flex-col gap-1 bg-white rounded-lg shadow-lg border p-1 z-50">
          {headerLavels.map((level) => (
            <Button
              key={level}
              onClick={() => handleHeadingSelect(level)}
              $active={editor.isActive('heading', { level })}
              $nested={true}
            >
              H{level}
            </Button>
          ))}
        </div>
      </div>
      <Devider />
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        $active={editor.isActive('bold')}
        data-tooltip="Bold"
      >
        <Bold className='stroke-[3px] ' size={isBubble ? 14 : 18} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        $active={editor.isActive('italic')}
        data-tooltip="Italic"
      >
        <Italic size={isBubble ? 14 : 18} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        $active={editor.isActive('underline')}
        data-tooltip="Underline"
      >
        <Underline size={isBubble ? 14 : 18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        $active={editor.isActive('strike')}
        data-tooltip="Strikethrough"
      >
        <Strikethrough size={isBubble ? 14 : 18} />
      </Button>
      <Devider />

      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        $active={editor.isActive('code')}
        data-tooltip="Code"
      >
        <Code size={isBubble ? 14 : 18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        $active={editor.isActive('blockquote')}
        data-tooltip="Blockquote"
      >
        <Quote size={18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        $active={editor.isActive('subscript')}
        data-tooltip="Subscript"
      >
        <Subscript size={18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        $active={editor.isActive('superscript')}
        data-tooltip="Superscript"
      >
        <Superscript size={18} />
      </Button>



      <Devider />

      <Button
        onClick={handleLinkAdd}
        $active={editor.isActive('link')}
        data-tooltip="Link"
      >
        <LinkIcon size={18} />
      </Button>
      <Devider />

      <div className="relative group">
        <Button
          $active={editor.isActive('textStyle')}
          style={{ color: editor.getAttributes('textStyle').color }}
          data-tooltip="Text Color"
        >
          <Palette size={isBubble ? 14 : 18} />
        </Button>
        <ColorPicker
          colors={COLORS}
          onSelect={(color) => editor.chain().focus().setColor(color).run()}
          value={editor.getAttributes('textStyle').color}
          onClear={() => editor.chain().focus().unsetColor().run()}
        />
      </div>
      <div className="relative group">
        <Button
          data-tooltip="Highlighter"
          style={{
            ...(editor.isActive('highlight') && { backgroundColor: editor.getAttributes('highlight').color, color: editor.getAttributes('textStyle').color })
          }}
        >
          <Highlighter size={isBubble ? 14 : 18} />
        </Button>
        <ColorPicker
          colors={HIGHLIGHTS}
          onSelect={(color) => editor.chain().focus().toggleHighlight({ color }).run()}
          value={editor.getAttributes('highlight').color}
          onClear={() => editor.chain().focus().unsetHighlight().run()}
          
        />
      </div>



      {!isBubble && (
        <>
          <Devider />
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            $active={editor.isActive('bulletList')}
            data-tooltip="List"
          >
            <List size={18} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            $active={editor.isActive('orderedList')}
            data-tooltip="Ordered List"
          >
            <ListOrdered size={18} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            $active={editor.isActive('taskList')}
            data-tooltip="Task List"
          >
            <CheckSquare size={18} />
          </Button>

        </>
      )}
          <Devider />
          <Button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            $active={editor.isActive({ textAlign: 'left' })}
            data-tooltip="Aligh Left"
          >
            <AlignLeft size={18} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            $active={editor.isActive({ textAlign: 'center' })}
            data-tooltip="Aligh Center"
          >
            <AlignCenter size={18} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            $active={editor.isActive({ textAlign: 'right' })}
            data-tooltip="Aligh Right"
          >
            <AlignRight size={18} />
          </Button>

 

      {
        !isBubble && <>
          <Devider />
          <div className="relative group">
            <Button data-tooltip="Media" className='flex flex-row items-center'>
              <ImagePlusIcon  size={18} />
            </Button>
            <div className="invisible group-focus-within:visible absolute mt-1 top-full left-0 flex flex-col gap-1 bg-white rounded-lg shadow-lg border p-1 z-50">
              <MediaMenu editor={editor} />
            </div>
          </div>
          <Button
            data-tooltip="Table"
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()}
          >
            <TableIcon size={18} />
          </Button>
          <Devider />
        </>
      }

      <div className="ml-auto flex gap-1">
        <Button
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          disabled={!editor.can().undo()}
          data-tooltip="Clear Formatting"
          data-flow="top"
          
        >
          <RemoveFormatting size={18} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          data-tooltip="Undo"
        >
          <Undo size={18} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          data-tooltip="Redo"
        >
          <Redo size={18} />
        </Button>
      </div>
    </div>
  );
};

export const Button = tw.button<{ $active?: boolean, $nested?: boolean }>`p-2 hover:bg-gray-100 rounded-lg transition-colors relative disabled:opacity-50 ${(p) => p.$active ? `bg-gray-100 ${p.$nested ? '' : 'text-blue-500'}` : ''}`;

const Devider = tw.div<{ $vertical?: boolean }>`border-l border-gray-200`