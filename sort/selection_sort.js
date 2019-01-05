
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
    for (let i = 0; i < data.length - 1; i++){
        let min = i;
        sort_timeline.add({
            targets: data[min]["id"],
            backgroundColor: '#7fd925',
            duration: function(){
                return Math.floor(1002 / $('#speed').val());
            },
            begin: function(){
                $(".init").addClass("code_running");
                $(".change, .swap, .cmp").removeClass("code_running");
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
        for(let j = i + 1; j < data.length; j++){      
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
                duration: function(){
                    return Math.floor(1002 / $('#speed').val());
                },
                begin: function(){
                    $(".cmp").addClass("code_running");
                    $(".change, .swap, .init").removeClass("code_running");
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
                    duration: function(){
                        return Math.floor(1002 / $('#speed').val());
                    },
                    begin: function(){
                        $(".change").addClass("code_running");
                        $(".cmp, .swap").removeClass("code_running");
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
                    duration: function(){
                        return Math.floor(1002 / $('#speed').val());
                    },
                    backgroundColor: '#4169e1',
                    offset: "-=0",
                })
            }
        }
        let cur_offset = "-=" + ((min-i)*300).toString();
        sort_timeline.add({
            targets: data[min]["id"],
            translateX: function(){
                return data[min]["loc"] - (51 * (min - i))
            },
            duration: (min - i) * 300 ,
            easing: 'linear',
            begin: function(){
                $(".swap").addClass("code_running");
                $(".cmp, .change").removeClass("code_running");
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
        duration: function(){
            return Math.floor(1002 / $('#speed').val());
        },
        backgroundColor: "#919191"
    })
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
    // init highlight.js
    hljs.initHighlightingOnLoad();
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
