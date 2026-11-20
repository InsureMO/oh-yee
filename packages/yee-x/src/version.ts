declare global {
  interface Window {
    __yee_x_version__: string;
  }
}

export const version = "0.6.0";

if (typeof window !== 'undefined') {
  window.__yee_x_version__ = version;
}
