(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var has = ({}).hasOwnProperty;

  var aliases = {};

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf('components/' === 0)) {
        start = 'components/'.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return 'components/' + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var expand = (function() {
    var reg = /^\.\.?(\/|$)/;
    return function(root, name) {
      var results = [], parts, part;
      parts = (reg.test(name) ? root + '/' + name : name).split('/');
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part === '..') {
          results.pop();
        } else if (part !== '.' && part !== '') {
          results.push(part);
        }
      }
      return results.join('/');
    };
  })();
  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  globals.require = require;
})();
require.register("initialize", function(exports, require, module) {
$(window).load(function() {
  $('.preloader').removeClass('preloader-active');
  return $('#center-txt').typed({
    strings: ['сайты', 'интернет-магазины', 'приложения', 'рекламные кампании', 'брендинг', 'айдентику'],
    typeSpeed: 50,
    backDelay: 1500,
    loop: 100
  });
});

$(document).ready(function() {
  var inAC, inAC2, inB, inB2, outAC, outAC2, outAC3, outB, pathA, pathB, pathC, segmentA, segmentB, segmentC, toCloseIcon, trigger;
  inlineSVG.init();
  $('.slider').slick({
    adaptiveHeight: false,
    arrows: false,
    dots: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5500
  });
  $('.contact').click(function() {
    return $('.flex-inner-cont').addClass('active');
  });
  pathA = document.getElementById('pathA');
  pathC = document.getElementById('pathC');
  segmentA = new Segment(pathA, 8, 32);
  segmentC = new Segment(pathC, 8, 32);
  inAC = function(s) {
    s.draw('80% - 24', '80%', 0.3, {
      delay: 0.1,
      callback: function() {
        inAC2(s);
      }
    });
  };
  inAC2 = function(s) {
    s.draw('100% - 54.5', '100% - 30.5', 0.6, {
      easing: ease.ease('elastic-out', 1, 0.3)
    });
  };
  inAC(segmentA);
  inAC(segmentC);
  pathB = document.getElementById('pathB');
  segmentB = new Segment(pathB, 8, 32);
  inB = function(s) {
    s.draw(8 - 6, 32 + 6, 0.1, {
      callback: function() {
        inB2(s);
      }
    });
  };
  inB2 = function(s) {
    s.draw(8 + 12, 32 - 12, 0.3, {
      easing: ease.ease('bounce-out', 1, 0.3)
    });
  };
  inB(segmentB);
  outAC = function(s) {
    s.draw('90% - 24', '90%', 0.1, {
      easing: ease.ease('elastic-in', 1, 0.3),
      callback: function() {
        outAC2(s);
      }
    });
  };
  outAC2 = function(s) {
    s.draw('20% - 24', '20%', 0.3, {
      callback: function() {
        outAC3(s);
      }
    });
  };
  outAC3 = function(s) {
    s.draw(8, 32, 0.7, {
      easing: ease.ease('elastic-out', 1, 0.3)
    });
  };
  outB = function(s) {
    s.draw(8, 32, 0.7, {
      delay: 0.1,
      easing: ease.ease('elastic-out', 2, 0.4)
    });
  };
  outAC(segmentA);
  outB(segmentB);
  outAC(segmentC);
  trigger = toCloseIcon = true;
  $('.menu').click(function() {
    if (toCloseIcon) {
      inAC(segmentA);
      inB(segmentB);
      inAC(segmentC);
      $('#menu').addClass('active');
      $('body').addClass('hidden');
    } else {
      $('#menu').removeClass('active');
      $('body').removeClass('hidden');
      $('.flex-inner-cont').removeClass('active');
      outAC(segmentA);
      outB(segmentB);
      outAC(segmentC);
    }
    toCloseIcon = !toCloseIcon;
  });
  $('html').hover(function() {
    return $('.parallax-slider').addClass('scale');
  });
  return $(window).scroll(function() {
    if ($('body').scrollTop() > 350) {
      $('.parallax-mirror:nth-of-type(1)').find('.parallax-slider').removeClass('opacity');
      return $('.parallax-mirror:nth-of-type(2)').find('.parallax-slider').addClass('opacity');
    } else {
      $('.parallax-mirror:nth-of-type(1)').find('.parallax-slider').addClass('opacity');
      return $('.parallax-mirror:nth-of-type(2)').find('.parallax-slider').removeClass('opacity');
    }
  });
});
});

;
//# sourceMappingURL=app.js.map