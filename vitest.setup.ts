import "@testing-library/jest-dom/vitest";

// On some Node versions, Node's own experimental global `localStorage`
// collides with jsdom's `window.localStorage`, leaving it undefined. Provide
// a minimal, deterministic polyfill so tests don't depend on which Node
// version (and its webstorage behavior) happens to run them.
if (typeof window !== "undefined" && !window.localStorage) {
  const store = new Map<string, string>();
  const memoryLocalStorage: Storage = {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => {
      store.set(key, String(value));
    },
    removeItem: (key) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
    key: (index) => Array.from(store.keys())[index] ?? null,
    get length() {
      return store.size;
    },
  };

  Object.defineProperty(window, "localStorage", {
    value: memoryLocalStorage,
    configurable: true,
  });
}
