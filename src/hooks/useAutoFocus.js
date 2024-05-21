import { createRef, useEffect } from 'react';

export default function useAutoFocus(hash) {
  const inputRef = createRef();

  useEffect(() => {
    if (inputRef.current && hash) {
      inputRef.current.focus();
    }
  }, []);

  return inputRef;
}
