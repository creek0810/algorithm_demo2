// the data of current state
let data = [5, 2, 7, 3, 9, 1, 4, 15];
let stack = 0, count = 1;
let sort_timeline = anime.timeline({
    autoplay: false,
    update: function (anim) {
        $("#progress_bar").val(anim.progress);
    }
});
function content_init(){
    let sort_code = "void mergesort(vector&lt;int&gt;&table, int begin, int end){\n" + 
                    "    if(begin < end){\n" +
                    "        <span class='calc_mid'>int mid = (begin + end) / 2;</span>\n" +
                    "        <span class='call_left'>mergesort(table, begin, mid);</span>\n" + 
                    "        <span class='call_right'>mergesort(table, mid+1, end);</span>\n" +
                    "        <span class='call_merge'>merge(table, begin, mid, end);</span>\n" +
                    "    }\n" +
                    "}\n";
    let merge_code = "void merge(vector&lt;int&gt; &table, int begin, int mid, int end){\n" +
                     "    vector&lt;int&gt;left(table.begin()+begin, table.begin()+mid+1);\n" +
                     "    vector&lt;int&gt;right(table.begin()+mid+1, table.begin()+end+1);\n" +
                     "    int l = 0, r = 0, MAX = 1;\n" +
                     "    left.push_back((MAX << 31) - 1);\n" +
                     "    right.push_back((MAX << 31) - 1);\n" +
                     "    for(int i=begin;i<=end;i++){\n" +
                     "        <span class='vec_cmp'>if(left[l] <= right[r]){</span>\n" +
                     "            <span class='left_win'>table[i] = left[l++];</span>\n" +
                     "        }else{\n" +
                     "            <span class='right_win'>table[i] = right[r++];</span>\n" +
                     "        }\n" +
                     "    }\n" +
                     "}\n";
    $(".sort_inner").html(sort_code);
    $(".merge_inner").html(merge_code);
    $(".code_merge").hide();
    hljs.initHighlighting(); 
    $('.trace').css('display','flex');
    let code_loc = $('code > span')[0].getBoundingClientRect().bottom;
    let var_loc = $('#var > span')[0].getBoundingClientRect().bottom;
    $('pre').css('margin-top',var_loc - code_loc);
    $('.trace').css('display','none');
}
function update_var(left, mid, right){
    $('#var_mid').attr('value', mid);
    $('#var_begin').attr('value', left);
    $('#var_end').attr('value', right);
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
        let mid = Math.floor((left + right) / 2);
        $(id).append(tmp_html);
        if(stack == 1){
            sort_timeline.add({
                targets: anime_id,
                duration: 500,
                opacity: 1,
                begin: function () {
                    // show mergesort code and hide combine code
                    $('.code_sort').show();
                    $('.code_merge, .var_combine').hide();
                    $('.calc_mid').addClass('code_running');
                    $('.call_left, .call_right, .call_merge').removeClass('code_running');
                    $('#var_mid').show();
                    update_var(left,mid,right);
                },
                complete: function(){
                    $('.calc_mid').removeClass('code_running');
                    $('.call_left').addClass('code_running');
                }
            })
        }else{
            sort_timeline.add({
                targets: anime_id,
                delay: 500,
                opacity: 1,
                begin: function () {
                    // show mergesort code and hide combine code
                    $('.code_sort, #var_mid').show();
                    $('.code_merge, .var_combine').hide();
                    $('.calc_mid').addClass('code_running');
                    $('.call_left, .call_right, .call_merge').removeClass('code_running');
                    update_var(left,mid,right);
                },
                complete: function(){
                    $('.calc_mid').removeClass('code_running');
                    $('.call_left').addClass('code_running');
                }
            });
        }
        count *= 2;
        merge(left,mid);
        count = count * 2 + 1;
        sort_timeline.add({
            targets: anime_id,
            duration: 1,
            complete: function () {
                $('.call_right').addClass('code_running');
                $('.calc_mid, .call_left, .call_merge').removeClass('code_running');
                $('#var_mid').show();
                $('.var_combine').hide();
                update_var(left,mid,right);
            },
        });
        merge(mid+1,right);
        sort_timeline.add({
            targets: anime_id,
            begin: function () {
                $('.call_merge').addClass('code_running');
                $('.calc_mid, .call_left, .call_right').removeClass('code_running');
                $('#var_mid').show();
                $('.var_combine').hide();
                update_var(left,mid,right);
            },
        });
        combine(left,mid,right);
        count = Math.floor(count / 2);
    }else{
        let tmp_html = '<table id="table' + count.toString() + '"><tr><th><input class="data_input" type="text" id="table' + count.toString() + '-0"value="' + data[left] + '"> </th></tr></table>';
        let id = "#layer" + stack.toString();
        $(id).append(tmp_html);
        sort_timeline.add({
            targets: anime_id,
            delay: 500,
            opacity: 1,
            begin: function(){
                // show mergesort code and hide combine code
                $('.code_sort').show();
                $('.code_merge, #var_mid').hide();
                $('.call_right, .call_left').removeClass('code_running');
                $('#var_begin').attr('value', left);
                $('#var_end').attr('value', right);
            }
        });
        count = Math.floor(count / 2);
    }
    stack--;
}
function combine(left,mid,right){
    let data_left =  JSON.parse(JSON.stringify(data.slice(left,mid+1)));
    let data_right = JSON.parse(JSON.stringify(data.slice(mid+1,right+1)));
    data_left.push(2147483647);
    data_right.push(2147483647);
    let l=0,r=0;
    // anime 
    let id = '#table' + count.toString() + '-0';
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
        backgroundColor: '#4169e1',
        begin: function(){
            // show combine code and hide mergesort code
            $('.code_sort').hide();
            $('.code_merge').show();
            // init
            $('.vec_cmp, .left_win, .right_win').removeClass('code_running');
            update_var(left,mid,right);
        }
    }).add({
        targets: [id, left_child_id, right_child_id],
        backgroundColor: '#ffa600',
        begin: function(){
            $('.var_i').attr('value',left);
            $('.var_l').attr('value',l);
            $('.var_r').attr('value',r);
            $('.var_combine').show();
        }
    });
    for(let i=left;i<=right;i++){
        let id = '#table' + count.toString() + '-' + (i - left).toString();
        let left_child_id = '#table' + (count*2).toString() + '-' + l.toString();
        let right_child_id = '#table' + (count*2+1).toString() + '-' + r.toString();
        sort_timeline.add({
            targets: '#var_l',
            duration: 1,
            value: l,
            round:1
        }).add({
            targets: '#var_i',
            duration: 1,
            value: i,
            round:1
        }).add({
            targets: '#var_r',
            duration: 1,
            value: r,
            round:1
        }).add({
            targets: [id, right_child_id, left_child_id],
            backgroundColor: '#ffa600',
            begin: function(){
                $('.vec_cmp').addClass('code_running');
                $('.left_win, .right_win').removeClass('code_running');
            }
        });
        if(data_left[l] <= data_right[r]){
            sort_timeline.add({
                targets: left_child_id,
                backgroundColor: '#7fd925',
                complete: function(){
                    $('.vec_cmp').removeClass('code_running');
                    $('.left_win').addClass('code_running');
                }
            }).add({
                targets: id,
                value: data_left[l],
                duration: 1,
            }).add({
                targets: [id, left_child_id],
                backgroundColor: '#919191'
            });
            data[i] = data_left[l++];
        }else{
            sort_timeline.add({
                targets: right_child_id,
                backgroundColor: '#7fd925',
                complete: function(){
                    $('.vec_cmp').removeClass('code_running');
                    $('.right_win').addClass('code_running');
                }
            }).add({
                targets: id,
                value: data_right[r],
                duration: 1,
            }).add({
                targets: [id, right_child_id],
                backgroundColor: '#919191'
            });
            data[i] = data_right[r++];
        }
    }
    let left_child = "#table" + (count * 2).toString();
    let right_child = "#table" + (count * 2 + 1).toString();
    sort_timeline.add({
        targets: '#var_l',
        duration: 1,
        value: function(){
            return data_left.length - 1;
        },
        round:1
    }).add({
        targets: '#var_i',
        duration: 1,
        value: function(){
            return right + 1;
        },
        round:1
    }).add({
        targets: '#var_r',
        duration: 1,
        value: function(){
            return data_right.length - 1;
        },
        round:1
    }).add({
        targets: [left_child, right_child],
        opacity: 0,
    });
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
    }
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

