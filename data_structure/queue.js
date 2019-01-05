var stack_top = 0;
var easter_egg_try = 0
var LEFT = 0;
var rear = 0;
var front = 0;
var capacity = 11;
function content_init(){
    var pop_code = "int queue[11] = {0};\n" + 
                   "int front = 0, rear = 0, capacity = 11;\n" +
                   "void pop(int queue[]){\n" +
                   "    if(front == rear){\n" + 
                   "        printf(\"Queue is empty\");\n" +
                   "    }else{\n" +
                   "        font++;\n" +
                   "    }\n" +
                   "}\n";
    var push_code = "int queue[11] = {0};\n" + 
                    "int front = 0, rear = 0, capacity = 11;\n" +
                    "void push(int queue[], int data){\n" + 
                    "    if((rear+1)%capacity == front){\n" + 
                    "        printf(\"Queue is full\");\n" + 
                    "    }else{\n" + 
                    "        rear = (rear + 1) % capacity;\n" + 
                    "        queue[rear] = data;\n" + 
                    "    }\n" + 
                    "}\n";
    $(".pop_inner").html(pop_code);
    $(".push_inner").html(push_code);
    $(".code_pop").hide();
    hljs.initHighlighting();
    $('.trace').css('display','flex');
    let code_loc = $('code > span')[0].getBoundingClientRect().bottom;
    let var_loc = $('#var > span')[0].getBoundingClientRect().bottom;
    $('pre').css('margin-top',var_loc - code_loc);
    $('.trace').css('display','none');
}
function content_change(command){
    // command 0 = push
    // command 1 = pop
    if(command == 1){
        $(".code_pop").show();
        $(".code_push").hide();
        var info = "<p>Function: <span>Pop</span></p>" +
                   "<p>Time complexity: <span>O(1)</span><p>";
    }else{
        $(".code_push").show();
        $(".code_pop").hide();
        var info = "<p>Function: <span>Push</span></p>" +
                   "<p>Time complexity: <span>O(1)</span></p>";
    }
    $(".info").html(info);
}
function queue_push(){
    // check if the queue is full
    if((rear+1)%capacity == front){
        alert("The queue is full");
        return;
    }else if($('#num').val() > 100){
        alert("Value should be between 0 to 100!");
        return;
    }
    // store speed
    var dur = $("#speed").val();
    // change the content of code trace
    content_change(0);
    info_change(1);
    // add helicopter
    var heli_node = '<div id="pic"><iframe src="helicopter.svg" frameborder="0" class="heli"></iframe></div>';
    $("body").prepend(heli_node);
    // add anime_rec
    var myClient = $('.data')[0].getBoundingClientRect();
    LEFT = myClient.left + 15; 
    var fallen_time = 0;
    var data = $("#num").val();
    var anime_node = '<div class="anime_rec">' + data.toString() + '</div>';
    $("body").prepend(anime_node);
    // start anime
    var timeline = anime.timeline();
    timeline.add({
        targets: ['#pic', '.anime_rec'],
        duration: function(){
            return Math.floor(2000 / dur);
        },
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
        duration: function(){
            return Math.floor((379 - (32)* stack_top) * 5 / dur);
        },
        delay: function(){
            return Math.floor(400 / dur);
        },
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
        duration: function(){
            return Math.floor(600 / dur);
        },
        easing: 'linear',
        translateX: -2000,
        complete: function(){
            $("#pic").remove();
            $("#push").attr("disabled",false);
            $("#pop").attr("disabled",false);
        }
    }).add({
        targets: '#var_rear',
        value: function(){
            rear = (rear + 1) % capacity;
            return rear;
        },
        duration: 1,
        round: 1
    });
}


function queue_pop(){
    // store speed
    var dur = $("#speed").val();
    // change the content of code trace
    content_change(1);
    info_change(1);
    if(stack_top == 0){
        alert("the queue is empty!!");
        easter_egg_try++;
    }else{
        // add mouse
        var heli_node = '<div id="pic_mouse"><iframe src="mouse.svg" frameborder="0" class="mouse"></iframe></div>';
        $("body").prepend(heli_node);
        // check mouse y position
        var bound_pos = $('.left_bound')[0].getBoundingClientRect();
        $("#pic_mouse").css("top", bound_pos.top + 310);
        // add anime_rec
        var anime_node = "<div class=\"anime_rec_pop\">" + $(".rec:last").text() + "</div>";
        $("body").prepend(anime_node);
        var rec_pos = $('.rec:last')[0].getBoundingClientRect();
        $(".anime_rec_pop").css("left",rec_pos.left);
        $(".anime_rec_pop").css("top",rec_pos.top);
        $(".rec:last").css("opacity",0);
        var rec_final_y = 130 - $('.anime_rec_pop')[0].getBoundingClientRect().top;
        var mouse_des = rec_pos.left - 1755;
        var timeline = anime.timeline();
        var tmp_offset = "-=" + Math.floor(2000/dur).toString(); 
        timeline.add({
            targets: '#pic_mouse',
            duration: function(){
                return Math.floor(2000 / dur);
            },
            easing: 'linear',
            translateX: mouse_des,
            begin: function(){
                $("#push").attr("disabled", true);
                $("#pop").attr("disabled", true);
            }
        }).add({
            delay: function(){
                return Math.floor(500 / dur);
            },
            targets: '#pic_mouse',
            duration: function(){
                return Math.floor(292 / dur);
            },
            translateX: function(){
                return mouse_des - 117;
            },
            easing: 'linear',
            complete: function(){
                $(".rec:last").remove();
            }
        }).add({
            targets: '#pic_mouse',
            easing: 'linear',
            duration: function(){
                return Math.floor(1708 / dur);
            },
            translateX: function(){
                return mouse_des - 800;
            },
            complete: function(){
                $("#pic_mouse").remove();
                $(".anime_rec_pop").remove();
            }
        }).add({
            targets: '.anime_rec_pop',
            duration: function(){
                return Math.floor(2000 / dur);
            },
            offset: tmp_offset,
            translateX: -800,
            easing: 'linear',
        }).add({
            targets: '#var_front',
            value: function(){
                front++;
                return front;
            },
            duration: 1,
            round: 1,
            complete: function(){
                $("#push").attr("disabled", false);
                $("#pop").attr("disabled", false);
            }
        });
        stack_top--;
    }
}
function info_change(mode){ 
    // mode 0 = info
    // mode 1 = trace
    let option = ["info", "trace"];
    mode = parseInt(mode);
    // hide information
    $("."+option[(mode+1)%2]).css("display", "none");
    // show information
    if(mode == 0){
        $("."+option[mode]).css("display", "block");
    }else{
        $("."+option[mode]).css("display", "flex");
    }
}
function init(){
    content_init();
    $("#push").click(queue_push);
    $("#pop").click(queue_pop);
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