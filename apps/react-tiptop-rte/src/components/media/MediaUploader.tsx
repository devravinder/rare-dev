import { Upload } from 'lucide-react';
import openFile from './openFile';
import { MediaType } from '../menus/MediaMenu';

type AllowedMedia = Exclude<MediaType, 'iframe'> 

const acceptMap:Record<AllowedMedia, string> = {
  image: 'image/*',
  video: 'video/*',
  audio: 'audio/*',
};

interface MediaUploaderProps {
  mediaType: AllowedMedia;
  onFileSelect: (file: File) => void;
}


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