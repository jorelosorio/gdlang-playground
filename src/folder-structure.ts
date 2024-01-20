export type FolderStructure = {
  name: string;
  path: string;
  children?: FolderStructure[];
};
