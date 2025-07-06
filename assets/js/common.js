$(document).ready(function(){
	$('#header').length && menu() 
	$('.family').length && familySite() 
	$('.go_top').length && goTop() 
	$('.mem_wrap').length && memPop() 
	$('.sidebar').length && sidebar() 
	$('.btn_map').length && imgMap() 
	$('.main_visual').length && mainVisual() 
	$('.work_slide').length && workSlide()
	$('.select_box').niceSelect()

	$(window).resize(function () {
		$('.work_slide').length && workSlide();
	});
});

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
		if (!$('.dept_01 > li:hover, .dept_02:hover, .menu_bg:hover').length) {
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


	$('.dept_02 > li').hover(
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