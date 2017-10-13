$(function () {

	tabSwitch();  //tab

})




// tab
function tabSwitch () {
	$(".tab_switch_fade").each(function () {
		var switcher = $(this).find(".switcher");
		var tab = $(this).find(".switch_tab");
		if (switcher.length == tab.length) {
			$(this).on("click",".switcher",function () {
				var num = $(this).index();
				switcher.removeClass("current");
				$(this).addClass("current");
				tab.removeClass("current_tab");
				tab.hide();
				tab.eq(num).addClass("current_tab");
				tab.eq(num).fadeIn(300);
				return false;
			})
		};
	})
}

