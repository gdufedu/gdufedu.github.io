$(function () {
    $('.link .button').hover(function () {
        let title = $(this).attr('data');
        $('.tip em').text(title);
        let pos = $(this).position().left + 10;
        let dis = ($('.tip').outerWidth() - $(this).outerWidth()) / 2;
        let l = pos - dis;
        $('.tip').css({ 'left': l + 'px' }).stop().animate({ 'top': 145, 'opacity': 1 }, 500);
    }, function () {
        $('.tip').stop().animate({ 'top': 100, 'opacity': 0 }, 500);
    });
});