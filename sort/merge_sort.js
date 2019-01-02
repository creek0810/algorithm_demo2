// the data of current state
let data = [5, 2, 7, 3, 9, 1, 4, 15];
let stack = 0;
let count = 1;
let sort_timeline = anime.timeline({
    autoplay: false,
    update: function (anim) {
        $("#progress_bar").val(anim.progress);
    }
});



function content_init(){
    let sort_code = "void mergesort(vector&lt;int&gt;&table, int begin, int end){\n" + 
                   "    if(begin < end){\n" +
                   "        int mid = (begin + end) / 2;\n" +
                   "        mergesort(table, begin, mid);\n" + 
                   "        mergesort(table, mid+1, end);\n" +
                   "        merge(table, begin, mid, end);\n" +
                   "    }\n" +
                   "}\n";
    let merge_code = "void merge(vector&lt;int&gt; &table, int begin, int mid, int end){\n" +
                     "    vector<int>left(table.begin()+begin, table.begin()+mid+1);\n" +
                     "    vector<int>right(table.begin()+mid+1, table.begin()+end+1);\n" +
                     "    int l = 0, r = 0;\n" +
                     "    int tablecnt = 0;\n" +
                     "    while(l < left.size() && r < right.size()){\n" +
                     "        if(right[r] < left[l]){\n" +
                     "            table[begin+tablecnt] = right[r];\n" +
                     "            r++;\n" +
                     "            tablecnt++;\n" +
                     "        }else{\n" +
                     "            table[begin+tablecnt] = left[l];\n" +
                     "            l++;\n" +
                     "            tablecnt++;\n" +
                     "        }\n" +
                     "    }\n" +
                     "    while(l < left.size()){\n" +
                     "        table[begin+tablecnt] = left[l];\n" +
                     "        l++;\n" +
                     "        tablecnt++;\n" +
                     "    }\n" +
                     "    while(r < right.size()){\n" +
                     "        table[begin+tablecnt] = right[r];\n" +
                     "        r++;\n" +
                     "        tablecnt++;\n" +
                     "    }\n" +
                     "}\n";
    console.log(sort_code);
    $(".sort_inner").html(sort_code);
    $(".merge_inner").html(merge_code);
    $(".code_sort").hide();
    $(".code_merge").hide();
    hljs.initHighlighting();
}

function merge(left,right){
    stack++;
    let anime_id = '#table' + count.toString();
    if(left < right){
        let tmp_html = '<table id="table' + count.toString() + '"><tr>';
        for(let i=left;i<=right;i++){
            tmp_html = tmp_html + '<th> <input class="data_input" type="text" id="table' + count.toString() + '-' + (i - left).toString() + '"value="' + data[i] + '"> </th>';
        }
        tmp_html += '</table></tr>'
        let id = "#layer" + stack.toString();
        $(id).append(tmp_html);
        sort_timeline.add({
            targets: anime_id,
            opacity: 1,
        });
        let mid = (left + right) / 2;
        mid = Math.floor(mid);
        count *= 2;
        merge(left,mid);
        count = count * 2 + 1;
        merge(mid+1,right);
        combine(left,mid,right);
        count = Math.floor(count / 2);
    }else{
        let tmp_html = '<table id="table' + count.toString() + '"><tr><th><input class="data_input" type="text" id="table' + count.toString() + '-0"value="' + data[left] + '"> </th></tr></table>';
        let id = "#layer" + stack.toString();
        $(id).append(tmp_html);
        sort_timeline.add({
            targets: anime_id,
            opacity: 1,
        });
        count = Math.floor(count / 2);
    }
    stack--;
}
function combine(left,mid,right){
    let data_left =  JSON.parse(JSON.stringify(data.slice(left,mid+1)));
    let data_right = JSON.parse(JSON.stringify(data.slice(mid+1,right+1)));
    let l=0,r=0;
    let tablecnt=0;
    // anime 
    let id = '#table' + count.toString() + '-' + tablecnt.toString();
    let left_child_id = '#table' + (count*2).toString() + '-' + l.toString();
    let right_child_id = '#table' + (count*2+1).toString() + '-' + r.toString();
    let clean_table = [];
    for(let i=0;i<data_left.length;i++){
        let tmp = '#table' + (count*2).toString() + '-' + i.toString();
        clean_table.push(tmp);
    }
    for(let i=0;i<data_right.length;i++){
        let tmp = '#table' + (count*2+1).toString() + '-' + i.toString();
        clean_table.push(tmp);
    }
    sort_timeline.add({
        targets: clean_table,
        backgroundColor: '#4169e1'
    })
    sort_timeline.add({
        targets: [id, left_child_id, right_child_id],
        backgroundColor: '#ffa600'
    });
    while(l<data_left.length && r<data_right.length){
        let id = '#table' + count.toString() + '-' + tablecnt.toString();
        let left_child_id = '#table' + (count*2).toString() + '-' + l.toString();
        let right_child_id = '#table' + (count*2+1).toString() + '-' + r.toString();
        if(data_left[l] <= data_right[r]){
            sort_timeline.add({
                targets: [id, left_child_id,right_child_id],
                backgroundColor: '#ffa600'
            }).add({
                targets: id,
                value: data_left[l],
                duration: 1,
            }).add({
                targets: [id, left_child_id],
                backgroundColor: '#919191'
            });
            data[left + tablecnt] = data_left[l];
            tablecnt++;
            l++;
        }else{
            sort_timeline.add({
                targets: [id, left_child_id, right_child_id],
                backgroundColor: '#ffa600'
            }).add({
                targets: id,
                value: data_right[r],
                duration: 1,
            }).add({
                targets: [id, right_child_id],
                backgroundColor: '#919191'
            });
            data[left + tablecnt] = data_right[r];
            tablecnt++;
            r++;
        }
    }
    while(l<data_left.length){
        let id = '#table' + count.toString() + '-' + tablecnt.toString();
        let child_id = '#table' + (count*2).toString() + '-' + l.toString();
        sort_timeline.add({
            targets: [id, child_id],
            backgroundColor: '#ffa600'
        }).add({
            targets: id,
            value: data_left[l],
            duration: 1,
        }).add({
            targets: [id, child_id],
            backgroundColor: '#919191'
        });
        data[left + tablecnt] = data_left[l];
        l++;
        tablecnt++;
    }
    while(r<data_right.length){
        let id = '#table' + count.toString() + '-' + tablecnt.toString();
        let child_id = '#table' + (count*2+1).toString() + '-' + r.toString();
        sort_timeline.add({
            targets: [id, child_id],
            backgroundColor: '#ffa600'
        }).add({
            targets: id,
            value: data_right[r],
            duration: 1,
        }).add({
            targets: [id, child_id],
            backgroundColor: '#919191'
        });
        data[left + tablecnt] = data_right[r];
        r++;
        tablecnt++;
    }
    let left_child = "#table" + (count * 2).toString();
    let right_child = "#table" + (count * 2 + 1).toString();
    sort_timeline.add({
        targets: [left_child, right_child],
        opacity: 0,
    });
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
    // init highlight.js
    content_init();
    // build anime timeline
    merge(0,data.length-1);
    // fix data square width
	let square_loc = $('#table1-0')[0].getBoundingClientRect();
    $('.data_input').width(square_loc.bottom - square_loc.top);
    // build anime control panel
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
    });
    $("#trace").click(function(){
        info_change(1);
    });
}
$(document).ready(init,false);

