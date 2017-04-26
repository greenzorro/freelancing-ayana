$(function () {

	tabSwitch();  //tab切换

})




// tab切换
function tabSwitch () {
	$(".tab_switch_fade").each(function () {
		var switcher = $(this).find(".switcher");
		var tab = $(this).find(".switch_tab");
		if (switcher.length == tab.length) {  //只有标签与内容数量相等时才触发效果
			$(this).on("click",".switcher",function () {
				var num = $(this).index();  //index内可适当加上选择器
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

