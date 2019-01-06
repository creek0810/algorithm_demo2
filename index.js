var mouseoutMes = '<br><div class="title">救救演算法!!!</div><br><div class="messenger">點擊下方CD以了解更多<br><div style="font-size:1.15vw;">(左邊CD:Algorithm  ,  右邊CD:Data Structure)</div>點擊下方CD Player以查看說明文件</div>';

function fix_width(){
	let width = $('.robot').height();
	$('.robot').width(width);
	$('.box').width(width);
	$('.elevator-shaft-one').width(width);
	$('.elevator-shaft-two').width(width);
}
function show_DS(){
	$("#box-two").unbind();
	$("#box-one").unbind();
	let timeline = anime.timeline();
	let cur_loc = $('#push_arm')[0].getBoundingClientRect();
	let tar_loc = $('.elevator-shaft-two')[0].getBoundingClientRect();
	let box_loc = $('#box-two')[0].getBoundingClientRect();
	let pusher_loc = $('#push_arm3')[0].getBoundingClientRect();
	let loading_loc = $('#load')[0].getBoundingClientRect();
	let border_loc = $('.platform')[0].getBoundingClientRect();
	timeline.add({
		targets: '#robot-one',
		translateX: function(){
			return box_loc.left - cur_loc.right;
		},
		duration: 1000,
		easing: 'linear'
	}).add({
		targets: '#robot-one',
		translateX: function(){
			return tar_loc.left - cur_loc.right;
		},
		duration: 1000,
		easing: 'linear'
	}).add({
		targets: '#box-two',
		translateX: function(){
			return tar_loc.left - box_loc.left;
		},
		rotate: 360,
		offset: "-=1000",
		duration: 1000,
		easing: 'linear'
	}).add({
		targets: '#box-two',
		translateY:function(){
			return tar_loc.top - box_loc.bottom;
		},
		translateX: function(){
			return tar_loc.left - box_loc.left;
		},
		rotate: 360,
		easing: 'linear',
		duration: 1000,
	}).add({
		targets: ".elevator-two",
		translateY:function(){
			return tar_loc.top - box_loc.bottom;
		},
		offset: '-=1000',
		easing: 'linear',
		duration: 1000,
	}).add({
		targets: "#robot-three",
		translateX:function(){
			return tar_loc.right - pusher_loc.left;
		},
		offset: '-=740',
		easing: 'linear',
		duration: 750,
	}).add({
		targets: "#robot-three",
		translateX:function(){
			return loading_loc.right - pusher_loc.left;
		},
		easing: 'linear',
		duration: 2000,
	}).add({
		targets: '#box-two',
		translateY:function(){
			return tar_loc.top - box_loc.bottom;
		},
		translateX: function(){
			return loading_loc.right - box_loc.right;
		},
		rotate: -720,
		offset: '-=2000',
		easing: 'linear',
		duration: 2000,
	}).add({
		targets: '#robot-three',
		translateY:function(){
			return tar_loc.top - box_loc.bottom;
		},

		translateX: function(){
			return border_loc.right - box_loc.left;
		},
		rotate: -720,
		easing: 'linear',
		duration: 2000,
	});
	setTimeout("DSchangemes()", 5000);
}

function DSchangemes(){
	mouseoutMes = "<br><div class='category'>Data Structure</div><a href='data_structure/stack.html'><button class='btn btn--swap' >Stack<span>Stack</span></button></a><a href='data_structure/queue.html'><button class='btn btn--swap'>Queue<span>Queue</span></button></a>";
	$(".screen").html(mouseoutMes);
}

