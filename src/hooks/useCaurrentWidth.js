import React, { useState, useEffect } from 'react';

export const useCurrentWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
        let timeoutId = null;

        const resizeListener = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(()=> setWidth(window.innerWidth));
        };
      
        window.addEventListener('resize', resizeListener);
  
      
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])
    return width;
}