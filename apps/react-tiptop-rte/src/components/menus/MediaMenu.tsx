import { useState } from 'react';
import { Image, Video, Music, Link as LinkIcon } from 'lucide-react';
import { MediaUploader } from '../media/MediaUploader';
import { Editor } from '@tiptap/react';
import tw from 'tailwind-styled-components';

interface MediaMenuProps {
  editor: Editor;
}

export const MediaMenu = ({ editor }: MediaMenuProps) => {
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'audio' | null>(null);

  const handleFileUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    insertMedia(url);
  };

  const insertMedia = (url: string) => {
    if (!url || !mediaType) return;

    switch (mediaType) {
      case 'image':
        editor.chain().focus().setImage({ src: url }).run();
        break;
      case 'video':
        editor.chain().focus().setMedia({ src: url, type: 'video' }).run();
        break;
      case 'audio':
        editor.chain().focus().setMedia({ src: url, type: 'audio' }).run();
        break;
    }

    setMediaUrl('');
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mediaUrl) {
      insertMedia(mediaUrl);
    }
  };

  return (
    <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border p-4 z-50 w-[400px]">
      <div className="grid grid-cols-3 gap-2 mb-6">
        <Button
          onClick={() => setMediaType('image')}
          $active={mediaType === 'image'}
        >
          <Image size={24} className="mb-2" />
          <span className="text-sm">Image</span>
        </Button>
        <Button
          onClick={() => setMediaType('video')}
          $active={mediaType === 'video'}
        >
          <Video size={24} className="mb-2" />
          <span className="text-sm">Video</span>
        </Button>
        <Button
          onClick={() => setMediaType('audio')}
          $active={mediaType === 'audio'}
        >
          <Music size={24} className="mb-2" />
          <span className="text-sm">Audio</span>
        </Button>
      </div>

      {mediaType && (
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">From URL</label>
            <form onSubmit={handleUrlSubmit} className="flex gap-2">
              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
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

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">From Computer</label>
            <MediaUploader
              mediaType={mediaType}
              onFileSelect={handleFileUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
};


const Button = tw.button<{ $active?: boolean }>`flex flex-col items-center p-3 rounded transition-colors ${(p) => p.$active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`