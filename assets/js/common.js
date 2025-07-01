$(document).ready(function(){
	$('#header').length && h_menu() 
	$('.select_box').niceSelect()
});

function dimShow(){ /* 딤드 show */
    $('body').addClass('dim');
}
function dimHide(){ /* 딤드 hide */
    $('body').removeClass('dim');
}