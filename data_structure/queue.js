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
        var anime_node = "<div class=\"anime_rec_pop\">" + $(".rec:last").text() + "</div>";
        $("body").prepend(anime_node);
        var rec_pos = $('.rec:last')[0].getBoundingClientRect();
        $(".anime_rec_pop").css("left",rec_pos.left);
        $(".anime_rec_pop").css("top",rec_pos.top);
        var rec_final_y = 130 - $('.anime_rec_pop')[0].getBoundingClientRect().top;
        var mouse_des = rec_pos.left - 1755;
        $(".rec:last").remove();

        var timeline = anime.timeline();
        timeline.add({
            targets: '#pic_mouse',
            duration: 2000,
            easing: 'linear',
            translateX: mouse_des
        }).add({
            delay: 500,
            targets: '#pic_mouse',
            duration: 2000,
            translateX: function(){
                return mouse_des - 800;
            },
            easing: 'linear'
        }).add({
            targets: '.anime_rec_pop',
            duration: 2000,
            offset: "-=2000",
            translateX: -800,
            easing: 'linear'
        })/*.add({
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
        });*/
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
    // check mouse y position
    var bound_pos = $('.left_bound')[0].getBoundingClientRect();
    $("#pic_mouse").css("top",bound_pos.top + 310);
}
$(document).ready(init,false);