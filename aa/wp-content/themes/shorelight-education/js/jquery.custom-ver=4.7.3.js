jQuery(document).ready(function($){
    //disble click on megamenu column heading
    $('#main-menu > ul > li.multi-column > .sub-menu > li.column-heading > a').on('click', function(e){
        e.preventDefault();
    });

    //header animations
    $('#main-header').headroom();
    $(window).load(function(){
        $('#ucfhb').prependTo('#main-header');
    });

    $('#mobile-header').headroom();

    //lazy load
    $('.lazy').lazyload({
        effect: 'fadeIn',
        effectspeed: 400,
        skip_invisible: true
    });
    //main menu
    $('#main-menu > ul > li.menu-item-has-children > a').on('click', function(e){
        console.log('wtf');
        e.preventDefault();
        return false;
    });

    //mobile menu
    var mobileHeader = $('#mobile-header'),
        mobileMenuToggle = mobileHeader.find('.mobile-menu-toggle'),
        mobileMenu = $('#mobile-menu');

    mobileMenuToggle.on('click', function(){
        mobileMenu.stop().slideToggle();
        $('body').toggleClass('no-scroll');
        mobileMenuToggle.find('.menu-icon').toggleClass('open');
    });

    $('#mobile-menu > ul > .menu-item-has-children').each(function(){
        var menuItem = $(this).find('> a'),
            subMenuArrow = $('<span class="sub-menu-trigger"><svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.1 20.4" overflow="scroll"><path fill="#F8F8F8" d="M33.1 3.9L29.2 0 16.6 12.7 3.9 0 0 3.9l16.6 16.5"/></svg></span>');

        $(this).append(subMenuArrow);

        menuItem.on('click', function(e){
            e.preventDefault();

            $(this).toggleClass('active');
            menuItem.toggleClass('active-sub-menu');
            menuItem.parent().find('.sub-menu').toggleClass('active');
        });
    })

    //equal height columns
    $('.section-equal-height-columns .column, .se-quote-wrapper .column, .se-quiz .column, .se-content-with-image .column, .se-map-with-content .column').matchHeight();

    //gravity form select
    $('.gform_wrapper select').select2();
    jQuery(document).bind('gform_post_render', function(){
        $('.gform_wrapper select').select2();
        setTimeout(function(){
            $('#main-header').removeClass('headroom--pinned').addClass('headroom--unpinned')
        }, 100);
    });

    //featured posts slideshow
    $('.featured-posts .container').slick({
        dots: true,
        arrows: false,
        nav: false,
        fade: true,
        cssEase: 'linear',
        adaptiveHeight: true
    });

    se_icon_with_text();
    $(window).resize(se_icon_with_text);

    se_flip_card_size();
    $(window).resize(se_flip_card_size);

    se_responsive_data_tables();

    se_youtube_player();

    se_video_testimonials();

    se_section_nav();

    se_tour();

    se_contact_information();

    se_quiz();

    se_button_smooth_scroll();

    se_button_menu();

    if ( typeof MktoForms2 !== 'undefined' )
    {
        MktoForms2.whenReady(function (form) {
            $('#mktoForms2BaseStyle, #mktoForms2ThemeStyle').remove();
            $(form.getFormElem()).find('select').select2({
                minimumResultsForSearch: -1
            });
        });
    }
});

function se_button_menu()
{
    jQuery('.se-button-has-menu > a').on('click', function(e){
        e.preventDefault();
        jQuery(this).parent().toggleClass('active');
    })
}

function se_button_smooth_scroll()
{
    var scrollButtons = jQuery('.se-button[href*=#]:not(.no-scroll)');
    if ( scrollButtons.length )
    {
        scrollButtons.each(function(){
            var scrollButton = jQuery(this),
                scrollButtonHref = scrollButton.attr('href');

            scrollButton.on('click', function(e){
                e.preventDefault();

                jQuery('html, body').animate({
                    scrollTop: jQuery(scrollButtonHref).offset().top
                }, 300);

            });
        });
    }
}

function se_icon_with_text()
{
    var elements = jQuery('.se-icon-text');
    elements.each(function(){
        var element = jQuery(this),
            elementHeight = element.outerHeight(),
            heading = element.find('h3'),
            headingHeight = heading.outerHeight();

        heading.removeAttr('style');

        if ( headingHeight < elementHeight )
        {
            var paddingValue = ( elementHeight - headingHeight ) / 2;
            heading.css('padding-top', paddingValue);
        }
    });
}

