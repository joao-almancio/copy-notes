
import { useStorage, Entry } from "./storage"

// [useStorage]
describe("useStorage", () => {
    test('[useStorage] should return a Storage object', () => {
        const desiredStorage = expect.objectContaining({
            getAll: expect.any(Function),
            set: expect.any(Function),
            clear: expect.any(Function),
            storageName: expect.any(String)
        })

        const storage = useStorage(desiredStorage);
        console.log("Entradas", Object.entries(storage))
        return expect(storage).toMatchObject(desiredStorage);
    });

    test('[useStorage] should return an error if storageProcessor param is not valid', () => {
        // @ts-ignore
        return expect(useStorage({})).toBeInstanceOf(Error);
    })
})


// [useStorage.get]
describe("[useStorage.get]", () => {
    test('[useStorage.get] should return a promise', () => {
        const { getAll } = useStorage();

        return expect(getAll()).toBeInstanceOf(Promise);
    });
})


// [useStorage.set]
describe("[useStorage.set]", () => {
    test('Should return an error if the Entry is null', () => {
        const { set } = useStorage();

        // @ts-ignore
        expect(set({})).toBeInstanceOf(Error);

    });

    test('Should return an error if the Entry.name values are not string', () => {
        const { set } = useStorage();

        // @ts-ignore
        expect(set({ name: 1, items: ["item 1"] })).toBeInstanceOf(Error);

    });

    test('Should return an error if the [Entry.items] values is not an array of string', () => {
        const { set } = useStorage();

        // @ts-ignore
        expect(set({ name: "João", items: ["João", 123] })).toBeInstanceOf(Error);
    });
})
