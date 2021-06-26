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


