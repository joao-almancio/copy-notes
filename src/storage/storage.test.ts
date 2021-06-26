import { useStorage, Entry } from "./storage"

const mockGoodEntry = {
    name: "Grupo",
    items: expect.any(Array)
} as Entry;
const mockNullEntry = { } as Entry;

const mockNotStringEntry = {
    name: 1,
    items: [1, 2, "João"]   
}


// [useStorage]
test('[useStorage] should return a Storage object', () => {
    const desiredStorage = expect.objectContaining({
        getAll: expect.any(Function),
        set: expect.any(Function),
    })

    const storage = useStorage();
    return expect(storage).toMatchObject(desiredStorage);
});


// [useStorage.get]
test('[useStorage.get] should return a promise', () => {
    const { getAll } = useStorage();

    return expect(getAll()).toBeInstanceOf(Promise);
});


// [useStorage.set]
test('[useStorage.set] should throw an error if the Entry is null', () => {
    const { set } = useStorage();
    
    expect(() => {set(mockNullEntry)}).toThrow("Entry não pode ser vazia");
});
test('[useStorage.set] should throw an error if the Entry.name values are not string', () => {
    const { set } = useStorage();
    
    expect(() => {set(mockNullEntry)}).toThrow("Todos os valores de Entry.name deve ser string");
});
test('[useStorage.set] should throw an error if the Entry.items values are not array of string', () => {
    const { set } = useStorage();
    
    expect(() => {set(mockNullEntry)}).toThrow("Todos os valores de Entry.name deve ser um array de string");
});