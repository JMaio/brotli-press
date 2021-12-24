import { useMemo, useRef } from 'react';

export interface UseTextOrFileInputInterface {
  textRef: React.RefObject<HTMLInputElement>;
  fileRef: React.RefObject<HTMLInputElement>;
  //   setText: (text: string) => void;
  //   setFile: (file: File) => void;
  //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  useFile: boolean;
}

const useTextOrFileInput = (): UseTextOrFileInputInterface => {
  // initial string should be empty string
  //   const [text, setText] = useState<string>('');
  //   const [file, setFile] = useState<File>();
  const textRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const useFile = useMemo(() => fileRef.current !== null, [fileRef]);

  //   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { files, value } = e.target;
  //     if (files) {
  //       setFile(files[0]);
  //     } else {
  //       setText(value);
  //     }
  //   };

  return {
    textRef,
    fileRef,
    // setText,
    // setFile,
    // onChange,
    useFile,
  };
};

export default useTextOrFileInput;
