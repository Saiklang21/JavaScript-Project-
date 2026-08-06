// app.js — Scroll reveal animation + back-to-top button
// ใช้ IntersectionObserver เพื่อดูว่าองค์ประกอบไหนเลื่อนเข้ามาในจอแล้ว

document.addEventListener('DOMContentLoaded', function () {

    // ----- 1) เก็บองค์ประกอบที่ต้องการ animation ไว้ใน array -----
    const revealTargets = document.querySelectorAll(
        '.proj-card, .badge-card, .t-item'
    );

    // ใส่คลาส .reveal ให้ทุกตัวก่อน (สถานะเริ่มต้น = ซ่อน/เลื่อนลง)
    revealTargets.forEach(function (el) {
        el.classList.add('reveal');
    });

    // ----- 2) ตั้ง observer คอยเช็คว่าองค์ประกอบเข้ามาในหน้าจอหรือยัง -----
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // เอาออกจากการสังเกตหลัง reveal แล้ว ไม่ต้องเช็คซ้ำ
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,        // เห็นองค์ประกอบ 15% ก็เริ่ม reveal
        rootMargin: '0px 0px -40px 0px'
    });

    revealTargets.forEach(function (el) {
        observer.observe(el);
    });

    // ----- 3) หน่วงเวลาการ reveal ทีละนิดในกลุ่มเดียวกัน (stagger) -----
    // จัดกลุ่มตาม parent แล้วให้ index ของแต่ละตัวหน่วงเวลาต่างกัน
    const groups = document.querySelectorAll('.proj-list, .badge-grid, .timeline');
    groups.forEach(function (group) {
        const children = group.querySelectorAll('.reveal');
        children.forEach(function (el, index) {
            el.style.transitionDelay = (index * 90) + 'ms';
        });
    });

    // ----- 4) ปุ่ม back-to-top ที่ fade เข้ามาเมื่อสกอลล์ลงไปไกลๆ -----
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.setAttribute('aria-label', 'กลับขึ้นด้านบน');
    backToTop.textContent = '↑';
    document.body.appendChild(backToTop);

    function toggleBackToTop() {
        if (window.scrollY > 600) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ----- 5) เลื่อนแบบ smooth เวลากดลิงก์ในหน้าเดียวกัน (ถ้ามี) -----
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ----- 6) มาสคอตแมวเดินเล่นที่ขอบจอล่าง (เชื่อมกับโปรเจกต์ InspirAI) -----
    const catMessages = [
        'Meow! ลองดูโปรเจกต์ InspirAI สิ 🐾',
        'กำลังวิเคราะห์ความเสี่ยงอยู่นะ... ล้อเล่น 😼',
        'สวัสดี ฉันชื่อ Cogniser Cat',
        'อย่าลืมกด Certificate ดูด้วยนะ!',
        'พักสายตาสักครู่ก็ได้นะ 🐈'
    ];

    const mascotWrap = document.createElement('div');
    mascotWrap.id = 'cat-mascot';
    mascotWrap.setAttribute('role', 'button');
    mascotWrap.setAttribute('aria-label', 'มาสคอตแมว กดเพื่อดูข้อความ');
    mascotWrap.innerHTML =
        '<div class="cat-bubble" id="cat-bubble"></div>' +
        '<svg viewBox="0 0 120 76" class="cat-svg" xmlns="http://www.w3.org/2000/svg">' +
        '  <g class="cat-leg cat-leg-back-1"><rect x="30" y="52" width="7" height="20" rx="3"></rect></g>' +
        '  <g class="cat-leg cat-leg-back-2"><rect x="46" y="52" width="7" height="20" rx="3"></rect></g>' +
        '  <path class="cat-tail" d="M92 40 C 112 30, 112 8, 96 4" fill="none" stroke-width="7" stroke-linecap="round"></path>' +
        '  <ellipse class="cat-body" cx="60" cy="46" rx="34" ry="18"></ellipse>' +
        '  <g class="cat-leg cat-leg-front-1"><rect x="70" y="54" width="7" height="20" rx="3"></rect></g>' +
        '  <g class="cat-leg cat-leg-front-2"><rect x="86" y="54" width="7" height="20" rx="3"></rect></g>' +
        '  <circle class="cat-head" cx="88" cy="26" r="17"></circle>' +
        '  <polygon class="cat-ear" points="76,14 80,-1 88,11"></polygon>' +
        '  <polygon class="cat-ear" points="94,9 102,-2 104,13"></polygon>' +
        '  <circle class="cat-eye" cx="93" cy="24" r="2"></circle>' +
        '  <circle class="cat-eye" cx="83" cy="25" r="2"></circle>' +
        '</svg>';
    document.body.appendChild(mascotWrap);

    const bubble = document.getElementById('cat-bubble');
    let msgIndex = 0;

    mascotWrap.addEventListener('click', function () {
        mascotWrap.classList.remove('jump');
        void mascotWrap.offsetWidth; // reflow เพื่อ restart animation ได้ทุกครั้งที่กด
        mascotWrap.classList.add('jump');

        bubble.textContent = catMessages[msgIndex % catMessages.length];
        msgIndex++;
        bubble.classList.add('show');
        clearTimeout(mascotWrap._bubbleTimer);
        mascotWrap._bubbleTimer = setTimeout(function () {
            bubble.classList.remove('show');
        }, 2600);
    });

    // ----- 7) เคอร์เซอร์ตามเมาส์ (จุดตามทันที + วงแหวนตามหลังแบบหน่วง) -----
    // ทำงานเฉพาะอุปกรณ์ที่มีเมาส์จริง (ไม่ใช่มือถือ/แท็บเล็ต) และไม่ปิด animation ไว้
    const hasFineCursor = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasFineCursor && !reduceMotion) {
        const cursorDot = document.createElement('div');
        cursorDot.id = 'cursor-dot';
        const cursorRing = document.createElement('div');
        cursorRing.id = 'cursor-ring';
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorRing);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        window.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = 'translate(' + mouseX + 'px,' + mouseY + 'px) translate(-50%,-50%)';
            // เมาส์ขยับแล้วให้เคอร์เซอร์ทั้งคู่โผล่ (เผื่อเคยเลื่อนออกนอกจอไปก่อน)
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
        });

        document.addEventListener('mouseleave', function () {
            cursorDot.style.opacity = '0';
            cursorRing.style.opacity = '0';
        });

        // วงแหวนขยายเมื่อชี้ไปที่จุดที่กดได้ (ลิงก์ ปุ่ม การ์ด มาสคอต)
        const hoverables = 'a, button, .team-card, .proj-card, .badge-card, #cat-mascot';
        document.addEventListener('mouseover', function (e) {
            if (e.target.closest(hoverables)) {
                cursorRing.classList.add('cursor-ring-big');
            }
        });
        document.addEventListener('mouseout', function (e) {
            if (e.target.closest(hoverables)) {
                cursorRing.classList.remove('cursor-ring-big');
            }
        });

        // ลูปหน่วงตำแหน่งวงแหวนให้ตามจุดแบบนุ่มๆ (lerp)
        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px) translate(-50%,-50%)';
            requestAnimationFrame(animateRing);
        }
        animateRing();
    }

});