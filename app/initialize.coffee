$(window).load ->
  $('.preloader').removeClass('preloader-active')
$(document).ready ->
  inlineSVG.init()
  $('.slider').slick(
    adaptiveHeight: false
    arrows: false
    
    )
  $('.contact').click ->
    $('.flex-inner-cont').addClass('active')
  

  pathA = document.getElementById('pathA')
  pathC = document.getElementById('pathC')
  segmentA = new Segment(pathA, 8, 32)
  segmentC = new Segment(pathC, 8, 32)


  inAC = (s) ->
    s.draw '80% - 24', '80%', 0.3,
      delay: 0.1
      callback: ->
        inAC2 s
        return
    return

  inAC2 = (s) ->
    s.draw '100% - 54.5', '100% - 30.5', 0.6, easing: ease.ease('elastic-out', 1, 0.3)
    return

  inAC(segmentA)
  inAC(segmentC)

  pathB = document.getElementById('pathB')
  segmentB = new Segment(pathB, 8, 32)


  inB = (s) ->
    s.draw 8 - 6, 32 + 6, 0.1, callback: ->
      inB2 s
      return
    return



  inB2 = (s) ->
    s.draw 8 + 12, 32 - 12, 0.3, easing: ease.ease('bounce-out', 1, 0.3)
    return

  inB segmentB

  outAC = (s) ->
    s.draw '90% - 24', '90%', 0.1,
      easing: ease.ease('elastic-in', 1, 0.3)
      callback: ->
        outAC2 s
        return
    return

  outAC2 = (s) ->
    s.draw '20% - 24', '20%', 0.3, callback: ->
      outAC3 s
      return
    return

  outAC3 = (s) ->
    s.draw 8, 32, 0.7, easing: ease.ease('elastic-out', 1, 0.3)
    return

  outB = (s) ->
    s.draw 8, 32, 0.7,
      delay: 0.1
      easing: ease.ease('elastic-out', 2, 0.4)
    return

  outAC segmentA
  outB segmentB
  outAC segmentC

  trigger = 
  toCloseIcon = true
  $('.menu').click ->
    if toCloseIcon
      inAC segmentA
      inB segmentB
      inAC segmentC 
      $('#menu').addClass('active')
      $('body').addClass('hidden')

    else
      $('#menu').removeClass('active')
      $('body').removeClass('hidden')
      $('.flex-inner-cont').removeClass('active')
      outAC segmentA
      outB segmentB
      outAC segmentC
    toCloseIcon = !toCloseIcon
    return
