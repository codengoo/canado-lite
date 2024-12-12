export const storage = {
  getItem: async (key: string) => {
    return await window.api.getStorage(key);
  },
  setItem: async (key: string, value: object) => {
    return await window.api.setStorage(key, value);
  },
  removeItem: async (key: string) => {
    return await window.api.removeStorage(key);
  },
};
