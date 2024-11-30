import { Upload } from 'lucide-react';
import openFile from './openFile';

interface MediaUploaderProps {
  mediaType: 'image' | 'video' | 'audio';
  onFileSelect: (file: File) => void;
}

const acceptMap = {
  image: 'image/*',
  video: 'video/*',
  audio: 'audio/*',
};
export const MediaUploader = ({ mediaType, onFileSelect }: MediaUploaderProps) => {

  const onClick = async() => {
    const file = await openFile({ accept: acceptMap[mediaType], multiple:false });
     if(file?.[0]) {
      onFileSelect(file[0]);
     }
  };

  return (
    <button onClick={onClick} className="flex flex-col w-full items-center gap-3 p-6 border-2 border-dashed rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
      <Upload size={24} className="text-gray-400" />
      <div className="text-center">
        <span className="text-sm text-gray-600">Click to upload</span>
        <p className="text-xs text-gray-500 mt-1">
          {mediaType === 'image' ? 'PNG, JPG, GIF up to 10MB' :
           mediaType === 'video' ? 'MP4, WebM up to 20MB' :
           'MP3, WAV up to 10MB'}
        </p>
      </div>
    </button>
  );
};