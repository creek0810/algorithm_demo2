var stack_top = 0;
var easter_egg_try = 0
var LEFT = 0;
function stack_push(){
    var myClient = $('.data')[0].getBoundingClientRect();
    LEFT = myClient.left + 15; 
    var fallen_time = 0;
    var data = $("#num").val();
    var anime_node = "<div class=\"anime_rec\">" + data.toString() + "</div>";
    $("body").prepend(anime_node);
    var timeline = anime.timeline();
    timeline.add({
        targets: '#pic',
        duration: 2000,
        easing: 'linear',
        translateX: function(){
            return LEFT - 1800 ;
        },
    }).add({
        targets: '.anime_rec',
        duration: 2000,
        offset: "-=2000",
        easing: 'linear',
        translateX: function(){
            return LEFT - 1800;
        } 
    }).add({
        targets: '.anime_rec',
        duration: 1500,
        offset: 2000,
        translateX: function(){
            return LEFT - 1800;
        },
        translateY: 379 - (32)*stack_top,
        easing: 'linear',
        complete: function(){
            $(".anime_rec").remove();
            var node = "<div class=\"rec\">" + data.toString() + "</div>";
            $(".data").prepend(node);
            stack_top++;
        }
    }).add({
        targets: '#pic',
        duration: 600,
        easing: 'linear',
        translateX: -2000,
    }).add({
        targets: '#pic',
        duration: 1,
        translateX: 0,
    });
}
function stack_top(){

}
function stack_pop(){
    if(stack_top == 0){
        alert("the stack is empty!!");
        easter_egg_try++;
    }else{
        // add anime_rec
        var anime_node = "<div class=\"anime_rec_pop\">" + $(".rec:first").text() + "</div>";
        $("body").prepend(anime_node);
        var myClient = $('.rec:first')[0].getBoundingClientRect();
        $(".anime_rec_pop").css("left",myClient.left);
        $(".anime_rec_pop").css("top",myClient.top);
        $(".rec:first").remove();
        // add rope
        var rope_node = "<div class=\"rope\">" + "</div>";
        $("body").prepend(rope_node);
        $(".rope").css("left",LEFT + 30);
        $(".rope").css("top",125);
        var rec_final_y = 130 - $('.anime_rec_pop')[0].getBoundingClientRect().top;
        var timeline = anime.timeline();
        timeline.add({
            targets: '#pic',
            duration: 2000,
            easing: 'linear',
            translateX: function(){
                return LEFT - 1800 ;
            },
            complete: function(){
                $(".rope").css("opacity",1);
            }
        }).add({
            delay: 500,
            targets: '.rope',
            duration: 2000,
            height: function(){
               var rope_top = $('.rope')[0].getBoundingClientRect().top;
               console.log(myClient.top - rope_top);
               return myClient.top - rope_top;
            },
            easing: 'linear'
        }).add({
            targets: '.rope',
            duration: 2000,
            height: 1,
            easing: 'linear'
        }).add({
            targets: '.anime_rec_pop',
            easing: 'linear',
            duration: 2000,
            offset: "-=2000",
            translateY: rec_final_y
        }).add({
           targets: '.anime_rec_pop',
           translateX: -LEFT-200,
           translateY: rec_final_y,
           duration: 600,
           easing:'linear',
           begin: function(){
               $(".rope").css("opacity",0);
           }
        }).add({
            targets: '#pic',
            duration: 600,
            easing: 'linear',
            offset: "-=600",
            translateX: -2000,
        }).add({
            targets: '#pic',
            duration: 1,
            translateX: 0,
            complete: function(){
                $(".anime_rec_pop").remove()
            }
        });
        stack_top--;
    }
}
function info_change(mode){
    // mode 0 = info
    // mode 1 = trace
    mode = parseInt(mode);
    var option = ["info", "trace"];
    // delete remain
    $(".remain").css("display", "none");
    // add class and show information
    $("#"+option[mode]).addClass("button-enabled");
    if(mode == 0){
        $("."+option[mode]).css("display", "block");
    }else{
        $("."+option[mode]).css("display", "flex");
    }
    // delete class and hide information
    $("#"+option[(mode+1)%2]).removeClass("button-enabled");
    $("."+option[(mode+1)%2]).css("display", "none");
    console.log(mode);
}
function getPosition (element) {
  console.log(element);
  var x = 0;
  var y = 0;
  // 搭配上面的示意圖可比較輕鬆理解為何要這麼計算
  while ( element ) {
  console.log(element);
    x += element.offsetLeft - element.scrollLeft + element.clientLeft;
    y += element.offsetTop - element.scrollLeft + element.clientTop;
    element = element.offsetParent;
  }
  console.log(x);
  return { x: x, y: y };
}
function getElementLeft(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;
console.log(actualLeft);

　　　　while (current !== null){
    
        console.log(current);
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}

        console.log(actualLeft);
　　　　return actualLeft;
　　}
function init(){
    $("#push").click(stack_push);
    $("#top").click(stack_top);
    $("#pop").click(stack_pop);
    // mode 0 = info
    // mode 1 = trace
    $("#info").click(function(){
        info_change(0);
    });
    $("#trace").click(function(){
        info_change(1);
    });
}
$(document).ready(init,false);