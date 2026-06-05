/**
 * yee-c I18n Manager - Optimized version
 *
 * Key improvements:
 * 1. Fix subscription system bug (don't clear subscribers)
 * 2. Add unsubscribe mechanism
 * 3. Implement fallback logic
 * 4. Support interpolation
 * 5. Improve type definitions
 * 6. Optimize useTranslation hook
 */

type TranslationResources = Record<string, Record<string, string>>;

interface InitParams {
  lng: string;
  fallbackLng: string;
  resources: TranslationResources;
}

type SubscriptionCallback = (args?: { key: string; value: any }) => void;

class MI18n {
  private languages: TranslationResources = {};
  private state = 'uninitialized';
  private messages: Record<string, SubscriptionCallback[]> = {};
  private lng = '';
  private fallbackLng = '';
  private lngs: string[] = [];

  /**
   * Publish event
   */
  private publisher(key: string, args?: { key: string; value: any }) {
    const events = this.messages[key] || [];
    // Fix: Use forEach instead of while + shift, don't clear subscriber array
    events.forEach((cb) => cb?.(args));
  }

  /**
   * Listen for sessionStorage changes
   */
  private listen() {
    const handler = (event: Event) => {
      // @ts-ignore
      if (event.detail?.key === 'system_i18nKey') {
        // @ts-ignore
        this.lng = event.detail.value;
        this.publisher('lng', { key: 'lng', value: this.lng });
      }
    };
    window.addEventListener('enSessionStorageChange', handler);
  }

  /**
   * Subscribe to event
   * @returns Unsubscribe function
   */
  subscriber(key: string, cb: SubscriptionCallback): () => void {
    if (!this.messages[key]) {
      this.messages[key] = [];
    }
    this.messages[key].push(cb);

    // Return unsubscribe function
    return () => {
      const index = this.messages[key].indexOf(cb);
      if (index > -1) {
        this.messages[key].splice(index, 1);
      }
    };
  }

  /**
   * Initialize i18n
   */
  initialization(params: InitParams) {
    const { lng, fallbackLng, resources } = params;
    this.languages = resources;
    this.fallbackLng = fallbackLng;
    this.lng = lng;
    this.lngs = Object.keys(resources || {});
    this.state = 'initialized';
    this.publisher('state', { key: 'state', value: this.state });
    this.listen();
    return this;
  }

  /**
   * Dynamically set language
   */
  setLanguage(key: string, value: Record<string, string>) {
    this.languages[key] = value;
    this.lngs = Object.keys(this.languages);
  }

  /**
   * Get translation object for the current language
   */
  getLanguage() {
    return this.languages[this.lng] || {};
  }

  /**
   * Get a single translation text, supports fallback
   */
  getTranslation(key: string): string | undefined {
    // 1. Try current language
    const currentLang = this.languages[this.lng];
    if (currentLang?.[key]) {
      return currentLang[key];
    }

    // 2. Fallback to fallback language
    const fallbackLang = this.languages[this.fallbackLng];
    if (fallbackLang?.[key]) {
      return fallbackLang[key];
    }

    return undefined;
  }

  /**
   * Translation function, supports interpolation
   */
  t(key: string, params?: Record<string, any>): string {
    const message = this.getTranslation(key);

    if (!message) {
      // @ts-nocheck
      // @ts-ignore
      if (import.meta?.env?.NODE_ENV !== 'production') {
        console.warn(
          `[I18n] Missing translation: "${key}" for language "${this.lng}"`,
        );
      }
      return key;
    }

    // Support interpolation
    if (params) {
      return message.replace(/\{(\w+)\}/g, (_, paramKey) => {
        return params[paramKey] !== undefined
          ? String(params[paramKey])
          : `{${paramKey}}`;
      });
    }

    return message;
  }

  /**
   * @deprecated Use getLanguage() instead
   */
  translate() {
    const lg = this.getLanguage();
    return lg;
  }

  /**
   * Get fallback language
   */
  getFallbackLng() {
    return this.fallbackLng;
  }

  /**
   * Set current language
   */
  setLng(key: string) {
    this.lng = key;
    this.publisher('lng', { key: 'lng', value: key });
  }

  /**
   * Get current language code
   */
  getLng() {
    return this.lng;
  }

  /**
   * Get all supported languages
   */
  getLngs() {
    return this.lngs;
  }

  /**
   * Get state
   */
  getState() {
    return this.state;
  }

  /**
   * Check if initialized
   */
  isInitialized() {
    return this.state === 'initialized';
  }

  /**
   * Reset state
   */
  reset() {
    this.state = 'uninitialized';
    this.lng = '';
    this.messages = {};
  }
}

const i18n = new MI18n();

export default i18n;
export type { InitParams, TranslationResources };
