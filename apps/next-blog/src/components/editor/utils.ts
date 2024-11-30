import {
    $createParagraphNode,
    $getSelection,
    $isRangeSelection,
    $isTextNode,
    LexicalEditor,
  } from 'lexical';
  import {$patchStyleText, $setBlocksType} from '@lexical/selection';
  import {
    $createHeadingNode,
    $createQuoteNode,
    $isHeadingNode,
    $isQuoteNode,
    HeadingTagType,
  } from '@lexical/rich-text';

export const formatParagraph = (editor: LexicalEditor) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };
  
  export const formatHeading = (
    editor: LexicalEditor,
    blockType: string,
    headingSize: HeadingTagType,
  ) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      });
    }
  };