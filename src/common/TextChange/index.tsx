import autoAnimate from '@formkit/auto-animate';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const TextChange = ({ texts, time }: { texts: React.ReactNode[]; time?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const parentRef = useRef(null);

  const shuffle = useCallback(() => {
    setCurrentIndex((oldState) => (oldState < texts?.length - 1 ? oldState + 1 : 0));
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, time ? time * 1000 : 5000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  if (!texts) return null;

  return (
    <div ref={parentRef}>
      <div key={currentIndex}>{texts[currentIndex]}</div>
    </div>
  );
};

export default TextChange;
