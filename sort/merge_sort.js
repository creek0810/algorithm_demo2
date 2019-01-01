// the data of current state
let data = [{"id": "#data0","value": 5,"loc": 0},
            {"id": "#data1","value": 2,"loc": 0},
            {"id": "#data2","value": 7,"loc": 0},
            {"id": "#data3","value": 3,"loc": 0},
            {"id": "#data4","value": 9,"loc": 0},
            {"id": "#data5","value": 1,"loc": 0},
            {"id": "#data6","value": 4,"loc": 0}];
let stack = 1;
let sort_timeline = anime.timeline({
    autoplay: false,
    update: function (anim) {
        $("#progress_bar").val(anim.progress);
    }
});
/*function sort(){
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
                offset: "-=0",
                begin: function(){
                    $(".cmp").addClass("code_running");
                    $(".swap").removeClass("code_running");
                }
            })
            
            if(data[j]["value"] > data[j+1]["value"]){
                sort_timeline.add({
                    targets: data[j]["id"],
                    translateX: data[j]["loc"] + 51,
                    duration: 300,
                    offset: "-=0",
                    easing: 'linear',
                    begin: function(){
                        $(".swap").addClass("code_running");
                        $(".cmp").removeClass("code_running");
                    }
                }).add({
                    targets: data[j+1]["id"],
                    translateX: data[j+1]["loc"] - 51,
                    duration: 300,
                    offset: "-=300",
                    easing: 'linear'
                })
                data[j+1]["loc"] -= 51;
                data[j]["loc"] += 51;
                var tmp = data[j];
                data[j] = data[j+1];
                data[j+1] = tmp;
            }
            sort_timeline.add({
                targets: [data[j]["id"], data[j+1]["id"]],
                backgroundColor: '#4169e1',
                offset: "-=0",
            })
        }
        sort_timeline.add({
            targets: data[data.length-1-i]["id"],
            backgroundColor: '#919191',
        })
    }
    return sort_timeline;
}*/

function merge(left,right){
    console.log(stack);
    stack++;
    if(left < right){
        let mid = (left + right) / 2;
        mid = Math.floor(mid);
        merge(left,mid);
        merge(mid+1,right);
        combine(left,mid,right);
    }
    stack--;
}
function combine(left,mid,right){
    let data_left =  JSON.parse(JSON.stringify(data.slice(left,mid+1)));
    let data_right = JSON.parse(JSON.stringify(data.slice(mid+1,right+1)));
    let l=0,r=0;
    let tablecnt=0;
    while(l<data_left.length && r<data_right.length){
        if(data_left[l]["value"] <= data_right[r]["value"]){
            data[left+tablecnt] = data_left[l];
            tablecnt++;
            l++;
        }else{
            data[left+tablecnt] = data_right[r];
            tablecnt++;
            r++;
        }
    }
    while(l<data_left.length){
        data[left+tablecnt] = data_left[l];
        l++;
        tablecnt++;
    }
    while(r<data_right.length){
        data[left+tablecnt] = data_right[r];
        r++;
        tablecnt++;
    }
}

function info_change(mode){ // mode 0 = info
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
    // init highlight.js
    hljs.initHighlightingOnLoad();
    // init graph
    for(var i=0;i<data.length;i++){
        var target = data[i]["id"];
        $(target).html(data[i]["value"].toString());
        $(target).css("line-height",(data[i]["value"]*34-15)+"px");
        $(target).height(data[i]["value"]*17);
    }
    merge(0,data.length);
    $("#start").click(function(){
        info_change(1);
        sort_timeline.play();
    });
    $("#pause").click(sort_timeline.pause);
    $("#restart").click(function(){
        info_change(1);
        sort_timeline.restart();
    });
    $("#progress_bar").on("input change", function(){
        sort_timeline.seek(sort_timeline.duration * ($("#progress_bar").val()/100));
    })
    // mode 0 = info
    // mode 1 = trace
    $("#info").click(function(){
        info_change(0);
        console.log("start!");
    });
    $("#trace").click(function(){
        info_change(1);
    });
}
$(document).ready(init,false);
// init highlight.js
hljs.initHighlightingOnLoad();
