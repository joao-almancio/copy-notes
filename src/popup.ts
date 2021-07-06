import { useStorage } from "./services/storage/storage.js";
import { useChromeStorage } from "./services/storage/processors/chrome-storage.js"

const chromeStorageProcessor = useChromeStorage()
const storage = useStorage(chromeStorageProcessor);

// const showElement = ((element: HTMLElement, makeVisible: boolean) => {
//     element.style.transition = "opacity 200ms";
//     if (makeVisible) {
//         element.style.opacity = "1";
//         return
//     }
//     element.style.opacity = "0";
// })

function updateClipboard(newClip: string) {
  navigator.permissions.query({ name: "clipboard-write" }).then(result => {
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


storage.set("Bia", "Ana Catarina");
storage.set("Biaa", "Xuão");

document.querySelector('.show-cache')?.addEventListener("click", () => {
  storage.getAll().then(data => {
    console.log(data)
  })
})
document.querySelector('.clear')?.addEventListener("click", () => {
  storage.clear()
})
