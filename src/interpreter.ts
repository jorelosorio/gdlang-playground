require('./static/wasm_exec.js');

export type GDLangError = {
  StartLineNumber: number;
  StopLineNumber: number;
  StartColumn: number;
  StopColumn: number;
  ErrorMessage: string;
  Operation: string;
  Severity: string;
};

export type GDLangResponse = {
  output: string;
  errors: GDLangError[];
};

const _global = window || global;

export const GDLangRun = async (code: string): Promise<GDLangResponse> => {
  const go = new _global['Go']();
  return WebAssembly.instantiateStreaming(
    fetch('./static/gdlang.wasm'),
    go.importObject,
  ).then((result) => {
    go.run(result.instance);
    const response = _global['run'](code);
    try {
      const json = JSON.parse(response);
      return {
        output: json.output,
        errors: json.errors,
      };
    } catch (e) {
      return {
        output: response,
        errors: [],
      };
    }
  });
};