function se_flip_card_size()
{
    var flipCards = jQuery('.se-flip-card, .se-flip-card-simple');

    flipCards.each(function(){
        var flipCard = jQuery(this),
            flipCardHeight = flipCard.outerWidth(),
            flipCardInner = flipCard.find('.se-flip-card-inner');

        flipCardInner.css('height', flipCardHeight);
    });
}

function se_responsive_data_tables()
{
    var responsiveTables = jQuery('.responsive-table');

    responsiveTables.each(function(){
        var responsiveTable = jQuery(this);

        if ( responsiveTable.hasClass('stack-columns') )
        {
            responsiveTable.stackcolumns();
            responsiveTable.find('tbody tr:nth-child(even)').addClass('alt');
        }
        if ( responsiveTable.hasClass('stack-table') )
        {
            responsiveTable.stacktable();
            responsiveTable.find('tbody tr:nth-child(even)').addClass('alt');
        }
        if ( responsiveTable.hasClass('stack-table-card') )
        {
            responsiveTable.cardtable();
            responsiveTable.find('tbody tr:nth-child(even)').addClass('alt');
        }
    });
}

function se_youtube_player()
{
    var players = jQuery('.youtube-player');

    players.each(function(){
        var player = jQuery(this),
            video_id = player.data('video-id');

        player.on('click', function(){
            var videoHTML = '<div class="embed-container"><iframe src="http://www.youtube.com/embed/' + video_id + '?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';
            player.html(videoHTML);
        });
    });
}

function se_video_testimonials()
{
    var video_testimonials = jQuery('.video-testimonials');

    video_testimonials.each(function(){
        var item = jQuery(this);
            filter = item.find('.filter select');

        var itemIsotope = item.find('.row');

        filter.select2({
            minimumResultsForSearch: -1
        });

        itemIsotope.imagesLoaded( function() {
            itemIsotope.isotope({
                layoutMode: 'fitRows'
            });

            filter.on('change', function (e) {
                var selectedValue = jQuery(this).val();
                itemIsotope.isotope({ filter: selectedValue });
            });
        });
    });

}

function se_section_nav()
{
    var sectionNavDropdown = jQuery('#section-nav-dropdown'),
        sectionNavItems = jQuery('.section-nav');

    sectionNavItems.each(function(){
        var sectionNavItem = jQuery(this);
            sectionNavItemID = sectionNavItem.attr('id');
            sectionNavHeading = sectionNavItem.find('h3').text();

        sectionNavDropdown.append('<option value="#' + sectionNavItemID + '">' + sectionNavHeading + '</option>');
    });

    sectionNavDropdown.select2({
        minimumResultsForSearch: -1
    });

    sectionNavDropdown.on('change', function (e) {
        var selectedValue = jQuery(this).val();

        jQuery('html, body').animate({
            scrollTop: jQuery(selectedValue).offset().top
        }, jQuery(selectedValue).offset().top / 10);
    });
}

function se_tour()
{
    var tourMenuItems = jQuery('.vc_tta-tabs .vc_tta-tab > a');

    tourMenuItems.each(function(){
        var tourMenuItem = jQuery(this);
        tourMenuItem.append('<span class="icon"><svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 20" overflow="scroll"><path fill="#222" d="M0 2.3L7.5 10 0 17.7 2.3 20 12 10 2.3 0 0 2.3z"/></svg></span>');
    });
}

function se_contact_information()
{
    var contactInformation = jQuery('.se-contact-information');

    contactInformation.each(function(){
        var element = jQuery(this),
            elementFilter = element.find('.filter select'),
            elementInfos = element.find('.info');

        elementFilter.select2({
            minimumResultsForSearch: -1
        });

        elementFilter.on('change', function (e) {
            var selectedValue = jQuery(this).val();

            elementInfos.addClass('info-hidden');
            element.find('.' + selectedValue).removeClass('info-hidden');
        });
    });
}

function se_quiz()
{
    var quizes = jQuery('.se-quiz');

    quizes.each(function(){
        var quiz = jQuery(this),
            quizButton = quiz.find('.se-button'),
            quizPopup = quiz.find('.se-quiz-popup');

        quizButton.on('click', function(e){
            e.preventDefault();

            jQuery.magnificPopup.open({
                closeMarkup: '<button title="%title%" type="button" class="mfp-close"><span></span></button>',
                items: {
                    src: quizPopup,
                    type: 'inline'
                }
            });
        });

    });
}
