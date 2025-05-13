// Centralized Storage Module

const Storage = {
    getItem: (key, storageType = 'localStorage') => {
      const storage = storageType === 'sessionStorage' ? sessionStorage : localStorage;
      return JSON.parse(storage.getItem(key) || 'null');
    },
  
    setItem: (key, value, storageType = 'localStorage') => {
      const storage = storageType === 'sessionStorage' ? sessionStorage : localStorage;
      storage.setItem(key, JSON.stringify(value));
    },
  
    removeItem: (key, storageType = 'localStorage') => {
      const storage = storageType === 'sessionStorage' ? sessionStorage : localStorage;
      storage.removeItem(key);
    }
  };
  
  export default Storage;