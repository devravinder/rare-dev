'use client'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from './ToolbarPlugin';

const theme = {}


function onError(error: Error) {
    console.error(error);
}
const initialConfig = {
    namespace: 'lexical-rte',
    theme,
    onError,
};
export default function Editor() {


    return (
        <div className="relative w-full min-h-[400px] bg-slate-50 shadow-md rounded-md">
            <LexicalComposer initialConfig={initialConfig}>
                <ToolbarPlugin />
                <RichTextPlugin
                    contentEditable={<ContentEditable className="h-full w-full p-2 focus:outline-none" />}
                    placeholder={<div className='absolute top-16 left-2 pointer-events-none overflow-x text-gray-400 z-20'>Enter something here...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
            </LexicalComposer>
        </div>
    );
}