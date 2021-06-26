export interface Entry {
    name: string;
    items: string[];
}

export interface Storage {
    set: (entry: Entry) => void;
    getAll: () => Promise<Entry[]>
}

export function useStorage() {
    function set(entry: Entry) {
        if (!entry.items || !entry.name) {
            throw new Error("Entry não pode ser vazia")
        }
    }

    function getAll() {
        return new Promise<Entry[]>((resolve, reject) => {
            resolve([] as Entry[])
        })
    }

    return {
        getAll,
        set,
    }
}
