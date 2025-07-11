$(document).ready(function(){
	$('#header').length && menu() 
	$('.family').length && familySite() 
	$('.go_top').length && goTop() 
	$('.mem_wrap').length && memPop() 
	$('.sidebar').length && sidebar() 
	$('.btn_map').length && imgMap() 
	$('.main_visual').length && mainVisual() 
	$('.work_slide').length && workSlide()
	$('.rv_slide').length && rvSlide()
	$('.m_menu').length && initMobileMenu()
	$('.recruit_prs').length && recruit()
	$('.sub_tab_mo').length && subTab()
	$('.history_wrap').length && history()
	$('.bsi_li').length && bsi()
	$('.js-sub_tab').length && initSubTabMo();

	$(window).resize(function () {
		$('.work_slide').length && workSlide();
	});

	$(window).resize(function () {
		$('.rv_slide').length && rvSlide();
	});

	$(window).on('scroll', function () {
		const triggerY = 190;
		const scrollTop = $(window).scrollTop();
		const windowY = scrollTop + triggerY;

		$('.history_detail_area li').each(function () {
			const $this = $(this);
			const offsetTop = $this.offset().top;

			if (windowY >= offsetTop) {
				$this.find('.line').css('height', '100%');
				$this.addClass('active');
			} else {
				$this.find('.line').css('height', '0%');
				$this.removeClass('active');
			}
		});
	});
	$(window).on('scroll', function () {
		const scrollTop = $(window).scrollTop();
		let currentIndex = 0;

		$('.history_wrap .row').each(function (index) {
			const rowTop = $(this).offset().top;

			if (scrollTop + 200 >= rowTop) {
				currentIndex = index;
			}
		});

		$('.js-sub.sub_tab li').removeClass('active');
		$('.js-sub.sub_tab li').eq(currentIndex).addClass('active');
	});

});
function history () {
	$('.sub_tab li').on('click', function (e) {
		e.preventDefault(); // a 태그 기본 동작 방지

		const index = $(this).index(); // 클릭한 탭의 순서
		const targetRow = $('.history_wrap .row').eq(index); // 대응하는 row
		const offsetTop = targetRow.offset().top;

		$('html, body').animate({
			scrollTop: offsetTop - 120
		}, 400);
	});
}
function dimShow(){ /* 딤드 show */
	$('body').addClass('dim');
	lock()
}
function dimHide(){ /* 딤드 hide */
	$('body').removeClass('dim');
	unlock()
}

function lock() {
	const scrollTop = window.scrollY || document.documentElement.scrollTop;
	$('body').addClass('scroll-locked')

	document.body.style.position = 'fixed';
	document.body.style.top = `-${scrollTop}px`;
	document.body.style.width = '100%'
	document.body.style.overflowY = 'scroll'
}

function unlock() {
	const scrollTop = parseInt(document.body.style.top || '0')*-1;
	$('body').removeClass('scroll-locked')
	document.body.style.position = '';
	document.body.style.top = ``;
	document.body.style.width = ''
	document.body.style.overflowY = ''

	window.scrollTo(0, scrollTop)
}

