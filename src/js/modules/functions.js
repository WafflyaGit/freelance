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
    document.querySelector('[data-menu-btn]').addEventListener('click', () => {
        document.querySelector('[data-menu-list]').classList.toggle('active');
        document.querySelector('[data-menu-btn]').classList.toggle('active');
    })
}

// ACCORDIONS
export const accordions = () => {
    const multiples = document.querySelectorAll('[data-accordions="multiple"]');
    const singles = document.querySelectorAll('[data-accordions="single"]');

    const handle = (query, true_callback, false_callback) => {
        query.matches ? true_callback() : false_callback();
    }

    const media = (accordion, true_callback, false_callback) => {
        if (accordion.hasAttribute('data-accordion') && accordion.getAttribute('data-accordion')) {
            const query = window.matchMedia(`(${accordion.getAttribute('data-accordion').split(', ')[0]}-width: ${accordion.getAttribute('data-accordion').split(', ')[1]}px)`);
            query.addListener(() => handle(query, true_callback, false_callback));
            handle(query, true_callback, false_callback);

            return;
        }
        true_callback();
    }

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

    multiples.forEach(item => {
        const click = (accordion) => {
            if (!accordion.getAttribute('data-no-scroll'))
                toggle(accordion, accordion.querySelector('[data-content]'))
        }

        const true_callback = (accordion) => {
            accordion.querySelector('[data-btn]').addEventListener('click', () => {
                click(accordion);
            })
        }

        const false_callback = (accordion) => {
            accordion.setAttribute('data-no-scroll', '');
            scrollDown(accordion, accordion.querySelector('[data-content]'));
        }

        item.querySelectorAll('[data-accordion]').forEach(accordion => {
            media(accordion, () => {true_callback(accordion)}, () => {false_callback(accordion)})
        })
    })
    
    singles.forEach(item => {
        const accordions = item.querySelectorAll('[data-accordion]');

        const click = (accordion) => {
            accordions.forEach(select => {
                if (!select.hasAttribute('data-no-scroll')) {
                    accordion == select 
                        ? toggle(select, select.querySelector('[data-content]')) 
                        : scrollUp(select, select.querySelector('[data-content]')) 
                }
            })
        }

        const true_callback = (accordion, event) => {
            accordion.removeAttribute('data-no-scroll');
            accordion.querySelector('[data-btn]').addEventListener('click', event)
        }

        const false_callback = (accordion) => {
            accordion.setAttribute('data-no-scroll', '');
            scrollDown(accordion, accordion.querySelector('[data-content]'));
        }

        accordions.forEach(accordion => {
            media(accordion, () => {true_callback(accordion, () => {click(accordion)})}, () => {false_callback(accordion)});
        })
    })
}

// MODALS
export const modals = () => {
    document.querySelectorAll('a[href*="#"][href*="modal"]').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('div[data-modal*="#"][data-modal*="modal"]').forEach(modal => {
                modal.getAttribute('data-modal') == link.getAttribute('href') 
                    ? modal.classList.toggle('opened') : "";

                modal.addEventListener('click', (e) => {
                    e.target == modal ? modal.classList.remove('opened') : "";
                })

                modal.querySelector('[data-close]').addEventListener('click', () => {
                    modal.classList.remove('opened');
                })

                e.preventDefault();
            })
        })
    });
}

// RANGES
export const ranges = () => {
    document.querySelectorAll('[data-ranges]').forEach(range => {
        const slider_min = range.querySelector("[data-range='min']");
        const slider_max = range.querySelector("[data-range='max']");
        const track = range.querySelector("[data-track]");
        const gap = parseInt(range.dataset.gap);

        const fill = () => {
            track.style.left = slider_min.value / slider_min.max * 100 + '%';
            track.style.right = 100 - slider_max.value / slider_max.max * 100 + '%';
        }

        slider_min.addEventListener('input', () => {
            slider_min.value = 
                parseInt(slider_min.value) >= parseInt(slider_max.value) 
                ? parseInt(slider_max.value) - gap 
                : parseInt(slider_min.value);

            fill();
        });
        
        slider_max.addEventListener('input', () => {
            slider_max.value =
                parseInt(slider_min.value) >= parseInt(slider_max.value)
                ? parseInt(slider_min.value) + gap
                : parseInt(slider_max.value);

            fill();
        });

        fill();
    })
}

// TABS
export const tabs = () => {
    document.querySelectorAll('[data-tabs]').forEach(item => {
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