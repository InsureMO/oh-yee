export default async function folderScanner(
  entry: FileSystemFileEntry | FileSystemDirectoryEntry,
  filesList: any[],
) {
  return new Promise((resolve, reject) => {
    if (entry.isDirectory) {
      const directoryReader = (
        entry as FileSystemDirectoryEntry
      ).createReader();
      directoryReader.readEntries(
        async (entries: any[]) => {
          entries.forEach(async (entry: any, index: number) => {
            await folderScanner(entry, filesList);
            if (index === entries.length - 1) {
              resolve(filesList);
            }
          });
        },
        (e: any) => {
          reject(e);
        },
      );
    } else if (entry.isFile) {
      (entry as FileSystemFileEntry).file(
        async (file: any) => {
          const path = entry.fullPath.substring(1);
          /** Modifying webkitRelativePath is the core operation, because in drag events webkitRelativePath is empty, and webkitRelativePath is read-only so normal assignment won't work. Currently the only way is to use this method to assign entry.fullPath to webkitRelativePath **/
          const newFile = Object.defineProperty(file, 'webkitRelativePath', {
            value: path,
          });
          filesList.push(newFile);
          resolve(filesList);
        },
        (e: any) => {
          reject(e);
        },
      );
    }
  });
}
