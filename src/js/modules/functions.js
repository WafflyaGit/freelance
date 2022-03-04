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
    const menu = document.querySelector('[menu-list]');
    const body = document.querySelector('body');
    
    document.querySelectorAll('[menu-btn]').forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.toggle('active');
            body.classList.toggle('modal');
        })
    })
}

export const accordions = () => {
    
    document.querySelectorAll('[accordions][multiple]').forEach(item => {
        item.querySelectorAll('[accordion]').forEach(accordion => {
            accordion.querySelector('button').addEventListener('click', () => {
                toggle(accordion, accordion.querySelector('[content]'))
            })
        })
    })
    
    document.querySelectorAll('[accordions][single]').forEach(item => {
        const accordions = item.querySelectorAll('[accordion]');
        accordions.forEach(accordion => {
            accordion.querySelector('button').addEventListener('click', () => {
                accordions.forEach(select => {
                    accordion == select 
                        ? toggle(select, select.querySelector('[content]')) 
                        : scrollUp(select, select.querySelector('[content]')) 
                })
            })
        })
    })

    const toggle = (parent, target) => {
        parent.classList.contains('active')
            ? scrollUp(parent, target)
            : scrollDown(parent, target)
    }

    const scrollDown = (parent, target) => {
        parent.classList.add('active');
        target.style.maxHeight = target.scrollHeight + 'px';
    }

    const scrollUp = (parent, target) => {
        target.style.maxHeight = 0;
        parent.classList.remove('active');
    }
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