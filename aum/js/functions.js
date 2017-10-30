$(function () {

	formValidate();

})




function formValidate () {
	$(".form .submit").click(function () {
		$(".form .row").removeClass("error");
		$(".error_tip").hide();
		$(".form form input").each(function () {
			if ($(this).val() == "") {
				$(this).parent().addClass("error");
			}
		})
		if ($(".form form #degree").val() == "请选择期望学位") {
			$(".form form #degree").parent().addClass("error");
		}
		if ($(".form form #start_date").val() == "请选择开学时间") {
			$(".form form #start_date").parent().addClass("error");
		}
		if($(".form .error").length > 0) {
			$(".error_tip").show();
		}
	})
}
