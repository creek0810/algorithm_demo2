
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
    for (var i = 0; i < data.length - 1; i++){
        var min = i;
        sort_timeline.add({
            targets: data[min]["id"],
            backgroundColor: '#7fd925',
            offset: "-=0",
            begin: function(){
                $(".change").removeClass("code_running");
                $(".swap").removeClass("code_running");
                $(".cmp").removeClass("code_running");
                $(".init").addClass("code_running");
            }
        }).add({
            targets: '#var_i',
            value: i,
            duration: 1,
            round: 1
        }).add({
            targets: '#var_min',
            value: min,
            duration: 1,
            round: 1,
        })
        for(var j = i + 1; j < data.length; j++){      
            sort_timeline.add({
                targets: '#var_i',
                value: i,
                duration: 1,
                round: 1
            }).add({
                targets: '#var_j',
                value: j,
                duration: 1,
                round: 1
            }).add({
                targets: '#var_min',
                value: min,
                duration: 1,
                round: 1
            }).add({
                targets: data[j]["id"],
                backgroundColor: '#ffa500',
                offset: "-=0",
                begin: function(){
                    $(".change").removeClass("code_running");
                    $(".swap").removeClass("code_running");
                    $(".init").removeClass("code_running");
                    $(".cmp").addClass("code_running");
                }
            }).add({
                targets: '#var_j',
                value: j,
                duration: 1,
                round: 1
            })
            if(data[j]["value"] < data[min]["value"]){
                sort_timeline.add({
                    targets: data[min]["id"],
                    backgroundColor: '#4169e1',
                    offset: "-=0",
                    begin: function(){
                        $(".cmp").removeClass("code_running");
                        $(".swap").removeClass("code_running");
                        $(".change").addClass("code_running");
                    }
                }).add({
                    targets: data[j]["id"],
                    backgroundColor: '#7fd925',
                    offset: "-=1000",
                }).add({
                    targets: '#var_min',
                    value: j,
                    duration: 1,
                    round: 1
                })
                min = j;
            }else{
                sort_timeline.add({
                    targets: data[j]["id"],
                    backgroundColor: '#4169e1',
                    offset: "-=0",
                })
            }
        }
        var cur_offset = "-=" + ((min-i)*300).toString();
        sort_timeline.add({
            targets: data[min]["id"],
            translateX: function(){
                return data[min]["loc"] - (51 * (min - i))
            },
            duration: (min - i) * 300 ,
            offset: "-=0",
            easing: 'linear',
            begin: function(){
                $(".cmp").removeClass("code_running");
                $(".change").removeClass("code_running");
                $(".swap").addClass("code_running");
            }
        }).add({
            targets: data[i]["id"],
            translateX: function(){
                return data[i]["loc"] + (51 * (min - i)) ;
            },
            duration: (min - i) * 300 ,
            offset: cur_offset,
            easing: 'linear'     
        }).add({
            targets: data[min]["id"],
            delay: 500,
            backgroundColor: '#919191',
            offset: "-=0"
        })
        data[i]["loc"] += 51 * (min - i);
        data[min]["loc"] -= 51 * (min - i);
        // swap
        var tmp = data[min];
        data[min] = data[i];
        data[i] = tmp;
    }
    sort_timeline.add({
        targets: data[data.length-1]["id"],
        backgroundColor: "#919191"
    })
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
