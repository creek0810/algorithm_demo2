
// the data of current state
var data = [{"id": "#data0","value": 5,"loc": 0},
            {"id": "#data1","value": 2,"loc": 0},
            {"id": "#data2","value": 7,"loc": 0},
            {"id": "#data3","value": 3,"loc": 0},
            {"id": "#data4","value": 9,"loc": 0},
            {"id": "#data5","value": 1,"loc": 0},
            {"id": "#data6","value": 4,"loc": 0}];
function sort(){
    var sort_timeline = anime.timeline({
        autoplay: false,
        update: function(anim){
            $("#progress_bar").val(anim.progress);
        }
    });
    // build anime timeline
    for (var i = 0; i < data.length; i++){
        var current = data[i];
        var j = i - 1;
        sort_timeline.add({
            targets: current["id"],
            offset: "-=0",
            backgroundColor: '#7fd925',
            translateY: 200,
            begin: function(){
                $(".cmp").removeClass("code_running");
                $(".swap").removeClass("code_running");
                $(".init_cur").addClass("code_running");
            }
        }).add({
            targets: '#var_j',
            value: j,
            duration: 1,
            round: 1,
            begin: function(){
                $(".init_j").addClass("code_running");
                $(".init_cur").removeClass("code_running");
            }
        }).add({
            delay: 500,
            targets: '#var_current',
            value: current["value"],
            duration: 1,
            round: 1
        })
        while(true){
            sort_timeline.add({
                targets: current["id"],
                offset: "-=0",
                duration: 300,
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
                targets: current["id"],
                offset: "-=0",
                duration: 300,
                translateX: current["loc"] - 51,
                translateY: 200,
                begin: function(){
                    $(".cmp").removeClass("code_running");
                    $(".swap").addClass("code_running");
                }
            }).add({
                targets: data[j]["id"],
                offset: "-=300",
                duration: 300,
                backgroundColor: "#919191",
                translateX: data[j]["loc"] + 51,
            })
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
            offset: "-=0",
            backgroundColor: "#919191",
            translateX: current["loc"],
            translateY: 0
        })
    }
    return sort_timeline;
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
    // init graph
    for(var i=0;i<data.length;i++){
        var target = data[i]["id"];
        $(target).html(data[i]["value"].toString());
        $(target).css("line-height",(data[i]["value"]*34-15)+"px");
        $(target).height(data[i]["value"]*17);
    }
    result = sort();
    $("#start").click(result.play);
    $("#pause").click(result.pause);
    $("#restart").click(result.restart);
    $("#progress_bar").on("input change", function(){
        result.seek(result.duration * ($("#progress_bar").val()/100));
    })
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
