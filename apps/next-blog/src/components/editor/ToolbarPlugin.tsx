import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback } from 'react';
import {
  UNDO_COMMAND,
  REDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
} from 'lexical';

import IconUndo from './icons/IconUndo';
import IconRedo from './icons/IconRedo';
import IconBold from './icons/IconBold';
import IconItalic from './icons/IconItalic';
import IconList from './icons/IconList';
import Dropdown from './Dropdown';
import IconListUl from './icons/IconListUl';
import IconListOl from './icons/IconListOl';
import IconListCheck from './icons/IconListCheck';
import IconQuote from './icons/IconQuote';
import IconCode from './icons/IconCode';
import { formatHeading, formatParagraph } from './utils';

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatBold = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  }, [editor]);

  const formatItalic = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  }, [editor]);

  const formatList = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, '');
  }, [editor]);

  const undo = useCallback(() => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  }, [editor]);

  const redo = useCallback(() => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  }, [editor]);


  const FormatDropdown = () => {
    return <>
      <button onClick={() => formatParagraph(editor)} className='flex flex-row gap-2 justify-start items-center px-2 py-1 hover:bg-gray-200 rounded-md'>
        <IconList className='w-5 h-5' /> <span className='text-nowrap'>Normal</span>
      </button>
      <button onClick={() => formatHeading(editor, blockType, 'h1')} className='flex flex-row gap-2 justify-start items-center px-2 py-1 hover:bg-gray-200 rounded-md'>
        <span className='font-semibold'>H1</span> <span className='text-nowrap'>Heading 1</span>
      </button>
      <button className='flex flex-row gap-2 justify-start items-center px-2 py-1 hover:bg-gray-200 rounded-md'>
        <span className='font-semibold'>H2</span> <span className='text-nowrap'>Heading 2</span>
      </button>
      <button className='flex flex-row gap-2 justify-start items-center px-2 py-1 hover:bg-gray-200 rounded-md'>
        <span className='font-semibold'>H3</span> <span className='text-nowrap'>Heading 3</span>
      </button>
      <button className='flex flex-row gap-2 justify-start items-center px-2 py-1 hover:bg-gray-200 rounded-md'>
        <IconListUl className='w-5 h-5' /> <span className='text-nowrap'>Bullet List</span>
      </button>
      <button className='flex flex-row gap-2 justify-start items-center px-2 py-1 hover:bg-gray-200 rounded-md'>
        <IconListOl className='w-5 h-5' /> <span className='text-nowrap'>Number List</span>
      </button>
      <button className='flex flex-row gap-2 justify-start items-center px-2 py-1 hover:bg-gray-200 rounded-md'>
        <IconListCheck className='w-5 h-5' /> <span className='text-nowrap'>Check List</span>
      </button>
      <button className='flex flex-row gap-2 justify-start items-center px-2 py-1 hover:bg-gray-200 rounded-md'>
        <IconQuote className='w-5 h-5' /> <span className='text-nowrap'>Quote</span>
      </button>
      <button className='flex flex-row gap-2 justify-start items-center px-2 py-1 hover:bg-gray-200 rounded-md'>
        <IconCode className='w-5 h-5' /> <span className='text-nowrap'>Code Block</span>
      </button>
    </>
  }



  return (
    <div className="flex items-center gap-1 border-b border-gray-200 p-2">
      <button
        onClick={undo}
        className="rounded p-2 hover:bg-gray-200"
        title="Undo"
      >
        <IconUndo className='w-5 h-5' />
      </button>
      <button
        onClick={redo}
        className="rounded p-2 hover:bg-gray-200"
        title="Redo"
      >
        <IconRedo className='w-5 h-5' />
      </button>
      <div className="mx-1 h-6 w-[1px] bg-gray-200" />
      <Dropdown label='Format' ><FormatDropdown /></Dropdown>
      <div className="mx-1 h-6 w-[1px] bg-gray-200" />
      <button
        onClick={formatBold}
        className="rounded p-2 hover:bg-gray-200"
        title="Bold"
      >
        <IconBold className='w-5 h-5' />
      </button>
      <button
        onClick={formatItalic}
        className="rounded p-2 hover:bg-gray-200"
        title="Italic"
      >
        <IconItalic className='w-5 h-5' />
      </button>
      <button
        onClick={formatList}
        className="rounded p-2 hover:bg-gray-200"
        title="Bullet List"
      >
        <IconList className='w-5 h-5' />
      </button>
      <button
        className="rounded p-2 hover:bg-gray-200"
        title="Insert Link"
      >
        Link
      </button>
    </div>
  );
}