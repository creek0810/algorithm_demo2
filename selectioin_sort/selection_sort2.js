// the data of current state
var data = [{"id": "#data0","value": 5,"loc": 0},
            {"id": "#data1","value": 2,"loc": 0},
            {"id": "#data2","value": 7,"loc": 0},
            {"id": "#data3","value": 3,"loc": 0},
            {"id": "#data4","value": 9,"loc": 0},
            {"id": "#data5","value": 1,"loc": 0},
            {"id": "#data6","value": 4,"loc": 0}];
// const data
var Data = jQuery.extend(true, [], data);
// to store if it is the first time that the program run
var flag=true;
$(document).ready(function(){
    // init graph
    for(var i=0;i<data.length;i++){
        var target = data[i]["id"];
        $(target).html(data[i]["value"].toString());
        $(target).css("line-height",(data[i]["value"]*34-15)+"px");
        $(target).height(data[i]["value"]*17);
    }




    var swap = anime({
        targets: '#data0',
        translateX: [
            {value: 51, duration: 250}
        ],
        autoplay: false,
        easing: 'linear',
    });
    $(".restart").click(function(){
        var mytimeline = anime.timeline();
        mytimeline.add({
            targets: '#data0',
            translateX: [
                {value: 51, duration: 250}
            ],
            autoplay: false,
            easing: 'linear'
        })
        .add({
            targets: '#data1',
            translateX: [
                {value: -51, duration: 250}
            ],
            autoplay: false,
            easing: 'linear',
            offset: '-=250'
        });


    });
    $("#info").click(function(){
        $("#code_trace").removeClass("information-enabled");
        $("#info").addClass("information-enabled");
        $(".code_trace").css("opacity", 0);

    })
    $("#code_trace").click(function(){
        $(".code_trace").css("opacity", 1);
        $("#info").removeClass("information-enabled");
        $("#code_trace").addClass("information-enabled");
    })
});
