; (function ($) {
    var Tab = function (tab) {
        var _this_ = this;
        this.tab = tab;
        this.config = {
            "triggerType":"mouseover",
            "effect":"default",
            "invoke":1,
            "auto":false
        };
        if (this.getConfig()) {
            $.extend(this.config, this.getConfig());
        }
        this.tabItems = this.tab.find("ul.tab-nav li");
        this.contentItems = this.tab.find("div.content-wrap div.content-item");
        var config = this.config;
        if (config.triggerType === "click") {
            this.tabItems.bind(config.triggerType, function () {
                _this_.invoke($(this));
            });
        } else if (config.triggerType === "mouseover" || config.triggerType != "click") {
            this.tabItems.mouseover(function () {
                _this_.invoke($(this));
            });
        }
        if (config.auto) {
            this.timer = null;
            this.loop = 0;
            this.autoPlay();
            this.tab.hover(function () {
                window.clearInterval(_this_.timer);
            }, function () {
                _this_.autoPlay();
            });
        }
        if (config.invoke > 1) {
            this.invoke(this.tabItems.eq(config.invoke-1));
        }
    };
    Tab.prototype = {
        autoPlay: function () {
            let _this_ = this,
                tabItems = this.tabItems,
                tabLength = tabItems.length,
                config = this.config;
            this.timer = window.setInterval(function () {
                _this_.loop++;
                if (_this_.loop >= tabLength) {
                    _this_.loop = 0;
                }
                tabItems.eq(_this_.loop).trigger(config.triggerType);
            }, config.auto);
        },
        invoke: function (currentTab) {
            var _this_ = this;
            let index = currentTab.index();
            currentTab.addClass("actived").siblings().removeClass("actived");
            let effect = this.config.effect;
            let conItems = this.contentItems;
            if (effect === "default" || effect != "fade") {
                conItems.eq(index).addClass("current").siblings().removeClass("current");
            } else if(effect === "fade") {
                conItems.eq(index).fadeIn().siblings().fadeOut();
            }
            if (this.config.auto) {
                this.loop = index;
            }
        },
        getConfig: function () {
            var config = this.tab.attr("data-config");
            if (config && config != "") {
                return $.parseJSON(config);
            } else {
                return null;
            }
        }
    };
    Tab.init = function (tabs) {
        let _this_ = this;  
        tabs.each(function () {
            new _this_($(this));
        });
    };
    $.fn.extend({
        tab: function () {
            this.each(function () {
                new Tab($(this));
            });
            return this;
        }
    });
    window.Tab = Tab;
})(jQuery);