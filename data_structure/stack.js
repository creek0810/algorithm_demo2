var stack_top = 0;
var easter_egg_try = 0
function stack_push(){
    var fallen_time = 0;
    var data = $("#num").val();
    var anime_node = "<div class=\"anime_rec\">" + data.toString() + "</div>";
    $("body").prepend(anime_node);
    var timeline = anime.timeline();
    timeline.add({
        targets: '#pic',
        duration: 2000,
        easing: 'linear',
        translateX: -1450,
    }).add({
        targets: '.anime_rec',
        duration: 2000,
        offset: "-=2000",
        easing: 'linear',
        translateX: -1461,
    }).add({
        targets: '.anime_rec',
        duration: 1500,
        offset: 2000,
        translateX: -1461,
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
        $(".rec:last").remove();
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