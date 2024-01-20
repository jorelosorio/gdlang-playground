import { readdirSync, statSync, writeFileSync } from 'fs';
import { basename, extname, join } from 'path';
import { FolderStructure } from '../src/folder-structure';

function getGdFiles(dir: string, baseDir: string = ''): FolderStructure[] {
  const dirs: FolderStructure[] = [];

  const files = readdirSync(dir);
  files.forEach((file) => {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    const relativePath = join(baseDir, file);
    if (stat.isDirectory()) {
      dirs.push({
        path: relativePath,
        name: file,
        children: getGdFiles(fullPath, relativePath),
      });
    } else if (file.endsWith('.gd')) {
      dirs.push({
        name: basename(relativePath, extname(file)),
        path: relativePath,
      });
    }
  });

  return dirs;
}

const folderStructure = getGdFiles('./.gen/examples');

writeFileSync('./.gen/examples.json', JSON.stringify(folderStructure, null, 2));
