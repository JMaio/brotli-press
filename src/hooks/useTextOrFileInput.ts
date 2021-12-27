import { useEffect, useMemo, useRef, useState } from 'react';

export interface UseTextOrFileInputInterface {
  // textRef: React.RefObject<HTMLInputElement>;
  // fileRef: React.RefObject<HTMLInputElement>;
  text: string;
  file?: File;
  setText: (text: string) => void;
  setFile: (file: File) => void;
  //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  useFile: boolean;
  inputSize: number;
}

const useTextOrFileInput = (): UseTextOrFileInputInterface => {
  // initial string should be empty string
  const [text, setText] = useState<string>('');
  const [file, setFile] = useState<File>();
  // const textRef = useRef<HTMLInputElement>(null);
  // const fileRef = useRef<HTMLInputElement>(null);

  // const useFile = useMemo(() => fileRef.current !== null, [fileRef]);
  const useFile = useMemo(() => file !== undefined, [file]);

  const [inputSize, setInputSize] = useState<number>(0);
  useEffect(() => {
    setInputSize(useFile && file ? file.size : text.length);
  }, [setInputSize, useFile, file, text]);

  //   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { files, value } = e.target;
  //     if (files) {
  //       setFile(files[0]);
  //     } else {
  //       setText(value);
  //     }
  //   };

  return {
    // textRef,
    // fileRef,
    text,
    file,
    setText,
    setFile,
    // onChange,
    useFile,
    inputSize,
  };
};

export default useTextOrFileInput;
