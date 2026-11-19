/**
 * Copy text to the clipboard. Tries the async Clipboard API first and falls
 * back to a hidden `textarea` + `execCommand` for non-secure contexts.
 * Returns `true` when the write succeeded.
 */
export async function copyText(text: string): Promise<boolean> {
  if (!text) {
    return false;
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    let ok = false;
    try {
      textarea.select();
      ok = document.execCommand('copy');
    } finally {
      document.body.removeChild(textarea);
    }
    return ok;
  } catch {
    return false;
  }
}
