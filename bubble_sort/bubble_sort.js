// TODO: [x]clean the code
// TODO: [X] adjust timeline
// TODO:
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
// move animate
function move(target,dis) {
  var pos = data[target]["loc"];
  var des = pos+dis;
  data[target]["loc"]=des;
  var id = setInterval(frame, 2);
  function frame() {
    if (pos == des) {
      clearInterval(id);
    } else {
      if(pos>des){
          pos--;
      }else{
          pos++;
      }
      $(data[target]["id"]).css("left",pos+"px");
    }
  }
}
function cmp(k) {
    return new Promise(function (resolve, reject) {
        // change color of code cmp
        $("#cmp").css({"color":"white","background":"black"});
        // change color to comparing mode
        $(data[k]["id"]).toggleClass("rec",false);
        $(data[k+1]["id"]).toggleClass("rec",false);
        $(data[k]["id"]).toggleClass("rec_cmp",true);
        $(data[k+1]["id"]).toggleClass("rec_cmp",true);

        if(data[k+1]["value"]<data[k]["value"]){
            // swap
            setTimeout(function(){
              $("#cmp").css({"color":"black","background":"white"});
              $("#swap").css({"color":"white","background":"black"});
              move(k,51);
              move(k+1,-51);
            },500);
            setTimeout(function(){
                $("#swap").css({"color":"black","background":"white"});
                var tmp=data[k];
                data[k]=data[k+1];
                data[k+1]=tmp;
                $(data[k]["id"]).toggleClass("rec_cmp",false);
                $(data[k+1]["id"]).toggleClass("rec_cmp",false);
                $(data[k]["id"]).toggleClass("rec",true);
                $(data[k+1]["id"]).toggleClass("rec",true);
                resolve();
            },1000)
        }else{
            // don't need to swap
            setTimeout(function(){
                $("#cmp").css({"color":"black","background":"white"});
                $(data[k]["id"]).toggleClass("rec_cmp",false);
                $(data[k+1]["id"]).toggleClass("rec_cmp",false);
                $(data[k]["id"]).toggleClass("rec",true);
                $(data[k+1]["id"]).toggleClass("rec",true);
                resolve();
            },1000)
        }
    })
};
function wait(k) {
    return new Promise(function (resolve, reject) {
        setTimeout(function(){
        resolve();
        },k);
    })
};
$(document).ready(function(){
    // init graph
    for(var i=0;i<data.length;i++){
        var target = data[i]["id"];
        $(target).html(data[i]["value"].toString());
        $(target).css("line-height",(data[i]["value"]*34-15)+"px");
        $(target).height(data[i]["value"]*17);
    }
    $("#start").click(async function(){
        // to diasable the start button
        $("#start").attr("disabled",true);
        // check if graph need to reset
        if(flag==false){
            for(var i=0;i<Data.length;i++){
                var target = Data[i]["id"];
                $(target).css("left",0+"px");
                $(data[data.length-i-1]["id"]).toggleClass("rec_finish",false);
                $(data[data.length-i-1]["id"]).toggleClass("rec",true);
            }
            data=jQuery.extend(true, [], Data);
        }
        // bubble sort
        for(i=0;i<data.length;i++){
            await wait(500);
            console.log("start");
            $("#var_i").text("i: " + i);
            for(j=0;j<data.length-1-i;j++){
                $("#var_j").text("j: " + j);
                await cmp(j);
            }
            $(data[data.length-i-1]["id"]).toggleClass("rec",false);
            $(data[data.length-i-1]["id"]).toggleClass("rec_finish",true);

        }
        flag=false;
        $("#start").attr("disabled",false);
    })
});
