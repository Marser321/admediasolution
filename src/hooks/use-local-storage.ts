import { useCallback, useSyncExternalStore } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Subscribe to storage changes
  const subscribe = useCallback((callback: () => void) => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === key) {
        callback();
      }
    };
    window.addEventListener('storage', onStorage);

    // Custom event for local updates in the same tab
    const onCustomStorage = (event: CustomEvent) => {
      if (event.detail.key === key) {
        callback();
      }
    };
    window.addEventListener('local-storage-update', onCustomStorage as EventListener);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('local-storage-update', onCustomStorage as EventListener);
    };
  }, [key]);

  // Get client snapshot
  const getSnapshot = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? item : JSON.stringify(initialValue);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return JSON.stringify(initialValue);
    }
  };

  // Get server snapshot
  const getServerSnapshot = () => JSON.stringify(initialValue);

  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = (() => {
    try {
      return store ? (JSON.parse(store) as T) : initialValue;
    } catch (error) {
      console.warn(`Error parsing localStorage key "${key}":`, error);
      return initialValue;
    }
  })();

  const setValue = useCallback((valueOrFn: T | ((val: T) => T)) => {
    try {
      const newValue = valueOrFn instanceof Function ? valueOrFn(value) : valueOrFn;

      if (newValue === undefined) {
          window.localStorage.removeItem(key);
      } else {
          window.localStorage.setItem(key, JSON.stringify(newValue));
      }

      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('local-storage-update', { detail: { key } }));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
