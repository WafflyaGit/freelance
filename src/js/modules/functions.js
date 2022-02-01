"use strict";
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

export const spoilers = () => {
    
    const scrollDown = (target, to, duration) => {
        target.hidden ? target.hidden = false : "";
        if (parseFloat(target.style.height) < parseFloat(to)) {
            return window.requestAnimationFrame(() => { 
                target.style.height = parseFloat(target.style.height) + to / duration * 100 + 'px';
                scrollDown(target, to, duration);
            });
        }
    }

    const scrollUp = (target, from, duration) => {
        if (parseFloat(target.style.height) >= (from / duration * 100) + 1) {
            return window.requestAnimationFrame(() => { 
                target.style.height = parseFloat(target.style.height) - from / duration * 100 + 'px';
                scrollUp(target, from, duration);
            });
        } 

        !target.hidden ? target.hidden = true : "";
    }

    const scroll = (target, height, duration = 2000) => {
        target.hidden
            ? scrollDown(target, height, duration)
            : scrollUp(target, height, duration)
    }

    document.querySelectorAll('[spoiler]').forEach((item) => {
        const content = item.querySelector(['[spoiler-content]']);
        const heigth = content.scrollHeight;

        content.hidden = true;
        content.style.height = 0 + 'px';

        item.querySelector('[spoiler-btn]').addEventListener('click', () => {
            item.classList.toggle('open');
            scroll(content, heigth);
        })
    })
}

export const modals = () => {
    document.querySelectorAll('a[href*="#"][href*="modal"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('div[modal*="#"][modal*="modal"]').forEach((modal) => {
                modal.getAttribute('modal') == link.getAttribute('href') 
                    ? modal.classList.toggle('opened') : "";

                modal.addEventListener('click', (e) => {
                    e.target == modal ? modal.classList.remove('opened') : "";
                })

                modal.querySelector('[close]').addEventListener('click', () => {
                    modal.classList.remove('opened');
                })

                e.preventDefault();
            })
        })
    });
}