import { useState } from 'react';

function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange() {
    setValue((state) => !state);
  }

  return [value, handleValueChange, setValue];
}

export default useToggle;