function menu() {
	const $header = $('#header.main');
	const hadHwh = $header.hasClass('h_wh');
	const $dept2 = $('.h_btm .dept_02');
	const $menuBg = $('.menu_bg');
	
	$(window).on('scroll', () => {
		const isLocked = $('body').hasClass('scroll-locked')
	
		if(isLocked) return;
		if ($(window).scrollTop() > 0) {
			$header.removeClass('h_wh');
		} else if ($(window).scrollTop() === 0 && hadHwh && !$dept2.is(':visible')) {
			$header.addClass('h_wh');
		}
	});

	$('.h_btm .dept_01 > li').mouseenter(() => {
		if ($(window).scrollTop() === 0) $header.removeClass('h_wh');
		$dept2.stop().slideDown(300);
		$menuBg.stop().slideDown(300);
	});

	$('.h_btm').mouseleave(() => {
		if (!$('.all_menu .dept_01 > li:hover, .all_menu .dept_02:hover, .menu_bg:hover').length) {
			$dept2.stop().slideUp(300);
			$menuBg.stop().slideUp(300);
			if ($(window).scrollTop() === 0 && hadHwh) $header.addClass('h_wh');
		}
	});

	$('.btn_all_menu').on('click', function () {
		$('.all_menu').addClass('on')
		$('body').css('overflow','hidden')
	})
	$('.all_menu .close').on('click', function () {
		$('.all_menu').removeClass('on')
		$('body').css('overflow','')
	})
	$(window).on('resize', function () {
		if ($('.all_menu').hasClass('on')) {
			$('body').css('overflow', '');
		}
	});

	$('.all_menu .dept_02 > li > a').on('click', function(){
		$(this).siblings().stop().slideToggle(300)
	})


	$('.all_menu .dept_02 > li').hover(
		function () {
			const $li = $(this);
			const $group = $li.closest('.group');
			$group.find('.dept_02 li a').css('opacity', '0.4');
			$li.find('a').css('opacity', '');
		},
		function () {
			$(this).closest('.group').find('.dept_02 li a').css('opacity', '');
		}
	);

}

function familySite() {
	$('.family button').on('click', function () {
		$('.family').toggleClass('active')
		$('.family ul').stop().slideToggle(300)
	})
}

function goTop(){ //페이지상단이동
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop > 0){
			$('.go_top').addClass('active')
		}else{
			$('.go_top').removeClass('active')
		}
	});

	$('.go_top').on('click', function() {
		$('html, body').animate({
			scrollTop: 0
		}, 400);
		return false;
	});
}

function memPop() {
	$('.mem_wrap li a').on('click', function (e) {
		e.preventDefault();
		$('.pop_wrap').fadeIn();
		$('body').addClass('dim');
	});

	$(document).mouseup(function (e){ /* 닫기 */
		var popArea = $('.pop_wrap');
		if(popArea.has(e.target).length === 0 && $('body').hasClass('dim')){
			popArea.fadeOut(300);
			setTimeout(dimHide, 150);
		}
	});

	$('.close').on('click', function () {
		$('.pop_wrap').fadeOut();
		$('body').removeClass('dim');
	});
}

function sidebar() {
	$('.btn_side_bar').on('click', function () {
		$('.map_page .sidebar').toggleClass('hide');
		$(this).toggleClass('active');
	});

	$('.map_page .line_tab li').on('click', function (e) {
		e.preventDefault();

		const index = $(this).index();

		$('.map_page .line_tab li').removeClass('active');
		$(this).addClass('active');

		$('.map_page .tab_content .srch_opt').removeClass('active');
		$('.map_page .tab_content .srch_opt').eq(index).addClass('active');
	});
}

function imgMap() {
$('.btn_map li').on('click', function () {
		const index = $(this).index();

		$('.btn_map li').removeClass('active');
		$(this).addClass('active');

		$('.img_list li').removeClass('active');
		$('.img_list li').eq(index).addClass('active');
	});

	$('.img_map area').on('click', function (e) {
		e.preventDefault(); // 페이지 이동 방지

		const index = parseInt($(this).attr('href')) - 1; 

		$('.btn_map li').removeClass('active');
		$('.btn_map li').eq(index).addClass('active');

		// 이미지 active 
		$('.img_list li').removeClass('active');
		$('.img_list li').eq(index).addClass('active');
	});
}

function mainVisual() {
	var mainVisual = new Swiper ('.main_visual', {
		slidesPerView: 1,
		loop:true,
		loopAdditionalSlides : 0,
		autoplay:{
			delay:3000,
			disableOnInteraction:false
		},
		pagination: {
			el: ".main_bullet",
			type : 'bullets',
			clickable: true,
		},
		speed:1000
	})
}

