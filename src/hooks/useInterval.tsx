import { useEffect, useRef } from "react";

export default function useInterval(callback: any, delay: number) {
  const savedCallback = useRef() as any;
  const interValId = useRef() as any;

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const startInterval = () => {
    disposeInterval()

    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    interValId.current = id;
  };

  const disposeInterval = () => {
    if (interValId.current) {
      clearInterval(interValId.current)
    }
  }

  return { startInterval, disposeInterval };
}