(function() {

    var pageFunc, plugin,
        mySwiper,
        score=[], total;
    document.addEventListener("touchstart", function(){}, true);

    document.onreadystatechange = function () {
        if (document.readyState == "complete" ) {  //页面加载完成，执行相应代码
            $(".loading").addClass("loading_hide");
            setTimeout(function() {
                $(".loading").hide();
            }, 500);
        } 
    };

    $(document).ready(function () {
        mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            speed: 300,
            effect: 'slide',
            noSwipingClass: 'noSwipe',
            onSlideChangeEnd: function (argument) {
            }
        })        

        plugin.init();
        pageFunc.quiz();
        pageFunc.form();
        pageFunc.share();
    });

    plugin = {
        init: function() {
            document.ontouchmove = function(e){  //禁止窗口的默认滑动
                e.preventDefault();
            }
            mySwiper.lockSwipeToNext();  //禁止向后翻页
            $('body').on('click','#start',function () {  //点击开始按钮
                mySwiper.unlockSwipeToNext();
                mySwiper.slideNext(true, 300);
                mySwiper.lockSwipeToNext();
            })
            $('body').on('click','#order',function () {  //点击立即定制旅行计划按钮
                mySwiper.unlockSwipeToNext();
                mySwiper.slideNext(true, 300);
                mySwiper.lockSwipeToNext();
            })
        }
    }

    pageFunc = {
        quiz: function () {
            $('.quiz_item').click(function () {  //点击题目选项
                score[mySwiper.activeIndex-1] = $(this).attr('rel');  //记录选项分数
                console.log("choice: " + score[mySwiper.activeIndex-1]);  //debug
                $('.quiz-' + mySwiper.activeIndex + " .quiz_item").removeClass('quiz_item_selected');
                $(this).addClass('quiz_item_selected');
                if (mySwiper.activeIndex == $('.quiz').length) {  //最后一题
                    total = eval(score.join("+"));  //计算总分
                    $('#choices').val(score.join(""));  //答题选项写入表单中
                    $('.intro-' + (parseInt(score[0])+1)).show();  //显示下一页的相应结果，默认全部隐藏
                }
                mySwiper.unlockSwipeToNext();  //允许向后翻页
                mySwiper.slideNext(true, 300);
                mySwiper.lockSwipeToNext();  //禁止向后翻页
            })
        },
        form: function () {  //表单验证
            $('body').on('blur','.form .input',function () {  //输入框失去焦点时进行非空校验
                emptyOrNot($(this));
            })
            $('body').on('click','#submit',function () {  //点击提交按钮
                var flag = 1;  //判断表单是否都通过验证的标记参数
                $('.form .input').each(function () {
                    if ($(this).val() == '') {
                        flag = 0;
                    }
                    emptyOrNot($(this));
                })
                if (flag) {  //表单都通过验证才进入下一页
                    ajaxSubmit($("#user_form"),'http://device.ivy4u.com/r','POST')
                }
            })
            function emptyOrNot(obj) {  //判断某个输入框是否为空，并显示错误提示
                if (obj.val() == '') {
                    obj.parent().find('.error').html('这项还没有填哦~');
                    obj.parent().find('.error').show();
                }
                else {
                    obj.parent().find('.error').hide();
                    obj.parent().find('.error').html('');
                }
            }
            function ajaxSubmit(formObj,url,method) {  //ajax提交数据
                var params = formObj.serialize();
                console.log(params);  //debug
                $.ajax({
                    type : method,
                    url : url,
                    data : params,
                    success : function(msg) {
                        console.log("server msg: " + msg);  //debug
                        mySwiper.unlockSwipeToNext();
                        mySwiper.slideNext(true, 300);
                        mySwiper.lockSwipeToNext();
                    },
                    error : function(msg) {
                        console.log("server msg: " + msg);  //debug
                        alert("提交失败，请再试试吧");
                    }
                });
            }
        },
        share: function () {  //显示隐藏右上角分享提示
            $('body').on('click','#share',function () {
                $('.share_mask').addClass('share_mask_on');
            })
            $('body').on('click','.share_mask',function () {
                $('.share_mask').removeClass('share_mask_on');
            })
        }
    }


}).call(this);


