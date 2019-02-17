/*
* @Author: Marte
* @Date:   2018-08-16 21:50:56
* @Last Modified by:   Marte
* @Last Modified time: 2018-09-02 18:13:14
*/
var mySwiper1 = new Swiper('#swiper-one', {
    autoplay: 1000,
    loop: true
});
var mySwiper2 = new Swiper('#swiper-two', {
    autoplay: 1000,
    loop: true
})
//划过轮播停止
swiperStop = function(obj) {
    obj.stopAutoplay();
}
//离开开始轮播
swiperStart = function(obj) {
    obj.startAutoplay();
}

$('#swiper-one').mouseenter(function() {
    swiperStop(mySwiper1);
}) ;
$('#swiper-one').mouseleave(function() {
    swiperStart(mySwiper1);
});

$('#swiper-two').mouseleave(function() {
    swiperStart(mySwiper2);
}) ;
$('#swiper-two').mouseenter(function() {
    swiperStop(mySwiper2);
})
// 预约弹出层
function openNew() {
    //获取页面的高度和宽度
    var sWidth = document.documentElement.scrollWidth;
    var sHeight = document.documentElement.scrollHeight; //获取页面的高度
    //获取页面的可视区域高度和宽度
    var wHeight = document.documentElement.clientHeight; // 获取页面可视区域的高度
    var wWidth = document.documentElement.clientWidth;

    var oMask = document.createElement("div");
    oMask.id = "mask";
    oMask.style.height = sHeight + "px";
    oMask.style.width = sWidth + "px";
    document.body.appendChild(oMask);

    var oYuYue = document.createElement("div");
    oYuYue.id = "yuYue";
    oYuYue.innerHTML = "<div class='yuYueCon'><div id='close'>点击关闭</div></div>";
    document.body.appendChild(oYuYue); //插入创建的预约框
    var oInput = document.createElement("input");
    oInput.id = "mobile";
    oInput.placeholder = "请输入11位手机号";
    oYuYue.appendChild(oInput);

    var oLink = document.createElement("a");
    oLink.id = "bespoke";
    oLink.href = "###";
    oYuYue.appendChild(oLink);

    //获取预约框的宽和高
    var dHeight = oYuYue.offsetHeight; // 获取预约框的高度
    var dWidth = oYuYue.offsetWidth; // 获取预约框的宽度
    //设置预约框的left和top
    oYuYue.style.left = wWidth / 2 - dWidth / 2 + "px";
    oYuYue.style.top = wHeight / 2 - dHeight / 2 + 'px';
    //设置预约框top值
    var oClose = document.getElementById("close");

    //点击预约框以外的区域也可以关闭预约框
    oClose.onclick = oMask.onclick = function() {
        document.body.removeChild(oYuYue);
        document.body.removeChild(oMask);
    }
}
window.onload = function() {

    $('.sidebar_item').click(function() {

        $(this).addClass('sidebar_hover').siblings('.sidebar_item').removeClass('sidebar_hover');
    });

    var oBtn = document.getElementById("yuYueBtn");
    //点击预约按钮
    oBtn.onclick = function() {
        openNew(); //执行openNew函数
    }
    var oView = document.getElementById("mp4");
    //点击视频按钮
    oView.onclick = function() {
        openNew(); //执行openNew函数
    }
    var oView = document.getElementById("rightbar");
    //点击预约按钮
    oView.onclick = function() {
        openNew(); //执行openNew函数
    }

    var tab_t = document.getElementById("tab_t");
    var tab_t_span = tab_t.getElementsByTagName("span");
    var tab_c = document.getElementById("tab_c");
    var tab_c_li = tab_c.getElementsByTagName("ul");
    //第一次遍历循环
    for (var i = 0; i < tab_t_span.length; i++) {
        tab_t_span[i].index = i; //添加索引值
        tab_t_span[i].onmouseover = function() {
            //第二次循环重置样式（每一个都不添加样式内容也隐藏）
            for (var i = 0; i < tab_t_span.length; i++) {
                tab_t_span[i].className = '';
                tab_c_li[i].style.display = '';
            }
            tab_t_span[this.index].className = 'act';
            tab_c_li[this.index].style.display = 'block';
        }
    }

    $(function() {
        var $Tab_li = $('#tab_t span');
        $Tab_li.mouseover(function() {
            $(this).addClass('act').siblings().removeClass('act');
            var index = $Tab_li.index(this);
            $('#tab_c ul').eq(index).show().siblings().hide();
        })
    })

}

function showMe(n) {
    var arrName = ['0', '1', '2', '3'];
    var len = arrName.length;
    for (var i = 0; i < len; i++) {
        document.getElementById("tab_" + arrName[i]).className = "list_none";
    }
    document.getElementById("tab_" + arrName[n]).className = "article";
    for (var i = 0; i < len; i++) {
        document.getElementById(arrName[i]).className = "title_type";
    }
    document.getElementById(arrName[n]).className = "act2";
}

function showimg(n) {
    var arrName = ['0', '1', '2', '3'];
    var len = arrName.length;
    for (var i = 0; i < len; i++) {
        document.getElementById("tab_c" + arrName[i]).className = "div_none";
    }
    document.getElementById("tab_c" + arrName[n]).className = "content";
    var oUl = document.getElementById('tab_t1');
    var aLi = oUl.getElementsByTagName('li');
    for (var i = 0; i < 4; i++) {
        aLi[i].className = " ";
    }
    aLi[n].className = "hover";
}