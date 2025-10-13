$(document).ready(function(){
	$('.go_top').length && goTop(); //페이지상단이동
	$('.btn_detail').length && btnDetail(); //소개 버튼
	$('.tab-area').length && tabContent(); //탭버튼

	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		var $header = $('header');
		var $logo = $('.logo-box img');

		if(scrollTop > 0){
			$header.addClass('fixed');
			$logo.attr('src', './resources/images/logo-header-wh.svg');
		} else {
			$header.removeClass('fixed');
			$logo.attr('src', './resources/images/logo-header.svg');
		}
	});
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

function btnDetail(){ //소개 버튼
	$('.btn_detail').on('click', function() {
		$('.detail-content').slideToggle();
	});
	$('.detail-content .close').on('click', function() {
		$('.detail-content').slideUp();
	});
}

function tabContent() {
	$('.tab-area a').on('click', function(e) {
		e.preventDefault();
	
		var targetId = $(this).attr('href');
		var targetOffset = $(targetId).offset().top - 100;
	
		$('html, body').animate({
			scrollTop: targetOffset
		}, 800);
	});
}