function workSlide() {
	var windowWidth = $(window).width();

	if (windowWidth <= 1024 && !window.workSwiper) {
		window.workSwiper = new Swiper('.work_slide', {
			slidesPerView: 'auto',
			loop: true,
			loopAdditionalSlides: 1,
			spaceBetween : 19,
			centeredSlides: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			pagination: {
				el: '.work_bullet',
				type: 'bullets',
				clickable: true
			}
		});
	} else if (windowWidth > 1024 && window.workSwiper) {
		window.workSwiper.destroy(true, true);
		window.workSwiper = undefined;
	}
}

function rvSlide() {
	var windowWidth = $(window).width();

	if (windowWidth <= 1024 && !window.rvSwiper) {
		window.rvSwiper = new Swiper('.rv_slide', {
			slidesPerView: '2',
			grid : {
				rows:2,
				fill:'row'
			},
			spaceBetween : 20,
			pagination: {
				el: '.rv_bullet',
				type: 'bullets',
				clickable: true
			}
		});
	} else if (windowWidth > 1024 && window.rvSwiper) {
		window.rvSwiper.destroy(true, true);
		window.rvSwiper = undefined;
	}
}

function initPopupSwiper(triggerSelector, popupSelector, swiperSelector) {
	let popupSwiper;
	
	document.querySelectorAll(`${triggerSelector} .swiper-slide a`).forEach((el, index) => {
		el.addEventListener('click', e => {
			e.preventDefault();
		
			const popup = document.querySelector(popupSelector);
			const wrapper = popup.querySelector('.swiper-wrapper');
			const slides = document.querySelectorAll(`${triggerSelector} .swiper-slide`);
			wrapper.innerHTML = '';
		
			slides.forEach(slide => {
				wrapper.innerHTML += `
				<div class="swiper-slide">
					${slide.querySelector('.img')?.outerHTML || ''}
					<div class="txt_wrap">
						<div class="rv_tit">
							<h4>${slide.querySelector('h3')?.textContent || ''}</h4>
							<p>
								<span>${slide.querySelector('span')?.textContent || ''}</span>
								<span>${slide.dataset.date || ''}</span>
							</p>
						</div>
						<div class="rv">${slide.querySelector('p')?.textContent || ''}</div>
					</div>
				</div>`;
			});
		
			if (popupSwiper) popupSwiper.destroy(true, true);
			popupSwiper = new Swiper(swiperSelector, {
				slidesPerView: 1,
				loop: true,
				initialSlide: index,
				navigation: {
					nextEl: `.rv_popup_inner .next`,
					prevEl: `.rv_popup_inner .prev`
				},
				pagination: {
					el: `.rv_popup_inner .rv_paging`,
					type: 'fraction'
				}
			});
	
			popup.style.display = 'block';
			dimShow();
		});
	});
	
	document.querySelector(`${popupSelector} .popup_close`)?.addEventListener('click', () => {
		document.querySelector(popupSelector).style.display = 'none';
		dimHide();
	});
}

document.addEventListener('DOMContentLoaded', function () {
	initPopupSwiper('.rv_slide', '.rv_popup', '.rv_popup_swiper');
});

function initMobileMenu() {
	$('.tab_Bar .tab_menu').on('click', function (e) {
		e.preventDefault()
		$('.m_menu').addClass('active');
		$(this).addClass('active')
		$('body').css('overflow','hidden')
	});
	
	$('.m_menu .head button').on('click', function () {
		$('.m_menu').removeClass('active');
		$('.tab_Bar .tab_menu').removeClass('active')
		$('body').css('overflow','')
	});

	$(window).on('resize', function () {
		if ($('.m_menu').hasClass('active')) {
			$('.m_menu').removeClass('active');
			$('.tab_Bar .tab_menu').removeClass('active')
			$('body').css('overflow', '');
		}
	});

	$('.menuL_list li a').on('click', function (e) {
		e.preventDefault();
	
		const index = $(this).parent().index();
	
		$('.menuL_list li').removeClass('active');
		$(this).parent().addClass('active');
	
		$('.menuR_list > li').removeClass('active').eq(index).addClass('active');
	});
	
	$('.m_menu .dept_02 > li > a').on('click', function (e) {
		const $li = $(this).parent();
		const $depth = $li.children('.dept_03');
	
		if ($depth.length) {
		e.preventDefault(); // 링크 방지
		$li.toggleClass('active').siblings().removeClass('active').find('.dept_03').slideUp(200);
		$depth.stop(true, true).slideToggle(200);
		}
	});
	}


