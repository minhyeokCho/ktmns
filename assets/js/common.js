$(document).ready(function(){
	$('#header').length && menu() 
	$('.family').length && familySite() 
	$('.select_box').niceSelect()
});

function dimShow(){ /* 딤드 show */
    $('body').addClass('dim');
}
function dimHide(){ /* 딤드 hide */
    $('body').removeClass('dim');
}

$(function () {

});

function menu() {
	const $dept2 = $('.dept_02');
	const $menuBg = $('.menu_bg');

	$('.dept_01 > li').mouseenter(function () {
		$dept2.stop(true, true).slideDown(300);
		$menuBg.stop(true, true).slideDown(300);
	});

	$('.h_btm').mouseleave(function () {
		if (!$('.dept_01 > li:hover, .dept_02:hover, .menu_bg:hover').length) {
			$dept2.stop(true, true).slideUp(300);
			$menuBg.stop(true, true).slideUp(300);
		}
	});
}

function familySite() {
	$('.family button').on('click', function () {
		$('.family').toggleClass('active')
		$('.family ul').stop().slideToggle(300)
	})
}