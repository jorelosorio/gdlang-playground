import * as monaco from 'monaco-editor';
import { formatGdLangCode } from './formatter';
import { GDLangError, GDLangRun } from './interpreter';

export const addRunCommand = (
  mainEditor: monaco.editor.IStandaloneCodeEditor,
  consoleEditor: monaco.editor.IStandaloneCodeEditor,
) => {
  mainEditor?.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
    run(mainEditor, consoleEditor);
  });
};

export const addActions = (mainEditor: monaco.editor.IStandaloneCodeEditor) => {
  mainEditor.addAction({
    id: 'format-gdlang',
    label: 'Format GDLang Code',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF],
    run: function (editor) {
      const unformattedCode = editor.getValue();
      const formattedCode = formatGdLangCode(unformattedCode);
      editor.setValue(formattedCode);
    },
  });
};

const mapErrorsToMonacoMarkers = (
  errors: GDLangError[],
): monaco.editor.IMarkerData[] => {
  return errors.map(
    (error: GDLangError) =>
      ({
        startLineNumber: error.StartLineNumber,
        endLineNumber: error.StopLineNumber,
        startColumn: error.StartColumn + 1,
        endColumn: (error.StopColumn ?? error.StartColumn) + 1,
        message: `${error.ErrorMessage}`,
        severity: monaco.MarkerSeverity.Error,
      }) as monaco.editor.IMarkerData,
  );
};

export function run(
  mainEditor: monaco.editor.IStandaloneCodeEditor,
  consoleEditor: monaco.editor.IStandaloneCodeEditor,
) {
  const code = mainEditor.getValue();
  GDLangRun(code).then((result) => {
    if (result.errors.length > 0)
      return updateMonacoMarkersWithErrors(result.errors, mainEditor);
    consoleEditor?.setValue(result.output.toString());
  });
}

function updateMonacoMarkersWithErrors(
  errors: GDLangError[],
  mainEditor: monaco.editor.IStandaloneCodeEditor,
) {
  const editorModel = mainEditor?.getModel();
  const markers = mapErrorsToMonacoMarkers(errors);
  editorModel && monaco.editor.setModelMarkers(editorModel, 'owner', markers);
}
