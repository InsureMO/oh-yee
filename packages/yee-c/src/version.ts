declare global {
  interface Window {
    __yee_c_version__: string;
  }
}

export const version = "0.6.4";

if (typeof window !== 'undefined') {
  window.__yee_c_version__ = version;
}
