declare global {
  interface Window {
    __yee_c_version__: string;
  }
}

export const version = "0.15.8";

if (typeof window !== 'undefined') {
  window.__yee_c_version__ = version;
}
