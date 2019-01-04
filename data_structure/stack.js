let stack_top = 0, easter_egg_try = 0, LEFT = 0, heli_count = 0;
function content_init(){
    let pop_code = "int stack[11] = {0};\n" +
                   "int top = 0;\n" + 
                   "void pop(int stack[]){\n" +
                   "    if(top == 0){\n" +
                   "        printf(\"the stack is empty\");\n" + 
                   "    }else{\n" +
                   "        top--;\n" +
                   "    }\n" +
                   "}\n";
    let push_code = "int stack[11] = {0};\n" +
                    "int top = 0;\n" + 
                    "void push(int stack[], int data){\n" +
                    "    if(top == 11){\n" + 
                    "        printf(\"the stack is full\");\n" +
                    "    }else{\n" +
                    "        stack[top++] = data;\n" +
                    "    }\n" +
                    "}\n";
    $(".pop_inner").html(pop_code);
    $(".push_inner").html(push_code);
    $(".code_pop").hide();
    $(".code_push").hide();
    hljs.initHighlighting();
}
function content_change(command){
    // command 0 = push 
    // command 1 = pop 
   if(command == 1){
        $(".code_pop").show();
        $(".code_push").hide();
        let info = "<p>Function: <span>Pop</span></p>" +
                   "<p>Time complexity: <span>O(1)<span></p>";
   }else{
        $(".code_push").show();
        $(".code_pop").hide();
        let info = "<p>Function: <span>Push</span></p>" +
                   "<p>Time complexity: <span>O(1)</span></p>";
   }
    $(".info").html(info);
}
function stack_push(){
    // change the content of code trace
    content_change(0);
    info_change(1);
    easter_egg_try = 0;
    if(stack_top == 11){
        window.alert("the stack is full");
        return;
    }
    // store speed
    let dur = $("#speed").val();
    // add helicopter
    let heli_node = '<div id="pic"><iframe src="helicopter.svg" frameborder="0" class="heli"></iframe></div>';
    $("body").prepend(heli_node);
    // add anime_rec
    let myClient = $('.data')[0].getBoundingClientRect();
    LEFT = myClient.left + 15; 
    let data = $("#num").val();
    let anime_rec_node = '<div class="anime_rec">' + data.toString() + '</div>';
    $("body").prepend(anime_rec_node);
    // start anime
    let timeline = anime.timeline();
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
            return Math.floor(((379 - (32) * stack_top) * 5) / dur);
        },
        delay: function(){
            return Math.floor(400 / dur);
        },
        translateX: function(){
            return LEFT - 1800;
        },
        translateY: 379 - (32) * stack_top,
        easing: 'linear',
        complete: function(){
            $(".anime_rec").remove();
            let node = '<div class="rec">' + data.toString() + '</div>';
            $(".data").prepend(node);
        }
    }).add({
        targets: '#pic',
        duration: function(){
            return Math.floor(600 / dur);
        },
        easing: 'linear',
        translateX: -2000,
    }).add({
        targets: '#pic',
        duration: 1,
        complete: function(){
            $("#pic").remove();
            $("#push").attr("disabled",false);
            $("#pop").attr("disabled",false);
        }
    }).add({
        targets: '#var_top',
        value: stack_top + 1,
        duration: 1,
        round: 1,
        
    });
    stack_top++;
}
function corn_push(){
    // store speed
    let dur = $("#speed").val();
    // add helicopter
    let heli_node = '<div id="pic"><iframe src="helicopter.svg" frameborder="0" class="heli"></iframe></div>';
    $("body").prepend(heli_node);
    // add corn
    let corn_node = '<div id="pic_corn"><iframe src="corn.svg" frameborder="0" class="corn"></iframe></div>';
    $("body").prepend(corn_node);
    let myClient = $('.data')[0].getBoundingClientRect();
    LEFT = myClient.left + 15; 
    // start anime
    let timeline = anime.timeline();
    timeline.add({
        targets: ['#pic', '#pic_corn'],
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
        targets: '#pic_corn',
        duration: function(){
            return Math.floor(((379 - (32) * stack_top) * 5) / dur);
        },
        delay: function(){
            return Math.floor(400 / dur);
        },
        translateX: function(){
            return LEFT - 1800;
        },
        translateY: 370,
        easing: 'linear'
    }).add({
        targets: '#pic',
        duration: function(){
            return Math.floor(600 / dur);
        },
        easing: 'linear',
        translateX: -2000,
    }).add({
        targets: '#pic',
        duration: 1,
        complete: function(){
            $("#pic").remove();
            $("#push").attr("disabled",false);
            $("#pop").attr("disabled",false);
            $('#modal-content').html("<b>OK! You got corn.<br><span style='color:#0092ca'>Please pop again.</span></b>");
            $('#myModal').modal('toggle');
            $('#pop').addClass('btn_special');
            $('#push').attr('disabled',true);
        }
    });
}
function pop_corn(){
    let timeline = anime.timeline();
    timeline.add({
        targets: '#boom',
        opacity: 1,
        scale: [0.5, 1.8],
        translateX: -30,
        translateY: -25,
        easing: 'linear',
        duration: 400,
        begin: function(){
            $('.bomb').css("z-index",10);
        },
        complete: function(){
            $('#pic_corn').remove();
            let popcorn_node = '<div id="popcorn"><iframe src="popcorn.svg" frameborder="0" class="popcorn"></iframe></div>';
            $('.data').prepend(popcorn_node);
        }
    }).add({
        targets: '#cloud',
        scale: [0.5, 3],
        opacity: [0, 1],
        translateX: -50,
        translateY: -40,
        duration: 400,
        offset: '-=400'
    }).add({
        targets: '#cloud, #boom ',
        opacity: 0,
        easing: 'linear',
        duration: 2000,
        offset: '-=50',
    }).add({
        targets: '#rauch',
        opacity: [0, 0.6],
        easing: 'linear',
        duration: 200,
        offset: '-=150',
        complete: function(){
            $('#modal-content').html("<b>You <span style='color: red'>pop corn </span>and you got <span style='color: red'>POP-CORN! </span>HAHAHA!<br> <span style='color:#0092ca'>Please refresh the website!</span></b>");
            $('#myModal').modal('toggle');
        }
    });
}
function stack_pop(){
    if(stack_top == 0){
        let msg = ["已經沒有東西可以pop了!", "看來你真的很想pop?", "認真的?"];
        $('#modal-content').html('<b>' + msg[easter_egg_try] + '</b>');
        if(easter_egg_try == 3){
            corn_push();
        }else if(easter_egg_try == 4){
            pop_corn();
        }else{
            $('#myModal').modal('toggle');
        }
        easter_egg_try++;
        return;
    }
    // store speed
    let dur = $('#speed').val();
    // change content of code trace
    content_change(1);
    info_change(1);
    // add helicopter
    let heli_node = '<div id="pic"><iframe src="helicopter.svg" frameborder="0" class="heli"></iframe></div>';
    $("body").prepend(heli_node);
    // add anime_rec
    let anime_node = "<div class=\"anime_rec_pop\">" + $(".rec:first").text() + "</div>";
    $("body").prepend(anime_node);
    let myClient = $('.rec:first')[0].getBoundingClientRect();
    $(".anime_rec_pop").css("left",myClient.left);
    $(".anime_rec_pop").css("top",myClient.top);
    $(".rec:first").remove();
    // add rope
    let rope_node = "<div class=\"rope\">" + "</div>";
    $("body").prepend(rope_node);
    $(".rope").css("left",LEFT + 30);
    $(".rope").css("top",125);
    let rec_final_y = 130 - $('.anime_rec_pop')[0].getBoundingClientRect().top;
    // offset
    let rope_top = $('.rope')[0].getBoundingClientRect().top;
    let len = (myClient.top - rope_top) * 5 / dur;
    let offset_dur = "-=" + len.toString();
    // start anime
    let timeline = anime.timeline();
    timeline.add({
        targets: '#pic',
        duration: function(){
            return Math.floor(2000 / dur);
        },
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
        delay: function(){
            return Math.floor(500 / dur);
        },
        targets: '.rope',
        duration: function(){
            let rope_top = $('.rope')[0].getBoundingClientRect().top;
            return Math.floor((myClient.top - rope_top) * 5 / dur);
        },
        height: function(){
            let rope_top = $('.rope')[0].getBoundingClientRect().top;
            return myClient.top - rope_top;
        },
        easing: 'linear'
    }).add({
        targets: '.rope',
        duration: function(){
            let rope_top = $('.rope')[0].getBoundingClientRect().top;
            return Math.floor((myClient.top - rope_top) * 5 / dur);
        },
        height: 1,
        easing: 'linear'
    }).add({
        targets: '.anime_rec_pop',
        easing: 'linear',
        duration: function(){
            let rope_top = $('.rope')[0].getBoundingClientRect().top;
            return Math.floor((myClient.top - rope_top) * 5 / dur);
        },
        offset: offset_dur,
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
        complete: function(){
            $(".anime_rec_pop").remove()
            $("#pic").remove();
            $("#push").attr("disabled",false);
            $("#pop").attr("disabled",false);
        }
    }).add({
        targets: '#var_top',
        value: stack_top - 1,
        duration: 1,
        round: 1
    });
    stack_top--;
}
function info_change(mode){
    // mode 0 = info
    // mode 1 = trace
    mode = parseInt(mode);
    let option = ["info", "trace"];
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
    content_init();
    $("#push").click(stack_push);
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