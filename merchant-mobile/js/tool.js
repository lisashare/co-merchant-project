/* 
* @web http://www.fengcms.com 
*/
(function($) {
    $.fn.FengTab = function(F) {
        F = $.extend({
            defaultIndex    : 0,                // 默认显示第几个，第一个为 0
            trigger         : "click",          // 交互方式，click 为 点击切换，mouseover 为鼠标碰到就切换
            Tab             : ".tab",           // 设定选项卡菜单区域 class
            TabLi           : "li",             // 设定选项卡菜单 元素
            Con             : ".con",           // 设定选项卡内容区域 class
            ConDiv          : "li",             // 设定选项卡内容 元素
            CurName         : "tabactive",      // 设定选项卡菜单选中时 class
            showWay         : "slow",           // 设定切换方式 有 slow down 和 show 三个选项
            callBack :  ""
        }, F);

        var Obj = $(this),
            Tab = Obj.find(F.Tab),
            Con = Obj.find(F.Con),
            TabLi = Tab.children(F.TabLi),
            ConDiv = Con.children(F.ConDiv);
        TabLi.each(function() {
            var T = $(this),
                I = T.index();
            if (I==F.defaultIndex){
                T.addClass(F.CurName);
            };
            T.on(F.trigger,function(){
                T.addClass(F.CurName).siblings(F.TabLi).removeClass(F.CurName);
                Action(I);
                if(F.callBack){F.callBack()};
            });
        });
        ConDiv.each(function() {
            var T = $(this),
                I = T.index();
            if (I!=F.defaultIndex){
                T.hide();
            };
        });
        function Action(I) {
            switch (F.showWay) {
            case "down":
                ConDiv.stop().eq(I).slideDown(500).siblings().slideUp(500);
                break;
            case "slow":
                ConDiv.eq(I).fadeIn(200).siblings().hide();
                break;
            default:
                ConDiv.eq(I).show().siblings().hide();
            }
        };
    }
})(jQuery);

$.fn.extend({
    showMessage: function( $msg, $time ){
        var oDiv = document.createElement("div");
        oDiv.setAttribute("id", "toast");
        var oBody = document.getElementsByTagName('body')[0];
        oBody.append(oDiv);
        $('#toast').text( $msg );
        $('#toast').fadeIn();
        setTimeout(function() {
            $('#toast').fadeOut();
        }, $time);
    }
});
 /**
 * 存储localStorage
 */

function setStore (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  }

  /**
 * 获取localStorage
 */
function getStore (name) {
    if (!name) return
    // var value = JSON.parse(window.localStorage.getItem(name));
    var value = window.localStorage.getItem(name)
    return value
  }

  /**
 * 删除localStorage
 */
function removeStore (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  }
/*
    $("#FengTab").FengTab();
    $("#FengTab2").FengTab({ 
        defaultIndex : 2,
        // 默认显示第几个，第一个为 0 
        trigger : "mouseover", 
        // 交互方式，click 为 点击切换，mouseover 为鼠标碰到就切换 
        Tab : ".caidan", 
        // 设定选项卡菜单区域 class 
        TabLi : "div",
        // 设定选项卡菜单 元素 
        Con : "ul", 
        // 设定选项卡内容区域 class 
        ConDiv : "li", 
        // 设定选项卡内容 元素 
        CurName : "cur", 
        // 设定选项卡菜单选中时 class 
        showWay : "down" 
        // 设定切换方式 有 slow down 和 show 三个选项 }); 
    });
*/






