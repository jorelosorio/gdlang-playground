import './style.css';
import {
  ConsoleOptions,
  EditorOptions,
  createEditor,
  registerGDLangLanguage,
} from './editor';
import { defineGDLangTheme } from './theme';
import { ConsoleId, EditorId } from './constants';
import { addActions, addRunCommand, run } from './editor-actions';
import { populateExamples } from './populate-examples';
import { editor } from 'monaco-editor';

// Register gdlang language and theme
registerGDLangLanguage();
defineGDLangTheme();

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize editors
  const mainEditor = createEditor(EditorId, EditorOptions);
  const consoleEditor = createEditor(ConsoleId, ConsoleOptions);

  // Setup editor actions and listeners
  if (mainEditor && consoleEditor) {
    addRunCommand(mainEditor, consoleEditor);
    addActions(mainEditor);
  }

  const runButton = document.getElementById('run-button');
  runButton?.addEventListener('click', () => {
    if (mainEditor && consoleEditor) run(mainEditor, consoleEditor);
  });

  const clearButton = document.getElementById('clear-button');
  clearButton?.addEventListener('click', () => {
    if (consoleEditor) consoleEditor.setValue('');
  });

  // Populate examples
  const examplesDropdown = document.getElementById(
    'examples-dropdown',
  ) as HTMLSelectElement;
  if (examplesDropdown) {
    examplesDropdown.addEventListener('change', (event) => {
      const target = event.target as HTMLSelectElement;
      if (target.value) loadScript(target.value, mainEditor);
    });

    await populateExamples(examplesDropdown);
    loadScript(examplesDropdown.value, mainEditor);
  }
});

function loadScript(
  scriptPath: string,
  mainEditor: editor.IStandaloneCodeEditor | undefined,
) {
  fetch(`static/examples/${scriptPath}`)
    .then((response) => response.text())
    .then((data) => {
      mainEditor?.setValue(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
