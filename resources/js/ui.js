$(document).ready(function(){
	$('.go_top').length && goTop(); //페이지상단이동
	$('.catg_box').length && handleCategoryTabs($('.catg_box'));
	$('.history_list').length && handleHistoryTabs(); //신문잡지별보기 탭
	$('.filter').length && handleFilter(); //filter함수
	$('.search_help_layer').length && handleSearchHelpLayer(); // 유형별 도움말 팝업 기능
	$('.menu_help_layer').length && handleHelpLayer(); // 도움말 팝업
	$('.detail_layer').length && handleDetailLayer(); //상세 검색 레이어
	$('.all_menu_pc').length && handleAllMenuPC(); //전체메뉴 PC
	$('header').length && handleHeaderFixed(); //헤더 고정
	$('.f_menu_wrap').length && initFooterMenuToggle(); //푸터 사이트
	$('#datepicker').length && datepicker(); //datepicker
	$('.history_slide').length && historySlide(); //주요자료 슬라이드
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


function handleHistoryTabs() { //신문잡지별보기 탭
	const $tabArea = $('.his_head .tab_area');

	$tabArea.find('button').on('click', function() {
		const $thisButton = $(this);
		$tabArea.find('button').removeClass('active');
		$thisButton.addClass('active');
	});

	if ($tabArea.find('button.active').length === 0) {
		$tabArea.find('button').first().addClass('active');
	}
}

function handleCategoryTabs($container) { //유형별보기 
	$container.find('button').on('click', function() {
		const $thisButton = $(this);
		$container.find('button').removeClass('active');
		$thisButton.addClass('active');
	});
}

function handleSearchHelpLayer() { //목록 | 도움말 팝업
	const $openBtn = $('.btn_search_help');
	const $closeBtn = $('.search_help_layer .btn_close');
	const $helpLayer = $('.search_help_layer');

	$openBtn.on('click', function(e) {
		e.stopPropagation();
		$helpLayer.stop().fadeIn(300);
	});

	$closeBtn.on('click', function() {
		$helpLayer.stop().fadeOut(300);
	});

	$(document).on('click', function(e) {
		if (!$helpLayer.is(e.target) && $helpLayer.has(e.target).length === 0 && $helpLayer.is(':visible')) {
			$helpLayer.stop().fadeOut(300);
		}
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
		if ($('body').hasClass('dim') && !$detailLayer.is(e.target) && $detailLayer.has(e.target).length === 0 && $('.menu_help_layer').has(e.target).length === 0) {
			$detailLayer.stop().fadeOut(0);
			$('body').removeClass('dim');
		}
	});
}


function handleHelpLayer() {// 도움말 팝업
	const $openBtn = $('.dt_head .btn_help, .btn_main_help'); 
	const $closeBtn = $('.menu_help_layer .btn_close')
	const $helpLayer = $('.menu_help_layer')

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

function historySlide() { //주요자료 슬라이드
	var swiper = new Swiper(".history_slide", {
		spaceBetween: 0,
		slidesPerView : 1,
		loop:true,
		pagination: {
			el: ".history_slide_wrap .swiper_bullet",
			type : 'fraction',

		},
		navigation: {
			nextEl: ".history_slide_wrap .btn_slide_next",
			prevEl: ".history_slide_wrap .btn_slide_prev",
		},
	});
}

function curationSlide() { //큐레이션 슬라이드
	var swiper = new Swiper(".curation_slide", {
		spaceBetween: 20,
		slidesPerView : 4,
		pagination: {
			el: ".sec_cur .swiper_bullet",
			type : 'fraction',

		},
		navigation: {
			nextEl: ".sec_cur .btn_slide_next",
			prevEl: ".sec_cur .btn_slide_prev",
		},
	});
}

// 달력
const specialDatesWithLinks = {
    '2025-10-03': 'https://www.example.com/event/2025-10-17',
    '2025-10-06': 'https://www.example.com/notice/special-day',
    '2025-11-16': 'https://www.example.com/promo/november',
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
		yearRange: 'c-99:c+99'
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

	$(document).off('click.dpLink').on('click.dpLink', '#datepicker .ui-datepicker-calendar .link-day', function(e) {
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

	let dpResizeTimer;
	$(window).off('resize.dp').on('resize.dp', function () {
	clearTimeout(dpResizeTimer);
	dpResizeTimer = setTimeout(function () {
		$('#datepicker').datepicker('refresh'); // 헤더 재그림
		addYearSuffix();                        // '년' 복구
		applyNiceSelectToDatepicker();          // 월/년 niceSelect + applyMobileLayout()
	}, 10);
	});
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

	applyMobileLayout();
}
function isMobile() {
  return window.matchMedia('(max-width: 768px)').matches;
}

// 월/년 기준 해당 달의 일 수
function daysInMonth(year, monthZeroBased) {
  return new Date(year, monthZeroBased + 1, 0).getDate();
}

function applyMobileLayout() {
  if (!isMobile()) {
    // 데스크탑 모드: 보이기 & 정리
    $('#datepicker').removeClass('dp-mobile');
    $('.ui-datepicker-day-select-wrap').remove();
    $('.ui-datepicker-calendar, .ui-datepicker-header .ui-datepicker-day-select-wrap').show();
    return;
  }

  // 모바일 모드 고정 클래스 부여(그리드 항상 숨김)
  $('#datepicker').addClass('dp-mobile');

  const $monthSelect = $('.ui-datepicker-month');
  const $yearSelect  = $('.ui-datepicker-year');
  if ($monthSelect.length === 0 || $yearSelect.length === 0) return;

  // 재생성
  $('.ui-datepicker-day-select-wrap').remove();

  const year  = parseInt($yearSelect.val(), 10);
  const month = parseInt($monthSelect.val(), 10); // 0-based
  const today = $('#datepicker').datepicker('getDate') || new Date();

  const maxDay = daysInMonth(year, month);
  const $wrap  = $('<span class="ui-datepicker-day-select-wrap" style="margin-left:6px;"></span>');
  const $day   = $('<select class="ui-datepicker-day"></select>');

  for (let d = 1; d <= maxDay; d++) $day.append(`<option value="${d}">${d}일</option>`);

  const sameYM = (today.getFullYear() === year && today.getMonth() === month);
  const selectedDay = sameYM ? today.getDate() : 1;
  $day.val(String(selectedDay));

  $wrap.append($day);
  $wrap.insertAfter($monthSelect.closest('.nice-select').length ? $monthSelect.closest('.nice-select') : $monthSelect);

  if ($day.hasClass('hasNiceSelect')) $day.niceSelect('destroy');
  $day.niceSelect().addClass('hasNiceSelect');

  $day.off('change').on('change', function () {
    const chosenDay = parseInt($(this).val(), 10);
    const newDate   = new Date(year, month, chosenDay);

    // ① 날짜 반영
    $('#datepicker').datepicker('setDate', newDate);

	$('#datepicker').datepicker('refresh');
		setTimeout(function () {
		addYearSuffix();
		applyNiceSelectToDatepicker(); // 내부에서 applyMobileLayout도 호출됨
	}, 0);

    // ③ 특일 링크 이동
    const clickedDateString = formatDateToYYYYMMDD(newDate);
    const url = specialDatesWithLinks[clickedDateString];
    if (url) window.location.href = url;
  });
}