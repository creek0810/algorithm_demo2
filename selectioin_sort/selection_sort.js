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
function swap(a,b) {
    return new Promise(function (resolve, reject) {
        if(a==b){
            return resolve();
        }else{
            move(a,(b-a)*51);
            move(b,(b-a)*51*-1);
            setTimeout(function(){
                var tmp=data[a];
                data[a]=data[b];
                data[b]=tmp;
                return resolve();
            },2000);
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
        // selection sort
        for(i=0;i<data.length-1;i++){
            await wait(500);
            console.log("start");
            $("#var_i").text("i: " + i);
            var min=i;
            $("#var_min").text("min: " + min);
            $(data[min]["id"]).toggleClass("rec",false);
            $(data[min]["id"]).toggleClass("rec_min",true);
            for(j=i+1;j<data.length;j++){
                $("#var_j").text("j: " + j);
                $(data[j]["id"]).toggleClass("rec_cmp",true);
                $(data[j]["id"]).toggleClass("rec",false);
                await wait(500);

                if(data[min]["value"]>data[j]["value"]){
                    $(data[j]["id"]).toggleClass("rec_min",true);
                    $(data[min]["id"]).toggleClass("rec",true);
                    $(data[j]["id"]).toggleClass("rec_cmp",false);
                    $(data[min]["id"]).toggleClass("rec_min",false);
                    await(100);
                    min=j;
                    $("var_min").text("min: "+j);
                }else{
                    $(data[j]["id"]).toggleClass("rec",true);
                    $(data[j]["id"]).toggleClass("rec_cmp",false);
                }

            }

            console.log(min+" "+i);
            await swap(min,i);
            $(data[i]["id"]).toggleClass("rec_min",false);
            $(data[i]["id"]).toggleClass("rec_finish",true);
        }
        flag=false;
        $("#start").attr("disabled",false);
    })
});
