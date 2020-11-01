
/* Main js */

jQuery(document).ready(function($) {
 
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });
 
    $("#header").sticky({
        topSpacing: 0,
        zIndex: '50'
    });
 
    $("#intro-carousel").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        animateOut: 'fadeOut',
        items: 1
    });
 
    new WOW().init();
 
    $('.nav-menu').superfish({
        animation: {
            opacity: 'show'
        },
        speed: 400
    });
 
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({
            id: 'mobile-nav'
        });
        $mobile_nav.find('> ul').attr({
            'class': '',
            'id': ''
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function(e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function(e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }
 
    $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 0;

                if ($('#header').length) {
                    top_space = $('#header').outerHeight();

                    if (!$('#header').hasClass('header-fixed')) {
                        top_space = top_space - 20;
                    }
                }

                $('html, body').animate({
                    scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu').length) {
                    $('.nav-menu .menu-active').removeClass('menu-active');
                    $(this).closest('li').addClass('menu-active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
                return false;
            }
        }
    });

 
    $('.portfolio-popup').magnificPopup({
        type: 'image',
        removalDelay: 300,
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out',
            opener: function(openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });
 
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            900: {
                items: 3
            }
        }
    });
 
    $(".clients-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0: {
                items: 2
            },
            768: {
                items: 4
            },
            900: {
                items: 6
            }
        }
    });
});

// Sticky  jQuery

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var slice = Array.prototype.slice; // save ref to original slice()
    var splice = Array.prototype.splice; // save ref to original slice()

  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: '',
      widthFromWrapper: true, // works only when .getWidthFrom is empty
      responsiveWidth: false,
      zIndex: 'auto'
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

      for (var i = 0, l = sticked.length; i < l; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

        //update height in case of dynamic content
        s.stickyWrapper.css('height', s.stickyElement.outerHeight());

        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css({
                'width': '',
                'position': '',
                'top': '',
                'z-index': ''
              });
            s.stickyElement.parent().removeClass(s.className);
            s.stickyElement.trigger('sticky-end', [s]);
            s.currentTop = null;
          }
        }
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
          if (s.currentTop !== newTop) {
            var newWidth;
            if (s.getWidthFrom) {
                newWidth = $(s.getWidthFrom).width() || null;
            } else if (s.widthFromWrapper) {
                newWidth = s.stickyWrapper.width();
            }
            if (newWidth == null) {
                newWidth = s.stickyElement.width();
            }
            s.stickyElement
              .css('width', newWidth)
              .css('position', 'fixed')
              .css('top', newTop)
              .css('z-index', s.zIndex);

            s.stickyElement.parent().addClass(s.className);

            if (s.currentTop === null) {
              s.stickyElement.trigger('sticky-start', [s]);
            } else {
              // sticky is started but it have to be repositioned
              s.stickyElement.trigger('sticky-update', [s]);
            }

            if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
              // just reached bottom || just started to stick but bottom is already reached
              s.stickyElement.trigger('sticky-bottom-reached', [s]);
            } else if(s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
              // sticky is started && sticked at topSpacing && overflowing from top just finished
              s.stickyElement.trigger('sticky-bottom-unreached', [s]);
            }

            s.currentTop = newTop;
          }

          // Check if sticky has reached end of container and stop sticking
          var stickyWrapperContainer = s.stickyWrapper.parent();
          var unstick = (s.stickyElement.offset().top + s.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight()) && (s.stickyElement.offset().top <= s.topSpacing);

          if( unstick ) {
            s.stickyElement
              .css('position', 'absolute')
              .css('top', '')
              .css('bottom', 0)
              .css('z-index', '');
          } else {
            s.stickyElement
              .css('position', 'fixed')
              .css('top', newTop)
              .css('bottom', '')
              .css('z-index', s.zIndex);
          }
        }
      }
    },
    resizer = function() {
      windowHeight = $window.height();

      for (var i = 0, l = sticked.length; i < l; i++) {
        var s = sticked[i];
        var newWidth = null;
        if (s.getWidthFrom) {
            if (s.responsiveWidth) {
                newWidth = $(s.getWidthFrom).width();
            }
        } else if(s.widthFromWrapper) {
            newWidth = s.stickyWrapper.width();
        }
        if (newWidth != null) {
            s.stickyElement.css('width', newWidth);
        }
      }
    },
    methods = {
      init: function(options) {
        return this.each(function() {
          var o = $.extend({}, defaults, options);
          var stickyElement = $(this);

          var stickyId = stickyElement.attr('id');
          var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName;
          var wrapper = $('<div></div>')
            .attr('id', wrapperId)
            .addClass(o.wrapperClassName);

          stickyElement.wrapAll(function() {
            if ($(this).parent("#" + wrapperId).length == 0) {
                    return wrapper;
            }
});

          var stickyWrapper = stickyElement.parent();

          if (o.center) {
            stickyWrapper.css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") === "right") {
            stickyElement.css({"float":"none"}).parent().css({"float":"right"});
          }

          o.stickyElement = stickyElement;
          o.stickyWrapper = stickyWrapper;
          o.currentTop    = null;

          sticked.push(o);

          methods.setWrapperHeight(this);
          methods.setupChangeListeners(this);
        });
      },

      setWrapperHeight: function(stickyElement) {
        var element = $(stickyElement);
        var stickyWrapper = element.parent();
        if (stickyWrapper) {
          stickyWrapper.css('height', element.outerHeight());
        }
      },

      setupChangeListeners: function(stickyElement) {
        if (window.MutationObserver) {
          var mutationObserver = new window.MutationObserver(function(mutations) {
            if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
              methods.setWrapperHeight(stickyElement);
            }
          });
          mutationObserver.observe(stickyElement, {subtree: true, childList: true});
        } else {
          if (window.addEventListener) {
            stickyElement.addEventListener('DOMNodeInserted', function() {
              methods.setWrapperHeight(stickyElement);
            }, false);
            stickyElement.addEventListener('DOMNodeRemoved', function() {
              methods.setWrapperHeight(stickyElement);
            }, false);
          } else if (window.attachEvent) {
            stickyElement.attachEvent('onDOMNodeInserted', function() {
              methods.setWrapperHeight(stickyElement);
            });
            stickyElement.attachEvent('onDOMNodeRemoved', function() {
              methods.setWrapperHeight(stickyElement);
            });
          }
        }
      },
      update: scroller,
      unstick: function(options) {
        return this.each(function() {
          var that = this;
          var unstickyElement = $(that);

          var removeIdx = -1;
          var i = sticked.length;
          while (i-- > 0) {
            if (sticked[i].stickyElement.get(0) === that) {
                splice.call(sticked,i,1);
                removeIdx = i;
            }
          }
          if(removeIdx !== -1) {
            unstickyElement.unwrap();
            unstickyElement
              .css({
                'width': '',
                'position': '',
                'top': '',
                'float': '',
                'z-index': ''
              })
            ;
          }
        });
      }
    };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $.fn.unstick = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.unstick.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };
  $(function() {
    setTimeout(scroller, 0);
  });
}));


