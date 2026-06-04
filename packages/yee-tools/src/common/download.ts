/**
 * File download utility functions
 * @module common-utils
 */

/**
 * Download options interface
 */
export interface DownloadOptions {
  /**
   * Filename for the downloaded file
   */
  filename?: string;
  /**
   * Whether to revoke the object URL after download (default: true for blob URLs)
   */
  revokeObjectURL?: boolean;
  /**
   * Target attribute for the download link (default: '_self')
   */
  target?: string;
}

/**
 * Downloads a file from a URL by creating a temporary anchor element
 *
 * @param url - The URL of the file to download (supports http/https URLs and blob URLs)
 * @param filenameOrOptions - Filename string or download options object
 * @throws {Error} When URL is missing, not in a browser environment, or the download trigger fails
 *
 * @example
 * ```ts
 * download('https://example.com/file.pdf');
 * download('https://example.com/file.pdf', 'my-document.pdf');
 * download('https://example.com/file.pdf', { filename: 'my-document.pdf', target: '_blank' });
 * ```
 */
export function download(
  url: string,
  filenameOrOptions?: string | DownloadOptions,
): void {
  if (!url) {
    throw new Error("[download] URL is required");
  }

  if (typeof document === "undefined") {
    throw new Error("[download] This function can only be used in browser environment");
  }

  // Parse options
  let options: DownloadOptions;
  if (typeof filenameOrOptions === "string") {
    options = { filename: filenameOrOptions };
  } else {
    options = filenameOrOptions || {};
  }

  const {
    filename = new Date().toISOString().replace(/[:.]/g, "-"),
    revokeObjectURL: shouldRevoke = url.startsWith("blob:"),
    target = "_self",
  } = options;

  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = target;
    link.style.display = "none";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      if (shouldRevoke) {
        URL.revokeObjectURL(url);
      }
    }, 100);
  } catch (error) {
    throw error;
  }
}

/**
 * Downloads data as a file by creating a Blob
 *
 * @param data - The data to download (string, object, or Blob)
 * @param filename - Filename for the downloaded file
 * @param mimeType - MIME type of the file (default: 'text/plain' for strings, 'application/json' for objects)
 * @throws {Error} When filename is missing, or Blob creation / download fails
 *
 * @example
 * ```ts
 * downloadData('Hello, World!', 'hello.txt');
 * downloadData({ name: 'John', age: 30 }, 'data.json');
 * ```
 */
export function downloadData(
  data: string | object | Blob,
  filename: string,
  mimeType?: string,
): void {
  if (!filename) {
    throw new Error("[downloadData] Filename is required");
  }

  try {
    let blob: Blob;

    if (data instanceof Blob) {
      blob = data;
    } else if (typeof data === "object") {
      const jsonString = JSON.stringify(data, null, 2);
      blob = new Blob([jsonString], {
        type: mimeType || "application/json;charset=utf-8",
      });
    } else {
      blob = new Blob([data], {
        type: mimeType || "text/plain;charset=utf-8",
      });
    }

    const url = URL.createObjectURL(blob);
    download(url, { filename, revokeObjectURL: true });
  } catch (error) {
    throw error;
  }
}

/**
 * Downloads a file from a URL using fetch API (supports CORS and authentication)
 *
 * @param url - The URL of the file to download
 * @param filename - Filename for the downloaded file
 * @param fetchOptions - Optional fetch options (headers, credentials, etc.)
 * @returns Promise that resolves when download is complete
 * @throws {Error} When URL or filename is missing, HTTP request fails, or download fails
 *
 * @example
 * ```ts
 * await downloadFromUrl('https://api.example.com/file', 'document.pdf');
 * await downloadFromUrl('https://api.example.com/file', 'document.pdf', {
 *   headers: { 'Authorization': 'Bearer token123' }
 * });
 * ```
 */
export async function downloadFromUrl(
  url: string,
  filename: string,
  fetchOptions?: RequestInit,
): Promise<void> {
  if (!url) {
    throw new Error("[downloadFromUrl] URL is required");
  }

  if (!filename) {
    throw new Error("[downloadFromUrl] Filename is required");
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const blob = await response.blob();
  downloadData(blob, filename);
}

/**
 * Downloads a Base64 encoded string as a file
 *
 * @param base64Data - Base64 encoded string (with or without data URI prefix)
 * @param filename - Filename for the downloaded file
 * @param mimeType - MIME type of the file (default: extracted from data URI or 'application/octet-stream')
 * @throws {Error} When base64 data or filename is missing, or decoding fails
 *
 * @example
 * ```ts
 * downloadBase64('data:image/png;base64,iVBORw0KG...', 'image.png');
 * downloadBase64('iVBORw0KG...', 'image.png', 'image/png');
 * ```
 */
export function downloadBase64(
  base64Data: string,
  filename: string,
  mimeType?: string,
): void {
  if (!base64Data) {
    throw new Error("[downloadBase64] Base64 data is required");
  }

  if (!filename) {
    throw new Error("[downloadBase64] Filename is required");
  }

  let base64String = base64Data;
  let detectedMimeType = mimeType;

  // Check if data URI format
  if (base64Data.startsWith("data:")) {
    const matches = base64Data.match(/^data:([^;]+);base64,(.+)$/);
    if (matches) {
      detectedMimeType = detectedMimeType || matches[1];
      base64String = matches[2] as string;
    }
  }

  // Convert base64 to binary
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([bytes], {
    type: detectedMimeType || "application/octet-stream",
  });

  downloadData(blob, filename);
}
