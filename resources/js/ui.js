$(document).ready(function(){
	$('.go_top').length && goTop(); //페이지상단이동
	$('#datepicker').length && datepicker(); //datepicker
	$('.curation_slide').length && curationSlide(); //큐레이션 슬라이드
	
	$('.select01').niceSelect();
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