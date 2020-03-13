import { useEffect } from 'react';



export default function useSizeUnit(ref) {
  useEffect(() => {
    const el = ref.current;

    const handleResize = () => {
      if (!el) {
        return null;
      };
      const h = el.clientHeight;
      const sizeUnit = Math.floor(h / 15) + 'px';
      document.documentElement.style.setProperty('--size-unit', sizeUnit);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
};
