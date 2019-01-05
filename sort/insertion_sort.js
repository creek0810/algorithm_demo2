
// the data of current state
var DATA = [{"id": "#data0","value": 5,"loc": 0},
            {"id": "#data1","value": 2,"loc": 0},
            {"id": "#data2","value": 7,"loc": 0},
            {"id": "#data3","value": 3,"loc": 0},
            {"id": "#data4","value": 9,"loc": 0},
            {"id": "#data5","value": 1,"loc": 0},
            {"id": "#data6","value": 4,"loc": 0}];

function sort(){
    let data = JSON.parse(JSON.stringify(DATA));
    let sort_timeline = anime.timeline({
        autoplay: false,
        update: function(anim){
            $("#progress_bar").val(anim.progress);
        }
    });
    // build anime timeline
    for (let i = 0; i < data.length; i++){
        let current = data[i];
        let j = i - 1;
        sort_timeline.add({
            targets: '#var_current',
            value: current["value"],
            duration: 1,
            round: 1
        }).add({
            targets: current["id"],
            backgroundColor: '#7fd925',
            translateY: 200,
            duration: function(){
                return Math.floor(1001 / $('#speed').val());
            },
            begin: function(){
                $(".end").removeClass("code_running");
                $(".init_cur").addClass("code_running");
            },
            complete: function(){
                $(".init_j").addClass("code_running");
                $(".init_cur").removeClass("code_running");
                $('#var_j').attr('value',j);
            }
        }).add({
            targets: '#var_j',
            value: j,
            duration: 1,
            delay: 500,
            round: 1,
        });
        while(true){
            sort_timeline.add({
                targets: current["id"],
                offset: "-=0",
                duration: function(){
                    return Math.floor(1002 / $('#speed').val());
                },
                translateX: current["loc"],
                translateY: 200,
                begin: function(){
                    $(".cmp").addClass("code_running");
                    $(".swap").removeClass("code_running");
                    $(".init_j").removeClass("code_running");
                }
            })
            if(j<0 || data[j]["value"] < current["value"]){
                break;
            }
            sort_timeline.add({
                targets: [current["id"],data[j]["id"]],
                duration: function(){
                    return Math.floor(300 / $('#speed').val());
                },
                translateX: function(target,i){
                    if(i == 0){
                        return current["loc"] - 51;
                    }else{
                        return data[j]["loc"] + 51;
                    }
                },
                translateY: function(target,i){
                    if(i == 0){
                        return 200;
                    }else{
                        return 0;
                    }
                },
                begin: function(){
                    $(".cmp").removeClass("code_running");
                    $(".swap").addClass("code_running");
                }
            });
            data[j]["loc"] += 51;
            current["loc"] -= 51;
            data[j+1] = data[j];
            sort_timeline.add({
                targets: '#var_j',
                value: j-1,
                duration: 1,
                round: 1,
            })
            j--;
        }
        data[j+1] = current;
        sort_timeline.add({
            targets: current["id"],
            backgroundColor: "#919191",
            translateX: current["loc"],
            translateY: 0,
            duration: function(){
                return Math.floor(1000 / $('#speed').val());
            },
            begin: function(){
                $(".swap").removeClass("code_running");
                $(".cmp").removeClass("code_running");
                $(".end").addClass("code_running");
            }
        })
    }
    return sort_timeline;
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
function init_graph(){
    for(var i=0;i<DATA.length;i++){
        var target = DATA[i]["id"];
        $(target).html(DATA[i]["value"].toString());
        $(target).css("line-height",(DATA[i]["value"]*34-15)+"px");
        $(target).css("background-color","#4169e1");
        $(target).height(DATA[i]["value"]*17);
        $(target).css("transform","translateX(0)")
    }
}
function fix_code(){
    $(".trace").css("display", "flex");
    let code_loc = $('code > span')[0].getBoundingClientRect().bottom;
    let var_loc = $('#var > span')[0].getBoundingClientRect().bottom;
    $('.hljs').css('margin-top',var_loc - code_loc);
}
function init(){
    // init graph
    init_graph(); 
    // fix height of code trace
    fix_code();
    let result = sort();
    $("#start").click(function(){
        info_change(1);
        result.play();
    });
    $("#pause").click(result.pause);
    $("#restart").click(function(){
        info_change(1);
        result.restart();
    });
    $("#progress_bar").on("input change", function(){
        result.seek(result.duration * ($("#progress_bar").val()/100));
    });
    $("#speed").on("change",function(){
        init_graph();
        result = sort();
        $("#pause").click(result.pause);
    });
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
// init highlight.js
hljs.initHighlightingOnLoad();