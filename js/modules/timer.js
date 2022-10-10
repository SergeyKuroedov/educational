function timer(deadline, id) {
    // Timer

    function getTime(endtime) {
        let days, hours, minutes, seconds
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }


        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds

        };
    }

    function checkZero(num) {

        if (num >= 0 && num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    function setClock(endtime, selector) {
        const timer = document.querySelector(`.${selector}`);
        const days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTime(endtime);

            days.innerHTML = checkZero(t.days);
            hours.innerHTML = checkZero(t.hours);
            minutes.innerHTML = checkZero(t.minutes);
            seconds.innerHTML = checkZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(deadline, id);
}

export default timer;