function recruit() {
	let $items = $('.prs_item')
	let idx = 0;

	setInterval(function() {
		$items.removeClass('active');
		idx = (idx + 1) % $items.length;
		$items.eq(idx).addClass('active')
	}, 3000)
}

function subTab() {
	$('.sub_tab_mo .current').on('click', function(e) {
		if(!$(this).parent().hasClass('js-sub_tab')){
			e.preventDefault()
			$('.sub_tab_mo ul').slideToggle();
		}
	})
}

function bsi() {
	const $items = $('.bsi_li ul li');
	const $container = $('.bsi_li ul');

	function applyHoverEffect() {
	const winWidth = $(window).width();
	let hoveredWidth;

	if (winWidth >= 1301) {
		hoveredWidth = 640;
	} else if (winWidth >= 1025 && winWidth <= 1300) {
		hoveredWidth = 450;
	} else {
		return; 
	}

	const totalWidth = $container.width();
	const othersWidth = (totalWidth - hoveredWidth) / ($items.length - 1);

	$items.on('mouseenter.hoverEffect', function () {
		const $hovered = $(this);
		$items.each(function () {
		if (this === $hovered[0]) {
			$(this).css('width', hoveredWidth + 'px');
		} else {
			$(this).css('width', othersWidth + 'px');
		}
		});
	});

	$items.on('mouseleave.hoverEffect', function () {
		$items.css('width', 'calc(100% / 6)');
	});
	}

	function removeHoverEffect() {
	$items.off('.hoverEffect'); 
	$items.css('width', 'calc(100% / 6)');
	}

	function handleResize() {
	removeHoverEffect(); 
	if ($(window).width() >= 1025) {
		applyHoverEffect();
	}
	}

	handleResize();

	$(window).on('resize', function () {
	handleResize();
	});
}

function initSubTabMo() {
	const $tab = $('.sub_tab_mo.js-sub_tab');
	const $current = $tab.find('.current');
	const $menu = $tab.find('ul');
	const $items = $menu.find('li');
	const $rows = $('.history_wrap .row');

	let isClicking = false;

	$current.on('click', function (e) {
		e.preventDefault();
		isClicking = true;
		$menu.stop(true, true).slideToggle(200, () => {
			setTimeout(() => { isClicking = false; }, 300);
		});
	});

	$items.on('click', function (e) {
		e.preventDefault();

		const index = $(this).index();
		const $targetRow = $rows.eq(index);
		const offsetTop = $targetRow.offset().top;

		$('html, body').animate({
			scrollTop: offsetTop - 100
		}, 400);

		const text = $(this).find('strong').text();
		$current.find('strong').text(text);

		$items.removeClass('active');
		$(this).addClass('active');

		$menu.slideUp();
	});

	$(window).on('scroll', function () {
		if (isClicking) return; // 클릭 직후 스크롤 트리거 차단

		const scrollTop = $(window).scrollTop();
		let currentIndex = 0;

		$rows.each(function (index) {
			const rowTop = $(this).offset().top;
			if (scrollTop + 200 >= rowTop) {
				currentIndex = index;
			}
		});

		const activeText = $rows.eq(currentIndex).find('.history_title_area strong').text();
		$current.find('strong').text(activeText);
		$items.removeClass('active');
		$items.eq(currentIndex).addClass('active');
	});
}
