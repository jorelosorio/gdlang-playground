import * as monaco from 'monaco-editor';
import { GDLangId, GDLangTheme } from './constants';
import { gdlangMonarchTokens as GDLangMonarchTokens } from './syntax';

// Helper function to create an editor
export const createEditor = (
  elementId: string,
  options: monaco.editor.IStandaloneEditorConstructionOptions | undefined,
): monaco.editor.IStandaloneCodeEditor | undefined => {
  const element = document.getElementById(elementId);
  if (element) {
    return monaco.editor.create(element, options);
  }
  // eslint-disable-next-line no-console
  console.error(`Element with id '${elementId}' was not found.`);
};

// Register gdlang language and theme
export const registerGDLangLanguage = () => {
  monaco.languages.register({ id: GDLangId });
  monaco.languages.setMonarchTokensProvider(GDLangId, GDLangMonarchTokens);
};

export const EditorOptions: monaco.editor.IStandaloneEditorConstructionOptions =
  {
    value: '',
    theme: GDLangTheme,
    language: GDLangId,
    fontSize: 20,
    fontFamily: 'Fira Code',
    fontLigatures: true,
    minimap: { enabled: false },
  };

export const ConsoleOptions: monaco.editor.IStandaloneEditorConstructionOptions =
  {
    theme: GDLangTheme,
    language: 'plaintext',
    fontSize: 18,
    fontFamily: 'Fira Code',
    readOnly: true,
    lineNumbers: 'off',
    minimap: { enabled: false },
    scrollbar: { vertical: 'hidden' },
  };
