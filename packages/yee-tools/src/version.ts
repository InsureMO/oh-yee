declare const __YEE_TOOLS_VERSION__: string;

declare global {
  interface Window {
    __yee_tools_version__: string;
  }
}

export const version = __YEE_TOOLS_VERSION__;

if (typeof window !== 'undefined') {
  window.__yee_tools_version__ = version;
}
