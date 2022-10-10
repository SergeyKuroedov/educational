import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function form(modalSelector, modalTimerId, formSelector) {
    //Forms

    const forms = document.querySelectorAll(formSelector);

    forms.forEach(item => {
        postingData(item);
    });


    const messages = {
        load: 'img/spinner.svg',
        done: 'Спасибо! Скоро мы с вами свяжемся',
        fail: 'Ой, что то пошло не так'
    };

    function postingData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formMessage = document.createElement('img');
            formMessage.src = messages.load;
            formMessage.style.cssText = `
                display:block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', formMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    showThanksModal(messages.done);
                    formMessage.remove();
                })
                .catch(() => {
                    showThanksModal(messages.fail);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }


    function showThanksModal(message) {
        const modalWindow = document.querySelector('.modal__dialog');

        modalWindow.classList.add('hide');
        openModal(modalSelector, modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            modalWindow.classList.add('show');
            modalWindow.classList.remove('hide');
            closeModal(modalSelector);
        }, 4000);
    }
}

export default form;