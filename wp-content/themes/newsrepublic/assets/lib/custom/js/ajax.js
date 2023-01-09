
jQuery(document).ready(function ($) {
    "use strict";

    var ajaxurl = newsrepublic_ajax.ajax_url;

    $('.tab-posts-toggle').click(function(){
        $('.theme-dropdown').toggleClass('theme-dropdown-active');
    });

    // Tab Posts ajax Load
    $('.tab-posts a').click( function(){

        $('.theme-dropdown').removeClass('theme-dropdown-active');
        var catName = $(this).html();
        $('.theme-dropdown .tab-selected-category').empty();
        $('.theme-dropdown .tab-selected-category').html(catName);

        var category = $(this).attr('cat-data');
        var curentelement = $('.tab-content-'+category);
        $('.tab-posts a').removeClass( 'active-tab' );
        $(this).addClass('active-tab');
        $(this).closest('.theme-block-navtabs').find('.tab-contents').removeClass('content-active');
        $( curentelement ).addClass( 'content-active' );

        if( !$( curentelement ).hasClass( 'content-loaded' ) ){

            $( curentelement ).addClass( 'content-loading' );

            var data = {
                'action': 'newsrepublic_tab_posts_callback',
                'category': category,
                '_wpnonce': newsrepublic_ajax.ajax_nonce,
            };

            $.post(ajaxurl, data, function( response ) {

                $( curentelement ).first().html( response );

                $( curentelement ).removeClass( 'content-loading' );
                $( curentelement ).addClass( 'content-loaded' );
                $( curentelement ).find( '.content-loading-status' ).remove();

                var pageSection = $(".data-bg");
                pageSection.each(function (indx) {

                    if ($(this).attr("data-background")) {

                        $(this).css("background-image", "url(" + $(this).data("background") + ")");

                    }

                });
    
            });

        }

    });
    
});