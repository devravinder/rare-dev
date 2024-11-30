import {X} from 'lucide-react'

interface ColorPickerProps {
  colors: string[];
  onSelect: (color: string) => void;
  value?: string;
  onClear?: () => void

}

export const ColorPicker = ({ colors, onSelect, onClear, value='#000000' }: ColorPickerProps) => {

  return (
    <div className="invisible group-focus-within:visible absolute flex flex-col gap-1 top-full left-0 mt-1 bg-white rounded-lg shadow-lg border p-2 z-50 w-[180px]">
      <div className="grid grid-cols-6 gap-1">
        {colors.map((color) => (
          <button
            key={color}
            className="w-5 h-5 rounded hover:ring-2 hover:ring-blue-400"
            style={{ backgroundColor: color }}
            onClick={() => {
              onSelect(color);
            }}
          />
        ))}
        <button className="w-5 h-5 rounded hover:ring-2 grid place-content-center hover:ring-blue-400" onClick={onClear}>
          <X width={16} />
        </button>
      </div>
      <div className="border-t pt-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-gray-600">
            Choose Custom
          </span>
          <input
            type="color"
            value={value}
            onChange={(e) => onSelect(e.target.value)}
            className="w-5 h-5 p-0 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};