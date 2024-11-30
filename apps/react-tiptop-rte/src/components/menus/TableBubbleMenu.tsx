import { Editor } from '@tiptap/react';
import { Trash2 } from 'lucide-react';
import IconTableColumnPlusAfter from '../icons/IconTableColumnPlusAfter';
import IconTableColumnPlusBefore from '../icons/IconTableColumnPlusBefore';
import IconTableColumnRemove from '../icons/IconTableColumnRemove';
import IconTableRowPlusAfter from '../icons/IconTableRowPlusAfter';
import IconTableRowPlusBefore from '../icons/IconTableRowPlusBefore';
import IconTableRowRemove from '../icons/IconTableRowRemove';
import { Button } from '../Toolbar';

interface TableBubbleMenuProps {
  editor: Editor;
}

export const TableBubbleMenu = ({ editor }: TableBubbleMenuProps) => {
  if (!editor?.isActive('table')) return null;

  return (
    <div className="flex items-center gap-1 bg-white rounded-md shadow-lg border p-2">
      <div className="flex items-center gap-1 pr-2 border-r">
        <Button
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          data-tooltip="Add Column Before"
        >
          <IconTableColumnPlusBefore className='h-5 w-5 text-gray-600' />
        </Button>
        <Button
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          data-tooltip="Add Column After"
        >
          <IconTableColumnPlusAfter className='h-5 w-5 text-gray-600' />
        </Button>
        <Button
          onClick={() => editor.chain().focus().deleteColumn().run()}
          className=" text-red-500"
          data-tooltip="Delete column"
        >
          <IconTableColumnRemove className='h-5 w-5' />
        </Button>
      </div>

      <div className="flex items-center gap-1 px-2 border-r">
        <Button
          onClick={() => editor.chain().focus().addRowBefore().run()}
          data-tooltip="Add row before"
        >
          <IconTableRowPlusBefore className='h-5 w-5 text-gray-600' />
        </Button>
        <Button
          onClick={() => editor.chain().focus().addRowAfter().run()}
          data-tooltip="Add row after"
        >
          <IconTableRowPlusAfter className='h-5 w-5 text-gray-600'/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().deleteRow().run()}
          className=" text-red-500"
          data-tooltip="Delete row"
        >
          <IconTableRowRemove className='h-5 w-5' />
        </Button>
      </div>

      <Button
        onClick={() => editor.chain().focus().deleteTable().run()}
        className="text-red-500 ml-2"
        data-tooltip="Delete table"
      >
        <Trash2 size={15} />
      </Button>
    </div>
  );
};