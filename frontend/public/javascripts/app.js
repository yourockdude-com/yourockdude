(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var _cmp = 'components/';
  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf(_cmp) === 0) {
        start = _cmp.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return _cmp + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
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

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return require(absolute, path);
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
  require._cache = cache;
  globals.require = require;
})();
require.register("index", function(exports, require, module) {
module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("<!DOCTYPE html>\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n  <link rel=\"stylesheet\" href=\"stylesheets/app.css\">\n  <script src=\"javascripts/vendor.js\"></script>\n  <script src=\"javascripts/app.js\"></script>\n  <script src=\"javascripts/segment.min.js\"></script>\n  <script src=\"javascripts/ease.min.js\"></script>\n  <script>\n    require('initialize');\n    \n  </script>\n</head>\n<body>\n  <div class=\"preloader preloader-active\"><img src=\"images/preloader.gif\"></div>\n  <div id=\"menu\">\n    <div class=\"container\">\n      <div class=\"links\"><a href=\"index.html\" class=\"pink\">Работы</a><a href=\"/about\">О нас</a><a class=\"contact\">Контакты</a></div>\n      <div class=\"flex-inner-cont\">\n        <div class=\"social\"><a href=\"http://instagram.com/cr8tive\"><img src=\"images/instagram.svg\" class=\"svg\"></a><a href=\"http://www.facebook.com/yyurchenko\"><img src=\"images/fb.svg\" class=\"svg\"></a><a href=\"http://twitter.com/yuriyurchenko\"><img src=\"images/twitter.svg\" class=\"svg\"></a><a href=\"http://dribbble.com/cr8tive\"><img src=\"images/dr.svg\" class=\"svg\"></a></div>\n        <div class=\"contacts\">\n          <div class=\"addres\">Россия, Ростов-на-Дону, ул. Пушкинская, 157</div>\n          <div class=\"numbers\">\n            <div class=\"one\">+7 863 264 94 89</div>\n            <div class=\"two\">+7 919 894 44 44</div>\n          </div>\n          <div class=\"mail\"><a href=\"mailto:yuriyurchenko@me.com\">Написать письмо</a></div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"main-page\">\n    <div class=\"head\">\n      <header class=\"header\">\n        <div class=\"container\"><a href=\"\" class=\"logo\"><img src=\"images/logo.svg\" class=\"svg\"></a>\n          <div class=\"menu\">\n            <svg width=\"100px\" height=\"100px\">\n              <path id=\"pathA\" d=\"M 30 40 L 70 40 C 90 40 90 75 60 85 A 40 40 0 0 1 20 20 L 80 80\"></path>\n              <path id=\"pathB\" d=\"M 30 50 L 70 50\"></path>\n              <path id=\"pathC\" d=\"M 70 60 L 30 60 C 10 60 10 20 40 15 A 40 38 0 1 1 20 80 L 80 20\"></path>\n            </svg>\n          </div>\n        </div>\n      </header>\n      <div class=\"main\">\n        <div data-parallax=\"scroll\" data-image-src=\"images/bg1.png\" class=\"background\"></div>\n        <div data-parallax=\"scroll\" data-image-src=\"images/bg2.png\" class=\"opacity-back\"></div>\n        <div class=\"container\">\n          <div id=\"content\">\n            <div id=\"left-txt\">Мы разрабатываем</div>\n            <div id=\"center-txt\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"portfolio\">\n      <div class=\"container\">\n        <div class=\"inner\">\n          <div class=\"main-flex\">\n            <div class=\"flex-inner\"><a href=\"http://jdbbq.ru/\" target=\"_blank\" class=\"flex-item\">\n                <div class=\"logo\"><img src=\"images/JD_logo.svg\" class=\"svg\"></div>\n                <div class=\"bottle\"><img src=\"images/JD_img_color.png\"></div>\n                <div class=\"bottle1\"><img src=\"images/JD_img_bw.png\"></div>\n                <div class=\"text\">\n                  <div class=\"title\">— Jack Daniels</div>\n                  <div class=\"txt\">Промо-сайт<br>для производителя<br>алкогольных напитков</div>\n                </div></a><a href=\"http://niveausa.com/\" target=\"_blank\" class=\"flex-item nivea\">\n                <div class=\"image\"><img src=\"images/NIVEA_img\"></div>\n                <div class=\"text\">\n                  <div class=\"logo\"><img src=\"images/NIVEA_logo.svg\" class=\"svg\"></div>\n                  <div>\n                    <div class=\"title\">— Nivea</div>\n                    <div class=\"txt\">Разработка серии<br>промо-сайтов.</div>\n                  </div>\n                </div></a></div>\n            <div class=\"flex-inner\"><a href=\"http://www.nike.com/ru/ru_ru/c/running/nikeplus/gps-app\" target=\"_blank\" class=\"flex-item\">\n                <div class=\"image\"><img src=\"images/NIKE_logo.svg\" class=\"svg\"></div>\n                <div class=\"circle\"><img src=\"images/Oval_nike.svg\" class=\"svg\"></div>\n                <div class=\"text\">\n                  <div class=\"title\">— Nike+</div>\n                  <div class=\"txt\">\n                    Интерфейс мобильного\n                    приложения\n                  </div>\n                </div></a><a href=\"project-page.html\" class=\"flex-item\"></a></div>\n          </div>\n          <div class=\"main-flex-second\">\n            <div class=\"flex-inner\"><a href=\"http://www.suzuki-motor.ru/\" target=\"_blank\" class=\"flex-item\">\n                <div class=\"images\">\n                  <div class=\"first\">\n                    <div class=\"image\"><img src=\"images/moto.png\"></div>\n                  </div>\n                  <div class=\"second\">\n                    <div class=\"image\"><img src=\"images/SUZUKI_logo.svg\" class=\"svg\"></div>\n                  </div>\n                </div>\n                <div class=\"text\">\n                  <div class=\"title\">— Suzuki Motor</div>\n                  <div class=\"txt\">\n                    Сайт японской\n                    машиностроительной\n                    компании\n                  </div>\n                </div></a></div>\n          </div>\n          <div class=\"main-flex-third\">\n            <div class=\"flex-inner\"><a class=\"flex-item\"></a><a href=\"http://rpz.ru/\" target=\"_blank\" class=\"flex-item\">\n                <div class=\"image\"><img src=\"images/RPZ_img.png\"></div>\n                <div class=\"logo\"><img src=\"images/RPZ_logo.svg\" class=\"svg\"></div>\n                <div class=\"text\">\n                  <div class=\"title\">— Раменский</div>\n                  <div class=\"txt\">Сайт авиакосмического<br>предприятия</div>\n                </div></a><a href=\"http://fendi.com/\" target=\"_blank\" class=\"flex-item\">\n                <div class=\"image\"><img src=\"images/FENDI_logo.svg\" class=\"svg\"></div>\n                <div class=\"text\">\n                  <div class=\"title\">— Fendi</div>\n                  <div class=\"txt\">Дизайн промо-сайта</div>\n                </div></a></div>\n            <div class=\"flex-inner\"><a href=\"#\" class=\"flex-item\">\n                <div class=\"logo\"><img src=\"images/ANCOR_arrow.svg\" class=\"svg\"></div>\n                <div class=\"image\"><img src=\"images/ANCOR_logo.svg\" class=\"svg\"></div>\n                <div class=\"text\">\n                  <div class=\"title\">— UNI.Ancor</div>\n                  <div class=\"txt\">\n                    Cайт корпоративного\n                    университета лидера\n                    HR рынка России\n                  </div>\n                </div></a><a href=\"http://myfresh.ru/\" target=\"_blank\" class=\"flex-item\">\n                <div class=\"logo\"><img src=\"images/FRESH_logo.svg\" class=\"svg\"></div>\n                <div class=\"image\"><img src=\"images/fresh.png\"></div>\n                <div class=\"text\">\n                  <div class=\"title\">— Fresh Market</div>\n                  <div class=\"txt\">\n                    Разработка интернет магазина,\n                    мобильных приложений\n                    супермаркета натуральных продуктов\n                  </div>\n                </div></a></div>\n          </div>\n          <div class=\"main-flex-second copy\">\n            <div class=\"flex-inner\"><a href=\"http://kinext.ru/\" target=\"_blank\" class=\"flex-item\">\n                <div class=\"image\"><img src=\"images/logo-kinext.svg\" class=\"svg\"></div>\n                <div class=\"tr\"><img src=\"images/romb.svg\" class=\"svg\"></div>\n                <div class=\"tx\"><img src=\"images/text.svg\" class=\"svg\"></div>\n                <div class=\"text\">\n                  <div class=\"title\">— Kinext</div>\n                  <div class=\"txt\">\n                    Промо-сайт фитнес клуба\n                    высоких достижений\n                  </div>\n                </div></a></div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"footer\">\n      <div class=\"container\">\n        <div class=\"copyright\">© 2012—2015 You Rock Dude!</div>\n        <div class=\"social\"><a href=\"http://instagram.com/cr8tive\"><img src=\"images/instagram.svg\" class=\"svg\"></a><a href=\"http://www.facebook.com/yyurchenko\"><img src=\"images/fb.svg\" class=\"svg\"></a><a href=\"http://twitter.com/yuriyurchenko\"><img src=\"images/twitter.svg\" class=\"svg\"></a><a href=\"http://dribbble.com/cr8tive\"><img src=\"images/dr.svg\" class=\"svg\"></a></div>\n      </div>\n    </div>\n  </div>\n</body>");;return buf.join("");
};
});

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
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000
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