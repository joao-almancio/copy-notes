export type Entry = {
    name: string;
    items: string[];
}

export type Storage = {
    set: (entry: Entry) => void;
    getAll: () => Promise<Entry[]>
}

export function useStorage() {
    function set({items, name}: Entry) {
        console.log()
        if (!items || !name) {
            throw new Error("[Entry] não pode ser vazia")
        }
        if (typeof name !== 'string') {
            throw new Error("Todos os valores de [Entry.name] deve ser string")
        }
        for (let item of items) {
            if (typeof item !== 'string') {
                throw new Error(`Todos os valores de [Entry.items] deve ser um array de string`)
            }
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
