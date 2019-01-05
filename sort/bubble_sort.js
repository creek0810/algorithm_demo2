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
    for (var i = 0; i < data.length; i++){
        for(var j = 0; j < data.length - i - 1; j++){
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
                targets: [data[j]["id"], data[j+1]["id"]],
                backgroundColor: '#ffa600',
                duration: function(){
                    console.log($('#speed').val());
                    return Math.floor(1002 / $("#speed").val());
                },
                begin: function(){
                    $(".cmp").addClass("code_running");
                    $(".swap").removeClass("code_running");
                }
            })
            
            if(data[j]["value"] > data[j+1]["value"]){
                sort_timeline.add({
                    targets: [data[j]["id"], data[j+1]["id"]],
                    translateX: function(target,i){
                        if(i == 0){
                            return data[j]["loc"] + 51;
                        }else{
                            return data[j+1]["loc"] - 51;
                        }
                    },
                    duration: function(){
                        return Math.floor(300 / $("#speed").val());
                    },
                    easing: 'linear',
                    begin: function(){
                        $(".swap").addClass("code_running");
                        $(".cmp").removeClass("code_running");
                    }
                });
                data[j+1]["loc"] -= 51;
                data[j]["loc"] += 51;
                let tmp = data[j];
                data[j] = data[j+1];
                data[j+1] = tmp;
            }
            sort_timeline.add({
                targets: [data[j]["id"], data[j+1]["id"]],
                duration: function(){
                    return Math.floor(1002 / $("#speed").val());
                },
                backgroundColor: '#4169e1',
            })
        }
        sort_timeline.add({
            targets: data[data.length-1-i]["id"],
            duration: function(){
                return Math.floor(1002 / $("#speed").val());
            },
            backgroundColor: '#919191',
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
        let code_loc = $('code > span')[0].getBoundingClientRect().bottom;
        let var_loc = $('#var > span')[0].getBoundingClientRect().bottom;
        $('.hljs').css('margin-top',var_loc - code_loc);
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
function init(){
    // init graph
    init_graph();
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
