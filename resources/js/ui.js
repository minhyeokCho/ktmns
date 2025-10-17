$(document).ready(function(){
	$('.go_top').length && goTop(); //페이지상단이동
	$('.filter').length && handleFilter(); //filter함수
	$('.help_layer').length && handleHelpLayer(); // 도움말 팝업
	$('.detail_layer').length && handleDetailLayer(); //상세 검색 레이어
	$('.all_menu_pc').length && handleAllMenuPC(); //전체메뉴 PC
	$('header').length && handleHeaderFixed(); //헤더 고정
	$('.f_menu_wrap').length && initFooterMenuToggle(); //푸터 사이트
	$('#datepicker').length && datepicker(); //datepicker
	$('.curation_slide').length && curationSlide(); //큐레이션 슬라이드
	$('.mo_util').length && handleMoLayers(); //모바일 유틸 메뉴
	$('.select01').niceSelect();
	$('.select_search').niceSelect();
});

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
		}, 500);
		return false;
	});
}

function handleFilter() {
	const $filter = $('.filter');
	const $filterOpenBtn = $('.btn_filter');
	const $filterCloseBtn = $filter.find('.btn_filter_close');

	// --- 추가된 로직: dept01 li 개수에 따라 btn_all 버튼 삭제 ---
	$filter.find('.item').each(function() {
		const $item = $(this);
		const $dept01 = $item.find('ul.dept01');
		const $btnAll = $item.find('.btn_all');

		if ($dept01.children('li').length < 6) { // dept01 안의 li 개수가 6개 미만일 경우
			$btnAll.remove(); // 해당 btn_all 버튼을 삭제
		}
	});
	// -----------------------------------------------------------

	// ** 참고: 위 로직에서 이미 버튼이 삭제될 수 있으므로, 아래 $allBtns를 다시 정의해야 함 **
	const $allBtns = $filter.find('.list_wrap .btn_all'); // 삭제된 버튼 제외하고 다시 찾음

	// 1. 전체보기/축소보기 버튼 클릭 시
	$allBtns.on('click', function() {
		const $thisBtn = $(this);
		const $targetUl = $thisBtn.siblings('ul.dept01');

		$targetUl.toggleClass('active');

		if ($targetUl.hasClass('active')) {
			$thisBtn.find('span').text('축소보기');
		} else {
			$thisBtn.find('span').text('전체보기');
		}
	});

	// 2. dept02 확장/축소 (label 클릭 시)
	$filter.find('ul.dept01 > li > label > input[type="checkbox"]').on('change', function() {
		const $thisCheckbox = $(this); // 클릭된 체크박스
		// 체크박스의 부모(label)의 부모(li) 안에서 ul.dept02를 찾음
		const $targetDept02 = $thisCheckbox.closest('li').find('ul.dept02');

		if ($targetDept02.length) { // ul.dept02가 존재할 경우에만
			if ($thisCheckbox.is(':checked')) { // 체크박스가 체크되었으면
				$targetDept02.addClass('active');
			} else { // 체크박스가 해제되었으면
				$targetDept02.removeClass('active');
			}
		}
	});


	// 4. btn_filter (필터 열기) 클릭 시
	$filterOpenBtn.on('click', function() {
		$filter.addClass('active');
	});

	// 5. btn_filter_close (필터 닫기) 클릭 시
	$filterCloseBtn.on('click', function() {
		$filter.removeClass('active');
	});
}

function handleMoLayers() { //모바일 유틸 메뉴
	const $searchBtn = $('.mo_util .btn_util_search');
	const $menuBtn = $('.mo_util .btn_util_menu');
	const $etcBtn = $('.mo_util .btn_util_etc');

	const $searchLayer = $('#search_layer');
	const $menuLayer = $('#menu_layer');
	const $etcLayer = $('#etc_layer');

	const $allLayers = $('.mo_head_layer');
	const $allUtilBtns = $('.mo_util a');

	function closeAllLayers() {
		$allLayers.stop().fadeOut(300);
		$allUtilBtns.removeClass('active');
	}

	$allUtilBtns.on('click', function(e) {
		e.preventDefault(); 
		e.stopPropagation(); 

		const $thisBtn = $(this);
		let $targetLayer;

		if ($thisBtn.hasClass('btn_util_search')) {
			$targetLayer = $searchLayer;
		} else if ($thisBtn.hasClass('btn_util_menu')) {
			$targetLayer = $menuLayer;
		} else if ($thisBtn.hasClass('btn_util_etc')) {
			$targetLayer = $etcLayer;
		}

		if ($thisBtn.hasClass('active')) {
			$thisBtn.removeClass('active');
			$targetLayer.stop().fadeOut(300);
		} else { 
			closeAllLayers(); 
			$thisBtn.addClass('active');
			$targetLayer.stop().fadeIn(300);
		}
	});

	$(document).on('click', function(e) {
		if (!$allUtilBtns.is(e.target) && $allUtilBtns.has(e.target).length === 0 &&
			!$allLayers.is(e.target) && $allLayers.has(e.target).length === 0) {
			closeAllLayers();
		}
	});
}

function handleDetailLayer() { //상세 검색 레이어
	const $openBtn = $('.js-btn_deatil');
	const $closeBtn = $('.detail_layer .btn_close');
	const $detailLayer = $('.detail_layer');

	$openBtn.on('click', function(e) {
		e.stopPropagation(); 
		$detailLayer.stop().fadeIn(300);
		$('body').addClass('dim');
	});

	$closeBtn.on('click', function() {
		$detailLayer.stop().fadeOut(0);
		$('body').removeClass('dim');
	});

	$(document).on('click', function(e) {
		if ($('body').hasClass('dim') && !$detailLayer.is(e.target) && $detailLayer.has(e.target).length === 0 && $('.help_layer').has(e.target).length === 0) {
			$detailLayer.stop().fadeOut(0);
			$('body').removeClass('dim');
		}
	});
}


