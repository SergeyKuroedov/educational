import {getResource} from '../services/services'

function cards() {
    // Classes Card

    class Card {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.parentSelector = document.querySelector(parentSelector);
            this.changeToUAH();
        }


        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element1 = 'menu__item';
                element.classList.add(this.element1);
            } else {
                this.classes.forEach(classList => element.classList.add(classList));
            }
            element.innerHTML = `
                
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
                        
            `;
            this.parentSelector.append(element);
        }
    }


    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new Card(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

export default cards;