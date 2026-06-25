import type { ElementInfo } from './interface';

/**
 * Default prompt template, tuned for codebase-aware AI assistants (Cursor /
 * Claude Code / IDE Copilot). The AI already has the repo, so the payload is a
 * precise pointer — source location + selector — followed by an empty
 * "What I want" line for the user to fill in before pasting into their AI.
 */
export function buildDefaultPrompt(info: ElementInfo): string {
  const lines: string[] = ['Modify this region:'];

  if (info.fileName) {
    const location = info.lineNumber
      ? `${info.fileName}:${info.lineNumber}`
      : info.fileName;
    lines.push(`- Location: ${location}`);
  }
  if (info.selector) {
    lines.push(`- Selector: ${info.selector}`);
  }

  lines.push('', 'What I want:', '');
  return lines.join('\n');
}

/**
 * Copy text to the clipboard via the async Clipboard API. Returns `false` when
 * the write is rejected (e.g. permissions denied or an insecure context) so the
 * caller can surface a manual-select fallback.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
