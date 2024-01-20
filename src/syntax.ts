import * as monaco from 'monaco-editor';

export const gdlangMonarchTokens: monaco.languages.IMonarchLanguage = {
  defaultToken: 'invalid',
  tokenPostfix: '.gd',

  keywords: [
    'set',
    'if',
    'else',
    'struct',
    'extends',
    'fn',
    'return',
    'in',
    'for',
  ],

  typeKeywords: [
    'number',
    'string',
    'boolean',
    'nil',
    'any',
    'self',
    'true',
    'false',
  ],

  operators: [
    '=',
    '>',
    '<',
    'not',
    '?',
    ':',
    '==',
    '<=',
    '>=',
    '!=',
    'and',
    'or',
    '+',
    '-',
    '*',
    '/',
    '^',
    '%',
  ],

  // Define the symbols
  escapes:
    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,
  symbols: /[=><!~?:&|+\-*/^%]+/,

  // The tokenizer rules
  tokenizer: {
    root: [{ include: 'common' }],

    common: [
      [
        /[a-zA-Z_$][\w$]*/,
        {
          cases: {
            '@typeKeywords': 'keyword',
            '@keywords': 'keyword',
            '@default': 'identifier',
          },
        },
      ],
      { include: 'whitespace' },

      // Separate colors for different brackets
      [/[{}]/, 'delimiter.curly'],
      [/[()]/, 'delimiter.parenthesis'],
      [/[[\]]/, 'delimiter.square'],
      [/[::]/, 'delimiter.block'],

      [
        /@symbols/,
        {
          cases: {
            '@operators': 'delimiter',
            '@default': '',
          },
        },
      ],

      [/(@digits)[eE]([-+]?(@digits))?/, 'number.float'],

      [/(@digits)\.(@digits)([eE][-+]?(@digits))?/, 'number.float'],

      [/(@digits)/, 'number'],

      // strings
      [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
      [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

      [/[,.]/, 'delimiter'],
    ],

    whitespace: [
      [/[ \t\r\n]+/, ''],
      [/\/\*\*(?!\/)/, 'comment.doc', '@gddoc'],
      [/\/\*/, 'comment', '@comment'],
      [/\/\/.*$/, 'comment'],
    ],

    comment: [
      [/[^/*]+/, 'comment'],
      [/\*\//, 'comment', '@pop'],
      [/[/*]/, 'comment'],
    ],

    gddoc: [
      [/[^/*]+/, 'comment.doc'],
      [/\*\//, 'comment.doc', '@pop'],
      [/[/*]/, 'comment.doc'],
    ],

    string: [
      [/[^\\"]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
    ],
  },
};