function show_ALG(){
	$("#box-two").unbind();
	$("#box-one").unbind();
	$('#arms').addClass("arm_one")
	$('#arms').removeClass('arm')
	$('#push_arm').addClass("arm-right_one")
	$('#push_arm').removeClass('arm-right')
	let timeline = anime.timeline();
	let cur_loc = $('#push_arm')[0].getBoundingClientRect();
	let tar_loc = $('.elevator-shaft-one')[0].getBoundingClientRect();
	let box_loc = $('#box-one')[0].getBoundingClientRect();
	let pusher_loc = $('#push_arm2')[0].getBoundingClientRect();
	let loading_loc = $('#load')[0].getBoundingClientRect();
	let border_loc = $('.platform')[0].getBoundingClientRect();
	timeline.add({
		targets: '#robot-one',
		translateX: function(){
			return box_loc.right - cur_loc.left;
		},
		duration: 1000,
		easing: 'linear'
	}).add({
		targets: '#robot-one',
		translateX: function(){
			return tar_loc.right - cur_loc.left;
		},
		duration: 1000,
		easing: 'linear'
	}).add({
		targets: '#box-one',
		translateX: function(){
			return tar_loc.right - box_loc.right;
		},
		rotate: -360,
		offset: "-=1000",
		duration: 1000,
		easing: 'linear'
	}).add({
		targets: '#box-one',
		translateY:function(){
			return tar_loc.top - box_loc.bottom;
		},
		translateX: function(){
			return tar_loc.right - box_loc.right;
		},
		rotate: -360,
		easing: 'linear',
		duration: 1000,
	}).add({
		targets: ".elevator-one",
		translateY:function(){
			return tar_loc.top - box_loc.bottom;
		},
		offset: '-=1000',
		easing: 'linear',
		duration: 1000,
	}).add({
		targets: "#robot-two",
		translateX:function(){
			return tar_loc.left - pusher_loc.right;
		},
		offset: '-=740',
		easing: 'linear',
		duration: 750,
	}).add({
		targets: "#robot-two",
		translateX:function(){
			return loading_loc.left - pusher_loc.right;
		},
		easing: 'linear',
		duration: 2000,
	}).add({
		targets: '#box-one',
		translateY:function(){
			return tar_loc.top - box_loc.bottom;
		},
		
		translateX: function(){
			return loading_loc.left - box_loc.left;
		},
		rotate: 720,
		offset: '-=2000',
		easing: 'linear',
		duration: 2000,
	}).add({
		targets: '#robot-two',
		translateY:function(){
			return tar_loc.top - box_loc.bottom;
		},

		translateX: function(){
			return border_loc.left - box_loc.right;
		},
		rotate: 720,
		easing: 'linear',
		duration: 2000,
	});

	setTimeout("ALGchangemes()", 5000);
}

function ALGchangemes(){
	mouseoutMes = "<br><div class='category'>Data Structure</div><button class='btn btn--swap' id='sort'>Sort<span>Sort</span></button><button class='btn btn--swap' id='graph'>Graph<span>Graph</span></button>";
	$(".screen").html(mouseoutMes);
	$('#sort').click(showsort);
	$('#graph').click(showgraph);
}

function showsort(){
	mouseoutMes = "<br><div class='category'>Sort</div><div><a href='sort/bubble_sort.html'><button class='sortbtn sortbtn--swap' id='sort'>Bubble Sort<span>Bubble Sort</span></button></a><a href='sort/insertion_sort.html'><button class='sortbtn sortbtn--swap' id='graph'>Insertion Sort<span>Insertion Sort</span></button></a></div><br><br><br><div><a href='sort/selection_sort.html'><button class='sortbtn sortbtn--swap' id='graph'>Selection Sort<span>Selection Sort</span></button></a><a href='sort/merge_sort.html'><button class='sortbtn sortbtn--swap' id='graph'>Merge Sort<span>Merge Sort</span></button></a></div>";
	$(".screen").html(mouseoutMes);
}

function showgraph(){
	mouseoutMes = "<br><div class='category' style='color:#FF3333;'>付費以解鎖更多</div><br><div style='line-height:1.9vw'>請撥打以下電話會有專人為您服務  <3<br><a href='tel:0987987987'>0987987987</a></div><button class='rebtn rebtn--swap' id='re'>Back<span>Back</span></button>";
	$(".screen").html(mouseoutMes);
	$('#re').click(ALGchangemes);
}

function init(){
	fix_width();
	$("#box-one").mouseover(function(){
		$(".messenger").html("<br><div style='font-size:3.5vw'>Algorithm</div>");
	});
	$("#box-two").mouseover(function(){
		$(".messenger").html("<br><div style='font-size:3.5vw'>Data Structure</div>");
	});
	$("#load").mouseover(function(){
		$(".messenger").html("<br><div style='font-size:3.5vw'>說明文件</div>");
	});
	$("#load").mouseout(function(){
		$(".screen").html(mouseoutMes);
	});
	$(".box").mouseout(function(){
		$(".screen").html(mouseoutMes);
	});
	$('#box-one').click(show_ALG);
	$('#box-two').click(show_DS);
}
$(document).ready(init,false);