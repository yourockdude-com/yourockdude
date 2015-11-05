$(window).load ->
  $('.preloader').removeClass('preloader-active')
$(document).ready ->
  inlineSVG.init()
  $('.slider').slick(
    adaptiveHeight: false
    arrows: false
    fade: true
    )
  $('.menu').click ->
    $('#menu').addClass('active')
  $('.close').click ->
    $('#menu').removeClass('active')
    $('.flex-inner-cont').removeClass('active')
  $('.contact').click ->
    $('.flex-inner-cont').addClass('active')