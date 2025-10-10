window.addEventListener('DOMContentLoaded', function(){
    setUi.init();
});

const setUi = {
    init : function(){
        setMenu.init();
        setSearch.init();
        setMore.init();
        setView.init();
        document.querySelectorAll('.dropdown').forEach(item => {
            this.droupdown(item);
        });


        if (document.querySelectorAll('.historySwiper').length) {
            document.querySelectorAll('.historySwiper').forEach(item => {
                new Swiper(item, {
                    slidesPerView: 3,
                    grid: {
                        rows: 2,
                        fill: 'row'
                    },
                    spaceBetween: 30,
                    // 마우스휠 설정 추가
                    mousewheel: {
                        forceToAxis: true, // 수평 방향으로만 스크롤 적용
                        sensitivity: 1
                    },
                    scrollbar: {
                        el: item.querySelector(".swiper-scrollbar"),
                        hide: false,
                        draggable: true
                    },
                    breakpoints: {
                        320: {
                            slidesPerView: 1.5,
                            spaceBetween: 10,
                            grid: {
                                rows: 2
                            }
                        },
                        360: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                            grid: {
                                rows: 2
                            }
                        },
                        767: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                            grid: {
                                rows: 2
                            }
                        },
                        1240: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                            grid: {
                                rows: 2
                            }
                        },
                        1940: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                            grid: {
                                rows: 2
                            }
                        }
                    }
                });
            });
        }

    },
    droupdown : function(dropdown){
        const selected = dropdown.querySelector('.selected');
        const optionList = dropdown.querySelector('.option-list');
        const hiddenSelect = dropdown.querySelector('.hidden-select');
        const selectButton = dropdown.querySelector('.select-button');

        function toggleOptionList() {
            optionList.classList.toggle('show');
        }

        selectButton.addEventListener('click', toggleOptionList);
        selected.addEventListener('click', toggleOptionList);

        optionList.querySelectorAll('li').forEach(option => {
            option.addEventListener('click', function () {
                selected.textContent = this.textContent;
                hiddenSelect.value = this.dataset.value;
                optionList.classList.remove('show');
            });
        });

        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target)) {
                optionList.classList.remove('show');
            }
        });
    }




};

/* ------------------ detail Layer ------------------ */
const setView = {
    init : function(){
        this.openClass = 'imageViewOpen';
        this.body = document.body;
        this.layer = document.querySelector('.image-view-layer');
        if(!this.layer) return false;
        this.wrapper = this.layer.querySelector('.text-wrapper');
        this.closeButton = this.layer.querySelector('.close-button');

        // 초기에는 hidden 권장
        this.layer.hidden = true;

        this.closeButton.addEventListener('click', () => this.close());
    },
    open : function(){
        this.layer.style.display = 'flex';
        this.layer.hidden = false;
        this.wrapper.scrollTo(0, 0);
        requestAnimationFrame(() => {
            this.body.classList.add(this.openClass);
        });

        // 검색 레이어 안으로 포커스 가두기
        focusTrap.enable(this.layer, { useInert: true, onEscape: () => this.close() });

    },
    close : function(){
        focusTrap.disable();
        this.body.classList.remove(this.openClass);
        // 전환이 있다면 끝나고 hidden
        hideAfterTransition(this.layer, () => {
            this.layer.hidden = true;
            this.layer.style.display = 'none';
        });
    }
};

/* ------------------ more Layer ------------------ */
const setMore = {
    init : function(){
        this.openClass = 'moreInfoOpen';
        this.body = document.body;
        this.layer = document.querySelector('.more-info-layer');
        if(!this.layer) return false;
        this.content = this.layer .querySelector('.content-box');
        this.dim = this.layer.querySelector('.dim');
        this.closeButton = this.layer.querySelector('.close-button');

        // 초기에는 hidden 권장
        this.layer.hidden = true;

        this.dim.addEventListener('click', () => this.close());
        this.closeButton.addEventListener('click', () => this.close());
    },
    open : function(){
        this.layer.style.display = 'flex';
        this.layer.hidden = false;
        this.content.scrollTo(0, 0);
        requestAnimationFrame(() => {
            this.body.classList.add(this.openClass);
        });

        // 검색 레이어 안으로 포커스 가두기
        focusTrap.enable(this.layer, { useInert: true, onEscape: () => this.close() });

    },
    close : function(){
        focusTrap.disable();
        this.body.classList.remove(this.openClass);
        // 전환이 있다면 끝나고 hidden
        hideAfterTransition(this.layer, () => {
            this.layer.hidden = true;
            this.layer.style.display = 'none';
        });
    }
};

/* ------------------ Search Layer ------------------ */
const setSearch = {
    init : function(){
        this.openClass = 'searchOpen';
        this.body = document.body;
        this.layer = document.querySelector('.search-layer');
        if(!this.layer) return false;
        this.dim = this.layer.querySelector('.dim');
        this.closeButton = this.layer.querySelector('.close-button');

        // 초기에는 hidden 권장
        this.layer.hidden = true;

        this.dim.addEventListener('click', () => this.close());
        this.closeButton.addEventListener('click', () => this.close());
    },
    open : function(){
        this.layer.style.display = 'flex';
        this.layer.hidden = false;
        requestAnimationFrame(() => {
            this.body.classList.add(this.openClass);
        });

        // 검색 레이어 안으로 포커스 가두기
        focusTrap.enable(this.layer, { useInert: true, onEscape: () => this.close() });

        // 첫 입력창 포커스(있다면)
        const firstInput = this.layer.querySelector('input, textarea, [contenteditable="true"]');
        if (firstInput) firstInput.focus();
    },
    close : function(){
        focusTrap.disable();
        this.body.classList.remove(this.openClass);
        // 전환이 있다면 끝나고 hidden
        hideAfterTransition(this.layer, () => {
            this.layer.hidden = true;
            this.layer.style.display = 'none';
        });
    }
};

