import { createStore } from "solid-js/store";

class CommonFunction {
  getPersistentStoreKey(key: string) {
    return `${window._appConfig?.prefixLocalStorage}${key}`;
  }
  createPersistentStore<T extends object>(key: string, initialValue: T) {
    const _this = this;
    const normalizeKey = _this.getPersistentStoreKey(key);
    const saved = localStorage.getItem(normalizeKey);
    const parsed = saved ? JSON.parse(saved) : initialValue;
    const [store, setStore] = createStore<T>(parsed);

    // ghi đè localStorage khi store thay đổi
    const write = (value: Partial<T>) => {
      setStore({ ...store, ...value });
      localStorage.setItem(
        normalizeKey,
        JSON.stringify({ ...store, ...value })
      );
    };
    return [store, write] as const;
  }
}

const commonFn = new CommonFunction();
export default commonFn;
