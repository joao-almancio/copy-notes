import { useStorage } from "./services/storage/storage.js";

const storage = useStorage();

const showElement = ((element: HTMLElement, makeVisible: boolean) => {
    element.style.transition = "opacity 200ms";
    if (makeVisible) {
        element.style.opacity = "1";
        return
    }

    element.style.opacity = "0";
})

function updateClipboard(newClip: string) {
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
            navigator.clipboard.writeText(newClip);
        }
    })
}

document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener("click", (event: Event) => {
        const buttonText = (event.target as HTMLElement).innerText;
        updateClipboard(buttonText)
    })
})


storage.set({name: "Pessoal", items: ["item 1", "item 2"]})
storage.set({name: "Pessoal 2", items: ["item 1", "item 2"]})
document.querySelector('.showCache')?.addEventListener("click", () => {
    storage.getAll().then(data => {
        
    })
})
document.querySelector('.clear')?.addEventListener("click", () => {
    storage.clear()
})
