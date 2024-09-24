import { useState, useEffect } from "react";

function useDebounce(value, delay = 2000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      console.log("calleeddd....");
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timer if the value changes before the delay period ends
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Effect dependencies

  return debouncedValue;
}

export default useDebounce;
