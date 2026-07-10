'use client';

import { useMemo } from 'react';

export type SplitMode = 'words' | 'chars';

export interface SplitToken {
  key: string;
  text: string;
  isSpace: boolean;
  isWordBoundary: boolean;
}

export function useSplitText(text: string, mode: SplitMode = 'words'): SplitToken[] {
  return useMemo(() => {
    if (mode === 'words') {
      const parts = text.split(/(\s+)/);
      return parts
        .filter((part) => part.length > 0)
        .map((part, index) => {
          const isSpace = /^\s+$/.test(part);
          return {
            key: `${index}-${part}`,
            text: part,
            isSpace,
            isWordBoundary: isSpace,
          };
        });
    }

    return Array.from(text).map((char, index) => ({
      key: `${index}-${char}`,
      text: char,
      isSpace: char === ' ',
      isWordBoundary: char === ' ',
    }));
  }, [text, mode]);
}
