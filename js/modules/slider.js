function slider({container, prevSlide, nextSlide, slidesCounter, slidesCurrent, innerWrapper, sliderWrapper, slideAll}) {
    // Slider
    const slides = document.querySelectorAll(slideAll);
    const prev = document.querySelector(prevSlide);
    const next = document.querySelector(nextSlide);
    const total = document.querySelector(slidesCounter);
    const current = document.querySelector(slidesCurrent);
    const wrapperSlider = document.querySelector(sliderWrapper);
    const innerSlider = document.querySelector(innerWrapper);
    const width = window.getComputedStyle(wrapperSlider).width;
    const slider = document.querySelector(container);

    let slideIndex = 1;
    let offset = 0;
    const dots = [];

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    slider.style.position = 'relative';
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }


    if (slides.length < 10) {
        total.innerHTML = '0' + slides.length;
        current.innerHTML = '0' + slideIndex;
    } else {
        total.innerHTML = slides.length;
        current.innerHTML = slideIndex;
    }

    innerSlider.style.width = 100 * slides.length + '%';
    innerSlider.style.display = 'flex';
    innerSlider.style.transition = '0.5s all';
    wrapperSlider.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    const checkSlide = (slide) => {
        if (slide < 10) {
            current.innerHTML = '0' + slide;
        } else {
            current.innerHTML = slide;
        }
    };

    const dotOpacity = () => {
        dots.forEach(item => item.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    };

    next.addEventListener('click', () => {
        if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }

        innerSlider.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        checkSlide(slideIndex);

        dotOpacity();

    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.replace(/\D/g, '') * (slides.length - 1);
        } else {
            offset -= +width.replace(/\D/g, '');
        }

        innerSlider.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        checkSlide(slideIndex);

        dotOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            innerSlider.style.transform = `translateX(-${offset}px)`;

            checkSlide(slideIndex);

            dotOpacity();
        });
    });
}

export default slider;