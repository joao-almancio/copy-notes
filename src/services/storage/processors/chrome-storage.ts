import { Entry, Storage } from '../storage.js';

export type CopyNotesStorage = {
  copyNotesStorage: Entry[]
}

export function useChromeStorage() {
  function writeChromeStorage(entries: Entry[]) {
    chrome.storage.sync.set({
      copyNotesStorage: entries
    })
  }

  function set(group: string, value: string, groupIndex?: number, valueIndex?: number) {
    getAll().then(entries => {
      console.log("Valor obtido antes de alterar", entries)
      if (!entries) {
        writeChromeStorage([{[group]: [value]}]);
        console.log("Storage iniciado")
        return;
      }

      const newEntries = entries.reduce((output, entry) => {
        console.log("Entrada no reduce", Object.keys(entry)[0]?.match(group))

        if (!Object.keys(entry)[0]?.match(group)) {
          output = [...entries, {[group]: [value]}]
          console.log("Novo valor")
        }

        return [...output]
      }, [] as Entry[])

      writeChromeStorage(newEntries);

    })
  }

  function getAll() {
    return new Promise<Entry[]>((resolve, _reject) => {
      chrome.storage.sync.get(null, (data) => {
        const entries = (data as CopyNotesStorage).copyNotesStorage;
        resolve(entries);
      })
    })
  }

  function clear() {
    chrome.storage.sync.clear();
  }

  return {
    set,
    getAll,
    clear
  } as Storage
}