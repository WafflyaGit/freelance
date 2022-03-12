"use strict";
// WEBP
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

// MENU
export const menu = () => {
    document.querySelector('[menu-btn]').addEventListener('click', () => {
        document.querySelector('[menu-list]').classList.toggle('active');
        document.querySelector('[menu-btn]').classList.toggle('active');
    })
}

// ACCORDIONS
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

// MODALS
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

// RANGES
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

// TABS
export const tabs = () => {
    document.querySelectorAll('[tabs]').forEach(item => {
        const tabs = item.querySelectorAll('[data-for]');
        const contents = item.querySelectorAll('[data-tab]');

        contents.forEach(content => {
            tabs.forEach(tab => {
                !tab.classList.contains('active') 
                    && content.dataset.tab === tab.dataset.for
                    ? content.hidden = true : '';
            })
        });

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(tab_item => {
                    tab_item === tab 
                        ? tab_item.classList.add("active") 
                        : tab_item.classList.remove('active');
                })

                contents.forEach(content => {
                    content.hidden = tab.dataset.for === content.dataset.tab ? false : true;
                })
            })
        })
    })
}

// SLIDER
export const slider = (id) => {
    new Swiper('.swiper', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
    });
}

// TRANSFERS
export const transfers = () => {
    let items = [];

    const handle = (query, item) => {
        query.matches ? item.target.append(item.item) : item.parent.append(item.item);
    }

    document.querySelectorAll('[data-transfer]').forEach(item => {
        items.push({
            item: item,
            parent: item.parentElement,
            target: document.querySelector(`#${item.dataset.transfer.split(', ')[0]}`),
            media: {
                query: item.dataset.transfer.split(', ')[1],
                value: item.dataset.transfer.split(', ')[2]
            },
        })
    })

    items.forEach(item => {
        const query = window.matchMedia(`(${item.media.query}-width: ${item.media.value}px)`);
        query.addListener(() => {
            handle(query, item);
        })

        handle(query, item);
    })
}