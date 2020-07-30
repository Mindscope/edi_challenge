import { writable } from 'svelte/store'

const DEFAULT_AUTH_STATUS = { status: 'loading' };
const STORAGE_KEY = "authstore";

const createWritableStore = (key, startValue) => {
  const { subscribe, set } = writable(startValue);
  
  return {
    subscribe,
    set,
    useLocalStorage: () => {
      const json = localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }
      
      subscribe(current => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}

export const authStore = createWritableStore(STORAGE_KEY, DEFAULT_AUTH_STATUS);
export const logout = () => {
    authStore.set(STORAGE_KEY, JSON.stringify(DEFAULT_AUTH_STATUS));        
}


