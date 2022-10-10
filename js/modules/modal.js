function openModal(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);
    
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
    
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const btnModal = document.querySelectorAll(triggerSelector);
    const modalWindow = document.querySelector(modalSelector);

    btnModal.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') === '') {
            closeModal(modalSelector);
        }
    });

    

    function showModal() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModal);
        }
    }

    window.addEventListener('scroll', showModal);

}

export default modal;
export {openModal, closeModal};