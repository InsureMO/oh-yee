export interface SourceLocation {
  fileName: string;
  lineNumber: number;
  columnNumber?: number;
}

export interface SourceSnippet {
  lines: { lineNo: number; content: string }[];
  errorLine: number;
}

/**
 * Parse the first user code location from error.stack
 * Format: "at functionName (http://host/path/file.js:10:5)" or "at http://host/path/file.js:10:5"
 */
export function parseSourceLocation(stack: string | undefined): SourceLocation | null {
  if (!stack) return null;

  const lines = stack.split('\n');
  for (const line of lines) {
    // Match (file:line:col) or file:line:col
    const match = line.match(/\(?(https?:\/\/[^)]+):(\d+):(\d+)\)?$/);
    if (match) {
      const fullUrl = match[1];
      // Exclude node_modules / vendor / react internal frames
      if (
        /node_modules/.test(fullUrl) ||
        /react(-dom)?[./]/.test(fullUrl) ||
        /chunk/.test(fullUrl)
      ) {
        continue;
      }
      return {
        fileName: fullUrl,
        lineNumber: parseInt(match[2], 10),
        columnNumber: parseInt(match[3], 10),
      };
    }
  }
  return null;
}

/**
 * Fetch source file content and extract code around the error line in dev mode
 */
export async function fetchSourceSnippet(
  location: SourceLocation,
  contextLines = 5,
): Promise<SourceSnippet | null> {
  try {
    const res = await fetch(location.fileName);
    if (!res.ok) return null;
    const raw = await res.text();
    const allLines = raw.split('\n');
    const errorLine = location.lineNumber;
    const start = Math.max(1, errorLine - contextLines);
    const end = Math.min(allLines.length, errorLine + contextLines);
    const lines = [];
    for (let i = start; i <= end; i++) {
      lines.push({ lineNo: i, content: allLines[i - 1] });
    }
    return { lines, errorLine };
  } catch {
    return null;
  }
}