/* ------------------ Menu Layer ------------------ */
const setMenu = {
    init : function(){
        this.openClass = 'menuOpen';
        this.body = document.body;
        this.layer = document.querySelector('.menu-layer');
        if(!this.layer) return false;
        this.menu = this.layer.querySelector('.layer-menu-box');
        this.closeButton = this.layer.querySelector('.close-button');

        // 초기에는 hidden 권장
        this.layer.hidden = true;

        this.closeButton.addEventListener('click', () => this.close());
    },
    open : function(){
        this.layer.style.display = 'flex'; // 필요 시 유지
        this.layer.hidden = false;
        this.menu.scrollTo(0, 0);

        // 메뉴 안으로 포커스 가두기
        focusTrap.enable(this.layer, { useInert: true, onEscape: () => this.close() });

        // 바디 스크롤 잠금 + 전환 클래스
        requestAnimationFrame(() => {
            this.body.classList.add(this.openClass);
        });
    },
    close : function(){
        focusTrap.disable();
        this.body.classList.remove(this.openClass);

        // 전환 종료 후 숨김/디스플레이 해제
        hideAfterTransition(this.layer, () => {
            this.layer.hidden = true;
            this.layer.style.display = 'none';
        });
    }
};

/* ------------------ Helpers ------------------ */
function hideAfterTransition(el, cb){
    // 트랜지션이 없는 환경도 커버
    let ran = false;
    const done = () => {
        if (ran) return;
        ran = true;
        el.removeEventListener('transitionend', done);
        cb && cb();
    };
    // 트랜지션 끝나면 실행, 300ms 타임아웃 안전장치(필요시 조정)
    el.addEventListener('transitionend', done, { once: true });
    setTimeout(done, 350);
}

/* ------------------ Focus Trap ------------------ */
// 포커스 가능한 요소 셀렉터
const FOCUSABLE_SELECTOR = [
    'a[href]:not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',  // ← 오타 수정
    '[contenteditable="true"]:not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])'
].join(',');

// 표시/가시성 필터
function getFocusables(root) {
    return Array.from(root.querySelectorAll(FOCUSABLE_SELECTOR))
        .filter(el => {
            const cs = window.getComputedStyle(el);
            const hiddenByStyle = (cs.display === 'none' || cs.visibility === 'hidden');
            const hiddenByAttr  = el.hasAttribute('hidden') || el.getAttribute('aria-hidden') === 'true';
            return !hiddenByStyle && !hiddenByAttr;
        });
}

// body 하위에서 특정 노드(및 조상 트리) 이외의 형제들을 inert 처리
function inertOutside(container) {
    const inerted = [];
    const ancestors = new Set();
    let n = container;
    while (n) { ancestors.add(n); n = n.parentElement; }

    document.querySelectorAll('body > *').forEach(top => {
        if (!ancestors.has(top)) {
            if (!top.inert) { top.inert = true; inerted.push(top); }
        } else {
            // 조상인 경우, container subtree 밖 자식들도 inert
            Array.from(top.children).forEach(child => {
                if (!container.contains(child)) {
                    if (!child.inert) { child.inert = true; inerted.push(child); }
                }
            });
        }
    });
    return inerted;
}

// 포커스 트랩
const focusTrap = {
    state: null,
    enable(container, { useInert = true, onEscape = null } = {}) {
        if (this.state) this.disable();

        const lastFocused = document.activeElement;

        // 첫 포커스 이동
        //const list = getFocusables(container);
        //if (list.length) list[0].focus();
        //else { container.setAttribute('tabindex', '-1'); container.focus(); }

        // Tab 순환
        const onKeyDown = (e) => {
            if (e.key !== 'Tab') return;
            const f = getFocusables(container);
            if (!f.length) return;
            const first = f[0];
            const last  = f[f.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault(); last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault(); first.focus();
            }
        };

        // focus가 바깥으로 튀면 되돌림
        const onFocusIn = (e) => {
            if (!container.contains(e.target)) {
                const f = getFocusables(container);
                if (f.length) f[0].focus();
                else container.focus();
            }
        };

        // ESC로 닫기(콜백 전달)
        const onKeyForEsc = (e) => {
            if (e.key === 'Escape' && typeof onEscape === 'function') onEscape();
        };

        container.addEventListener('keydown', onKeyDown);
        document.addEventListener('focusin', onFocusIn);
        document.addEventListener('keydown', onKeyForEsc);

        const inerted = useInert ? inertOutside(container) : [];

        this.state = { container, onKeyDown, onFocusIn, onKeyForEsc, inerted, lastFocused };
    },
    disable() {
        const s = this.state;
        if (!s) return;
        const { container, onKeyDown, onFocusIn, onKeyForEsc, inerted, lastFocused } = s;

        container.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('focusin', onFocusIn);
        document.removeEventListener('keydown', onKeyForEsc);

        // inert 복구
        inerted.forEach(el => el.inert = false);

        // 임시 tabindex 복구
        if (container.getAttribute('tabindex') === '-1') container.removeAttribute('tabindex');

        // 포커스 원복
        if (lastFocused && document.contains(lastFocused)) lastFocused.focus();

        this.state = null;
    }
};