function handleHelpLayer() {// 도움말 팝업
	const $openBtn = $('.dt_head .btn_help'); 
	const $closeBtn = $('.help_layer .btn_close')
	const $helpLayer = $('.help_layer')

	$openBtn.on('click', function(e) {
		e.stopPropagation(); 
		$helpLayer.stop().fadeIn(300);
	});

	$closeBtn.on('click', function() {
		$helpLayer.stop().fadeOut(0);
	});

	// 도움말 팝업 영역 외 클릭 시 닫기
	$(document).on('click', function(e) {
		if (!$helpLayer.is(e.target) && $helpLayer.has(e.target).length === 0 && $helpLayer.is(':visible')) {
			$helpLayer.stop().fadeOut(0);
		}
	});
}

function handleAllMenuPC() { //전체메뉴 PC
	const $openBtn = $('.pc_util .btn_menu');
	const $closeBtn = $('.all_menu_pc .btn_close');
	const $allMenuPC = $('.all_menu_pc');

	$openBtn.on('click', function() {
		$allMenuPC.stop().fadeIn(300);
	});

	$closeBtn.on('click', function() {
		$allMenuPC.stop().fadeOut(300);
	});
}

function handleHeaderFixed() { //헤더 fixed
	const $header = $('header');
	let originalHeaderOffsetTop = $header.offset().top;

	$(window).on('scroll', function() {
		var st = $(window).scrollTop();
		if (st > originalHeaderOffsetTop) {
			$header.addClass('fixed');
		} else {
			$header.removeClass('fixed');
		}
	});
	$(window).trigger('scroll');
}

function initFooterMenuToggle() { //푸터 사이트
	const $wrap = $('.f_menu_wrap');
	const $btns = $wrap.find('.btn_f_menu');
	const $uls = $wrap.find('.f_menu ul');

	$btns.on('click', function(e) {
		e.stopPropagation();

		const $thisBtn = $(this);
		const $thisUl = $thisBtn.siblings('ul');

		$btns.not($thisBtn).removeClass('active');
		$uls.not($thisUl).stop().slideUp(200);

		$thisBtn.toggleClass('active');
		$thisUl.stop().slideToggle(200);
	});

	$(document).on('click', function(e) {
		if (!$wrap.is(e.target) && $wrap.has(e.target).length === 0) {
			$btns.removeClass('active');
			$uls.stop().slideUp(200);
		}
	});
}

function curationSlide() { //큐레이션 슬라이드
	var swiper = new Swiper(".curation_slide", {
		spaceBetween: 30,
		slidesPerView : 2,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
}

// 달력
const specialDatesWithLinks = {
    '2025-10-17': 'https://www.example.com/event/2025-10-17',
    '2025-10-25': 'https://www.example.com/notice/special-day',
    '2025-11-01': 'https://www.example.com/promo/november',
};

function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function datepicker() {
	$.datepicker.setDefaults({
		dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		showMonthAfterYear: true,
		showOtherMonths: true,
		yearRange: 'c-999:c+99'
	});

	$( "#datepicker" ).datepicker({
		changeMonth: true,
		changeYear: true,
		onChangeMonthYear: function() {
			setTimeout(function() {
				addYearSuffix();
				applyNiceSelectToDatepicker();
			}, 10);
		},
		onSelect: function(dateText, inst) {
			setTimeout(function() {
				addYearSuffix();
				applyNiceSelectToDatepicker();
			}, 0);
		},
		beforeShowDay: function(date) {
			const formattedDate = formatDateToYYYYMMDD(date);
			const linkUrl = specialDatesWithLinks[formattedDate];

			if (linkUrl) {
				return [true, 'link-day', '이벤트 보러가기!'];
			}
			return [true, '', ''];
		}
	});

	$(document).on('click', '#datepicker .ui-datepicker-calendar .link-day', function(e) {
		e.preventDefault();
		e.stopPropagation();

		const $dayCell = $(this).closest('td');
		const clickedYear = $dayCell.data('year');
		const clickedMonth = $dayCell.data('month') + 1;
		const clickedDay = parseInt($(this).text(), 10);

		const formattedClickedMonth = String(clickedMonth).padStart(2, '0');
		const formattedClickedDay = String(clickedDay).padStart(2, '0');
		const clickedDateString = `${clickedYear}-${formattedClickedMonth}-${formattedClickedDay}`;

		const url = specialDatesWithLinks[clickedDateString];

		if (url) {
			window.location.href = url;
		}
	});

	setTimeout(function() {
		addYearSuffix();
		applyNiceSelectToDatepicker();
	}, 0);
}

function addYearSuffix() {
	$('.ui-datepicker-year option').each(function() {
		const txt = $(this).text();
		if(!txt.includes('년')) {
			$(this).text(txt + '년');
		}
	});
}

function applyNiceSelectToDatepicker() {
	const $monthSelect = $('.ui-datepicker-month');
	const $yearSelect = $('.ui-datepicker-year');

	if ($monthSelect.hasClass('hasNiceSelect')) {
		$monthSelect.niceSelect('destroy');
	}
	if ($yearSelect.hasClass('hasNiceSelect')) {
		$yearSelect.niceSelect('destroy');
	}

	$monthSelect.niceSelect();
	$yearSelect.niceSelect();

	$monthSelect.addClass('hasNiceSelect');
	$yearSelect.addClass('hasNiceSelect');
}