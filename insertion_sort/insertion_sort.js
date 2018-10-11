// the data of current state
var data = [{"id": "#data0","value": 5,"loc_x": 0,"loc_y": 0},
            {"id": "#data1","value": 2,"loc_x": 0,"loc_y": 0},
            {"id": "#data2","value": 7,"loc_x": 0,"loc_y": 0},
            {"id": "#data3","value": 3,"loc_x": 0,"loc_y": 0},
            {"id": "#data4","value": 9,"loc_x": 0,"loc_y": 0},
            {"id": "#data5","value": 1,"loc_x": 0,"loc_y": 0},
            {"id": "#data6","value": 4,"loc_x": 0,"loc_y": 0}];
// const data
var Data = jQuery.extend(true, [], data);
// to store if it is the first time that the program run
var flag=true;
// move animate
function move_x(target,dis) {
  return new Promise(function(resolve,reject){
      var pos = target["loc_x"];
      var des = pos+dis;
      target["loc_x"]=des;
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
          $(target["id"]).css("left",pos+"px");
      }
    }
    setTimeout(function(){
        return resolve();
    },dis*2+700);
  })
}
function move_y(target,dis) {
  return new Promise(function(resolve,reject){
      var pos = target["loc_y"];
      var des = pos+dis;
      target["loc_y"]=des;
      var id = setInterval(frame, 2);
      function frame() {
          if (pos == des) {
          clearInterval(id);
      } else {
          if(pos>des){
              pos-=5;
          }else{
              pos+=5;
          }
          $(target["id"]).css("top",pos+"px");
      }
    }
    setTimeout(function(){
        return resolve();
    },500);
  })
}
function swap(a,b) {
    return new Promise(async function (resolve, reject) {
        if(a==b){
            return resolve();
        }else{
            move(a,(b-a)*51);
            await move(b,(b-a)*51*-1);
            //setTimeout(function()
                var tmp=data[a];
                data[a]=data[b];
                data[b]=tmp;
                return resolve();
        //    },1500);
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
            await wait(500);
        }
        // insertion sort
        $(data[0]["id"]).toggleClass("rec",false);
        $(data[0]["id"]).toggleClass("rec_finish",true);
        for(var i=1;i<data.length;i++){
            await wait(200);
            var j=i-1,current=data[i];
            $("#var_i").text("i: "+i);
            $("#var_j").text("j: "+j);
            $("#var_current").text("current: "+current["value"]);
            $(current["id"]).toggleClass("rec_current",true);
            $(current["id"]).toggleClass("rec",false);
            await move_y(current,250);
            $(data[j]["id"]).toggleClass("rec_finish",false);
            $(data[j]["id"]).toggleClass("rec_cmp",true);
            await wait(300);
            $(data[j]["id"]).toggleClass("rec_cmp",true);
            while(j>=0 && data[j]["value"]>current["value"]){
                await wait(300);
                move_x(current,-51);
                await move_x(data[j],51);
                data[j+1]=data[j];
                $(data[j]["id"]).toggleClass("rec_cmp",false);
                $(data[j]["id"]).toggleClass("rec_finish",true);
                j--;
                $("#var_j").text("j: "+j);
                if(j>=0){
                    await wait(100);
                    $(data[j]["id"]).toggleClass("rec_cmp",true);
                    $(data[j]["id"]).toggleClass("rec_finish",false);
                }

            }
            if(j>=0){
                $(data[j]["id"]).toggleClass("rec_cmp",false);
                $(data[j]["id"]).toggleClass("rec_finish",true);
            }
            data[j+1]=current;
            move_y(current,-250);
            $(current["id"]).toggleClass("rec_current",false);
            $(current["id"]).toggleClass("rec_finish",true);
        }
        console.log(data);
        flag=false;
        $("#start").attr("disabled",false);
    })
});
