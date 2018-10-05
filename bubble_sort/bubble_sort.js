// TODO: clean the code
var data = [{"id": "#data0","value": 5,"loc": 0},
            {"id": "#data1","value": 2,"loc": 0},
            {"id": "#data2","value": 7,"loc": 0},
            {"id": "#data3","value": 3,"loc": 0},
            {"id": "#data4","value": 9,"loc": 0},
            {"id": "#data5","value": 1,"loc": 0}];
$(document).ready(function(){
    for(var i=0;i<data.length;i++){
        var target = data[i]["id"];
        $(target).html(data[i]["value"].toString());
        $(target).css("line-height",(data[i]["value"]*34-15)+"px");
        $(target).height(data[i]["value"]*17);
    }
});
function swapright(target) {
  var pos = data[target]["loc"];
  var des = pos+51;
  data[target]["loc"]=des;
  console.log("right: "+des+" "+data[target]["value"]);

  var id = setInterval(frame, 5);

  function frame() {
    if (pos == des) {
      clearInterval(id);
    } else {
      pos++;
      $(data[target]["id"]).css("left",pos+"px");
    }
  }
  console.log("final right: "+$(data[target]["id"]).css("left"));

}
function swapleft(target) {
  var pos = data[target]["loc"];
  var des = pos-51;
  data[target]["loc"]=des;
  console.log("left: "+des+" "+data[target]["value"]);
  var id = setInterval(frame, 5);
  function frame() {
    if (pos == des) {
      clearInterval(id);
    } else {
      pos--;
      $(data[target]["id"]).css("left",pos+"px");
    }
  }
  console.log("final left: "+$(data[target]["id"]).css("left"));
}
function call(k) {
    return new Promise(function (resolve, reject) {
        if(data[k]["value"]<data[k-1]["value"]){
            swapright(k-1);
            swapleft(k);
            setTimeout(function(){
                var tmp=data[k];
                data[k]=data[k-1];
                data[k-1]=tmp;
                resolve();
            },1000)
        }else{
            resolve();
        }
    })
};

$(document).ready(function(){
    $("#start").click(async function(){
        var count=0;
        for(i=0;i<data.length;i++){
            for(k=1;k<data.length-i;k++){
                await call(k);
            }
        }
    })
});
