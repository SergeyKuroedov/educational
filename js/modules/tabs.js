function tabs(tabsSelector, tabsContentSelector, tabParentSelector, activeClass) {
    //Tabs

    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabParent = document.querySelector(tabParentSelector);


    function hideTab() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTab(i = 0) {

        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTab();
    showTab();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(activeClass.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTab();
                    showTab(i);
                }
            });
        }
    });
}

export default tabs;