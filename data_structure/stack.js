var stack_top = 0;
var easter_egg_try = 0
var LEFT = 0;
var heli_count = 0;
function content_change(command){
    // command 0 = push 
    // command 1 = pop 
    if(command == 1){
        var code = "<h3>Code</h3>" +
                   "int stack[11] = {0};<br>" +
                   "int top = 0;<br>" + 
                   "void pop(int stack[]){" +
                   "<tab1>if(top == 0){</tab1>" +
                   "<tab2>printf(\"the stack is empty\");</tab2>" + 
                   "<tab1>}else{</tab1>" +
                   "<tab2>top--;</tab2>" +
                   "<tab1>}</tab1>" +
                   "}";
        $("#code").html(code);
    }else{
        var code = "<h3>Code</h3>" +
                   "int stack[11] = {0};<br>" +
                   "int top = 0;<br>" + 
                   "void push(int stack[], int data){" +
                   "<tab1>if(top == 11){</tab1>" + 
                   "<tab2>printf(\"the stack is full\");</tab2>" +
                   "<tab1>}else{</tab1>" +
                   "<tab2>stack[top++] = data;</tab2>" +
                   "<tab1>}</tab1>" +
                   "}";
        $("#code").html(code);
    } 
}
function stack_push(){
    // change the content of code trace
    content_change(0);
    // add anime_rec
    var myClient = $('.data')[0].getBoundingClientRect();
    LEFT = myClient.left + 15; 
    var fallen_time = 0;
    var data = $("#num").val();
    var anime_node = "<div class=\"anime_rec\">" + data.toString() + "</div>";
    $("body").prepend(anime_node);
    // start anime
    var timeline = anime.timeline();
    timeline.add({
        targets: '#pic',
        duration: 2000,
        easing: 'linear',
        translateX: function(){
            return LEFT - 1800 ;
        },
        begin: function(){
            $("#push").attr("disabled",true);
            $("#pop").attr("disabled",true);
        }
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
        complete: function(){
            $("#push").attr("disabled",false);
            $("#pop").attr("disabled",false);
        }
    });
}
function stack_top(){

}
function stack_pop(){
    if(stack_top == 0){
        alert("the stack is empty!!");
        easter_egg_try++;
    }else{
        // change content of code trace
        content_change(1);
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
        // start anime
        var timeline = anime.timeline();
        timeline.add({
            targets: '#pic',
            duration: 2000,
            easing: 'linear',
            translateX: function(){
                return LEFT - 1800 ;
            },
            begin: function(){
                $("#push").attr("disabled", true);
                $("#pop").attr("disabled", true);
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
                $("#push").attr("disabled",false);
                $("#pop").attr("disabled",false);
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