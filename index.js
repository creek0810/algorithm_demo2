var mouseoutMes = '<br><div class="title">救救演算法!!!</div><br><div class="messenger">點擊下方CD以了解更多<br>點擊下方CD Player以查看說明文件</div>';

function fix_width(){
	let width = $('.robot').height();
	$('.robot').width(width);
	$('.box').width(width);
	$('.elevator-shaft-one').width(width);
	$('.elevator-shaft-two').width(width);
}
function show_DS(){
	let timeline = anime.timeline();
	let cur_loc = $('#push_arm')[0].getBoundingClientRect();
	let tar_loc = $('.elevator-shaft-two')[0].getBoundingClientRect();
	let box_loc = $('#box-two')[0].getBoundingClientRect();
	let pusher_loc = $('#push_arm3')[0].getBoundingClientRect();
	let loading_loc = $('#load')[0].getBoundingClientRect();

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
	});

	mouseoutMes = " ";
}

function show_ALG(){
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
	});

	mouseoutMes = " ";
}

function init(){
	fix_width();
	$("#box-one").mouseover(function(){
		$(".messenger").html("<div style='font-size:3.5vw'>Algorithm</div>");
	});
	$("#box-two").mouseover(function(){
		$(".messenger").html("<div style='font-size:3.5vw'>Data Structure</div>");
	});
	$(".box").mouseout(function(){
		$(".screen").html(mouseoutMes);
	});
	$('#box-one').click(show_ALG);
	$('#box-two').click(show_DS);
}
$(document).ready(init,false);