import * as monaco from 'monaco-editor';
import { GDLangTheme } from './constants';

// Define gdlang theme
export const defineGDLangTheme = () => {
  monaco.editor.defineTheme(GDLangTheme, {
    base: 'vs',
    inherit: false,
    colors: {
      'editor.background': '#FFFCF9',
    },
    rules: [
      { token: 'keyword', foreground: '3d8ee4' },
      { token: 'number', foreground: '99c1b9' },
      { token: 'string', foreground: 'f86624' },
      { token: 'operator', foreground: '1d4e89' },
      { token: 'comment', foreground: 'adb5bd' },
      { token: 'identifier', foreground: '3a6ea5' },
      { token: 'delimiter.curly', foreground: 'f86624' },
      { token: 'delimiter.parenthesis', foreground: 'bfc0c0' },
      { token: 'delimiter.square', foreground: '32CD32' },
    ],
  });
  monaco.editor.setTheme(GDLangTheme);
};
