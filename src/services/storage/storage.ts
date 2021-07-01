
export type Entry = {
    name: string;
    items: string[];
}

export type CopyNotesStorage = {
    copyNotes: Entry[]
}

export type Storage = {
    set: (entry: Entry) => void;
    getAll: () => Promise<Entry[]>;
    clear: () => void;
    readonly storageName: string
}

export function useStorage(storageProcessor: Storage, storageName: string = "copyNotes") {
    if (!validateStorageProcessor(storageProcessor)) {
        return emitError("Parâmetro storageProcessor não é válido");
    }
    function validateStorageProcessor(processor: Storage) {
        const keys = ['set', 'getAll', 'clear', 'storageName']
        for (let i=0; i < keys.length; i++) {
            if (!Object.keys(processor).includes(keys[i] as string) || !processor) {
                return false
            }
        }
        return true
    }

    function emitError(message: string) {
        const error = new Error(message);
        console.error(error)
        return error
    }

    function set({ items, name }: Entry) {
        if (!items || !name) {
            return emitError("[Entry] não pode ser vazia")
        }
        if (typeof name !== 'string') {
            return emitError("Todos os valores de [Entry.name] deve ser string")
        }
        for (let item of items) {
            if (typeof item !== 'string') {
                return emitError(`Todos os valores de [Entry.items] deve ser um array de string`)
            }
        }
    }

    function getAll() {
        return new Promise<Entry[]>((resolve, reject) => {
            chrome.storage.sync.get(null, ((data) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError)
                }

                resolve((data as CopyNotesStorage).copyNotes)
            }))
        })
    }

    function clear() {
        chrome.storage.sync.clear();
    }

    return {
        getAll,
        set,
        clear,
        storageName
    } as Storage
}
