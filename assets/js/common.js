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
	$('.select_box').niceSelect()

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
}
function dimHide(){ /* 딤드 hide */
	$('body').removeClass('dim');
}

function menu() {
	const $header = $('#header.main');
	const hadHwh = $header.hasClass('h_wh');
	const $dept2 = $('.h_btm .dept_02');
	const $menuBg = $('.menu_bg');

	$(window).on('scroll', () => {
		if ($(window).scrollTop() > 0) {
			$header.removeClass('h_wh');
		} else if (hadHwh && !$dept2.is(':visible')) {
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
	// 창 크기가 변경되면 body overflow 속성 초기화
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

		// 탭 활성화
		$('.map_page .line_tab li').removeClass('active');
		$(this).addClass('active');

		// 콘텐츠 활성화
		$('.map_page .tab_content .srch_opt').removeClass('active');
		$('.map_page .tab_content .srch_opt').eq(index).addClass('active');
	});
}

function imgMap() {
$('.btn_map li').on('click', function () {
		const index = $(this).index();

		// 버튼 active 처리
		$('.btn_map li').removeClass('active');
		$(this).addClass('active');

		// 이미지 active 처리
		$('.img_list li').removeClass('active');
		$('.img_list li').eq(index).addClass('active');
	});

	// 이미지맵 영역 클릭 시
	$('.img_map area').on('click', function (e) {
		e.preventDefault(); // 페이지 이동 방지

		const index = parseInt($(this).attr('href')) - 1; // href="1" → index 0

		// 버튼 active 처리
		$('.btn_map li').removeClass('active');
		$('.btn_map li').eq(index).addClass('active');

		// 이미지 active 처리
		$('.img_list li').removeClass('active');
		$('.img_list li').eq(index).addClass('active');
	});
}

function mainVisual() {
	var mainVisual = new Swiper ('.main_visual', {
		loop:true,
		loopAdditionalSlides : 1,
		autoplay:{
			delay:5000,
			disableOnInteraction:false
		},
		pagination: {
			el: ".main_bullet",
			type : 'bullets',
			clickable: true,
		},
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
	// 메뉴 버튼 클릭 → 메뉴 열기
	$('.tab_Bar .tab_menu').on('click', function () {
	  $('.m_menu').addClass('active');
	  $(this).addClass('active')
	  $('body').css('overflow','hidden')
	});
  
	// 뒤로가기 버튼 클릭 → 메뉴 닫기
	$('.m_menu .head button').on('click', function () {
	  $('.m_menu').removeClass('active');
	  $('.tab_Bar .tab_menu').removeClass('active')
	  $('body').css('overflow','')
	});

	$(window).on('resize', function () {
	// 창 크기가 변경되면 body overflow 속성 초기화
		if ($('.m_menu').hasClass('active')) {
			$('.m_menu').removeClass('active');
			$('.tab_Bar .tab_menu').removeClass('active')
			$('body').css('overflow', '');
		}
	});

	// 좌측 1depth 클릭 시
	$('.menuL_list li a').on('click', function (e) {
	  e.preventDefault();
  
	  const index = $(this).parent().index();
  
	  // 좌측 active 처리
	  $('.menuL_list li').removeClass('active');
	  $(this).parent().addClass('active');
  
	  // 우측 같은 순서 메뉴 열기
	  $('.menuR_list > li').removeClass('active').eq(index).addClass('active');
	});
  
	// 2depth 클릭 시 → 하위 3depth 슬라이드 토글
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
      return; // 1024px 이하에서는 동작 중지
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
    $items.off('.hoverEffect'); // 네임스페이스로 안전하게 제거
    $items.css('width', 'calc(100% / 6)');
  }

  // 초기 및 리사이즈 시 적용
  function handleResize() {
    removeHoverEffect(); // 먼저 기존 이벤트 제거
    if ($(window).width() >= 1025) {
      applyHoverEffect();
    }
  }

  // 최초 실행
  handleResize();

  // 리사이즈 대응
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

	// 1. current 클릭 시 메뉴 토글
	$current.on('click', function (e) {
		e.preventDefault();
		isClicking = true;
		$menu.stop(true, true).slideToggle(200, () => {
			// 클릭 후 300ms 뒤 isClicking 해제 (scroll 이벤트 방지용)
			setTimeout(() => { isClicking = false; }, 300);
		});
	});

	// 2. li 클릭 시 스크롤 이동 + current 갱신 + 닫기
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

	// 3. 스크롤 시 current 텍스트 및 active 자동 변경
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
