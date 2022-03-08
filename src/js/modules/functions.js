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

export const ranges = () => {
    document.querySelectorAll('[ranges]').forEach(range => {
        const slider_min = range.querySelector("[data-range='min']");
        const slider_max = range.querySelector("[data-range='max']");
        const track = range.querySelector("[track]");

        const fill = () => { 
            track.style.background = `linear-gradient(to right, lightgray ${slider_min.value / slider_min.max * 100}%, tomato ${slider_min.value / slider_min.max * 100}%, tomato ${slider_max.value / slider_max.max * 100}%, lightgray ${slider_max.value / slider_max.max * 100}%)`; 
        }

        const limit = (listener, target, operator, gap = range.dataset.gap) => {
            if (eval(`${parseInt(listener.value)} ${operator} ${parseInt(target.value)}`)) {
                listener.value = operator === '>' 
                    ? parseInt(target.value) - parseInt(gap) 
                    : parseInt(target.value) + parseInt(gap);
            }
        }

        slider_min.addEventListener('input', () => {
            limit(slider_min, slider_max, '>');
            fill();
        });
        
        slider_max.addEventListener('input', () => {
            limit(slider_max, slider_min, '<');
            fill();
        });

        fill();
    })
}