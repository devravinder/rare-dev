import { useState } from 'react';
import { Image, Video, Music, Link as LinkIcon, Youtube } from 'lucide-react';
import { MediaUploader } from '../media/MediaUploader';
import { Editor } from '@tiptap/react';
import tw from 'tailwind-styled-components';
import { parseToMedia } from '../extensions/MediaExtension';

export type MediaType = 'audio' | 'video' | 'iframe' | 'image';

interface MediaMenuProps {
  editor: Editor;
}

export const MediaMenu = ({ editor }: MediaMenuProps) => {
  const [mediaSrc, setMediaSrc] = useState('');
  const [type, setMediaType] = useState<MediaType | null>(null);

  const handleFileUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    insertMedia(url);
  };

  const insertMedia = (src: string) => {
    if (!src || !type) return;

    switch (type) {
      case 'image':
        editor.chain().focus().setImage({ src }).run();
        break;
      case 'iframe': {
        const { attributes } = parseToMedia(src)
        editor.chain().focus().setMedia({ type, ...attributes }).run();
      }
        break;
      default: {
        editor.chain().focus().setMedia({ src, type }).run();
      }
        break;
    }
    setMediaSrc('');
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mediaSrc) {
      insertMedia(mediaSrc);
    }
  };

  return (
    <div className=" flex flex-col gap-2 absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border p-4 z-50 w-auto">
      <div className="w-full grid grid-cols-4 gap-2">
        <Button
          onClick={() => setMediaType('image')}
          $active={type === 'image'}
        >
          <Image size={24} className="mb-2" />
          <span className="text-sm">Image</span>
        </Button>
        <Button
          onClick={() => setMediaType('video')}
          $active={type === 'video'}
        >
          <Video size={24} className="mb-2" />
          <span className="text-sm">Video</span>
        </Button>
        <Button
          onClick={() => setMediaType('iframe')}
          $active={type === 'iframe'}
        >
          <Youtube size={24} className="mb-2" />
          <span className="text-sm">Iframe</span>
        </Button>
        <Button
          onClick={() => setMediaType('audio')}
          $active={type === 'audio'}
        >
          <Music size={24} className="mb-2" />
          <span className="text-sm">Audio</span>
        </Button>
      </div>

      {type && (
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">From URL</label>
            <form onSubmit={handleUrlSubmit} className="flex gap-2">
              <input
                type="text"
                value={mediaSrc}
                onChange={(e) => setMediaSrc(e.target.value)}
                placeholder="Enter URL"
                className="flex-1 px-3 py-2 border outline-none rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                <LinkIcon size={16} />
              </button>
            </form>
          </div>

          {type !== 'iframe' && <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">From Computer</label>
            <MediaUploader
              mediaType={type}
              onFileSelect={handleFileUpload}
            />
          </div>}
        </div>
      )}
    </div>
  );
};


const Button = tw.button<{ $active?: boolean }>`flex flex-col items-center p-3 rounded transition-colors ${(p) => p.$active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`