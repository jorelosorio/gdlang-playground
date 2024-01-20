// WIP: This is a work in progress. It is not currently used in the project.
export function formatGdLangCode(code: string) {
  const lines = code.split('\n');
  let formattedCode = '';
  let indentLevel = 0;

  lines.forEach((line: string) => {
    line = line.trim();

    if (line.startsWith('set') || line.startsWith('write')) {
      formattedCode += ' '.repeat(indentLevel * 4) + line + '\n';
    } else if (line.startsWith('if')) {
      formattedCode += ' '.repeat(indentLevel * 4) + line + '\n';
      indentLevel++;
    } else if (line.startsWith('elsif') || line.startsWith('else')) {
      indentLevel--;
      formattedCode += ' '.repeat(indentLevel * 4) + line + '\n';
      indentLevel++;
    } else if (line === 'end') {
      indentLevel--;
      formattedCode += ' '.repeat(indentLevel * 4) + line + '\n';
    } else {
      formattedCode += ' '.repeat(indentLevel * 4) + line + '\n';
    }
  });

  return formattedCode.trim();
}
