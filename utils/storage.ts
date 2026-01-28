// Simple storage utility that works without AsyncStorage
// Uses localStorage for web and in-memory storage for native

class SimpleStorage {
  private storage: Map<string, string> = new Map();

  async getItem(key: string): Promise<string | null> {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return this.storage.get(key) || null;
  }

  async setItem(key: string, value: string): Promise<void> {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    } else {
      this.storage.set(key, value);
    }
  }

  async removeItem(key: string): Promise<void> {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    } else {
      this.storage.delete(key);
    }
  }
}

export default new SimpleStorage();