/* wow.js */

!(function (a, b) {
    if ("function" == typeof define && define.amd) define(["module", "exports"], b);
    else if ("undefined" != typeof exports) b(module, exports);
    else {
        var c = { exports: {} };
        b(c, c.exports), (a.WOW = c.exports);
    }
})(this, function (a, b) {
    "use strict";
    function c(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
    }
    function d(a, b) {
        return b.indexOf(a) >= 0;
    }
    function e(a, b) {
        for (var c in b)
            if (null == a[c]) {
                var d = b[c];
                a[c] = d;
            }
        return a;
    }
    function f(a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a);
    }
    function g(a) {
        var b = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
            c = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2],
            d = arguments.length <= 3 || void 0 === arguments[3] ? null : arguments[3],
            e = void 0;
        return null != document.createEvent ? ((e = document.createEvent("CustomEvent")), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? ((e = document.createEventObject()), (e.eventType = a)) : (e.eventName = a), e;
    }
    function h(a, b) {
        null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) && a["on" + b]();
    }
    function i(a, b, c) {
        null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : (a[b] = c);
    }
    function j(a, b, c) {
        null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b];
    }
    function k() {
        return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight;
    }
    Object.defineProperty(b, "__esModule", { value: !0 });
    var l,
        m,
        n = (function () {
            function a(a, b) {
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    (d.enumerable = d.enumerable || !1), (d.configurable = !0), "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
                }
            }
            return function (b, c, d) {
                return c && a(b.prototype, c), d && a(b, d), b;
            };
        })(),
        o =
            window.WeakMap ||
            window.MozWeakMap ||
            (function () {
                function a() {
                    c(this, a), (this.keys = []), (this.values = []);
                }
                return (
                    n(a, [
                        {
                            key: "get",
                            value: function (a) {
                                for (var b = 0; b < this.keys.length; b++) {
                                    var c = this.keys[b];
                                    if (c === a) return this.values[b];
                                }
                            },
                        },
                        {
                            key: "set",
                            value: function (a, b) {
                                for (var c = 0; c < this.keys.length; c++) {
                                    var d = this.keys[c];
                                    if (d === a) return (this.values[c] = b), this;
                                }
                                return this.keys.push(a), this.values.push(b), this;
                            },
                        },
                    ]),
                    a
                );
            })(),
        p =
            window.MutationObserver ||
            window.WebkitMutationObserver ||
            window.MozMutationObserver ||
            ((m = l = (function () {
                function a() {
                    c(this, a),
                        "undefined" != typeof console &&
                            null !== console &&
                            (console.warn("MutationObserver is not supported by your browser."), console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content."));
                }
                return n(a, [{ key: "observe", value: function () {} }]), a;
            })()),
            (l.notSupported = !0),
            m),
        q =
            window.getComputedStyle ||
            function (a) {
                var b = /(\-([a-z]){1})/g;
                return {
                    getPropertyValue: function (c) {
                        "float" === c && (c = "styleFloat"),
                            b.test(c) &&
                                c.replace(b, function (a, b) {
                                    return b.toUpperCase();
                                });
                        var d = a.currentStyle;
                        return (null != d ? d[c] : void 0) || null;
                    },
                };
            },
        r = (function () {
            function a() {
                var b = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                c(this, a),
                    (this.defaults = { boxClass: "wow", animateClass: "animated", offset: 0, mobile: !0, live: !0, callback: null, scrollContainer: null, resetAnimation: !0 }),
                    (this.animate = (function () {
                        return "requestAnimationFrame" in window
                            ? function (a) {
                                  return window.requestAnimationFrame(a);
                              }
                            : function (a) {
                                  return a();
                              };
                    })()),
                    (this.vendors = ["moz", "webkit"]),
                    (this.start = this.start.bind(this)),
                    (this.resetAnimation = this.resetAnimation.bind(this)),
                    (this.scrollHandler = this.scrollHandler.bind(this)),
                    (this.scrollCallback = this.scrollCallback.bind(this)),
                    (this.scrolled = !0),
                    (this.config = e(b, this.defaults)),
                    null != b.scrollContainer && (this.config.scrollContainer = document.querySelector(b.scrollContainer)),
                    (this.animationNameCache = new o()),
                    (this.wowEvent = g(this.config.boxClass));
            }
            return (
                n(a, [
                    {
                        key: "init",
                        value: function () {
                            (this.element = window.document.documentElement), d(document.readyState, ["interactive", "complete"]) ? this.start() : i(document, "DOMContentLoaded", this.start), (this.finished = []);
                        },
                    },
                    {
                        key: "start",
                        value: function () {
                            var a = this;
                            if (((this.stopped = !1), (this.boxes = [].slice.call(this.element.querySelectorAll("." + this.config.boxClass))), (this.all = this.boxes.slice(0)), this.boxes.length))
                                if (this.disabled()) this.resetStyle();
                                else
                                    for (var b = 0; b < this.boxes.length; b++) {
                                        var c = this.boxes[b];
                                        this.applyStyle(c, !0);
                                    }
                            if (
                                (this.disabled() || (i(this.config.scrollContainer || window, "scroll", this.scrollHandler), i(window, "resize", this.scrollHandler), (this.interval = setInterval(this.scrollCallback, 50))), this.config.live)
                            ) {
                                var d = new p(function (b) {
                                    for (var c = 0; c < b.length; c++)
                                        for (var d = b[c], e = 0; e < d.addedNodes.length; e++) {
                                            var f = d.addedNodes[e];
                                            a.doSync(f);
                                        }
                                });
                                d.observe(document.body, { childList: !0, subtree: !0 });
                            }
                        },
                    },
                    {
                        key: "stop",
                        value: function () {
                            (this.stopped = !0), j(this.config.scrollContainer || window, "scroll", this.scrollHandler), j(window, "resize", this.scrollHandler), null != this.interval && clearInterval(this.interval);
                        },
                    },
                    {
                        key: "sync",
                        value: function () {
                            p.notSupported && this.doSync(this.element);
                        },
                    },
                    {
                        key: "doSync",
                        value: function (a) {
                            if ((("undefined" != typeof a && null !== a) || (a = this.element), 1 === a.nodeType)) {
                                a = a.parentNode || a;
                                for (var b = a.querySelectorAll("." + this.config.boxClass), c = 0; c < b.length; c++) {
                                    var e = b[c];
                                    d(e, this.all) || (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), (this.scrolled = !0));
                                }
                            }
                        },
                    },
                    {
                        key: "show",
                        value: function (a) {
                            return (
                                this.applyStyle(a),
                                (a.className = a.className + " " + this.config.animateClass),
                                null != this.config.callback && this.config.callback(a),
                                h(a, this.wowEvent),
                                this.config.resetAnimation &&
                                    (i(a, "animationend", this.resetAnimation), i(a, "oanimationend", this.resetAnimation), i(a, "webkitAnimationEnd", this.resetAnimation), i(a, "MSAnimationEnd", this.resetAnimation)),
                                a
                            );
                        },
                    },
                    {
                        key: "applyStyle",
                        value: function (a, b) {
                            var c = this,
                                d = a.getAttribute("data-wow-duration"),
                                e = a.getAttribute("data-wow-delay"),
                                f = a.getAttribute("data-wow-iteration");
                            return this.animate(function () {
                                return c.customStyle(a, b, d, e, f);
                            });
                        },
                    },
                    {
                        key: "resetStyle",
                        value: function () {
                            for (var a = 0; a < this.boxes.length; a++) {
                                var b = this.boxes[a];
                                b.style.visibility = "visible";
                            }
                        },
                    },
                    {
                        key: "resetAnimation",
                        value: function (a) {
                            if (a.type.toLowerCase().indexOf("animationend") >= 0) {
                                var b = a.target || a.srcElement;
                                b.className = b.className.replace(this.config.animateClass, "").trim();
                            }
                        },
                    },
                    {
                        key: "customStyle",
                        value: function (a, b, c, d, e) {
                            return (
                                b && this.cacheAnimationName(a),
                                (a.style.visibility = b ? "hidden" : "visible"),
                                c && this.vendorSet(a.style, { animationDuration: c }),
                                d && this.vendorSet(a.style, { animationDelay: d }),
                                e && this.vendorSet(a.style, { animationIterationCount: e }),
                                this.vendorSet(a.style, { animationName: b ? "none" : this.cachedAnimationName(a) }),
                                a
                            );
                        },
                    },
                    {
                        key: "vendorSet",
                        value: function (a, b) {
                            for (var c in b)
                                if (b.hasOwnProperty(c)) {
                                    var d = b[c];
                                    a["" + c] = d;
                                    for (var e = 0; e < this.vendors.length; e++) {
                                        var f = this.vendors[e];
                                        a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = d;
                                    }
                                }
                        },
                    },
                    {
                        key: "vendorCSS",
                        value: function (a, b) {
                            for (var c = q(a), d = c.getPropertyCSSValue(b), e = 0; e < this.vendors.length; e++) {
                                var f = this.vendors[e];
                                d = d || c.getPropertyCSSValue("-" + f + "-" + b);
                            }
                            return d;
                        },
                    },
                    {
                        key: "animationName",
                        value: function (a) {
                            var b = void 0;
                            try {
                                b = this.vendorCSS(a, "animation-name").cssText;
                            } catch (c) {
                                b = q(a).getPropertyValue("animation-name");
                            }
                            return "none" === b ? "" : b;
                        },
                    },
                    {
                        key: "cacheAnimationName",
                        value: function (a) {
                            return this.animationNameCache.set(a, this.animationName(a));
                        },
                    },
                    {
                        key: "cachedAnimationName",
                        value: function (a) {
                            return this.animationNameCache.get(a);
                        },
                    },
                    {
                        key: "scrollHandler",
                        value: function () {
                            this.scrolled = !0;
                        },
                    },
                    {
                        key: "scrollCallback",
                        value: function () {
                            if (this.scrolled) {
                                this.scrolled = !1;
                                for (var a = [], b = 0; b < this.boxes.length; b++) {
                                    var c = this.boxes[b];
                                    if (c) {
                                        if (this.isVisible(c)) {
                                            this.show(c);
                                            continue;
                                        }
                                        a.push(c);
                                    }
                                }
                                (this.boxes = a), this.boxes.length || this.config.live || this.stop();
                            }
                        },
                    },
                    {
                        key: "offsetTop",
                        value: function (a) {
                            for (; void 0 === a.offsetTop; ) a = a.parentNode;
                            for (var b = a.offsetTop; a.offsetParent; ) (a = a.offsetParent), (b += a.offsetTop);
                            return b;
                        },
                    },
                    {
                        key: "isVisible",
                        value: function (a) {
                            var b = a.getAttribute("data-wow-offset") || this.config.offset,
                                c = (this.config.scrollContainer && this.config.scrollContainer.scrollTop) || window.pageYOffset,
                                d = c + Math.min(this.element.clientHeight, k()) - b,
                                e = this.offsetTop(a),
                                f = e + a.clientHeight;
                            return d >= e && f >= c;
                        },
                    },
                    {
                        key: "disabled",
                        value: function () {
                            return !this.config.mobile && f(navigator.userAgent);
                        },
                    },
                ]),
                a
            );
        })();
    (b["default"] = r), (a.exports = b["default"]);
});

