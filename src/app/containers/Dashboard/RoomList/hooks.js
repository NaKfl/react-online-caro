import { useState, useCallback, useEffect } from 'react';
export const useHooks = () => {
  const [filter, setFilter] = useState(null);
  const [searchText, setSearchText] = useState(null);
  useEffect(() => {}, []);

  const handleOnChangeRadio = useCallback(e => {
    console.log({ e });
    const { value } = e.target;
    setFilter(value);
  }, []);

  return {
    selectors: {},
    handlers: {
      handleOnChangeRadio,
    },
    states: {},
  };
};

export default useHooks;
