(function ($) {
    var _prefix = (function (temp) {
        var aPrefix = ["webkit", "Moz", "o", "ms"],
            props = "";
        for (var i  in aPrefix) {
            props = aPrefix[i] + "Transition";
            if (temp.style[props] !== undefined) {
                return "-" + aPrefix[i].toLowerCase() + "-";
            }
        }
        return false;
    })(document.createElement(PageSwitch));
    var PageSwitch = (function () {
        function PageSwitch(element, options) {
            this.settings = $.extend(true, $.fn.PageSwitch.defaults, options || {});
            this.element = element;
            this.init();
        }
        PageSwitch.prototype = {
            init: function () {
                var me = this;
                me.selectors = me.settings.selectors;
                me.sections = me.element.find(me.selectors.sections);
                me.section = me.sections.find(me.selectors.section);
                me.direction = me.settings.direction == "vertical" ? true : false;
                me.pagesCount = me.pagesCount();
                me.index = (me.settings.index >= 0 && me.settings.index < me.pagesCount) ? me.settings.index : 0;
                me.canscroll = true;
                if (!me.direction || me.index) {
                    me._initLayout();
                }
                if (me.settings.pagination) {
                    me._initPaging();
                }
                me._initEvent();
            },
            pagesCount: function () {
                return this.section.length;
            },
            switchLength: function () {
                return this.direction == 1 ? this.element.height() : this.element.width();
            },
            prev: function () {
                var me = this;
                if (me.index > 0) {
                    me.index--;
                } else if (me.settings.loop) {
                    me.index = me.pagesCount - 1;
                }
                me._scrollPage();
            },
            next: function () {
                var me = this;
                if (me.index < me.pagesCount) {
                    me.index++;
                } else if (me.settings.loop) {
                    me.index = 0;
                }
                me._scrollPage();
            },
            _initLayout: function () {
                var me = this;
                if (!me.direction) {
                    var width = (me.pagesCount * 100) + "%",
                        cellWidth = (100 / me.pagesCount).toFixed(2) + "%";
                    me.sections.width(width);
                    me.section.width(cellWidth).css("float", "left");
                }
                if (me.index) {
                    me._scrollPage(true);
                }
            },
            _initPaging: function () {
                var me = this,
                    pagesClass = me.selectors.page.substring(1);
                    me.activeClass = me.selectors.active.substring(1);
                var pageHtml = "<ul class=" + pagesClass + ">";
                for (let i = 0; i < me.pagesCount; i++) {
                    pageHtml += "<li></li>";
                }
                pageHtml += "</ul>";
                me.element.append(pageHtml);
                var pages = me.element.find(me.selectors.page);
                me.pageItem = pages.find("li");
                me.pageItem.eq(me.index).addClass(me.activeClass);
                if (me.direction) {
                    pages.addClass("vertical");
                } else {
                    pages.addClass("horizontal");
                }
            },
            _initEvent: function () {
                var me = this;
                me.element.on("mousewheel DOMMouseScroll", function (e) {
                    e.preventDefault();
                    var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
                    if (me.canscroll) {
                        if (delta > 0 && (me.index && !me.settings.loop || me.settings.loop)) {
                            me.prev();
                        } else if (delta < 0 && (me.index < (me.pagesCount - 1) && !me.settings.loop || me.settings.loop)) {
                            me.next();
                        }
                    }
                });
                me.element.on("click", me.selectors.page + " li", function () {
                    me.index = $(this).index();
                    me._scrollPage();
                });
                if (me.settings.keyboard) {
                    $(window).on("keydown", function (e) {
                        var keyCode = e.keyCode;
                        if (keyCode == 37 || keyCode == 38) {
                            me.prev();
                        } else if (keyCode == 39 || keyCode == 40) {
                            me.next();
                        }
                    });
                }
                var resizeId;
                $(window).resize(function () {
                    clearTimeout(resizeId);
                    resizeId = setTimeout(function () {
                        var currentLength = me.switchLength();
                        var offset = me.settings.direction ? me.section.eq(me.index).offset().top : me.section.eq(me.index).offset().left;
                        if (Math.abs(offset) > currentLength / 2 && me.index < (me.pagesCount - 1)) {
                            me.index++;
                        }
                        if (me.index) {
                            me._scrollPage();
                        }
                    }, 500);
                });
                if (_prefix) {
                    me.sections.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function () {
                        me.canscroll = true;
                        if (me.settings.callback && $.type(me.settings.callback) === "function") {
                            me.settings.callback();
                        }
                    });
                }
            },
            _scrollPage: function(init) {
                var me = this;
                var dest = me.section.eq(me.index).position();
                if (!dest) return;
                me.canscroll = false;
                if (_prefix) {
                    var translate = me.direction ? "translateY(-" + dest.top + "px)" : "translateX(-" + dest.left + "px)";
                    me.sections.css(_prefix + "transition", "all " + me.settings.duration + "ms " + me.settings.easing);
                    me.sections.css(_prefix + "transform", translate);
                } else {
                    var animateCss = me.direction ? { top: - dest.top } : { left: - dest.left };
                    me.sections.animate(animateCss, me.settings.duration, function () {
                        me.canscroll = true;
                        if (me.settings.callback) {
                            me.settings.callback();
                        }
                    });
                }
            if (me.settings.pagination && !init) {
                me.pageItem.eq(me.index).addClass(me.activeClass).siblings("li").removeClass(me.activeClass);
            }
            }
        };
        return PageSwitch;
    })();
    $.fn.PageSwitch = function (options) {
        return this.each(function () {
            var me = $(this),
                instance = me.data("PageSwitch");
            if (!instance) {
                instance = new PageSwitch(me, options);
                me.data("PageSwitch", instance);
            }
            if ($.type(options) === "string") {
                return instance[options]();
            }
        });
    };
    $.fn.PageSwitch.defaults = {
        selectors: {
            sections: ".sections",
            section: ".section",
            page: ".pages",
            active: ".active"
        },
        index: 0,
        easing: "ease",
        duration: 500,
        loop: false,
        pagination: true,
        keyboard: true,
        direction: "vertical",
        callback: ""
    };
    $(function () {
        $("[data-PageSwitch]").PageSwitch();
    });
})(jQuery);