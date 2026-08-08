(function () {
    var tabs = document.querySelectorAll('.tab');
    var pages = document.querySelectorAll('.page');
    var gotoButtons = document.querySelectorAll('[data-goto]');

    function showPage(id) {
        pages.forEach(function (p) { p.classList.toggle('active', p.id === id); });
        tabs.forEach(function (t) {
            var isActive = t.dataset.page === id;
            t.classList.toggle('active', isActive);
            t.setAttribute('aria-selected', isActive);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    tabs.forEach(function (t) {
        t.addEventListener('click', function () { showPage(t.dataset.page); });
    });

    gotoButtons.forEach(function (b) {
        b.addEventListener('click', function () { showPage(b.dataset.goto); });
    });
})();
