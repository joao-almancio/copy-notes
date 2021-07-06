import { emitError } from '../../utils/error-emitter.js';

export type Entry = {
  [key: string]: string[];
}

export type Storage = {
  set: (group: string, value: string, groupIndex?: number, valueIndex?: number) => void;
  getAll: () => Promise<Entry[]|undefined>;
  clear: () => void;
}

export function useStorage(storageProcessor: Storage) {
  if (!validateStorageProcessor(storageProcessor)) {
    throw new Error('[storageProcessor] param is not valid');
  }
  function validateStorageProcessor(processor: Storage) {
    const keys = ['set', 'getAll', 'clear']
    for (let i = 0; i < keys.length; i++) {
      if (!Object.keys(processor).includes(keys[i] as string) || !processor) {
        return false
      }
    }
    return true
  }

  function set(group: string, value: string) {
    if (!group || !value) {
      emitError("Os parâmetros não podem ser vazios")
      return
    }

    storageProcessor.set(group, value);
  }

  async function getAll() {
    return storageProcessor.getAll();
  }

  function clear() {
    storageProcessor.clear();
  }

  return {
    getAll,
    set,
    clear
  } as Storage
}