export const isWebp = () => {
    const testWebP = (callback) => {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP((support) => {
        document.documentElement.classList.add(support === true ? 'webp' : 'no-webp');
    });
}

export const menu = () => {
    document.querySelector('[menu-btn]').addEventListener('click', () => {
        document.querySelector('[menu-list]').classList.toggle('active');
        document.querySelector('[menu-btn]').classList.toggle('active');
    })
}