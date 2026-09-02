const readAllEntries = (
  reader: FileSystemDirectoryReader,
): Promise<FileSystemEntry[]> => {
  return new Promise((resolve, reject) => {
    const entries: FileSystemEntry[] = [];

    const readNextBatch = () => {
      reader.readEntries((batch) => {
        if (batch.length === 0) {
          resolve(entries);
          return;
        }
        entries.push(...batch);
        readNextBatch();
      }, reject);
    };

    readNextBatch();
  });
};

const readFile = (entry: FileSystemFileEntry): Promise<File> => {
  return new Promise((resolve, reject) => {
    entry.file((file) => {
      const path = entry.fullPath.replace(/^\//, '');
      Object.defineProperty(file, 'webkitRelativePath', {
        configurable: true,
        value: path,
      });
      resolve(file);
    }, reject);
  });
};

export default async function folderScanner(
  entry: FileSystemEntry,
  filesList: File[] = [],
): Promise<File[]> {
  if (entry.isFile) {
    filesList.push(await readFile(entry as FileSystemFileEntry));
    return filesList;
  }

  if (entry.isDirectory) {
    const reader = (entry as FileSystemDirectoryEntry).createReader();
    const entries = await readAllEntries(reader);
    const nestedFiles = await Promise.all(
      entries.map((nestedEntry) => folderScanner(nestedEntry, [])),
    );
    filesList.push(...nestedFiles.flat());
  }

  return filesList;
}
