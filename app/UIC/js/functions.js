$(function () {

	tabSwitch();  //tab
	videoResize();  //video resize

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


// video resize
function videoResize () {
	window.onload = function() {
		setVideoSize();
    };
	window.onresize = function() {
		setVideoSize();
    };
	function setVideoSize () {
		if ($(".video_wrap video").length > 0) {
			var wrapWidth, wrapHeight, videoWidth, videoHeight;
			var video = $(".video_wrap video");
			wrapWidth = $(".video_wrap").width();
			wrapHeight = $(".video_wrap").height();
			videoWidth = $(".video_wrap video").width();
			videoHeight = $(".video_wrap video").height();
			video.width("auto");
			video.height("auto");
			if (wrapWidth/wrapHeight > videoWidth/videoHeight) {
				video.width("100%");
			}
			else {
				video.height("100%");
			}
		}
	}
}
