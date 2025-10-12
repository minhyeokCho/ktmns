$(document).ready(function(){
	$('.go_top').length && goTop(); //페이지상단이동

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
		window.scrollTo({ top: 0 });
	});
}