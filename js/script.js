import calc from './modules/calc';
import cards from './modules/cards';
import form from './modules/form';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', ()=> {

   const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 50000);


   calc();
   cards();
   form('.modal', modalTimer, 'form');
   modal('[data-modal]', '.modal', modalTimer);
   tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   timer('2022-12-31', 'timer');
   slider({
      container: '.offer__slider',
      prevSlide: '.offer__slider-prev',
      nextSlide: '.offer__slider-next',
      slidesCounter: '#total',
      slidesCurrent: '#current',
      sliderWrapper: '.offer__slider-wrapper',
      innerWrapper: '.offer__slider-inner',
      slideAll: '.offer__slide' 
   });

});