import {
  ChangeEvent,
  DetailedHTMLProps,
  DragEvent,
  InputHTMLAttributes,
  LegacyRef,
  PropsWithChildren,
  forwardRef,
  useRef,
  useState,
} from 'react';
import { Typography } from '../core/Typography';
import { X } from "lucide-react";
import Image from 'next/image';

interface Props
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    PropsWithChildren {
  onRead?: (value: string) => void;
  acceptType?: string;
  maxFileAge?: number;
  small?: boolean;
  previews?: string[] | FileList;
  onRemove?: (index: number) => void;
}

const DragAndDrop = forwardRef(
  (
    {
      small = false,
      children,
      name = '',
      onRead,
      acceptType,
      maxFileAge,
      previews = [],
      onRemove,
      ...props
    }: Props,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    const initialFiles: (File | string)[] = Array.isArray(previews)
      ? previews
      : previews instanceof FileList
      ? Array.from(previews)
      : [];

    const [files, setFiles] = useState<(File | string)[]>(initialFiles);
    const fileInputRef = useRef<HTMLInputElement>(null); // Use useRef to reference input

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer.files.length > 0) {
        setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
      }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      props.onChange?.(e);
      const selectedFiles = e.currentTarget.files;
      if (selectedFiles && selectedFiles.length > 0) {
        setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
      }
    };

    const handleRemove = (index: number) => {
      const updatedFiles = [...files];
      updatedFiles.splice(index, 1);
      setFiles(updatedFiles);
      onRemove?.(index);
    };

    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click(); // Open file dialog when "click here" is clicked
      }
    };

    return (
      <div className="border border-dashed border-[#0000004D] w-full p-[51px_101px] bg-[#F8F8F8] text-center relative rounded-[8px]">
        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="grid gap-2 justify-items-center">
          <input
            ref={fileInputRef} // Reference input using useRef
            type="file"
            name={name}
            className="hidden"
            accept="image/*"
            multiple
            {...props}
            onChange={handleFileChange}
          />
          <Typography variant="18px/700/24.59px" className="text-[#303940]">
            Drag and drop your media and pictures or{' '}
            <span className="text-accent font-bold inline-block cursor-pointer" onClick={handleClick}>
              click here
            </span>{' '}
            to upload
          </Typography>

          {files.length > 0 && (
            <div className="flex gap-2 flex-wrap justify-center mt-4">
              {files.map((file, index) => (
                <div key={index} className="relative mt-4">
                  <Image
                    priority
                    src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                    alt="Preview"
                    className="max-w-[160px] w-full h-auto max-h-[160px] rounded-md"
                    width={160}
                    height={160}
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    onClick={() => handleRemove(index)}
                  >
                     <X size={12}/>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

DragAndDrop.displayName = 'DragAndDrop';
export default DragAndDrop;
